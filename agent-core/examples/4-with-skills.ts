/**
 * 4. Skills - load a reusable skill to guide the agent's procedure
 *
 *   npx tsx examples/4-with-skills.ts
 */
import { createAgent } from "../src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: "anthropic", model: "claude-sonnet-4-6" },
});

const result = await agent.run({
  prompt: "Extract all products from amazon.com/s?k=mechanical+keyboards with prices and ratings",
  skills: ["e-commerce"],
});

console.log(JSON.stringify(result.output, null, 2));
