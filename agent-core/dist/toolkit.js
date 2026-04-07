import { FirecrawlTools } from "firecrawl-aisdk";
function buildFirecrawlToolkit(firecrawlApiKey, config) {
  const { systemPrompt, ...tools } = FirecrawlTools({
    apiKey: firecrawlApiKey,
    ...config
  });
  return {
    tools,
    systemPrompt: systemPrompt ?? void 0,
    createFiltered: (enabled) => {
      const opts = { apiKey: firecrawlApiKey, ...config };
      if (enabled) {
        if (!enabled.includes("search")) opts.search = false;
        if (!enabled.includes("scrape")) opts.scrape = false;
        if (!enabled.includes("interact")) opts.interact = false;
      }
      const { systemPrompt: _, ...filtered } = FirecrawlTools(opts);
      return filtered;
    }
  };
}
export {
  buildFirecrawlToolkit
};
