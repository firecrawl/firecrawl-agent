# Hono Template

Fast, lightweight API server — ideal for edge and serverless deployments.

## Install

```bash
firecrawl-agent init my-agent -t hono
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
MODEL_PROVIDER=google               # default provider (google, anthropic, openai)
MODEL_ID=gemini-3-flash-preview     # default model
PORT=3000
```

## API

### POST /v1/run

```bash
curl -X POST http://localhost:3000/v1/run \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Get pricing for Vercel"}'
```

Set `"stream": true` for Server-Sent Events.

**Body:** `prompt` (required), `stream`, `format` (`json`|`csv`|`markdown`), `schema`, `columns`, `urls`, `model`, `maxSteps`, `skills`.

## Deploy

```bash
firecrawl-agent deploy -p vercel
firecrawl-agent deploy -p railway
firecrawl-agent deploy -p docker
```
