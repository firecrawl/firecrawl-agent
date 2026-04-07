import * as ai from 'ai';
import { WorkerResult } from './worker/index.js';
import { CreateAgentOptions, RunParams, RunResult, AgentEvent } from './types.js';

declare class FirecrawlAgent {
    private options;
    constructor(options: CreateAgentOptions);
    private sumWorkerUsage;
    /**
     * Run the agent to completion. Returns the full result.
     */
    run(params: RunParams): Promise<RunResult>;
    /**
     * Stream agent events as an async generator. Events are yielded in real-time
     * as the agent executes — tool calls, results, and text appear as they happen.
     */
    stream(params: RunParams): AsyncGenerator<AgentEvent>;
    /**
     * Return a Web Response with SSE stream. Works with Next.js, Hono, Bun, etc.
     */
    toResponse(params: RunParams): Response;
    /**
     * Pipe SSE events directly to an Express/Node response object.
     */
    sse(params: RunParams, res: {
        setHeader(k: string, v: string): void;
        write(chunk: string): void;
        end(): void;
    }): Promise<void>;
    /**
     * Generate an execution plan without running the agent.
     */
    plan(prompt: string): Promise<string>;
    /**
     * Get the raw ToolLoopAgent for AI SDK integration.
     * Use this when you need direct access to the underlying agent.
     */
    createRawAgent(params: RunParams): Promise<ai.Experimental_Agent<never, {
        spawnAgents: ai.Tool<{
            tasks: {
                id: string;
                prompt: string;
            }[];
        }, {
            completed: number;
            failed: number;
            total: number;
            results: WorkerResult[];
        }>;
        formatOutput: ai.Tool<{
            format: "json" | "csv" | "text";
            data?: unknown;
            columns?: string[] | undefined;
        }, {
            format: string;
            content: string;
        }>;
        bashExec: ai.Tool<{
            command: string;
        }, {
            stdout: string;
            stderr: string;
            exitCode: number;
        }>;
        load_skill: ai.Tool<{
            name: string;
        }, {
            error: string;
        } | {
            available_site_playbooks?: string[] | undefined;
            name: string;
            instructions: string;
            error?: undefined;
        }>;
        lookup_site_playbook: ai.Tool<{
            url: string;
        }, {
            found: boolean;
            message: string;
            platform?: undefined;
            skill?: undefined;
            playbook?: undefined;
        } | {
            found: boolean;
            platform: string;
            skill: string;
            playbook: string;
            message?: undefined;
        }>;
        read_skill_resource: ai.Tool<{
            skill: string;
            file: string;
        }, {
            error: string;
            file?: undefined;
            content?: undefined;
        } | {
            file: string;
            content: string;
            error?: undefined;
        }>;
    }, never>>;
    private _toolkit;
    private getToolkit;
    private buildOrchestrator;
    private buildFormatInstructions;
    private mapSteps;
    private extractFormattedOutput;
    /**
     * Post-process a completed run into a reusable skill package.
     * Loads the export-workflow skill instructions and feeds the step history
     * to the model to generate SKILL.md + workflow.mjs + schema.json.
     */
    private exportAsSkill;
}
/**
 * Create a Firecrawl Agent instance.
 *
 * @example
 * ```ts
 * import { createAgent } from '@firecrawl/agent-core'
 *
 * const agent = createAgent({
 *   firecrawlApiKey: 'fc-...',
 *   model: { provider: 'anthropic', model: 'claude-sonnet-4-20250514' }
 * })
 *
 * const result = await agent.run({ prompt: 'get Vercel pricing' })
 * console.log(result.text)
 * ```
 */
declare function createAgent(options: CreateAgentOptions): FirecrawlAgent;
/**
 * Create an agent configured entirely from environment variables.
 * Reads FIRECRAWL_API_KEY, MODEL_PROVIDER, MODEL_ID, and all provider keys.
 * Throws if FIRECRAWL_API_KEY is not set.
 */
declare function createAgentFromEnv(overrides?: Partial<CreateAgentOptions>): FirecrawlAgent;

export { FirecrawlAgent, createAgent, createAgentFromEnv };
