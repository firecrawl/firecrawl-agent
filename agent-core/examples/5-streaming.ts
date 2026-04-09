/**
 * 5. Streaming - get results as they arrive
 *
 *   npx tsx examples/5-streaming.ts
 */
import { createAgent } from "../src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: "anthropic", model: "claude-sonnet-4-6" },
});

const stream = await agent.stream({
  prompt: "Find the 5 most recent YC-backed AI startups and their founders",
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

console.log("\n\nDone. Steps:", stream.steps.length);
