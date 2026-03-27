import { ToolLoopAgent, tool, stepCountIs, type ToolSet } from "ai";
import { z } from "zod";
import { FirecrawlTools } from "firecrawl-aisdk";
import type { SubAgentConfig, SkillMetadata } from "../types";
import { resolveModel } from "../config/models";
import { createSkillTools } from "../skills/tools";
import { parseSkillBody } from "../skills/parser";
import fs from "fs/promises";
import path from "path";

const subagentSchema = z.object({
  task: z.string().describe("The task to delegate"),
});

function makeSubagentTool(
  config: SubAgentConfig,
  subAgent: ToolLoopAgent<never, ToolSet, never>,
) {
  return tool({
    description: `Delegate a task to sub-agent "${config.name}": ${config.description}`,
    inputSchema: subagentSchema,
    execute: async ({ task }) => {
      const result = await subAgent.generate({ prompt: task });
      return {
        subAgent: config.name,
        result: result.text,
        steps: result.steps.length,
      };
    },
  });
}

export async function createSubAgentTools(
  configs: SubAgentConfig[],
  firecrawlApiKey: string,
  skills: SkillMetadata[],
): Promise<ToolSet> {
  const subAgentTools: ToolSet = {};

  for (const config of configs) {
    const model = await resolveModel(config.model);

    const fcToolOptions: Record<string, unknown> = { apiKey: firecrawlApiKey };
    if (!config.tools.includes("search")) fcToolOptions.search = false;
    if (!config.tools.includes("scrape")) fcToolOptions.scrape = false;
    if (!config.tools.includes("interact")) fcToolOptions.interact = false;
    const { systemPrompt: _, ...fcTools } = FirecrawlTools(fcToolOptions);

    const skillTools = createSkillTools(skills);

    let preloadedSkills = "";
    for (const skillName of config.skills) {
      const skill = skills.find((s) => s.name === skillName);
      if (skill) {
        const content = await fs.readFile(
          path.join(skill.directory, "SKILL.md"),
          "utf-8",
        );
        preloadedSkills += `\n\n## Skill: ${skill.name}\n${parseSkillBody(content)}`;
      }
    }

    const subAgent = new ToolLoopAgent({
      model,
      instructions: `You are a sub-agent named "${config.name}". ${config.description}

When finished, write a clear summary of what you found.${preloadedSkills}`,
      tools: { ...fcTools, ...skillTools },
      stopWhen: stepCountIs(10),
    });

    subAgentTools[`subagent_${config.id}`] = makeSubagentTool(
      config,
      subAgent as unknown as ToolLoopAgent<never, ToolSet, never>,
    );
  }

  return subAgentTools;
}
