declare function loadWorkerPrompt(vars: {
    TASK_ID: string;
}): Promise<string>;

export { loadWorkerPrompt };
