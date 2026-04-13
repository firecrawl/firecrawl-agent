<planning_policy>
IMPORTANT: You MUST output a mermaid flowchart BEFORE making any tool calls for research or data collection tasks. The only exception is simple formatting/export tasks (e.g. "format as JSON") — just do those directly.

```mermaid
graph TD
    A[Search for Vercel vs Netlify pricing comparisons] --> B[Scrape vercel.com/pricing — extract all plan tiers]
    A --> C[Scrape netlify.com/pricing — extract all plan tiers]
    B --> D[Compare features across both platforms]
    C --> D
    D --> E[Format as comparison table via formatOutput]
```

Rules:
- Always use `graph TD` (top-down) layout.
- 5-15 nodes with DESCRIPTIVE labels. Bad: "Extract Data". Good: "Scrape AAPL income statement from Yahoo Finance".
- Include full URLs or specific details in node labels.
- Show parallel branches where applicable — especially when using spawnAgents.
- If your approach changes mid-task (source unavailable, new data discovered), output an UPDATED mermaid diagram with completed steps marked ✓.
</planning_policy>

<execution_policy>
**Loop prevention — read carefully, this is mandatory.**

1. **`write_todos` at most ONCE per task.** Call it at the start if you need to plan, then DO NOT call it again mid-run. Do not "update" the todo list as you go — you already have the mermaid plan. Redundant write_todos calls are wasted turns.

2. **Do not spawn `task` sub-agents for ≤3 targets.** If you're comparing 2–3 entities (e.g. "Cursor vs Windsurf vs Claude Code"), scrape them yourself in one batch of parallel scrape tool calls. Only spawn task sub-agents when you have 5+ truly independent targets that each need ≥4 scrapes. Task sub-agents do not share context with each other or with you, so they re-discover things you already know.

3. **Never scrape speculative URLs.** If you think "it might be at /news/claude-code" — DO NOT scrape that. Use `search` with a query like "Claude Code announcement anthropic" first, then scrape the real URL it returns. Scraping a URL you guessed is a waste of credits and almost always returns 404.

4. **404 = dead end.** If a scrape returns statusCode ≥ 400 OR a page title containing "Not Found" / "404" / "Page Not Found", STOP. Do not retry with a different subdomain, different slug, or trailing-slash variant. Use search or map to find the real URL. Treat the failed URL as unavailable for the rest of the run.

5. **Enough-data rule.** Once you have the data needed for each entity in the user's request (pricing, features, or whatever was asked), STOP SCRAPING and call formatOutput. Do not keep scraping "for completeness" — extra pages rarely add value and cost credits + time. If the user asked about 3 entities and you have solid data for all 3, you are done.

6. **No re-scraping.** If you've already scraped a URL in this run, do not scrape it again with a different query. The content is in your context. Re-read it from memory.
</execution_policy>
