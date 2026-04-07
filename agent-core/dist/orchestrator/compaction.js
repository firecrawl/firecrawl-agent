import { generateText } from "ai";
const MODEL_TOKEN_LIMITS = {
  "claude-sonnet-4-6": 2e5,
  "claude-sonnet-4-5": 2e5,
  "claude-haiku-4-5": 2e5,
  "claude-haiku-4-5-20251001": 2e5,
  "claude-opus-4-6": 2e5,
  "gemini-3-flash-preview": 1e6,
  "gemini-2.5-flash": 1e6,
  "gemini-2.5-pro-preview-05-06": 1e6,
  "gpt-5.4": 128e3,
  "gpt-4.1": 128e3,
  "o4-mini": 128e3
};
const COMPACTION_THRESHOLD = 0.75;
const NO_TOOLS_PREAMBLE = `CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.
You already have all the context you need in the conversation above.
Your entire response must be plain text: an <analysis> block followed by a <summary> block.

`;
const NO_TOOLS_TRAILER = `

REMINDER: Do NOT call any tools. Respond with plain text only -- an <analysis> block followed by a <summary> block.`;
const COMPACTION_PROMPT = `${NO_TOOLS_PREAMBLE}You are a conversation compactor for a web research and data extraction agent. Create a detailed summary that allows the agent to continue its work without re-doing any steps.

Before writing your summary, wrap your analysis in <analysis> tags to organize your thoughts. In your analysis:
1. Walk through the conversation chronologically, identifying every URL scraped, every data point found, every error hit.
2. Check which schema fields (if any) have been populated vs are still missing.
3. Note the exact state of progress -- what was the agent doing right before this compaction?

Your summary (inside <summary> tags) MUST include these sections:

1. Original Task
   The user's request, verbatim or near-verbatim. Include the schema/fields requested if applicable.

2. URLs Scraped and Findings
   For each URL accessed, list: the URL, what was found, and whether it succeeded or failed.
   - [URL] \u2192 [key data extracted or error]

3. Data Collected
   Structured data gathered so far. Include actual values, not just "we found pricing info."

4. Schema Progress (if a schema was provided)
   - Fields populated: [list with values]
   - Fields still missing: [list]

5. Workers/Agents Spawned
   For each: what it was asked to do, what it returned.

6. Errors and Resolutions
   What failed and how it was handled. Include specific error messages.

7. Current Work
   Precisely what was happening right before compaction. Include the last URL being processed, the last tool call made, and where in the workflow the agent was.

8. Next Step
   The single next action the agent should take to continue. Be specific: "scrape page 3 of https://example.com/products?page=3" not "continue scraping."${NO_TOOLS_TRAILER}`;
function messagesToText(messages) {
  return messages.map((msg, idx) => {
    const content = typeof msg.content === "string" ? msg.content : Array.isArray(msg.content) ? msg.content.map((block) => {
      if (block.type === "text") return block.text;
      if (block.type === "tool-call")
        return `[Tool: ${block.toolName}(${JSON.stringify(block.input).slice(0, 500)})]`;
      if (block.type === "tool-result")
        return `[Result: ${JSON.stringify(block.output).slice(0, 1e3)}]`;
      return JSON.stringify(block).slice(0, 500);
    }).join("\n") : JSON.stringify(msg.content).slice(0, 2e3);
    return `[${msg.role.toUpperCase()} ${idx}]: ${content}`;
  }).join("\n\n");
}
function createCompactionState() {
  return { hasCompacted: false, lastInputTokens: 0 };
}
function getTokenLimit(modelName) {
  return MODEL_TOKEN_LIMITS[modelName] ?? 2e5;
}
function needsCompaction(state, modelName) {
  if (state.hasCompacted) return false;
  const limit = getTokenLimit(modelName);
  return state.lastInputTokens >= limit * COMPACTION_THRESHOLD;
}
function formatCompactSummary(raw) {
  let result = raw;
  result = result.replace(/<analysis>[\s\S]*?<\/analysis>/, "");
  const match = result.match(/<summary>([\s\S]*?)<\/summary>/);
  if (match) {
    result = match[1]?.trim() ?? result;
  }
  result = result.replace(/\n\n\n+/g, "\n\n");
  return `CONTEXT FROM PREVIOUS CONVERSATION:

${result.trim()}`;
}
async function compactMessages(messages, compactionModel) {
  if (messages.length <= 2) return messages;
  const systemPrompt = messages[0];
  const conversationMessages = messages.slice(1);
  const conversationText = messagesToText(conversationMessages);
  const response = await generateText({
    model: compactionModel,
    messages: [
      { role: "user", content: `${COMPACTION_PROMPT}

CONVERSATION TO SUMMARIZE:
${conversationText}` }
    ],
    maxOutputTokens: 16e3
  });
  const formattedSummary = formatCompactSummary(response.text);
  return [
    systemPrompt,
    { role: "user", content: formattedSummary }
  ];
}
function createPrepareStepWithCompaction(orchestratorModelName, compactionModel) {
  const state = createCompactionState();
  return {
    state,
    prepareStep: async ({ steps, messages }) => {
      const lastStep = steps[steps.length - 1];
      if (lastStep?.usage?.inputTokens) {
        state.lastInputTokens = lastStep.usage.inputTokens;
      }
      if (!needsCompaction(state, orchestratorModelName)) {
        return { messages };
      }
      try {
        const compacted = await compactMessages(messages, compactionModel);
        state.hasCompacted = true;
        state.lastInputTokens = 0;
        return { messages: compacted };
      } catch {
        return { messages };
      }
    }
  };
}
export {
  compactMessages,
  createCompactionState,
  createPrepareStepWithCompaction
};
