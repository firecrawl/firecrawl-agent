import { ModelMessage, LanguageModel } from 'ai';

interface CompactionState {
    hasCompacted: boolean;
    lastInputTokens: number;
}
declare function createCompactionState(): CompactionState;
declare function compactMessages(messages: ModelMessage[], compactionModel: LanguageModel): Promise<ModelMessage[]>;
/**
 * Create a prepareStep hook that compacts context when approaching the model's token limit.
 * Uses the provided LanguageModel directly -- caller decides which model to use.
 */
declare function createPrepareStepWithCompaction(orchestratorModelName: string, compactionModel: LanguageModel): {
    state: CompactionState;
    prepareStep: ({ steps, messages }: {
        steps: unknown[];
        messages: ModelMessage[];
    }) => Promise<{
        messages: ModelMessage[];
    }>;
};

export { type CompactionState, compactMessages, createCompactionState, createPrepareStepWithCompaction };
