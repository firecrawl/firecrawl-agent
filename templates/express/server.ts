import express from "express";
import { createAgent } from "../../agent-core/src";
import type { RunParams, ModelConfig } from "../../agent-core/src";

const app = express();
app.use(express.json());

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

app.post("/v1/run", async (req, res) => {
  const { prompt, stream, format, schema, columns, urls, model, maxSteps, skills } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlApiKey) return res.status(500).json({ error: "FIRECRAWL_API_KEY not set" });

  const agent = createAgent({
    firecrawlApiKey,
    model: model ?? DEFAULT_MODEL,
    apiKeys: API_KEYS,
    maxSteps: Math.min(Math.max(1, maxSteps ?? 15), 50),
  });

  const params: RunParams = { prompt, urls, schema, format, columns, skills };

  try {
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();
      for await (const event of agent.stream(params)) {
        res.write(`data: ${JSON.stringify(event)}\n\n`);
      }
      res.end();
    } else {
      res.json(await agent.run(params));
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!res.headersSent) return res.status(500).json({ error: message });
    res.write(`data: ${JSON.stringify({ type: "error", error: message })}\n\n`);
    res.end();
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`firecrawl-agent listening on http://localhost:${port}`));
