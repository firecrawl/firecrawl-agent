/**
 * Direct import of agent-core — no HTTP server needed.
 * The agent runs in-process using the Vercel AI SDK under the hood.
 */
// Direct import — works when run from the monorepo root with: npx tsx examples/typescript-ai-sdk/index.ts
// In a standalone project, you'd import from '@firecrawl/agent-core'
import { createAgent } from "../../agent-core/src/index";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: {
    provider: "google",
    model: "gemini-3-flash-preview",
  },
});

async function main() {
  const result = await agent.run({
    prompt: "What is Firecrawl and what are its main features?",
  });

  console.log(result.text);
  console.log(`\nSteps: ${result.steps.length}`);
  console.log(
    `Tokens — in: ${result.usage.inputTokens}, out: ${result.usage.outputTokens}`
  );
}

main();
