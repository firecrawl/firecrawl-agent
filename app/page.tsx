"use client";

import { useState, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { AgentConfig, ModelConfig } from "@/lib/types";
import AgentInput from "./components/agent-input";
import PlanVisualization from "./components/plan-visualization";
import OutputPanel from "./components/output-panel";
import SymbolColored from "@/components/shared/icons/symbol-colored";

const defaultModel: ModelConfig = {
  provider: "gateway",
  model: "openai/gpt-5.4",
};

const defaultConfig: AgentConfig = {
  prompt: "",
  urls: [],
  schema: undefined,
  model: defaultModel,
  skills: [],
  subAgents: [],
  maxSteps: 20,
};

export default function AgentPage() {
  const [config, setConfig] = useState<AgentConfig>(defaultConfig);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/agent",
        body: { config },
      }),
    [config],
  );

  const { messages, sendMessage, status, stop } = useChat({ transport });

  const isRunning = status === "streaming" || status === "submitted";

  const onRun = () => {
    if (!config.prompt.trim()) return;
    sendMessage({ text: config.prompt });
  };

  return (
    <div className="min-h-screen bg-background-base">
      <header className="border-b border-border-faint px-20 py-12 flex items-center gap-10">
        <SymbolColored width={22} height={32} />
        <h1 className="text-title-h5 text-accent-black">Firecrawl Agent</h1>
        <span className="text-body-small text-black-alpha-32 ml-auto">
          Open Source
        </span>
      </header>

      <div className="flex lg-max:flex-col h-[calc(100vh-57px)]">
        <div className="lg:w-[42%] lg:border-r border-border-faint overflow-y-auto p-20 lg:p-24">
          <AgentInput
            config={config}
            onConfigChange={setConfig}
            onRun={onRun}
            onStop={stop}
            isRunning={isRunning}
          />
        </div>

        <div className="lg:w-[58%] flex flex-col overflow-hidden">
          <PlanVisualization messages={messages} isRunning={isRunning} />
          <OutputPanel messages={messages} />
        </div>
      </div>
    </div>
  );
}
