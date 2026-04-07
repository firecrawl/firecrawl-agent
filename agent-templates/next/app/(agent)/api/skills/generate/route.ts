import { streamText } from "ai";
import fs from "fs/promises";
import path from "path";
import { getTaskModel, getExperimentalFeatures } from "@agent/_config";
import { resolveModel, getDefaultSkillsDir } from "@/agent-core";
import { getProviderApiKeys, hydrateModelConfig } from "@agent/_lib/config/keys";

export async function POST(req: Request) {
  if (!getExperimentalFeatures().generateSkillMd) {
    return Response.json({ error: "SKILL.md generation is disabled in app/(agent)/_config.ts" }, { status: 404 });
  }

  let body: { name: string; messages: unknown[]; prompt: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, messages, prompt } = body;

  const slug = (name ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) {
    return Response.json({ error: "Invalid skill name" }, { status: 400 });
  }

  const transcript = (messages as { role?: string; text?: string; toolName?: string; input?: unknown; output?: unknown }[])
    .map((m) => {
      if (m.role === "user" && m.text) return `USER: ${m.text}`;
      if (m.role === "assistant" && m.text) return `AGENT: ${m.text}`;
      if (m.toolName) {
        const inputStr = m.input ? JSON.stringify(m.input).slice(0, 300) : "";
        const outputStr = m.output ? JSON.stringify(m.output).slice(0, 300) : "";
        return `TOOL [${m.toolName}]: input=${inputStr} output=${outputStr}`;
      }
      return null;
    })
    .filter(Boolean)
    .join("\n");

  try {
    const model = await resolveModel(hydrateModelConfig(getTaskModel("skillGeneration")), getProviderApiKeys());

    const result = streamText({
      model,
      system: `You generate SKILL.md files that capture procedural web knowledge — the exact steps that WORKED to accomplish a task. Skills are reusable instructions that an agent can follow to repeat the same process.

Given a session transcript, analyze what the agent did that SUCCEEDED and distill it into a repeatable procedure. Focus on:
- The exact sequence of actions that produced results
- Which sites/pages had the data and how it was accessed
- What interactions were needed (clicks, pagination, expanding sections)
- What worked vs what failed (skip the failures, document the winning path)
- How to verify completeness

Produce a SKILL.md with this format:

---
name: skill-name
description: One-line description of what this skill does
---

# Skill Title

## What This Skill Does
One paragraph explaining the procedure this skill captures.

## Where to Find the Data
- Which sites/pages contain the relevant information
- URL patterns or search strategies that worked
- What sections of a page to target

## Procedure
1. First step...
2. Second step...
(Imperative mood. Describe exactly what to do, based on what worked in the session.)

## Data to Extract
What fields/data points to collect and their expected format.

## Gotchas
- Pages that need interaction vs static scraping
- Rate limits or anti-bot measures observed
- Fallback approaches when the primary method fails

## Verification
How to validate that the extracted data is correct and complete.

## Example Prompts
- "example prompt 1"
- "example prompt 2"

Output ONLY the SKILL.md content. No extra commentary.`,
      prompt: `Original task: ${prompt}\n\nSkill name: ${name}\n\nSession transcript:\n${transcript.slice(0, 8000)}`,
      maxOutputTokens: 2000,
    });

    const encoder = new TextEncoder();
    let fullContent = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            fullContent += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "delta", text: chunk })}\n\n`));
          }

          // Save to disk
          const skillDir = path.join(getDefaultSkillsDir(), slug);
          await fs.mkdir(skillDir, { recursive: true });
          await fs.writeFile(path.join(skillDir, "SKILL.md"), fullContent, "utf-8");

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: "done",
            name: slug,
            path: `skills/definitions/${slug}/SKILL.md`,
            content: fullContent,
          })}\n\n`));
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: "error",
            error: err instanceof Error ? err.message : String(err),
          })}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Skills generate error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
