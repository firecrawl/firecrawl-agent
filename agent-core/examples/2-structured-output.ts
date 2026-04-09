/**
 * 2. Structured output - enforce a JSON schema on the result
 *
 *   npx tsx examples/2-structured-output.ts
 */
import { createAgent } from "../src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: "anthropic", model: "claude-sonnet-4-6" },
});

const result = await agent.run({
  prompt: "Get the P/E ratio and stock price for NVIDIA, Google, and Microsoft",
  schema: {
    type: "array",
    items: {
      type: "object",
      properties: {
        company: { type: "string" },
        ticker: { type: "string" },
        price: { type: "number" },
        peRatio: { type: "number" },
        source: { type: "string" },
      },
    },
  },
});

console.log(JSON.stringify(result.output, null, 2));
