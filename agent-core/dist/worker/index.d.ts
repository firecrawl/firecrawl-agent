import * as ai from 'ai';
import { LanguageModel } from 'ai';
import { Toolkit, SkillMetadata } from '../types.js';

interface WorkerProgress {
    id: string;
    status: "running" | "done" | "error";
    steps: number;
    currentTool?: string;
    currentInput?: string;
    tokens: number;
    inputTokens: number;
    outputTokens: number;
    liveViewUrl?: string;
    stepLog: {
        tool: string;
        detail: string;
        input: Record<string, unknown>;
    }[];
}
declare const workerProgress: Map<string, WorkerProgress>;
interface WorkerStepDetail {
    toolCalls: {
        name: string;
        input: string;
    }[];
    text: string;
}
interface WorkerResult {
    id: string;
    status: "done" | "error";
    result: string;
    steps: number;
    tokens: number;
    stepDetails: WorkerStepDetail[];
}
interface WorkerToolOptions {
    maxWorkers?: number;
    workerMaxSteps?: number;
}
declare function createWorkerTool(model: LanguageModel, toolkit: Toolkit, skills: SkillMetadata[], options?: WorkerToolOptions): ai.Tool<{
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

export { type WorkerProgress, type WorkerResult, type WorkerStepDetail, type WorkerToolOptions, createWorkerTool, workerProgress };
