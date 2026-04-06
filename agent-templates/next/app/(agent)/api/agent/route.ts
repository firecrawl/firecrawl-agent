import { createAgentUIStreamResponse } from "ai";
import { createOrchestrator, type OrchestratorOptions } from "@/agent-core";
import { buildFirecrawlToolkit } from "@/agent-core";
import type { AgentConfig } from "@/agent-core";
import { getFirecrawlKey, getProviderApiKeys, hydrateModelConfig } from "@agent/_lib/config/keys";
import { config as globalConfig } from "@agent/_config";

export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages, config } = (await req.json()) as {
    messages: unknown[];
    config: AgentConfig;
  };

  const firecrawlApiKey = getFirecrawlKey();
  if (!firecrawlApiKey) {
    return new Response(
      JSON.stringify({ error: "FIRECRAWL_API_KEY is not configured. Add it in Settings." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const apiKeys = getProviderApiKeys();

  try {
    const opts: OrchestratorOptions = {
      config: {
        ...config,
        model: hydrateModelConfig(config.model),
        subAgentModel: config.subAgentModel ? hydrateModelConfig(config.subAgentModel) : undefined,
        operationModels: config.operationModels
          ? Object.fromEntries(Object.entries(config.operationModels).map(([key, value]) => [key, hydrateModelConfig(value)]))
          : undefined,
      },
      toolkit: buildFirecrawlToolkit(firecrawlApiKey),
      apiKeys,
      maxWorkers: globalConfig.maxWorkers,
      workerMaxSteps: globalConfig.workerMaxSteps,
    };

    const agent = await createOrchestrator(opts);

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
