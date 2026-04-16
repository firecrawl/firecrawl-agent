import { FirecrawlTools } from "firecrawl-aisdk";
import { aiToolkitToLc, aiToLc, type AISDKTool } from "./adapter";
import { formatOutput, bashExec, createExportSkillTool } from "./tools";
import type { FirecrawlToolsConfig } from "./types";

/**
 * Build Firecrawl tools (search, scrape, interact, map, crawl, extract)
 * as LangChain tools ready for createDeepAgent({ tools }).
 *
 * Returns an array — concat it with your own tools.
 */
export function firecrawlTools(config: { apiKey: string } & FirecrawlToolsConfig) {
  const { apiKey, ...rest } = config;
  const { systemPrompt: _, ...tools } = FirecrawlTools({ apiKey, ...rest });
  return aiToolkitToLc(tools as Record<string, AISDKTool>);
}

/**
 * Firecrawl's authored system prompt with usage guidance for each tool.
 * Optional — pass to createDeepAgent({ systemPrompt }) when you want
 * Firecrawl's own best-practice instructions.
 */
export function firecrawlSystemPrompt(config: { apiKey: string } & FirecrawlToolsConfig): string {
  const { apiKey, ...rest } = config;
  const { systemPrompt } = FirecrawlTools({ apiKey, ...rest });
  return systemPrompt ?? "";
}

/**
 * Standalone utility tools (bash, formatOutput, exportSkill) as LangChain tools.
 * Pull what you need; they're independent.
 */
export const utilityTools = {
  formatOutput: aiToLc("formatOutput", formatOutput as unknown as AISDKTool),
  bashExec: aiToLc("bashExec", bashExec as unknown as AISDKTool),
  exportSkill: (skillsDir?: string) =>
    aiToLc("exportSkill", createExportSkillTool(skillsDir) as unknown as AISDKTool),
};
