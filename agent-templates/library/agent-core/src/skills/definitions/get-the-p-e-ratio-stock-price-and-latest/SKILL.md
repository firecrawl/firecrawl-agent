```markdown
---
name: tech-stock-fundamentals
description: Retrieve P/E ratio, current stock price, and latest press release for {COMPANY} from Yahoo Finance and official investor relations
---

# Tech Stock Fundamentals Extractor

## What This Skill Does
This skill retrieves key financial metrics and investor communications for publicly traded technology companies. It gathers the current stock price and P/E ratio (TTM) from Yahoo Finance, then locates the most recent press release from the company's official investor relations page. The procedure is designed to work for any ticker symbol and can be repeated across multiple companies.

## Parameters
- {TICKER}: Stock ticker symbol (e.g., NVDA, GOOGL, MSFT)
- {COMPANY}: Company name for search context (e.g., NVIDIA, Alphabet, Microsoft)

## Procedure
1. **Search Yahoo Finance for stock data**: Use Firecrawl `search` to find "{TICKER} stock price P/E ratio site:yahoo.com"
2. **Scrape Yahoo Finance ticker page**: Use Firecrawl `scrape` on the Yahoo Finance summary page (e.g., `https://finance.yahoo.com/quote/{TICKER}`) with query: "Extract current stock price and trailing twelve months P/E ratio"
3. **Search for company investor relations**: Use Firecrawl `search` to find "{COMPANY} investor relations press releases" or "{COMPANY} news investor relations"
4. **Scrape investor relations page**: Use Firecrawl `scrape` on the official investor relations page with query: "Find the most recent press release title, date, and link"
5. **Compile results**: Format output with ticker, company name, stock price, P/E ratio (TTM), press release title, and date

## Data to Extract
- **Stock Ticker**: Company trading symbol
- **Stock Price**: Current market price (live from Yahoo Finance)
- **P/E Ratio (TTM)**: Trailing twelve months price-to-earnings ratio
- **Latest Press Release**: Title of most recent announcement
- **Press Release Date**: Publication date in YYYY-MM-DD or Month DD, YYYY format

## Gotchas
- **Method used**: Scrape with targeted `query` parameter to extract specific fields from Yahoo Finance and investor relations pages. The query approach is faster than interact with clicks because the data is visible on initial page load.
- **TTM vs Forward P/E**: Ensure extraction specifies "Trailing Twelve Months" to avoid confusion with forward P/E estimates.
- **Press release source**: Scrape from official investor relations domains (e.g., investor.nvidia.com, investor.google.com) to ensure authenticity and timeliness.
- **Live data caveat**: Stock prices update in real-time; P/E ratios may lag by 15-20 minutes on Yahoo Finance during market hours.

## Example Prompts
- "Get the P/E ratio, stock price, and latest press release for NVIDIA"
- "Retrieve current stock price and TTM P/E for Microsoft and its most recent press release"
- "Find the latest press release and financial metrics for Google stock"
```