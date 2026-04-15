import "dotenv/config";
import express from "express";
import { createAgentFromEnv } from "./agent-core/src";
import type { ModelConfig } from "./agent-core/src";

const app = express();
app.use(express.json());

function parseModel(m: unknown): ModelConfig | undefined {
  if (!m) return undefined;
  if (typeof m === "object") return m as ModelConfig;
  if (typeof m === "string") {
    const [provider, ...rest] = m.split(":");
    return { provider: provider as ModelConfig["provider"], model: rest.join(":") };
  }
  return undefined;
}

app.post("/v1/run", async (req, res) => {
  const { prompt, stream, model, ...rest } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  try {
    const modelConfig = parseModel(model);
    const agent = await createAgentFromEnv(modelConfig ? { model: modelConfig } : undefined);
    const params = { prompt, ...rest };

    if (stream) {
      await agent.sse(params, res);
    } else {
      const result = await agent.run(params);
      res.json({
        text: result.text,
        data: result.data,
        format: result.format,
        steps: result.steps,
        usage: result.usage,
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!res.headersSent) res.status(500).json({ error: message });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  const model = process.env.MODEL ?? "anthropic:claude-sonnet-4-6";
  const keys = ["FIRECRAWL_API_KEY", "ANTHROPIC_API_KEY", "OPENAI_API_KEY", "GOOGLE_API_KEY"]
    .filter((k) => process.env[k])
    .map((k) => k.replace(/_API_KEY/, "").toLowerCase());
  console.log(`\n  firecrawl-agent  http://localhost:${port}  ${model}  keys: ${keys.join(", ")}\n`);
});
