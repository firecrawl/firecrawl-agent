import { generateText } from "ai";
import { createOrchestrator } from "./orchestrator";
import { resolveModel } from "./resolve-model";
import { discoverSkills } from "./skills/discovery";
import { parseSkillBody } from "./skills/parser";
import { workerProgress } from "./worker";
import { buildFirecrawlToolkit } from "./toolkit";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
class FirecrawlAgent {
  constructor(options) {
    this.options = options;
  }
  options;
  sumWorkerUsage() {
    let inputTokens = 0;
    let outputTokens = 0;
    for (const w of workerProgress.values()) {
      inputTokens += w.inputTokens ?? 0;
      outputTokens += w.outputTokens ?? 0;
    }
    return { inputTokens, outputTokens, totalTokens: inputTokens + outputTokens };
  }
  /**
   * Run the agent to completion. Returns the full result.
   */
  async run(params) {
    workerProgress.clear();
    const orchestrator = await this.buildOrchestrator(params);
    const result = await orchestrator.generate({
      prompt: params.prompt,
      onStepFinish: params.onStep ? ({ text, toolCalls, usage }) => {
        if (text) params.onStep({ type: "text", text });
        for (const tc of toolCalls ?? []) {
          if (!tc) continue;
          const c = tc;
          params.onStep({
            type: "tool-call",
            toolName: tc.toolName,
            input: c.args ?? c.input
          });
        }
        if (usage) params.onStep({ type: "usage", usage });
      } : void 0
    });
    const steps = this.mapSteps(result.steps);
    const extracted = this.extractFormattedOutput(result.steps, params.format);
    const workerUsage = this.sumWorkerUsage();
    const runResult = {
      text: result.text ?? "",
      data: extracted?.content,
      format: extracted?.format ?? params.format,
      steps,
      usage: {
        inputTokens: (result.usage?.inputTokens ?? 0) + workerUsage.inputTokens,
        outputTokens: (result.usage?.outputTokens ?? 0) + workerUsage.outputTokens,
        totalTokens: (result.usage?.totalTokens ?? 0) + workerUsage.totalTokens
      }
    };
    if (params.exportSkill) {
      runResult.exportedSkill = await this.exportAsSkill(params, steps);
    }
    return runResult;
  }
  /**
   * Stream agent events as an async generator. Events are yielded in real-time
   * as the agent executes — tool calls, results, and text appear as they happen.
   */
  async *stream(params) {
    workerProgress.clear();
    const orchestrator = await this.buildOrchestrator(params);
    const queue = [];
    let resolve = null;
    let done = false;
    const push = (event) => {
      queue.push(event);
      if (resolve) {
        resolve();
        resolve = null;
      }
    };
    const generatePromise = orchestrator.generate({
      prompt: params.prompt,
      onStepFinish: ({ text, toolCalls, toolResults, usage }) => {
        if (text) push({ type: "text", content: text });
        for (const tc of toolCalls ?? []) {
          if (!tc) continue;
          const c = tc;
          push({
            type: "tool-call",
            toolName: tc.toolName,
            input: c.args ?? c.input
          });
        }
        for (const tr of toolResults ?? []) {
          if (!tr) continue;
          const r = tr;
          push({
            type: "tool-result",
            toolName: tr.toolName,
            output: r.output ?? r.result
          });
        }
        if (usage) push({ type: "usage", usage });
      }
    }).then((result) => {
      const steps = this.mapSteps(result.steps);
      const extracted = this.extractFormattedOutput(result.steps, params.format);
      const workerUsage = this.sumWorkerUsage();
      push({
        type: "done",
        text: extracted?.content ?? result.text ?? "",
        steps,
        usage: {
          inputTokens: (result.usage?.inputTokens ?? 0) + workerUsage.inputTokens,
          outputTokens: (result.usage?.outputTokens ?? 0) + workerUsage.outputTokens,
          totalTokens: (result.usage?.totalTokens ?? 0) + workerUsage.totalTokens
        }
      });
      done = true;
      if (resolve) {
        resolve();
        resolve = null;
      }
    }).catch((err) => {
      push({ type: "error", error: err instanceof Error ? err.message : String(err) });
      done = true;
      if (resolve) {
        resolve();
        resolve = null;
      }
    });
    while (true) {
      if (queue.length > 0) {
        yield queue.shift();
        continue;
      }
      if (done) break;
      await new Promise((r) => {
        resolve = r;
      });
    }
    while (queue.length > 0) yield queue.shift();
    await generatePromise;
  }
  /**
   * Return a Web Response with SSE stream. Works with Next.js, Hono, Bun, etc.
   */
  toResponse(params) {
    const encoder = new TextEncoder();
    const self = this;
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of self.stream(params)) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(event)}

`)
            );
          }
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "error", error: String(err) })}

`)
          );
        } finally {
          controller.close();
        }
      }
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    });
  }
  /**
   * Pipe SSE events directly to an Express/Node response object.
   */
  async sse(params, res) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    try {
      for await (const event of this.stream(params)) {
        res.write(`data: ${JSON.stringify(event)}

`);
      }
    } catch (err) {
      res.write(`data: ${JSON.stringify({ type: "error", error: String(err) })}

`);
    } finally {
      res.end();
    }
  }
  /**
   * Generate an execution plan without running the agent.
   */
  async plan(prompt) {
    const model = await resolveModel(this.options.model, this.options.apiKeys);
    const skills = await discoverSkills(this.options.skillsDir);
    const skillList = skills.length ? `
Available skills: ${skills.map((s) => `${s.name} (${s.description.slice(0, 60)})`).join(", ")}` : "";
    const { text } = await generateText({
      model,
      system: `You are a planning agent for a web research tool powered by Firecrawl. Given a user's request, produce a clear, numbered execution plan.

Available tools:
- search: Web search to discover relevant pages
- scrape: Extract content from a URL (supports query parameter for targeted extraction)
- interact: Click buttons, fill forms, handle JavaScript-heavy pages
- bashExec: Process data with jq, awk, sed, grep, sort, etc.
- formatOutput: Export results as JSON, CSV, markdown
- Sub-agents: Can delegate to specialized sub-agents${skillList}

For each step, specify:
1. What tool to use
2. What input/URL/query
3. What data you expect to get
4. How it feeds into the next step

Be specific about URLs, search queries, and extraction targets. Keep it concise -- one line per step.
End with the expected final output format and structure.
Do not use emojis.`,
      prompt: `Create an execution plan for this request:

${prompt}`,
      maxOutputTokens: 1024
    });
    return text;
  }
  /**
   * Get the raw ToolLoopAgent for AI SDK integration.
   * Use this when you need direct access to the underlying agent.
   */
  async createRawAgent(params) {
    return this.buildOrchestrator(params);
  }
  // --- Private helpers ---
  _toolkit = null;
  getToolkit() {
    if (this._toolkit) return this._toolkit;
    this._toolkit = this.options.toolkit ?? buildFirecrawlToolkit(this.options.firecrawlApiKey, this.options.firecrawlOptions);
    return this._toolkit;
  }
  async buildOrchestrator(params) {
    const opts = {
      config: {
        prompt: params.prompt,
        urls: params.urls,
        schema: params.schema,
        columns: params.columns,
        uploads: params.uploads,
        model: this.options.model,
        subAgentModel: this.options.subAgentModel,
        skills: params.skills ?? [],
        skillInstructions: params.skillInstructions,
        subAgents: params.subAgents ?? [],
        maxSteps: params.maxSteps ?? this.options.maxSteps
      },
      toolkit: this.getToolkit(),
      apiKeys: this.options.apiKeys,
      skillsDir: this.options.skillsDir,
      maxWorkers: this.options.maxWorkers,
      workerMaxSteps: this.options.workerMaxSteps
    };
    if (params.format) {
      const formatInstructions = this.buildFormatInstructions(params);
      opts.config.prompt = `${params.prompt}${formatInstructions}`;
    }
    return createOrchestrator(opts);
  }
  buildFormatInstructions(params) {
    const { format, schema, columns } = params;
    if (format === "json" && schema) {
      return `

Collect all data from your research plan, then call formatOutput with format "json".`;
    } else if (format === "json") {
      return `

Return the data as structured JSON. Call formatOutput with format "json" and the data as a well-structured JSON object or array.`;
    } else if (format === "csv" && columns?.length) {
      return `

Collect all column data from your research plan, then call formatOutput with format "csv" and columns: ${JSON.stringify(columns)}.`;
    } else if (format === "csv") {
      return `

Return the data as CSV. Call formatOutput with format "csv" and data as array of objects.`;
    } else if (format === "markdown") {
      return `

Return the data as clean, well-structured markdown. Call formatOutput with format "text" and the markdown content.`;
    }
    return "";
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapSteps(steps) {
    return (steps ?? []).map((s) => ({
      text: s.text ?? "",
      toolCalls: (s.toolCalls ?? []).filter(Boolean).map((tc) => ({
        name: tc.toolName ?? "",
        input: tc.input ?? tc.args
      })),
      toolResults: (s.toolResults ?? []).filter(Boolean).map((tr) => ({
        name: tr.toolName ?? "",
        output: tr.output ?? tr.result
      }))
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractFormattedOutput(steps, format) {
    if (!format) return null;
    for (const step of [...steps].reverse()) {
      for (const result of step.toolResults ?? []) {
        const r = result;
        if (r.toolName === "formatOutput") {
          const output = r.output ?? r.result;
          if (output?.content) {
            return { format: output.format ?? format, content: output.content };
          }
        }
      }
    }
    return null;
  }
  /**
   * Post-process a completed run into a reusable skill package.
   * Loads the export-workflow skill instructions and feeds the step history
   * to the model to generate SKILL.md + workflow.mjs + schema.json.
   */
  async exportAsSkill(params, steps) {
    const model = await resolveModel(this.options.model, this.options.apiKeys);
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const skillPath = path.join(
      this.options.skillsDir ?? path.join(__dirname, "skills", "definitions"),
      "export-workflow",
      "SKILL.md"
    );
    let skillInstructions;
    try {
      const raw = await fs.readFile(skillPath, "utf-8");
      skillInstructions = parseSkillBody(raw);
    } catch {
      skillInstructions = "Convert the tool call history into a reusable SKILL.md, workflow.mjs, and schema.json.";
    }
    const stepHistory = steps.map((step, i) => {
      const calls = step.toolCalls.map(
        (tc) => `  ${tc.name}(${JSON.stringify(tc.input)})`
      );
      const results = step.toolResults.map(
        (tr) => `  ${tr.name} \u2192 ${JSON.stringify(tr.output).slice(0, 500)}`
      );
      return `Step ${i + 1}:
${calls.join("\n")}
${results.join("\n")}`;
    });
    const { text } = await generateText({
      model,
      system: `${skillInstructions}

You are post-processing a completed agent run. Generate three files based on the tool call history below.

Return your response as a single JSON object with these keys:
- "name": a slug for the skill (e.g. "vercel-pricing")
- "skillMd": the full SKILL.md content (with frontmatter)
- "workflow": the full workflow.mjs content
- "schema": the full schema.json content

Return ONLY the JSON object, no markdown fences or explanation.`,
      prompt: `Original prompt: ${params.prompt}
${params.urls?.length ? `URLs: ${params.urls.join(", ")}` : ""}
${params.schema ? `Schema: ${JSON.stringify(params.schema)}` : ""}

Tool call history:
${stepHistory.join("\n\n")}`,
      maxOutputTokens: 4096
    });
    try {
      const parsed = JSON.parse(text);
      return {
        name: parsed.name ?? "exported-skill",
        skillMd: parsed.skillMd ?? "",
        workflow: parsed.workflow ?? "",
        schema: parsed.schema ?? ""
      };
    } catch {
      return {
        name: "exported-skill",
        skillMd: text,
        workflow: "",
        schema: ""
      };
    }
  }
}
function createAgent(options) {
  return new FirecrawlAgent(options);
}
function createAgentFromEnv(overrides) {
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlApiKey) throw new Error("FIRECRAWL_API_KEY not set");
  const apiKeys = {};
  const envMap = {
    ANTHROPIC_API_KEY: "anthropic",
    OPENAI_API_KEY: "openai",
    GOOGLE_GENERATIVE_AI_API_KEY: "google",
    AI_GATEWAY_API_KEY: "gateway"
  };
  for (const [env, id] of Object.entries(envMap)) {
    if (process.env[env]) apiKeys[id] = process.env[env];
  }
  return new FirecrawlAgent({
    firecrawlApiKey,
    model: {
      provider: process.env.MODEL_PROVIDER ?? "google",
      model: process.env.MODEL_ID ?? "gemini-3-flash-preview"
    },
    apiKeys,
    ...overrides
  });
}
export {
  FirecrawlAgent,
  createAgent,
  createAgentFromEnv
};
