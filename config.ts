// ─── Firecrawl Agent Configuration ───
// Central config for all model selections and agent behavior.
// Edit this file to change which models power the orchestrator,
// sub-agents, and background tasks.

import type { ModelConfig } from "./lib/types";

type ModelRef = Pick<ModelConfig, "provider" | "model">;

export const config = {
  // ─── Orchestrator ───
  // The primary model that handles user queries, tool calls, and reasoning.
  orchestrator: {
    provider: "anthropic",
    model: "claude-sonnet-4-6",
  } satisfies ModelRef,

  // ─── Sub-agent ───
  // Model used by sub-agents (create_json, create_csv, create_markdown).
  // Can be cheaper/faster since sub-agents do focused formatting tasks.
  subAgent: {
    provider: "anthropic",
    model: "claude-sonnet-4-6",
  } satisfies ModelRef,

  // ─── Background tasks ───
  // Lightweight model for non-critical tasks that don't need full reasoning.
  background: {
    provider: "anthropic",
    model: "claude-haiku-4-5-20251001",
  } satisfies ModelRef,

  // ─── Task-specific overrides ───
  // Override the model for specific background tasks.
  // Set to null to use the background model above.
  tasks: {
    plan: null as ModelRef | null,             // Execution plan generation
    suggestions: null as ModelRef | null,       // Follow-up suggestion generation
    skillGeneration: null as ModelRef | null,   // SKILL.md generation from transcripts
    query: null as ModelRef | null,            // /api/query endpoint default
    extract: null as ModelRef | null,          // /api/extract endpoint default
  },
};

// ─── Resolved helpers ───

export function getOrchestratorModel(): ModelRef {
  return config.orchestrator;
}

export function getSubAgentModel(): ModelRef {
  return config.subAgent;
}

export function getBackgroundModel(): ModelRef {
  return config.background;
}

export function getTaskModel(task: keyof typeof config.tasks): ModelRef {
  return config.tasks[task] ?? config.background;
}
