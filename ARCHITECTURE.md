# Architecture

You ran `firecrawl init agent` and got a project. This is yours — everything is malleable.

## What You Have

```
my-agent/
├── agent-core/                  # the agent library (yours to modify)
│   ├── src/
│   │   ├── agent.ts             # createAgent() — the public API
│   │   ├── orchestrator/
│   │   │   ├── index.ts         # assembles: model + tools + prompts → agent loop
│   │   │   └── prompts/         # core agent behavior
│   │   │       ├── system.md    # role, tools, delegation, completeness
│   │   │       ├── skills.md    # skill loading policy
│   │   │       └── export-skill.md
│   │   ├── worker/              # parallel sub-agents
│   │   ├── skills/definitions/  # built-in skills (SKILL.md playbooks)
│   │   ├── tools.ts             # formatOutput, bashExec, exportSkill
│   │   ├── toolkit.ts           # Firecrawl API → tools
│   │   └── resolve-model.ts     # anthropic/openai/google provider resolver
│   └── package.json
│
├── prompts/                     # YOUR app-specific prompts
│   ├── planning.md              # mermaid flowchart policy
│   ├── presentation-inline.md   # output rules (no schema)
│   ├── presentation-schema.md   # output rules (with schema)
│   ├── workflow-examples.md     # task pattern examples
│   └── loader.ts                # loads these → appSections[]
│
├── app/(agent)/                 # your app code
│   ├── api/agent/route.ts       # main endpoint — uses createAgent
│   ├── api/v1/run/route.ts      # REST API — uses createAgent
│   └── page.tsx                 # chat UI
│
├── .env.local                   # your API keys
└── package.json
```

## The Stack

```
Firecrawl API             web scraping, search, browser automation
      ↓
Vercel AI SDK             ToolLoopAgent — the agent loop
      ↓
agent-core                skills, workers, prompts, tools
      ↓
your prompts/ + app/      your customizations on top
```

Under the hood, the entire agent is:

```ts
new ToolLoopAgent({ model, instructions, tools, stopWhen })
```

agent-core wraps this with Firecrawl tools, a skills system, parallel workers, and structured output. Your `prompts/` folder controls how the agent behaves in your app.

## How to Customize

### Change how the agent thinks
Edit `agent-core/src/orchestrator/prompts/system.md`. This is the core system prompt — role, tool usage, delegation rules, completeness checks.

### Change how your app uses the agent
Edit `prompts/*.md`. These are app-level policies passed via `appSections`:
- **planning.md** — remove mermaid if you don't need flowcharts
- **presentation-*.md** — change how results are displayed
- **workflow-examples.md** — add task patterns your users will run

### Add a skill
Create `agent-core/src/skills/definitions/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: What this skill does
---

## Procedure
1. Search for "{QUERY}" to find relevant pages
2. Scrape with query: "Extract the specific data..."
3. Format as JSON via formatOutput
```

Auto-discovered. The agent loads it when the task matches.

### Add a site playbook
Create `agent-core/src/skills/definitions/my-skill/sites/example.md`:

```markdown
---
domains: ["example.com"]
platform: example
---

## URL Patterns
- Product: /products/{id}
- Search: /search?q={query}

## Extraction Tips
- Prices are in the .price-box element
- Pagination: ?page=N, 20 items per page
```

When the agent hits a matching domain, it gets these instructions automatically.

### Add a custom tool
In `agent-core/src/tools.ts`, add your tool. In `agent-core/src/orchestrator/index.ts`, register it:

```ts
tools: {
  ...toolkit.tools,
  formatOutput,
  bashExec,
  exportSkill,
  myTool,  // ← yours
}
```

### Swap models
In `.env.local`:
```
MODEL_PROVIDER=anthropic
MODEL_ID=claude-sonnet-4-6
```

Or at runtime:
```ts
const agent = createAgent({
  model: { provider: 'openai', model: 'gpt-4o' },
})
```

Supports: `anthropic`, `openai`, `google`, `custom-openai` (any OpenAI-compatible endpoint).

### Inject app prompts
Your `prompts/loader.ts` loads `.md` files and returns `appSections[]`. These are appended after the core system prompt:

```ts
const appSections = await loadAppSections({ hasSchema: true });
const agent = createAgent({ firecrawlApiKey, model, appSections });
```

Add any `.md` file to `prompts/`, load it in the loader, and it becomes part of the agent's instructions.

## Firecrawl Tools

| Tool | Method | What it does |
|------|--------|-------------|
| `search` | Web search | Returns pages with titles, URLs, snippets |
| `scrape` | Content extraction | Use `query` for targeted extraction, `formats` for raw markdown |
| `scrape:extract` | Schema extraction | Extract structured data matching a JSON schema |
| `interact` | Browser automation | Click, fill forms, handle JS. Natural language or code |
| `map` | URL discovery | Find all URLs on a site |
| `crawl` | Full crawl | Crawl an entire site |

Built-in tools:

| Tool | What it does |
|------|-------------|
| `formatOutput` | Format results as JSON, CSV, or Markdown |
| `bashExec` | Data processing sandbox (jq, awk, sed, grep) |
| `exportSkill` | Agent saves its procedure as a reusable SKILL.md |
| `spawnAgents` | Run parallel workers for independent tasks |

## Core vs App

| If you want to change... | Edit |
|--------------------------|------|
| How the agent reasons and acts | `agent-core/src/orchestrator/prompts/system.md` |
| When skills load | `agent-core/src/orchestrator/prompts/skills.md` |
| What tools are available | `agent-core/src/orchestrator/index.ts` |
| How your app presents results | `prompts/presentation-*.md` |
| Task planning style | `prompts/planning.md` |
| Example task patterns | `prompts/workflow-examples.md` |
| The chat UI | `app/(agent)/page.tsx` |
| API endpoints | `app/(agent)/api/` |

## Using as a Library

Skip the UI entirely:

```ts
import { createAgent } from './agent-core/src'

const agent = createAgent({
  firecrawlApiKey: process.env.FIRECRAWL_API_KEY!,
  model: { provider: 'google', model: 'gemini-3-flash-preview' },
})

// Run to completion
const result = await agent.run({ prompt: 'Compare Vercel vs Netlify pricing' })
console.log(result.text)

// Or stream
for await (const event of agent.stream({ prompt: '...' })) {
  console.log(event.type, event.content)
}

// Or get a web Response with SSE
return agent.toResponse({ prompt: '...' })
```

## License

MIT — this is your project. Change anything.
