async function resolveModel(config, apiKeys) {
  const keyFor = (provider) => config.apiKey || apiKeys?.[provider] || void 0;
  switch (config.provider) {
    case "gateway": {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const provider = createOpenAI({
        apiKey: keyFor("gateway"),
        baseURL: "https://ai-gateway.vercel.sh/v1"
      });
      return provider.chat(config.model);
    }
    case "anthropic": {
      const { createAnthropic } = await import("@ai-sdk/anthropic");
      return createAnthropic({ apiKey: keyFor("anthropic") })(config.model);
    }
    case "openai": {
      const { createOpenAI } = await import("@ai-sdk/openai");
      return createOpenAI({ apiKey: keyFor("openai") })(config.model);
    }
    case "custom-openai": {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const baseURL = config.baseURL || apiKeys?.["custom-openai:baseURL"];
      if (!baseURL) {
        throw new Error("CUSTOM_OPENAI_BASE_URL is not configured for the custom-openai provider");
      }
      return createOpenAI({
        apiKey: keyFor("custom-openai"),
        baseURL
      })(config.model);
    }
    case "google": {
      const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
      return createGoogleGenerativeAI({ apiKey: keyFor("google") })(config.model);
    }
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
export {
  resolveModel
};
