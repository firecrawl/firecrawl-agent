import { createFirecrawlAgent, toResponse } from "@/agent-core";
import { getFirecrawlKey, getProviderApiKeys } from "@agent/_lib/config/keys";

export const maxDuration = 300;

/**
 * POST /api/v1/run
 *
 * Consolidated agent endpoint. Body shape:
 *   { prompt: string, stream?: boolean, model?: string | ModelConfig }
 *
 * Streaming returns SSE `data: {...AgentEvent}\n\n` events.
 * Non-streaming returns `{ text, messages }`.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { prompt, stream = false, model, ...rest } = body as {
    prompt: string;
    stream?: boolean;
    model?: string | { provider: string; model: string };
  };

  if (!prompt) {
    return Response.json({ error: "prompt is required" }, { status: 400 });
  }

  const firecrawlApiKey = getFirecrawlKey();
  if (!firecrawlApiKey) {
    return Response.json(
      { error: "FIRECRAWL_API_KEY is missing. Set it in .env.local or Settings." },
      { status: 500 },
    );
  }

  try {
    const agent = await createFirecrawlAgent({
      firecrawlApiKey,
      model: model ?? "anthropic:claude-sonnet-4-6",
      apiKeys: getProviderApiKeys(),
    });

    const input = { messages: [{ role: "user" as const, content: prompt }] };

    if (stream) {
      return toResponse(agent, input);
    }

    const result = await agent.invoke(input, rest as any);
    const last = result.messages[result.messages.length - 1];
    return Response.json({
      text: typeof last.content === "string" ? last.content : JSON.stringify(last.content),
      messages: result.messages,
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
