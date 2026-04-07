import { LanguageModel } from 'ai';
import { ModelConfig } from './types.js';

/**
 * Resolve a ModelConfig to an AI SDK LanguageModel instance.
 * API keys can come from the config itself or the apiKeys map.
 * The consuming app is responsible for sourcing keys (env vars, user input, etc).
 */
declare function resolveModel(config: ModelConfig, apiKeys?: Record<string, string>): Promise<LanguageModel>;

export { resolveModel };
