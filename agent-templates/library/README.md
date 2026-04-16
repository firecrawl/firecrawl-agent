# Library Template

Extensible agent-core for scripts, services, or your own app. No server — just import and run.

## Install

```bash
firecrawl create agent -t library
```

Or manually:

```bash
npm install
cp .env.example .env     # fill in FIRECRAWL_API_KEY + provider key
npm run doctor           # verify env vars
npm start                # run with default prompt
```

## Environment variables

See `.env.example` for the full list. Minimum:

```
FIRECRAWL_API_KEY=fc-...              # required
GOOGLE_GENERATIVE_AI_API_KEY=AIza...  # or ANTHROPIC_API_KEY / OPENAI_API_KEY
# MODEL=google:gemini-3-flash-preview  (default, free tier)
```

## Usage

`index.ts` is your entry point. Three ways to pass a prompt:

```bash
npm start                              # default fallback prompt
npm start "compare Vercel vs Netlify"  # CLI arg
echo "scrape firecrawl.dev" | npm start # piped stdin
```

To embed the agent in your own code:

```typescript
import { createAgent } from "./agent-core/src";

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
  model: { provider: "google", model: "gemini-3-flash-preview" },
});

const result = await agent.run({ prompt: "What are the top stories on HN?" });
console.log(result.text);
console.log(`${result.durationMs}ms, ${result.usage.totalTokens} tokens`);
```

## Examples

```bash
npm run example:basic        # single prompt, text response
npm run example:structured   # JSON schema enforcement
npm run example:parallel     # parallel Subagents
npm run example:skills       # load a Skill
npm run example:stream       # streaming with tool call events
```

Start with `example:basic`, then try `example:stream` to see tool calls in real time.

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run `index.ts` (accepts CLI arg or stdin prompt) |
| `npm run dev` | Run with `--watch` for auto-reload |
| `npm run doctor` | Verify env vars (no network calls) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run example:*` | Run any of the 5 examples |

## Customizing

`agent-core/` is a folder in your project — read it, modify it, extend it. Key files:

- `agent-core/src/agent.ts` — `createAgent()` and `FirecrawlAgent` class
- `agent-core/src/orchestrator/` — tool loop, compaction, subagents
- `agent-core/src/skills/definitions/` — drop SKILL.md folders here
