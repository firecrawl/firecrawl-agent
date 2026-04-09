import "dotenv/config";
import { createAgent } from "../agent-core/src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: "anthropic", model: "claude-sonnet-4-6" },
  maxWorkers: 5,
  workerMaxSteps: 20,
});

const result = await agent.run({
  prompt:
    "Compare Cursor, Windsurf, and Claude Code: pricing, features, and supported languages from each site",
});

console.log(result.text);
