import express from "express";
import { createAgentFromEnv } from "../../agent-core/src";

const app = express();
app.use(express.json());

app.post("/v1/run", async (req, res) => {
  const { prompt, stream, format, schema, columns, urls, model, maxSteps, skills } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  const agent = createAgentFromEnv(model ? { model } : undefined);
  const params = { prompt, urls, schema, format, columns, skills, maxSteps };

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
