import { ToolLoopAgent, tool, stepCountIs } from "ai";
import { z } from "zod";
import { resolveModel } from "../resolve-model";
import { createSkillTools } from "../skills/tools";
import { parseSkillBody } from "../skills/parser";
import { formatOutput, bashExec } from "../tools";
import { createWorkerTool } from "../worker";
import fs from "fs/promises";
import path from "path";
const subagentSchema = z.object({
  task: z.string().describe("The task to delegate")
});
const BUILTIN_SUBAGENTS = [
  {
    id: "create_json",
    name: "JSON Creator",
    skill: "export-json",
    description: "Format collected data as structured JSON and save to /data/",
    maxSteps: 5
  },
  {
    id: "create_csv",
    name: "CSV Creator",
    skill: "export-csv",
    description: "Format collected data as a CSV table and save to /data/",
    maxSteps: 5
  },
  {
    id: "create_markdown",
    name: "Markdown Creator",
    skill: "export-report",
    description: "Format collected data as clean markdown and save to /data/",
    maxSteps: 5
  }
];
function makeSubagentTool(id, name, description, subAgent) {
  return tool({
    description: `Delegate a task to sub-agent "${name}": ${description}`,
    inputSchema: subagentSchema,
    execute: async ({ task }, { abortSignal }) => {
      const result = await subAgent.generate({ prompt: task, abortSignal });
      const stepDetails = result.steps.map((step) => ({
        text: step.text || "",
        toolCalls: step.toolCalls.map((tc) => {
          const c = tc;
          return { toolName: tc.toolName, input: c.input ?? c.args ?? {} };
        }),
        toolResults: step.toolResults.map((tr) => {
          const r = tr;
          return { toolName: tr.toolName, output: r.output ?? r.result ?? {} };
        })
      }));
      return {
        subAgent: name,
        description,
        task,
        result: result.text,
        steps: result.steps.length,
        stepDetails
      };
    }
  });
}
function buildSkillCatalog(skills) {
  if (!skills.length) return "";
  return `

Available skills (use load_skill to activate):
${skills.map((s) => `- ${s.name}: ${s.description.slice(0, 100)}`).join("\n")}`;
}
async function loadSkillContent(skillName, skills) {
  const skill = skills.find((s) => s.name === skillName);
  if (!skill) return "";
  const content = await fs.readFile(
    path.join(skill.directory, "SKILL.md"),
    "utf-8"
  );
  return `

## Skill: ${skill.name}
${parseSkillBody(content)}`;
}
function buildFullToolset(model, toolkit, skills, enabledTools, customInstructions, workerOptions) {
  const baseTools = enabledTools && toolkit.createFiltered ? toolkit.createFiltered(enabledTools) : toolkit.tools;
  const skillTools = createSkillTools(skills, customInstructions);
  const spawnAgents = createWorkerTool(model, toolkit, skills, workerOptions);
  return { ...baseTools, ...skillTools, spawnAgents, formatOutput, bashExec };
}
async function createSubAgentTools(configs, toolkit, skills, parentModel, customInstructions, apiKeys, workerOptions) {
  const subAgentTools = {};
  const skillCatalog = buildSkillCatalog(skills);
  for (const config of configs) {
    const model = await resolveModel(config.model, apiKeys);
    const tools = buildFullToolset(
      model,
      toolkit,
      skills,
      config.tools,
      customInstructions,
      workerOptions
    );
    let preloadedSkills = "";
    for (const skillName of config.skills) {
      preloadedSkills += await loadSkillContent(skillName, skills);
    }
    const customInstr = config.instructions ? `

Additional instructions:
${config.instructions}` : "";
    const subAgent = new ToolLoopAgent({
      model,
      instructions: `You are a sub-agent named "${config.name}". ${config.description}

You have the full toolkit: search, scrape, interact, bash, formatOutput, and skills.${skillCatalog}

If the task splits into 2+ independent collection tasks, use spawnAgents to parallelize them.

When finished, write a clear summary of what you found.${preloadedSkills}${customInstr}`,
      tools,
      stopWhen: stepCountIs(config.maxSteps ?? 10)
    });
    subAgentTools[`subagent_${config.id}`] = makeSubagentTool(
      config.id,
      config.name,
      config.description,
      subAgent
    );
  }
  const builtinModel = parentModel;
  if (!builtinModel) return subAgentTools;
  const builtinTools = buildFullToolset(
    builtinModel,
    toolkit,
    skills,
    void 0,
    customInstructions,
    workerOptions
  );
  for (const builtin of BUILTIN_SUBAGENTS) {
    const preloadedSkill = await loadSkillContent(builtin.skill, skills);
    const subAgent = new ToolLoopAgent({
      model: builtinModel,
      instructions: `You are a sub-agent: "${builtin.name}". ${builtin.description}.

You have the full toolkit: search, scrape, interact, bash, formatOutput, skills, and spawnAgents. Use whatever tools you need to complete the task.${skillCatalog}${preloadedSkill}`,
      tools: builtinTools,
      stopWhen: stepCountIs(builtin.maxSteps)
    });
    subAgentTools[`subagent_${builtin.id}`] = makeSubagentTool(
      builtin.id,
      builtin.name,
      builtin.description,
      subAgent
    );
  }
  return subAgentTools;
}
export {
  createSubAgentTools
};
