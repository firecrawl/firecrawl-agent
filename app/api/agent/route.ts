import { createAgentUIStreamResponse } from "ai";
import { createOrchestrator } from "@/lib/agents/orchestrator";
import type { AgentConfig } from "@/lib/types";

export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages, config } = (await req.json()) as {
    messages: unknown[];
    config: AgentConfig;
  };

  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlApiKey) {
    return new Response(
      JSON.stringify({ error: "FIRECRAWL_API_KEY is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const agent = await createOrchestrator(config, firecrawlApiKey);

    return createAgentUIStreamResponse({
      agent,
      uiMessages: messages as Parameters<
        typeof createAgentUIStreamResponse
      >[0]["uiMessages"],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
