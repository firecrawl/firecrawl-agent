# Firecrawl Agent

<img src=".internal/agent.jpg" alt="Firecrawl Agent" />

AI-powered web research agent built on [Firecrawl](https://firecrawl.dev). Give it a prompt - it searches, scrapes, and extracts structured data from any website.

## Stack

| | Install |
|---|---|
| **[Next.js Template](./agent-templates/next/)** - Chat UI, streaming, skills, sub-agents, structured output | `firecrawl-agent init -t next` |
| **[Express Template](./agent-templates/express/)** - API server with skills, sub-agents, structured output | `firecrawl-agent init -t express` |
| **[Agent Core](./agent-core/)** - Orchestrator, skills, sub-agents, structured output as a library | `npm i @firecrawl/agent-core` |
| **[Firecrawl AI SDK](https://npmjs.com/package/firecrawl-aisdk)** - search, scrape, interact as Vercel AI SDK tools | `npm i firecrawl-aisdk` |

---

### Examples

| Level | Example |
|---|---|
| Firecrawl AI SDK | [Basic usage](./agent-templates/library/examples/basic.ts) · [Streaming](./agent-templates/library/examples/streaming.ts) · [Structured output](./agent-templates/library/examples/structured.ts) |
| Agent Core | [Library usage](./agent-templates/library/) · [Custom agent](./agent-templates/library/examples/custom-agent.ts) |
| Next.js | [Full template](./agent-templates/next/) |
| Express | [API server](./agent-templates/express/) |

---

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
