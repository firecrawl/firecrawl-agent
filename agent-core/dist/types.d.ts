import { ToolSet } from 'ai';

interface UploadedFile {
    name: string;
    type: string;
    content: string;
}
/**
 * A pre-built toolkit that agent-core uses. The host application constructs
 * this (e.g. from FirecrawlTools) and passes it in — agent-core never imports
 * tool providers directly.
 */
interface Toolkit {
    /** Tools to attach to the agent (search, scrape, interact, map, etc.) */
    tools: ToolSet;
    /** System prompt snippet from the tool provider (e.g. Firecrawl usage instructions) */
    systemPrompt?: string;
    /**
     * Factory to build a filtered toolset for sub-agents/workers.
     * Called with an optional list of enabled tool names.
     */
    createFiltered?: (enabledTools?: string[]) => ToolSet;
}
interface ModelConfig {
    provider: "gateway" | "anthropic" | "openai" | "google" | "custom-openai" | "firecrawl" | "acp";
    model: string;
    apiKey?: string;
    baseURL?: string;
    bin?: string;
}
interface SubAgentConfig {
    id: string;
    name: string;
    description: string;
    instructions?: string;
    model: ModelConfig;
    tools: ("search" | "scrape" | "interact" | "map")[];
    skills: string[];
    maxSteps?: number;
}
interface SitePlaybook {
    name: string;
    platform: string;
    domains: string[];
    filePath: string;
}
interface SkillMetadata {
    name: string;
    description: string;
    category?: string;
    directory: string;
    resources: string[];
    sitePlaybooks?: SitePlaybook[];
}
interface AgentConfig {
    prompt: string;
    urls?: string[];
    schema?: Record<string, unknown>;
    columns?: string[];
    csvContext?: string;
    uploads?: UploadedFile[];
    model: ModelConfig;
    subAgentModel?: ModelConfig;
    operationModels?: Record<string, ModelConfig>;
    skills: string[];
    skillInstructions?: Record<string, string>;
    subAgents: SubAgentConfig[];
    maxSteps?: number;
}
interface FirecrawlToolsConfig {
    /** Defaults for search, or false to disable */
    search?: Record<string, unknown> | false;
    /** Defaults for scrape, or false to disable */
    scrape?: Record<string, unknown> | false;
    /** Defaults for interact, or false to disable */
    interact?: Record<string, unknown> | false;
    /** Include map tool */
    map?: boolean;
    /** Include crawl tool */
    crawl?: boolean;
    /** Max approximate tokens for tool responses */
    maxResponseTokens?: number;
}
interface CreateAgentOptions {
    /** Firecrawl API key — used to build the default toolkit */
    firecrawlApiKey: string;
    /** Configure which Firecrawl tools are enabled and their defaults */
    firecrawlOptions?: FirecrawlToolsConfig;
    /** Override the default Firecrawl toolkit with a custom one */
    toolkit?: Toolkit;
    model: ModelConfig;
    subAgentModel?: ModelConfig;
    apiKeys?: Record<string, string>;
    skillsDir?: string;
    promptsDir?: string;
    maxSteps?: number;
    maxWorkers?: number;
    workerMaxSteps?: number;
}
interface RunParams {
    prompt: string;
    urls?: string[];
    schema?: Record<string, unknown>;
    format?: "json" | "csv" | "markdown";
    columns?: string[];
    uploads?: UploadedFile[];
    skills?: string[];
    skillInstructions?: Record<string, string>;
    subAgents?: SubAgentConfig[];
    maxSteps?: number;
    /** When true, post-processes the run into a reusable skill (SKILL.md + workflow.mjs + schema.json) */
    exportSkill?: boolean;
    onStep?: (event: StepEvent) => void;
}
interface StepEvent {
    type: "text" | "tool-call" | "tool-result" | "usage";
    text?: string;
    toolName?: string;
    input?: unknown;
    output?: unknown;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
interface AgentEvent {
    type: "text" | "tool-call" | "tool-result" | "usage" | "done" | "error";
    content?: string;
    toolName?: string;
    input?: unknown;
    output?: unknown;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
    text?: string;
    steps?: StepDetail[];
    error?: string;
}
interface StepDetail {
    text: string;
    toolCalls: {
        name: string;
        input: unknown;
    }[];
    toolResults: {
        name: string;
        output: unknown;
    }[];
}
interface ExportedSkill {
    name: string;
    skillMd: string;
    workflow: string;
    schema: string;
}
interface RunResult {
    text: string;
    data?: string;
    format?: string;
    steps: StepDetail[];
    usage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens: number;
    };
    exportedSkill?: ExportedSkill;
}

export type { AgentConfig, AgentEvent, CreateAgentOptions, ExportedSkill, FirecrawlToolsConfig, ModelConfig, RunParams, RunResult, SitePlaybook, SkillMetadata, StepDetail, StepEvent, SubAgentConfig, Toolkit, UploadedFile };
