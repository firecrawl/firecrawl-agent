# Express Template

Node.js API server powered by [agent-core](../../agent-core/).

## Install

```bash
firecrawl create agent -t express
```

Or manually:

```bash
npm install
cp .env.example .env     # fill in FIRECRAWL_API_KEY + provider key
npm run doctor           # verify env vars
npm run dev              # starts on http://localhost:3000
```

## Environment variables

See `.env.example` for the full list. Minimum:

```
FIRECRAWL_API_KEY=fc-...              # required
GOOGLE_GENERATIVE_AI_API_KEY=AIza...  # or ANTHROPIC_API_KEY / OPENAI_API_KEY
# MODEL=google:gemini-3-flash-preview  (default, free tier)
```

## API

All endpoints return JSON. CORS is enabled by default — override with `CORS_ORIGIN`.

### `GET /`

Health + config overview. Handy for verifying setup in the browser.

```bash
curl http://localhost:3000/
# → {"status":"ok","model":"google:gemini-3-flash-preview","keys":["firecrawl","google"],"routes":{...}}
```

### `POST /v1/run`

Main endpoint — executes the agent.

```bash
curl -X POST http://localhost:3000/v1/run \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Get pricing for Vercel", "format": "json"}'
```

**Parameters:** `prompt` (required), `stream`, `model`, `subAgentModel`, `format` (`json` | `markdown`), `schema`, `urls`, `skills`, `maxSteps`.

**Response shape:** `{ text, data, format, steps, usage, durationMs, model }`.

### `POST /v1/plan`

Preview the agent's execution plan without running it.

```bash
curl -X POST http://localhost:3000/v1/plan \
  -H "Content-Type: application/json" \
  -d '{"prompt": "compare Vercel vs Netlify pricing"}'
# → {"plan": "1. search for Vercel pricing page...\n2. scrape..."}
```

### `GET /v1/skills`

List available skills.

```bash
curl http://localhost:3000/v1/skills
# → [{"name":"deep-research","description":"Multi-source research...","category":"Research"}, ...]
```

### `GET /v1/workers/progress`

Live progress of parallel workers during a run.

```bash
curl http://localhost:3000/v1/workers/progress
```

### Streaming

Set `stream: true` for Server-Sent Events. Use `curl -N` for real-time output:

```bash
curl -N -X POST http://localhost:3000/v1/run \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Get pricing for Vercel", "stream": true}'
```

Each event is a JSON line: `data: {"type":"text","content":"..."}\n\n`

## Scripts

```bash
npm run dev                  # dev server with watch
npm start                    # production server
npm run doctor               # verify env vars (no network calls)
npm run typecheck            # tsc --noEmit
npm run example:basic        # single prompt
npm run example:structured   # JSON schema output
npm run example:parallel     # parallel Subagents
npm run example:skills       # load a Skill
npm run example:stream       # streaming output
```

## Deploy

### Docker

```bash
docker build -t my-agent .
docker run -p 3000:3000 --env-file .env my-agent
```

The included Dockerfile is multi-stage (small final image), runs as a non-root user, and sets up a healthcheck on `GET /`.

### Other platforms

Railway, Fly, Render, and any Node 22+ host work out of the box. The server handles `SIGTERM` gracefully, letting in-flight requests finish.
