import { ToolLoopAgent, tool, stepCountIs } from "ai";
import { z } from "zod";
import { bashExec, formatOutput } from "../tools";
import { createSkillTools } from "../skills/tools";
import { loadWorkerPrompt } from "./loader";
const g = globalThis;
if (!g.__workerProgress) g.__workerProgress = /* @__PURE__ */ new Map();
const workerProgress = g.__workerProgress;
const WORKER_TIMEOUT_MS = 12e4;
function createWorkerTool(model, toolkit, skills, options = {}) {
  const { maxWorkers = 6, workerMaxSteps = 10 } = options;
  const skillTools = createSkillTools(skills);
  const workerTools = { ...toolkit.tools, ...skillTools, formatOutput, bashExec };
  return tool({
    description: `Spawn parallel worker agents to handle independent tasks concurrently. Each worker gets its own isolated context and full toolkit (search, scrape, interact, bash). Workers return only a concise summary \u2014 the orchestrator context stays clean. Use this when you have 2+ independent data collection tasks.`,
    inputSchema: z.object({
      tasks: z.array(
        z.object({
          id: z.string().describe("Short identifier (e.g. 'vercel', 'nvidia')"),
          prompt: z.string().describe("The task to complete. Be specific.")
        })
      ).describe("Array of independent tasks to run in parallel")
    }),
    execute: async ({ tasks }, { abortSignal }) => {
      const limited = tasks.slice(0, maxWorkers);
      for (const task of limited) {
        workerProgress.set(task.id, {
          id: task.id,
          status: "running",
          steps: 0,
          tokens: 0,
          inputTokens: 0,
          outputTokens: 0,
          stepLog: []
        });
      }
      const results = await Promise.all(
        limited.map(async (task) => {
          const workerAbort = new AbortController();
          const timer = setTimeout(() => workerAbort.abort(), WORKER_TIMEOUT_MS);
          if (abortSignal) {
            abortSignal.addEventListener("abort", () => workerAbort.abort(), { once: true });
          }
          try {
            const workerInstructions = await loadWorkerPrompt({
              TASK_ID: task.id
            });
            const worker = new ToolLoopAgent({
              model,
              instructions: workerInstructions,
              tools: workerTools,
              stopWhen: stepCountIs(workerMaxSteps)
            });
            const result = await worker.generate({
              prompt: task.prompt,
              abortSignal: workerAbort.signal,
              onStepFinish: ({ toolCalls, toolResults, usage }) => {
                const prev = workerProgress.get(task.id);
                const prevLog = prev?.stepLog ?? [];
                let liveViewUrl = prev?.liveViewUrl;
                for (const tr of toolResults ?? []) {
                  if (!tr) continue;
                  const r = tr;
                  if (r.toolName === "interact") {
                    const out = r.output ?? r.result ?? {};
                    const url = out.liveViewUrl ?? out.interactiveLiveViewUrl;
                    if (typeof url === "string" && url) liveViewUrl = url;
                  }
                }
                const newSteps = (toolCalls ?? []).map((call) => {
                  const c = call ?? {};
                  const args = c.args ?? c.input ?? {};
                  const name = c.toolName ?? "thinking";
                  let detail = "";
                  if (name === "search") detail = `Searched: "${args.query ?? ""}"`;
                  else if (name === "scrape") detail = `${args.url ?? ""}`;
                  else if (name === "interact") {
                    const prompt = String(args.prompt ?? args.instruction ?? args.code ?? "").slice(0, 100);
                    detail = prompt ? `${args.url ?? ""} \u2014 ${prompt}` : `${args.url ?? ""}`;
                  } else if (name === "bashExec" || name === "bash_exec")
                    detail = String(args.command ?? "").slice(0, 80);
                  else if (name === "load_skill")
                    detail = String(args.name ?? args.skill ?? "");
                  else detail = JSON.stringify(args).slice(0, 80);
                  return { tool: name, detail, input: args };
                });
                if (newSteps.length === 0)
                  newSteps.push({ tool: "thinking", detail: "", input: {} });
                const lastTool = toolCalls?.[toolCalls.length - 1];
                const toolName = lastTool?.toolName ?? "thinking";
                const tc = lastTool;
                const toolInput = tc?.args ? JSON.stringify(tc.args).slice(0, 80) : "";
                workerProgress.set(task.id, {
                  id: task.id,
                  status: "running",
                  steps: (prev?.steps ?? 0) + 1,
                  currentTool: toolName,
                  currentInput: toolInput || void 0,
                  tokens: (prev?.tokens ?? 0) + (usage?.totalTokens ?? 0),
                  inputTokens: (prev?.inputTokens ?? 0) + (usage?.inputTokens ?? 0),
                  outputTokens: (prev?.outputTokens ?? 0) + (usage?.outputTokens ?? 0),
                  liveViewUrl,
                  stepLog: [...prevLog, ...newSteps]
                });
              }
            });
            clearTimeout(timer);
            const tokens = workerProgress.get(task.id)?.tokens ?? 0;
            const donePrev = workerProgress.get(task.id);
            workerProgress.set(task.id, {
              id: task.id,
              status: "done",
              steps: result.steps.length,
              tokens,
              inputTokens: donePrev?.inputTokens ?? 0,
              outputTokens: donePrev?.outputTokens ?? 0,
              stepLog: donePrev?.stepLog ?? []
            });
            return {
              id: task.id,
              status: "done",
              result: result.text,
              steps: result.steps.length,
              tokens,
              stepDetails: result.steps.map((s) => ({
                toolCalls: s.toolCalls.map((tc) => {
                  const c = tc;
                  return {
                    name: tc?.toolName ?? "unknown",
                    input: JSON.stringify(c?.args ?? c?.input ?? {}).slice(0, 100)
                  };
                }),
                text: s.text?.slice(0, 200) ?? ""
              }))
            };
          } catch (err) {
            clearTimeout(timer);
            const isTimeout = err instanceof Error && err.name === "AbortError";
            const message = isTimeout ? `Worker "${task.id}" timed out after ${WORKER_TIMEOUT_MS / 1e3}s` : err instanceof Error ? err.message : "Unknown error";
            workerProgress.set(task.id, {
              id: task.id,
              status: "error",
              steps: 0,
              tokens: 0,
              inputTokens: 0,
              outputTokens: 0,
              stepLog: []
            });
            return {
              id: task.id,
              status: "error",
              result: message,
              steps: 0,
              tokens: 0,
              stepDetails: []
            };
          }
        })
      );
      return {
        completed: results.filter((r) => r.status === "done").length,
        failed: results.filter((r) => r.status === "error").length,
        total: results.length,
        results
      };
    }
  });
}
export {
  createWorkerTool,
  workerProgress
};
