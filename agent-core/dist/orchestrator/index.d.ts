import * as ai from 'ai';
import { ToolLoopAgent } from 'ai';
import { WorkerResult } from '../worker/index.js';
import { AgentConfig, Toolkit, ModelConfig } from '../types.js';

interface OrchestratorOptions {
    config: AgentConfig;
    toolkit: Toolkit;
    apiKeys?: Record<string, string>;
    skillsDir?: string;
    maxWorkers?: number;
    workerMaxSteps?: number;
    /** Model used to summarize context when approaching token limits. Defaults to the orchestrator model. */
    compactionModel?: ModelConfig;
}
declare function createOrchestrator(options: OrchestratorOptions): Promise<ToolLoopAgent<never, {
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

export { type OrchestratorOptions, createOrchestrator };
