declare function loadOrchestratorPrompt(vars: {
    TODAY: string;
    FIRECRAWL_SYSTEM_PROMPT: string;
    RESEARCH_PLAN: string;
    WORKFLOW_STEPS: string;
    APP_SECTIONS: string;
}): Promise<string>;

export { loadOrchestratorPrompt };
