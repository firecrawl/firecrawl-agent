import { FirecrawlToolsConfig, Toolkit } from './types.js';
import 'ai';

/**
 * Build a Toolkit from a Firecrawl API key. This is the single place where
 * agent-core meets the Firecrawl SDK — all routes share this helper.
 */
declare function buildFirecrawlToolkit(firecrawlApiKey: string, config?: FirecrawlToolsConfig): Toolkit;

export { buildFirecrawlToolkit };
