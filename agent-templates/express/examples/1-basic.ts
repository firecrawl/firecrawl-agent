import "dotenv/config";
import { createAgent } from "../agent-core/src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: "anthropic", model: "claude-sonnet-4-6" },
});

const result = await agent.run({
  prompt: "What are the top 3 stories on Hacker News right now?",
});

console.log(result.text);
