import "dotenv/config";

/**
 * Firecrawl Agent — library starting point.
 *
 * This is your entry point. agent-core/ is a folder in your project —
 * read it, modify it, extend it.
 *
 *   npm start              run this file
 *   npm run example:basic   run any example from examples/
 */
import { createAgent } from "./agent-core/src";

const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
if (!firecrawlApiKey) {
  console.error("\n  FIRECRAWL_API_KEY not set.\n  Get one at https://firecrawl.dev/app/api-keys and add it to your .env file.\n");
  process.exit(1);
}

const provider = (process.env.MODEL_PROVIDER ?? "google") as "google" | "anthropic" | "openai";
const modelId = process.env.MODEL_ID ?? "gemini-3-flash-preview";

const keys = ["FIRECRAWL_API_KEY", "ANTHROPIC_API_KEY", "OPENAI_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"]
  .filter((k) => process.env[k])
  .map((k) => k.replace(/_API_KEY|_GENERATIVE_AI_API_KEY/, "").toLowerCase());

console.log(`\n  firecrawl-agent  ${provider}/${modelId}  keys: ${keys.join(", ")}\n`);

const agent = createAgent({
  firecrawlApiKey,
  model: { provider, model: modelId },
});

// --- Run a task ---

const prompt = process.argv[2] ?? "What are the top 3 stories on Hacker News right now?";

console.log(`→ ${prompt}\n`);

const result = await agent.run({ prompt });

console.log(result.text);

if (result.data) {
  console.log("\nData:", result.data);
}
