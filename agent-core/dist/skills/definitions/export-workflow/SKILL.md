---
name: export-workflow
description: Convert the agent's tool call history into a reusable skill with a deterministic script and self-healing fallbacks. Generates a SKILL.md + workflow.mjs + schema.json that the agent can execute repeatedly.
category: Utility
---

# Export Workflow

After completing a scraping/research task, review your tool call history and generate a **reusable skill package** — a new skill directory with a deterministic script, expected output schema, and agent instructions for self-healing when the script breaks.

## What you generate

Three files written to `/data/` via bashExec:

| File | Purpose |
|---|---|
| `SKILL.md` | Agent instructions: run the script, check logs, self-heal on failure |
| `workflow.mjs` | Deterministic Node.js script that reproduces the workflow |
| `schema.json` | Expected output shape for validation |

## Step 1: Audit your tool history

Review ALL prior tool calls. For each Firecrawl call, capture:

- **Tool name** — search, scrape, interact, map, crawl
- **Inputs** — URLs, queries, formats, prompts, code
- **Outputs** — discovered URLs, extracted data shapes, scrape IDs
- **Dependencies** — which step's output fed into the next

Classify each step:

| Step type | Example | Script treatment |
|---|---|---|
| **Discovery** (search) | Searched "Vercel pricing" → found vercel.com/pricing | Hardcode the URL. Keep search query as fallback. |
| **Collection** (scrape + JSON) | Scraped with prompt extraction | Keep as-is — prompts are resilient to content changes |
| **Collection** (scrape + markdown) | Scraped for raw content | Keep as-is |
| **Interaction** (interact/browser) | Clicked "More", extracted data | Export as code execution with prompt as commented fallback |
| **Processing** (bashExec) | jq/awk transforms | Convert to JS equivalents |

## Step 2: Generate workflow.mjs

The deterministic script. Uses `@mendable/firecrawl-js` SDK.

### SDK response shapes (CRITICAL — get these right)

```
app.search(q, opts)                    → { web: [{ url, title }], ... }     access: result.web
app.scrape(url, { formats: ['md'] })   → { markdown: "...", metadata: {} }  access: result.markdown
app.scrape(url, { formats: [{         → { json: {...}, metadata: {} }       access: result.json
  type:'json', prompt:'...' }] })
app.interact(id, { code, language })   → { output: "...", success: bool }   access: result.output
app.map(url, opts)                     → { links: [...] }                   access: result.links
app.crawl(url, opts)                   → { data: [{ markdown }] }           access: result.data
```

### Script structure

```javascript
#!/usr/bin/env node
// Workflow: <one-line description>
// Generated: <date>
// Source: firecrawl-agent export-workflow
//
// Run: FIRECRAWL_API_KEY=fc-... node workflow.mjs
// Exit codes: 0 = success, 1 = partial (some steps failed), 2 = total failure

import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const results = {};
let exitCode = 0;

// ═══════════════════════════════════════════
// CONFIG — edit these to customize the workflow
// ═══════════════════════════════════════════

const TARGETS = {
  // URLs discovered during the original agent run.
  // If a URL goes stale, the SKILL.md fallback will re-discover it.
  pricingPage: 'https://vercel.com/pricing',
};

const EXTRACTION_PROMPTS = {
  pricing: 'Extract all pricing plan tiers with name, price, and features...',
};

// ═══════════════════════════════════════════
// WORKFLOW
// ═══════════════════════════════════════════

// --- Step 1: <description> ---
try {
  const result = await app.scrape(TARGETS.pricingPage, {
    formats: [{ type: 'json', prompt: EXTRACTION_PROMPTS.pricing }]
  });
  results.pricing = result.json;
  console.log(`[OK] Step 1: extracted ${Array.isArray(result.json) ? result.json.length : 1} items from ${TARGETS.pricingPage}`);
} catch (e) {
  console.error(`[FAIL] Step 1: ${e.message}`);
  exitCode = Math.max(exitCode, 1);
}

// --- Step 2: <interact if needed> ---
// ...more steps...

// ═══════════════════════════════════════════
// VALIDATE
// ═══════════════════════════════════════════

// Check output matches expected shape
if (!results.pricing || (Array.isArray(results.pricing) && results.pricing.length === 0)) {
  console.error('[FAIL] Validation: no pricing data extracted');
  exitCode = 2;
}

// ═══════════════════════════════════════════
// OUTPUT
// ═══════════════════════════════════════════

if (exitCode < 2) {
  console.log(JSON.stringify(results, null, 2));
}

process.exit(exitCode);
```

### Key rules for the script

**Discovery steps (search) → collapse to hardcoded URLs:**
```javascript
// Agent searched "Vercel pricing" and found this URL.
// If this URL stops working, the SKILL.md instructs the agent to re-discover.
// Original search query: "Vercel pricing 2026"
const TARGETS = { pricingPage: 'https://vercel.com/pricing' };
```

**Collection steps (scrape with JSON prompt) → keep prompts, they're resilient:**
```javascript
const result = await app.scrape(url, {
  formats: [{ type: 'json', prompt: 'Extract all pricing tiers with name, price, and features' }]
});
```

**Interact steps → export as code, include prompt as commented fallback:**
```javascript
await app.interact(scrapeId, {
  code: "document.querySelector('a.morelink').click()",
  language: 'node',
});
// Resilient fallback (uses AI, costs credits):
// await app.interact(scrapeId, { prompt: 'Click the More link at the bottom' });
```

**Every step gets a try/catch with structured logging:**
```javascript
try {
  // ... the operation ...
  console.log(`[OK] Step N: <what succeeded>`);
} catch (e) {
  console.error(`[FAIL] Step N: ${e.message}`);
  exitCode = Math.max(exitCode, 1);
}
```

**Exit codes:** 0 = all steps passed, 1 = some steps failed (partial data), 2 = critical failure (no usable data).

## Step 3: Generate schema.json

Extract the shape of the data you collected. This is used for validation.

```json
{
  "description": "Vercel pricing tiers",
  "type": "array",
  "minItems": 2,
  "items": {
    "type": "object",
    "required": ["name", "price"],
    "properties": {
      "name": { "type": "string" },
      "price": { "type": "string" },
      "features": { "type": "array", "items": { "type": "string" } }
    }
  }
}
```

Base this on the actual data you extracted — not a guess. Include `minItems` if you know the minimum expected count.

## Step 4: Generate SKILL.md

The agent instructions that wrap the deterministic script with self-healing.

```markdown
---
name: <slug>
description: <one-line description of what this workflow extracts>
category: Custom Workflow
---

# <Workflow Name>

## Targets

| URL | Fallback search query |
|---|---|
| <hardcoded URL> | "<original search query>" |

## Run

Execute the deterministic script first:

1. Read `workflow.mjs` using read_skill_resource.
2. Write it to `/data/workflow.mjs` with bashExec.
3. Run it: `node /data/workflow.mjs 2>&1`
4. Parse the output — look for `[OK]` and `[FAIL]` lines.

### If all steps pass (exit 0):
Parse the JSON output from stdout and call formatOutput.

### If some steps fail (exit 1):
Read the `[FAIL]` lines. For each failure:
- **Scrape 404 or timeout** → Search for the fallback query from the Targets table, scrape the new URL.
- **Empty extraction** → Try a broader extraction prompt, or use interact to check for JS-rendered content.
- **Interact selector failed** → Fall back to the commented prompt-based interact.
Merge recovered data with the partial results and call formatOutput.

### If total failure (exit 2):
Fall back to full agent mode — use the Targets table search queries to rediscover URLs from scratch, scrape them, and extract the data manually. This is the same as running the original task but with the benefit of knowing what URLs and prompts worked before.

## Schema

Read `schema.json` using read_skill_resource. Validate the output against it before calling formatOutput. Warn if fields are missing or counts are lower than expected.
```

## Step 5: Write all files and report

1. Write all three files to `/data/` via bashExec:
   - `/data/SKILL.md`
   - `/data/workflow.mjs`
   - `/data/schema.json`

2. Call formatOutput with format "text" and a summary:
   - Skill name and description
   - Number of steps in the workflow
   - Target URLs and fallback queries
   - Expected output shape
   - How to install: copy the three files to a new directory under `agent-core/src/skills/definitions/<name>/`

## Rules

- Only include steps that map to actual tool calls you made. Never speculate.
- Use exact URLs, queries, and prompts from the original run.
- Search steps become hardcoded URLs with the search query preserved as a fallback.
- Interact prompts become code execution with the original prompt as a commented fallback.
- Every script step gets try/catch, structured `[OK]`/`[FAIL]` logging, and contributes to the exit code.
- The schema must match the actual data shape you extracted — not an idealized version.
- If no Firecrawl tool calls were made, say so instead of generating empty files.
