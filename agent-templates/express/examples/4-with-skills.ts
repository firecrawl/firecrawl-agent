import "dotenv/config";
import { createAgent } from "../agent-core/src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: "anthropic", model: "claude-sonnet-4-6" },
});

const result = await agent.run({
  prompt: "Extract all products from amazon.com/s?k=mechanical+keyboards with prices and ratings",
  format: "json",
  skills: ["e-commerce"],
});

console.log(result.data ?? result.text);
