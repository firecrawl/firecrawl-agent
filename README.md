# Firecrawl Agent

<img src=".internal/agent.jpg" alt="Firecrawl Agent" />

AI-powered web research agent built on [Firecrawl](https://firecrawl.dev). Give it a prompt - it searches, scrapes, and extracts structured data from any website.

## Choose your level

| | Firecrawl AI SDK | Agent Core | Templates (Next.js, Express) |
|---|---|---|---|
| **What it is** | Vercel AI SDK tools for search, scrape, interact | Orchestrator with skills, sub-agents, structured output | Full apps with UI, streaming, settings |
| **Best for** | Drop Firecrawl into any existing AI app | Building custom agents with parallel workers | Ship a complete agent product |
| **Install** | `npm i firecrawl-aisdk` | `npm i @firecrawl/agent-core` | `firecrawl-agent init my-app` |
| **Complexity** | ~10 lines | ~15 lines | Full project scaffold |

### 1. Firecrawl AI SDK - drop-in tools

The lightest option. Add Firecrawl's web tools to any Vercel AI SDK agent in a few lines:

```typescript
import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { FirecrawlTools } from 'firecrawl-aisdk'

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-6'),
  tools: FirecrawlTools({ apiKey: process.env.FIRECRAWL_API_KEY! }),
  maxSteps: 5,
  prompt: 'What are the top 3 stories on Hacker News right now?',
})

console.log(text)
```

This gives you `search`, `scrape`, and `interact` as AI SDK tools. You control the model, the loop, everything.

### 2. Agent Core - orchestrator with skills and sub-agents

Adds an opinionated layer on top: an orchestrator that plans, parallelizes with sub-agents, loads reusable skills, and outputs structured data.

```typescript
import { createAgent } from '@firecrawl/agent-core'

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: 'anthropic', model: 'claude-sonnet-4-6' },
})

const result = await agent.run({
  prompt: 'Get the P/E ratio and stock price for NVIDIA, Google, and Microsoft',
})

console.log(result.text)
```

What you get on top of the AI SDK:
- **Parallel sub-agents** - independent tasks run concurrently
- **Skills** - reusable SKILL.md playbooks the agent loads on demand
- **Structured output** - JSON, CSV, Markdown via `formatOutput`
- **Context compaction** - long sessions stay within the context window

### 3. Templates - full apps

Scaffold a complete project with UI, streaming, and configuration:

```bash
firecrawl-agent init my-agent
```

```
? Template
> Next.js (Full UI)      Complete web app with chat UI, streaming, skills
  Express (API only)     Lightweight Node.js API server with /v1/run endpoint
```

| Template | Install | What you get |
|----------|---------|-------------|
| [**Next.js**](./agent-templates/next/) | `firecrawl-agent init my-agent -t next` | Full web app with chat UI, streaming, skills |
| [**Express**](./agent-templates/express/) | `firecrawl-agent init my-agent -t express` | Lightweight API server with `POST /v1/run` |

Both templates build on agent-core and include all its features out of the box.

## How it works

The agent combines web tools with an AI model in a loop - it plans, acts, observes, and repeats until the task is done.

- **Tools** - search, scrape, interact (browser automation). Powered by [firecrawl-aisdk](https://www.npmjs.com/package/firecrawl-aisdk).
- **Skills** - reusable SKILL.md files that teach the agent site-specific procedures. Auto-discovered at startup.
- **Sub-agents** - parallel workers for independent tasks. The orchestrator spawns them dynamically.
- **Output** - structured results via `formatOutput` (JSON, CSV, Markdown) and data processing via `bashExec`.

## Project structure

| Directory | What's inside |
|-----------|--------------|
| [`agent-core/`](./agent-core/) | Core agent logic, orchestrator, skills, tools |
| [`agent-templates/`](./agent-templates/) | Server templates - [Next.js](./agent-templates/next/), [Express](./agent-templates/express/) |
| [`.internal/cli/`](./.internal/cli/) | CLI tool - `init`, `dev`, `deploy` |

## License

MIT
