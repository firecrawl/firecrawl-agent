# Architecture

This is a web research agent framework. You scaffold a project, customize it, and deploy it. Everything is yours to modify.

## The Stack

```
Firecrawl API          hosted web scraping, search, browser automation
      |
firecrawl-aisdk        AI SDK tools that wrap the Firecrawl API
      |
agent-core             agent loop + skills + prompts (this is the library)
      |
your app               Next.js, Express, Hono, FastAPI — your code
```

**agent-core** is a thin wrapper around the [Vercel AI SDK](https://sdk.vercel.ai/)'s `ToolLoopAgent`. It adds:
- Firecrawl tools (search, scrape, interact, map)
- A skills system (reusable `.md` playbooks)
- Parallel workers (sub-agents for independent tasks)
- Structured output (JSON, CSV, Markdown via `formatOutput`)
- Skill export (`exportSkill` — agent writes its own playbook)
- Context compaction (summarizes long conversations to stay in token budget)

That's it. Under the hood it's just:

```ts
new ToolLoopAgent({ model, instructions, tools, stopWhen })
```

## File Structure

When you scaffold a project, you get:

```
my-agent/
├── agent-core/                    # the library — modify freely
│   ├── src/
│   │   ├── agent.ts               # createAgent() → .run() / .stream() / .toResponse()
│   │   ├── orchestrator/
│   │   │   ├── index.ts           # model + tools + prompts → ToolLoopAgent
│   │   │   └── prompts/           # core agent behavior (edit these!)
│   │   │       ├── system.md      # role, mission, tool policy, delegation, completeness
│   │   │       ├── skills.md      # when to load skills
│   │   │       └── export-skill.md # when to export a playbook
│   │   ├── worker/
│   │   │   ├── index.ts           # parallel worker agents
│   │   │   └── prompts/system.md  # worker instructions
│   │   ├── skills/
│   │   │   ├── definitions/       # built-in skills (SKILL.md files)
│   │   │   ├── discovery.ts       # finds and loads skills
│   │   │   └── tools.ts           # load_skill, lookup_site_playbook tools
│   │   ├── tools.ts               # formatOutput, bashExec, exportSkill
│   │   ├── toolkit.ts             # builds Firecrawl tools from API key
│   │   ├── resolve-model.ts       # anthropic/openai/google model resolver
│   │   └── types.ts               # all TypeScript types
│   └── package.json
│
├── prompts/                       # YOUR app-specific prompts (edit these!)
│   ├── planning.md                # mermaid flowchart policy (Next.js)
│   ├── presentation-inline.md     # how to present results without schema
│   ├── presentation-schema.md     # how to present results with schema
│   ├── workflow-examples.md       # example task patterns
│   └── loader.ts                  # loads prompts → appSections[]
│
├── app/                           # your Next.js app (or server.ts for Express/Hono)
│   └── (agent)/
│       ├── api/agent/route.ts     # main chat endpoint — uses createAgent
│       ├── api/v1/run/route.ts    # REST API endpoint — uses createAgent
│       └── page.tsx               # chat UI
│
└── .env.local                     # API keys
```

## How It Flows

```
User prompt
    ↓
createAgent({ firecrawlApiKey, model, appSections })
    ↓
orchestrator builds:
    1. resolves model (anthropic/openai/google)
    2. discovers skills from skills/definitions/
    3. builds tools (firecrawl + skills + workers + formatOutput + exportSkill)
    4. loads core prompts from agent-core/prompts/
    5. appends YOUR app prompts (planning, presentation, etc.)
    6. → new ToolLoopAgent({ model, instructions, tools })
    ↓
agent loop: think → tool call → observe → repeat
    ↓
formatOutput() → structured JSON/CSV/Markdown
exportSkill()  → reusable SKILL.md playbook (optional)
```

## Where to Customize

### Change agent behavior
Edit the `.md` files in `agent-core/src/orchestrator/prompts/`. These are the core instructions. `system.md` is the big one — role, tools, delegation, completeness policies.

### Change app behavior
Edit the `.md` files in `prompts/`. These are app-specific:
- `planning.md` — remove mermaid if you don't want flowcharts
- `presentation-*.md` — change how results are formatted
- `workflow-examples.md` — add your own task patterns

### Add a skill
Create a folder in `agent-core/src/skills/definitions/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: What this skill does
---

## Procedure
1. Step one...
2. Step two...
```

Skills are auto-discovered. The agent loads them on demand.

### Add a site playbook
Create `agent-core/src/skills/definitions/my-skill/sites/example-site.md`:

```markdown
---
domains: ["example.com", "www.example.com"]
platform: example
---

## URL Patterns
- Product page: /products/{id}
- Search: /search?q={query}
```

When the agent scrapes a matching domain, it auto-loads these instructions.

### Swap the model
Change the model in your `.env.local` or pass it at runtime:

```ts
const agent = createAgent({
  model: { provider: 'anthropic', model: 'claude-sonnet-4-6' },
  // or: { provider: 'openai', model: 'gpt-4o' }
  // or: { provider: 'google', model: 'gemini-3-flash-preview' }
})
```

### Add custom tools
Add tools in `agent-core/src/tools.ts` and register them in `agent-core/src/orchestrator/index.ts`:

```ts
tools: {
  ...toolkit.tools,
  ...skillTools,
  spawnAgents,
  formatOutput,
  bashExec,
  exportSkill,
  myCustomTool,  // ← add here
}
```

### Inject app-specific prompts
Your app loads its own `.md` prompt files and passes them to `createAgent`:

```ts
const appSections = await loadAppSections({ hasSchema: true });

const agent = createAgent({
  firecrawlApiKey,
  model,
  appSections,  // ← your prompts get appended to the core system prompt
});
```

## Core vs App Separation

| Concern | Where | Why |
|---------|-------|-----|
| Agent identity, tool usage, delegation | `agent-core/prompts/system.md` | Core behavior — same regardless of UI |
| Skill loading policy | `agent-core/prompts/skills.md` | Core — skills are framework-agnostic |
| Mermaid planning | `prompts/planning.md` | App — only useful if you have a UI to render it |
| Result presentation | `prompts/presentation-*.md` | App — depends on your viewer/output panel |
| Workflow examples | `prompts/workflow-examples.md` | App — your users see different task patterns |

**Rule of thumb:** If it's about how the agent thinks and acts, it's core. If it's about how results look in your UI, it's app.

## Firecrawl Tools

The agent has access to these Firecrawl methods:

| Tool | What it does |
|------|-------------|
| `search` | Web search — returns pages with titles, URLs, snippets |
| `scrape` | Extract content from a URL. Use `query` for targeted extraction, `formats` for raw content |
| `interact` | Browser automation — click, fill forms, handle JS-heavy pages. Code or natural language |
| `map` | Discover all URLs on a site |
| `crawl` | Crawl an entire site |
| `extract` | Schema-based extraction with FIRE-1 agent |

Plus built-in tools:
| Tool | What it does |
|------|-------------|
| `formatOutput` | Format results as JSON, CSV, or Markdown |
| `bashExec` | Data processing sandbox (jq, awk, sed, grep) |
| `exportSkill` | Save the current procedure as a reusable SKILL.md |
| `spawnAgents` | Run parallel worker agents for independent tasks |

## Python Core

`agent-core-py/` is the same architecture in Python, built on [PydanticAI](https://ai.pydantic.dev/) + the [Firecrawl Python SDK](https://pypi.org/project/firecrawl/):

```python
from firecrawl_agent import create_agent, CreateAgentOptions, ModelConfig, RunParams

agent = create_agent(CreateAgentOptions(
    firecrawl_api_key="fc-...",
    model=ModelConfig(provider="google", model="gemini-3-flash-preview"),
))

result = agent.run_sync(RunParams(prompt="Compare Vercel vs Netlify pricing"))
```

Same `prompts/` folder pattern, same `appSections` for customization.

## License

MIT — this is your code. Change anything.
