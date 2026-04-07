import { LanguageModel, ToolSet } from 'ai';
import { SubAgentConfig, Toolkit, SkillMetadata } from '../types.js';

declare function createSubAgentTools(configs: SubAgentConfig[], toolkit: Toolkit, skills: SkillMetadata[], parentModel?: LanguageModel, customInstructions?: Record<string, string>, apiKeys?: Record<string, string>, workerOptions?: {
    maxWorkers?: number;
    workerMaxSteps?: number;
}): Promise<ToolSet>;

export { createSubAgentTools };
