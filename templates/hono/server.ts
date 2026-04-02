import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { streamSSE } from "hono/streaming";
import { createAgent } from "../../agent-core/src";
import type { ModelConfig, RunParams } from "../../agent-core/src";

const app = new Hono();

const DEFAULT_MODEL: ModelConfig = {
  provider: (process.env.MODEL_PROVIDER ?? "google") as ModelConfig["provider"],
  model: process.env.MODEL_ID ?? "gemini-3-flash-preview",
};

const API_KEYS: Record<string, string> = {};
for (const [env, id] of Object.entries({
  ANTHROPIC_API_KEY: "anthropic",
  OPENAI_API_KEY: "openai",
  GOOGLE_GENERATIVE_AI_API_KEY: "google",
  AI_GATEWAY_API_KEY: "gateway",
})) {
  if (process.env[env]) API_KEYS[id] = process.env[env]!;
}

app.post("/v1/run", async (c) => {
  const { prompt, stream, format, schema, columns, urls, model, maxSteps, skills } = await c.req.json();
  if (!prompt) return c.json({ error: "prompt is required" }, 400);

  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlApiKey) return c.json({ error: "FIRECRAWL_API_KEY not set" }, 500);

  const agent = createAgent({
    firecrawlApiKey,
    model: model ?? DEFAULT_MODEL,
    apiKeys: API_KEYS,
    maxSteps: Math.min(Math.max(1, maxSteps ?? 15), 50),
  });

  const params: RunParams = { prompt, urls, schema, format, columns, skills };

  if (stream) {
    return streamSSE(c, async (sseStream) => {
      try {
        for await (const event of agent.stream(params)) {
          await sseStream.writeSSE({ data: JSON.stringify(event) });
        }
      } catch (err) {
        await sseStream.writeSSE({
          data: JSON.stringify({ type: "error", error: err instanceof Error ? err.message : String(err) }),
        });
      }
    });
  }

  try {
    return c.json(await agent.run(params));
  } catch (err) {
    return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

const port = Number(process.env.PORT ?? 3000);
console.log(`firecrawl-agent listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
