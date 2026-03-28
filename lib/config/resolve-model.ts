import type { ModelConfig } from "../types";
import { getProviderKey } from "./keys";

export async function resolveModel(config: ModelConfig) {
  switch (config.provider) {
    case "gateway": {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const provider = createOpenAI({
        apiKey: config.apiKey || getProviderKey("gateway"),
        baseURL: "https://ai-gateway.vercel.sh/v1",
      });
      return provider.chat(config.model);
    }
    case "anthropic": {
      const { createAnthropic } = await import("@ai-sdk/anthropic");
      return createAnthropic({
        apiKey: config.apiKey || getProviderKey("anthropic"),
      })(config.model);
    }
    case "openai": {
      const { createOpenAI } = await import("@ai-sdk/openai");
      return createOpenAI({
        apiKey: config.apiKey || getProviderKey("openai"),
      })(config.model);
    }
    case "google": {
      const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
      return createGoogleGenerativeAI({
        apiKey: config.apiKey || getProviderKey("google"),
      })(config.model);
    }
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
