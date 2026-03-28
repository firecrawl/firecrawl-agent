import { generateText, stepCountIs, ToolLoopAgent } from "ai";
import { FirecrawlTools } from "firecrawl-aisdk";
import { resolveModel } from "@/lib/config/resolve-model";
import { formatOutput } from "@/lib/agents/tools";
import { bashExec } from "@/lib/agents/bash-tool";
import { createSkillTools } from "@/lib/skills/tools";
import { discoverSkills } from "@/lib/skills/discovery";
import { getFirecrawlKey } from "@/lib/config/keys";

export const maxDuration = 300;

/**
 * POST /api/query
 *
 * Simple API endpoint for programmatic use.
 *
 * Request body:
 *   {
 *     "prompt": "get firecrawl pricing",
 *     "model": "claude-sonnet-4-6",          // optional, default claude-sonnet-4-6
 *     "provider": "anthropic",               // optional, default anthropic
 *     "urls": ["https://..."],               // optional, seed URLs
 *     "schema": { ... },                     // optional, JSON schema for output
 *     "maxSteps": 15,                        // optional, default 15
 *     "stream": false                        // optional, default false
 *   }
 *
 * Response (stream=false):
 *   { "text": "...", "steps": [...], "usage": { ... } }
 *
 * Response (stream=true):
 *   SSE stream with events:
 *     data: {"type":"text","content":"..."}
 *     data: {"type":"tool-call","name":"search","args":{...}}
 *     data: {"type":"tool-result","name":"search","result":{...}}
 *     data: {"type":"done","text":"...","usage":{...}}
 */
export async function POST(req: Request) {
  const body = await req.json();
  const {
    prompt,
    model: modelId = "claude-sonnet-4-6",
    provider = "anthropic",
    urls,
    schema,
    maxSteps = 15,
    stream = false,
  } = body as {
    prompt: string;
    model?: string;
    provider?: string;
    urls?: string[];
    schema?: Record<string, unknown>;
    maxSteps?: number;
    stream?: boolean;
  };

  if (!prompt) {
    return Response.json({ error: "prompt is required" }, { status: 400 });
  }

  const firecrawlApiKey = getFirecrawlKey();
  if (!firecrawlApiKey) {
    return Response.json({ error: "FIRECRAWL_API_KEY is not configured. Add it in Settings." }, { status: 500 });
  }

  try {
    const model = await resolveModel({
      provider: provider as "anthropic" | "openai" | "google" | "gateway",
      model: modelId,
    });

    const { systemPrompt: fcSystemPrompt, ...fcTools } = FirecrawlTools({
      apiKey: firecrawlApiKey,
    });

    const skills = await discoverSkills();
    const skillTools = createSkillTools(skills);

    const schemaHint = schema
      ? `\n\nStructure your output to match this JSON schema:\n${JSON.stringify(schema, null, 2)}\nCall formatOutput with format "json" when done.`
      : "";

    const urlHint = urls?.length
      ? `\n\nStart with these URLs: ${urls.join(", ")}`
      : "";

    const system = `You are a web research agent powered by Firecrawl. Gather data from the web using search, scrape, and interact tools. Be thorough and narrate what you're doing.\n\n${fcSystemPrompt ?? ""}${schemaHint}${urlHint}`;

    const tools = {
      ...fcTools,
      ...skillTools,
      formatOutput,
      bashExec,
    };

    const createAgent = () =>
      new ToolLoopAgent({
        model,
        instructions: system,
        tools,
        stopWhen: stepCountIs(maxSteps),
      });

    const mapStep = (s: { text: string; toolCalls: { toolName: string }[]; toolResults: { toolName: string }[] }) => ({
      text: s.text,
      toolCalls: s.toolCalls.map((tc) => {
        const c = tc as Record<string, unknown>;
        return { name: tc.toolName, input: c.input ?? c.args };
      }),
      toolResults: s.toolResults.map((tr) => {
        const r = tr as Record<string, unknown>;
        return { name: tr.toolName, output: r.output ?? r.result };
      }),
    });

    if (stream) {
      // SSE streaming mode
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          const send = (data: Record<string, unknown>) => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          };

          try {
            const agent = createAgent();

            const { text, steps, usage } = await generateText({
              model: agent as unknown as Parameters<typeof generateText>[0]["model"],
              prompt,
              onStepFinish: ({ text: stepText, toolCalls, toolResults, usage: stepUsage }) => {
                if (stepText) {
                  send({ type: "text", content: stepText });
                }
                if (toolCalls) {
                  for (const tc of toolCalls) {
                    const c = tc as Record<string, unknown>;
                    send({ type: "tool-call", name: tc.toolName, input: c.input ?? c.args });
                  }
                }
                if (toolResults) {
                  for (const tr of toolResults) {
                    const r = tr as Record<string, unknown>;
                    send({ type: "tool-result", name: tr.toolName, output: r.output ?? r.result });
                  }
                }
                if (stepUsage) {
                  send({ type: "usage", usage: stepUsage });
                }
              },
            });

            send({
              type: "done",
              text,
              steps: steps.map(mapStep),
              usage,
            });
          } catch (err) {
            send({ type: "error", error: err instanceof Error ? err.message : String(err) });
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Non-streaming: run to completion
    const agent = createAgent();
    const { text, steps, usage } = await generateText({
      model: agent as unknown as Parameters<typeof generateText>[0]["model"],
      prompt,
    });

    return Response.json({
      text,
      steps: steps.map(mapStep),
      usage,
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
