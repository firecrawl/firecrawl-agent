import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { streamSSE } from "hono/streaming";
import { createAgentFromEnv } from "../../agent-core/src";

const app = new Hono();

app.post("/v1/run", async (c) => {
  const { prompt, stream, format, schema, columns, urls, model, maxSteps, skills } = await c.req.json();
  if (!prompt) return c.json({ error: "prompt is required" }, 400);

  const agent = createAgentFromEnv(model ? { model } : undefined);
  const params = { prompt, urls, schema, format, columns, skills, maxSteps };

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
