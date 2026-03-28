import { ToolLoopAgent, stepCountIs, tool, type ToolSet } from "ai";
import { FirecrawlTools } from "firecrawl-aisdk";
import { z } from "zod";
import type { AgentConfig } from "../types";
import { resolveModel } from "../config/models";
import { createSkillTools } from "../skills/tools";
import { createSubAgentTools } from "./sub-agents";
import { formatOutput } from "./tools";
import { bashExec, initBashWithFiles } from "./bash-tool";
import { discoverSkills } from "../skills/discovery";
import { parseSkillBody } from "../skills/parser";
import fs from "fs/promises";
import path from "path";

const EXPORT_SKILLS: { id: string; name: string; skill: string; description: string }[] = [
  { id: "export_json", name: "JSON Exporter", skill: "export-json", description: "Format collected data as structured JSON" },
  { id: "export_csv", name: "CSV Exporter", skill: "export-csv", description: "Format collected data as a CSV table" },
  { id: "export_report", name: "Report Writer", skill: "export-report", description: "Format collected data as a markdown report" },
  { id: "export_html", name: "HTML Exporter", skill: "export-html", description: "Format collected data as a styled HTML document" },
];

async function createExportSubAgents(
  model: Awaited<ReturnType<typeof resolveModel>>,
  skills: Awaited<ReturnType<typeof discoverSkills>>,
): Promise<ToolSet> {
  const exportTools: ToolSet = {};

  for (const exp of EXPORT_SKILLS) {
    const skill = skills.find((s) => s.name === exp.skill);
    let skillInstructions = "";
    if (skill) {
      const content = await fs.readFile(path.join(skill.directory, "SKILL.md"), "utf-8");
      skillInstructions = `\n\n${parseSkillBody(content)}`;
    }

    const subAgent = new ToolLoopAgent({
      model,
      instructions: `You are a formatting sub-agent: "${exp.name}". ${exp.description}.

You will receive the collected data as your task. Format it according to your skill instructions and call formatOutput.${skillInstructions}`,
      tools: { formatOutput, bashExec },
      stopWhen: stepCountIs(5),
    });

    exportTools[`subagent_${exp.id}`] = tool({
      description: `Delegate formatting to "${exp.name}": ${exp.description}. Pass all collected data as the task.`,
      inputSchema: z.object({
        task: z.string().describe("The collected data and context to format"),
      }),
      execute: async ({ task }) => {
        const result = await subAgent.generate({ prompt: task });
        const stepDetails = result.steps.map((step) => ({
          text: step.text || "",
          toolCalls: step.toolCalls.map((tc) => ({
            toolName: tc.toolName,
            input: (tc as Record<string, unknown>).input ?? (tc as Record<string, unknown>).args ?? {},
          })),
          toolResults: step.toolResults.map((tr) => ({
            toolName: tr.toolName,
            output: (tr as Record<string, unknown>).output ?? (tr as Record<string, unknown>).result ?? {},
          })),
        }));
        return {
          subAgent: exp.name,
          description: exp.description,
          task,
          result: result.text,
          steps: result.steps.length,
          stepDetails,
        };
      },
    });
  }

  return exportTools;
}

export async function createOrchestrator(
  config: AgentConfig,
  firecrawlApiKey: string,
) {
  const model = await resolveModel(config.model);
  const skills = await discoverSkills();

  const { systemPrompt: fcSystemPrompt, ...fcTools } = FirecrawlTools({
    apiKey: firecrawlApiKey,
  });
  const skillTools = createSkillTools(skills);

  const subAgentTools =
    config.subAgents.length > 0
      ? await createSubAgentTools(config.subAgents, firecrawlApiKey, skills)
      : {};

  const exportSubAgents = await createExportSubAgents(model, skills);

  // Skill catalog for system prompt (~100 tokens per skill)
  const skillCatalog = skills.length
    ? `\n\nAvailable skills (use load_skill to activate):\n${skills.map((s) => `- ${s.name}: ${s.description.slice(0, 100)}`).join("\n")}`
    : "";

  const schemaHint = config.schema
    ? `\n\nStructure your output to match this JSON schema:\n${JSON.stringify(config.schema, null, 2)}\nUse formatOutput with format "json" when done.`
    : "";

  const urlHint =
    config.urls && config.urls.length > 0
      ? `\n\nStart with these URLs: ${config.urls.join(", ")}`
      : "";

  // Pre-seed bash filesystem with uploaded CSV
  if (config.csvContext) {
    await initBashWithFiles({ "/data/input.csv": config.csvContext });
  }

  const csvHint = config.csvContext
    ? `\n\nThe user uploaded a CSV file. It's available at /data/input.csv in the bash filesystem. Use bashExec to explore it: 'head -5 /data/input.csv', 'wc -l /data/input.csv', 'awk -F, ...' etc.`
    : "";

  const instructions = `You are a web research agent powered by Firecrawl. You help users scrape, search, and extract structured data from the web.

${fcSystemPrompt ?? ""}

## How you work
You gather context iteratively through conversation. The user will tell you what they need, and you go get it. Keep it conversational — ask short follow-ups if something is ambiguous, but bias toward action.

## Style
- Never use emojis in your responses.
- Be concise and professional. No filler words.
- When presenting data, use clean formatting — no decorative characters.

## Gathering data
- Think step by step. Narrate what you're doing and why — the user sees your text in real-time.
- Use search to discover relevant pages when you don't have specific URLs.
- Use scrape to extract content from pages. For targeted extraction, use the query parameter.
- Use interact for pages that need JavaScript interaction (clicks, forms, pagination).
- Use bashExec for data processing: jq (JSON), awk (CSV/text), sed, grep, sort, uniq, wc, head, tail, cut, tr, paste, cat, echo, printf, bc. Write intermediate results to files so you can build on them.
- IMPORTANT: The bash sandbox does NOT have node, python, curl, wget, or npm. Use only the tools listed above. For JSON processing always use jq. For CSV processing use awk.
- Prefer using scrape with a query parameter for targeted extraction -- this is the most efficient approach. For full page content, use formats: ["markdown"]. Only use formats: ["json"] when the user explicitly asks for structured JSON or provides a schema.
- Store collected data in the bash filesystem (e.g. /data/results.json) as you go so nothing is lost.

## Skills
- When you encounter a domain that matches an available skill, load it immediately with load_skill. Don't wait to be asked.
- Skills give you specialized instructions, templates, and scripts for specific domains (e.g. pricing analysis, SEO audits).
- After loading a skill, follow its instructions and use read_skill_resource to access any scripts or reference files it provides.
- You can load multiple skills in a single session if the task spans domains.${skillCatalog}

## Output
- Do NOT call formatOutput on your own. The user will choose their preferred format (JSON, CSV, Markdown, or HTML) after you finish gathering data.
- When the user asks for a specific export format, delegate to a sub-agent:
  1. Gather all the data you've collected so far into a concise context summary.
  2. Use the appropriate subagent tool (subagent_export_json, subagent_export_csv, subagent_export_report, subagent_export_html) and pass the data context as the task.
  3. The sub-agent will handle formatting and call formatOutput.
- If no sub-agent is available for the format, call formatOutput directly.${schemaHint}${urlHint}${csvHint}`;

  return new ToolLoopAgent({
    model,
    instructions,
    tools: {
      ...fcTools,
      ...skillTools,
      ...subAgentTools,
      ...exportSubAgents,
      formatOutput,
      bashExec,
    },
    stopWhen: stepCountIs(config.maxSteps ?? 20),
    experimental_repairToolCall: async ({ toolCall, inputSchema }) => {
      // When the model sends extra fields that fail schema validation,
      // get the tool's schema and strip unknown properties from the JSON input
      try {
        const schema = await inputSchema({ toolName: toolCall.toolName });
        const allowedKeys = Object.keys(
          (schema as { properties?: Record<string, unknown> }).properties ?? {},
        );
        const parsed = JSON.parse(toolCall.input);
        const cleaned: Record<string, unknown> = {};
        for (const key of allowedKeys) {
          if (key in parsed) cleaned[key] = parsed[key];
        }
        return { ...toolCall, input: JSON.stringify(cleaned) };
      } catch {
        return toolCall;
      }
    },
  });
}
