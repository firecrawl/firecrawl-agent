# Express Template

Standard Node.js API server — use this for traditional deployments (Railway, Docker, VPS).

Single `POST /v1/run` endpoint powered by [agent-core](../../agent-core/). See the [OpenAPI spec](../../agent-core/openapi.yaml) for full parameter docs.

## Install

```bash
firecrawl-agent init my-agent -t express
```

Or manually:

```bash
npm install
npm run dev
```

## Environment variables

```
FIRECRAWL_API_KEY=fc-...            # required
ANTHROPIC_API_KEY=...               # at least one model provider
OPENAI_API_KEY=...
GOOGLE_GENERATIVE_AI_API_KEY=...
MODEL_PROVIDER=google               # default provider
MODEL_ID=gemini-3-flash-preview     # default model
PORT=3000
```

## API

### POST /v1/run

```bash
curl -X POST http://localhost:3000/v1/run \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Get pricing for Vercel", "format": "json"}'
```

**Parameters:** `prompt` (required), `stream`, `format` (`json` | `csv` | `markdown`), `schema`, `urls`, `skills`, `subAgents`, `maxSteps`. See the [OpenAPI spec](../../agent-core/openapi.yaml) for details.

**Streaming:** set `"stream": true` — returns Server-Sent Events with tool calls, results, and text as they happen.

## Deploy

```bash
firecrawl-agent deploy -p railway
firecrawl-agent deploy -p docker
```
