import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { getKey } from "@/lib/config/keys";

export async function POST(req: Request) {
  const { prompt, summary } = (await req.json()) as {
    prompt: string;
    summary: string;
  };

  const apiKey = getKey("anthropic");
  if (!apiKey) {
    return Response.json({ suggestions: [] });
  }

  try {
    const anthropic = createAnthropic({ apiKey });
    const model = anthropic("claude-haiku-4-5-20251001");

    const { text } = await generateText({
      model,
      system: `You generate 3 short contextual follow-up questions based on a user's research task and what the agent found. Each question should help the user dig deeper, compare, or export differently. Return exactly 3 questions, one per line, no numbering, no quotes, no extra text. Keep each under 60 characters.`,
      prompt: `Original task: ${prompt}\n\nWhat the agent found so far:\n${summary}`,
      maxOutputTokens: 200,
    });

    const suggestions = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.length < 80)
      .slice(0, 3);

    return Response.json({ suggestions });
  } catch {
    return Response.json({ suggestions: [] });
  }
}
