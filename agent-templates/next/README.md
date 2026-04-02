# Next.js Template

Full-featured web app with chat UI, conversation history, settings, and real-time agent visualization.

## Install

```bash
firecrawl-agent init my-agent -t next
```

Or manually:

```bash
npm install
cp .env.local.example .env.local   # add your FIRECRAWL_API_KEY
npm run dev                         # http://localhost:3000
```

## What's included

- Chat interface with streaming tool call visualization
- Parallel agent progress tracking
- Conversation history (SQLite)
- File upload and bash sandbox
- Settings panel for API keys and model selection
- Plan visualization
- Export to JSON, CSV, Markdown

## Environment variables

```
FIRECRAWL_API_KEY=fc-...            # required
ANTHROPIC_API_KEY=...               # at least one model provider
OPENAI_API_KEY=...
GOOGLE_GENERATIVE_AI_API_KEY=...
AI_GATEWAY_API_KEY=...
```

## Deploy

```bash
firecrawl-agent deploy -p vercel    # generates vercel.json
firecrawl-agent deploy -p railway   # generates railway.toml
firecrawl-agent deploy -p docker    # generates Dockerfile
```
