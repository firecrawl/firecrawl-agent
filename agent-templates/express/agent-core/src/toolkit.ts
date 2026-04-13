import { FirecrawlTools, scrapeBash } from "firecrawl-aisdk";
import type { FirecrawlToolsConfig, Toolkit } from "./types";

/**
 * Build a Toolkit from a Firecrawl API key. This is the single place where
 * agent-core meets the Firecrawl SDK — all routes share this helper.
 *
 * When `bash: true`, replaces `scrape` with `scrapeBash` — a single tool
 * that loads pages into a WASM sandbox and queries them with rg/grep/sed.
 * The full markdown never enters the LLM context.
 */
export function buildFirecrawlToolkit(
  firecrawlApiKey: string,
  config?: FirecrawlToolsConfig,
): Toolkit {
  const bashMode = config?.bash ?? false;

  const { systemPrompt, ...tools } = FirecrawlTools({
    apiKey: firecrawlApiKey,
    ...config,
  });

  if (bashMode) {
    const { scrape: _scrape, ...rest } = tools;
    const bashTools = { ...rest, scrapeBash };

    return {
      tools: bashTools,
      systemPrompt: systemPrompt ?? undefined,
      createFiltered: (enabled) => {
        const opts: Record<string, unknown> = { apiKey: firecrawlApiKey, ...config };
        if (enabled) {
          if (!enabled.includes("search")) opts.search = false;
          if (!enabled.includes("scrape") && !enabled.includes("scrapeBash")) opts.scrape = false;
          if (!enabled.includes("interact")) opts.interact = false;
        }
        const { systemPrompt: _, scrape: _s, ...filtered } = FirecrawlTools(opts);
        return { ...filtered, scrapeBash };
      },
    };
  }

  return {
    tools,
    systemPrompt: systemPrompt ?? undefined,
    createFiltered: (enabled) => {
      const opts: Record<string, unknown> = { apiKey: firecrawlApiKey, ...config };
      if (enabled) {
        if (!enabled.includes("search")) opts.search = false;
        if (!enabled.includes("scrape")) opts.scrape = false;
        if (!enabled.includes("interact")) opts.interact = false;
      }
      const { systemPrompt: _, ...filtered } = FirecrawlTools(opts);
      return filtered;
    },
  };
}
