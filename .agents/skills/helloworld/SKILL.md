```markdown
---
name: helloworld
description: Explore a website by navigating and clicking around, then extract and format collected data in multiple output formats
---

# Hello World — Website Exploration Skill

## When to Use
Load this skill when asked to visit a homepage or website, click around to explore its content, and collect/summarize information from multiple pages. Also use when the user wants to reformat collected data as CSV or Markdown.

## Tools Required
- interact (primary — for navigating, clicking, and browsing)
- scrape (for extracting structured content from specific pages)
- search (optional — for finding specific sub-pages or supplementary info)

## Step-by-Step Instructions
1. Navigate to the target homepage using `interact` and take an initial screenshot to confirm the page loaded.
2. Provide the user with a live view link immediately after loading so they can watch in real time.
3. Systematically click through the main navigation items (e.g., Pricing, Blog, Docs, Playground, Integrations) one at a time.
4. After visiting each section, extract key data points: headlines, stats, feature lists, pricing tables, blog titles, and integration names.
5. For pages with deep content (e.g., blog posts), click into at least one representative article and extract its key points.
6. After clicking around all major sections, compile a structured Markdown summary organized by section.
7. If the user asks follow-up questions (e.g., about pricing tiers), scrape the relevant page again for more granular detail.
8. If the user requests a CSV format, use `formatOutput` with format `"csv"` and organize data into columns: Category, Item, Detail, Value.
9. If the user requests a Markdown report, use `formatOutput` with format `"text"` and organize into clearly headed sections with tables where appropriate.

## Data Extraction
Extract and store the following from each page type:

- **Homepage:** Tagline, key stats (coverage, latency, etc.), core feature names, selling points
- **Pricing:** Plan names, credit amounts, monthly price, billing period, concurrent request limits, support tier, overage/add-on rates, rollover policies
- **Blog:** Post titles, publish dates, brief topic summaries
- **Playground:** Available tools, output formats supported
- **Integrations:** Platform names grouped by category (e.g., Workflow Automation, LLM Frameworks, MCP)
- **Docs:** Top-level section names and subsection titles

Structure extracted data as key-value pairs per category for easy CSV conversion later.

## Output Format

### Default (after clicking around)
Deliver a Markdown summary with:
- A section per page visited (H2 headers)
- Bullet points or tables for structured data
- Emojis for visual clarity (optional but helpful)

### CSV Format (on request)
```
Category,Item,Detail,Value
Homepage,Tagline,Main headline,Power AI agents with clean web data
Pricing,Free Plan,Credits,500 (one-time)
...
```
Aim for ~60–80 rows covering all categories.

### Markdown Report (on request)
Full report with:
- Title and source metadata header
- Numbered H2 sections per topic
- Tables for pricing and stats
- Inline emphasis for key values

## Tips & Edge Cases
- Always share the live view link immediately after the browser session starts — users expect it early.
- Don't try to click every link; prioritize top-level nav items for breadth, then drill into one or two pages for depth.
- Pricing pages often have toggle switches (monthly vs. yearly) — note which mode is active when extracting prices.
- Blog pages may paginate — capture the first visible posts rather than scrolling indefinitely.
- When asked for CSV, use all data collected across the entire session, not just the most recent page.
- Auto-recharge and rollover policies are often buried in fine print — scrape the pricing FAQ or tooltip text if visible.
- If enterprise pricing is not listed, note the sales contact email or form URL instead.
- `formatOutput` with format `"text"` produces Markdown; use it for readable reports.
- `formatOutput` with format `"csv"` produces comma-separated output; ensure values with commas are quoted.

## Example Queries
- "Go to firecrawl home page and click around"
- "Explore the Stripe website and summarize what you find"
- "Visit the OpenAI homepage, click through the nav, and give me a full report"
- "Format all the collected data as CSV using formatOutput"
- "Format all the collected data as a markdown report using formatOutput with format text"
- "How does the pricing scale for high-volume usage?"
```