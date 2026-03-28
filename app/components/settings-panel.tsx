"use client";

import { useState, useEffect, useRef } from "react";
import type { AgentConfig, ModelConfig } from "@/lib/types";
import { AVAILABLE_MODELS, PROVIDER_META, type Provider } from "@/lib/config/models";
import ProviderModelIcon from "./provider-icon";
import { cn } from "@/utils/cn";

function GearIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"
        stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const OPERATIONS = [
  { id: "search", label: "Search" },
  { id: "scrape", label: "Scrape" },
  { id: "interact", label: "Interact" },
  { id: "plan", label: "Plan" },
  { id: "export", label: "Export" },
];

function ModelSelect({ value, onChange, label }: {
  value: ModelConfig;
  onChange: (m: ModelConfig) => void;
  label: string;
}) {
  const providerKeys = Object.keys(PROVIDER_META).filter(k => k !== "acp") as Provider[];
  return (
    <div>
      <div className="text-label-small text-black-alpha-48 mb-6">{label}</div>
      <div className="flex gap-4">
        <select
          className="flex-1 bg-background-base border border-black-alpha-8 rounded-8 px-8 py-6 text-body-small appearance-none cursor-pointer focus:border-heat-100 focus:outline-none"
          value={value.provider}
          onChange={(e) => {
            const provider = e.target.value as ModelConfig["provider"];
            const models = AVAILABLE_MODELS[provider] ?? [];
            onChange({ ...value, provider, model: models[0]?.id ?? "" });
          }}
        >
          {providerKeys.map((p) => (
            <option key={p} value={p}>{PROVIDER_META[p].name}</option>
          ))}
        </select>
        <select
          className="flex-1 bg-background-base border border-black-alpha-8 rounded-8 px-8 py-6 text-body-small appearance-none cursor-pointer focus:border-heat-100 focus:outline-none"
          value={value.model}
          onChange={(e) => onChange({ ...value, model: e.target.value })}
        >
          {(AVAILABLE_MODELS[value.provider] ?? []).map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function SettingsPanel({
  config,
  onChange,
}: {
  config: AgentConfig;
  onChange: (config: AgentConfig) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const currentModel = AVAILABLE_MODELS[config.model.provider]?.find(m => m.id === config.model.model);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="p-8 rounded-8 text-black-alpha-40 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
        onClick={() => setOpen(!open)}
      >
        <GearIcon />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-6 w-400 bg-accent-white rounded-16 border border-border-muted overflow-hidden z-50"
          style={{ boxShadow: "0px 16px 48px -8px rgba(0,0,0,0.1), 0px 4px 16px -2px rgba(0,0,0,0.05)" }}
        >
          <div className="px-16 py-12 border-b border-border-faint">
            <div className="text-label-large text-accent-black">Settings</div>
          </div>

          <div className="p-16 flex flex-col gap-16">
            {/* Orchestrator model */}
            <ModelSelect
              label="Orchestrator model"
              value={config.model}
              onChange={(model) => onChange({ ...config, model })}
            />

            {/* Sub-agent model */}
            <div>
              <div className="flex items-center gap-6 mb-6">
                <span className="text-label-small text-black-alpha-48">Sub-agent model</span>
                <span className="text-mono-x-small text-black-alpha-24">
                  {config.subAgentModel ? "" : "(same as orchestrator)"}
                </span>
              </div>
              <div className="flex gap-4">
                <select
                  className="flex-1 bg-background-base border border-black-alpha-8 rounded-8 px-8 py-6 text-body-small appearance-none cursor-pointer focus:border-heat-100 focus:outline-none"
                  value={config.subAgentModel?.provider ?? ""}
                  onChange={(e) => {
                    if (!e.target.value) {
                      onChange({ ...config, subAgentModel: undefined });
                      return;
                    }
                    const provider = e.target.value as ModelConfig["provider"];
                    const models = AVAILABLE_MODELS[provider] ?? [];
                    onChange({
                      ...config,
                      subAgentModel: {
                        provider,
                        model: config.subAgentModel?.model ?? models[0]?.id ?? "",
                      },
                    });
                  }}
                >
                  <option value="">Same as orchestrator</option>
                  {(Object.keys(PROVIDER_META).filter(k => k !== "acp") as Provider[]).map((p) => (
                    <option key={p} value={p}>{PROVIDER_META[p].name}</option>
                  ))}
                </select>
                {config.subAgentModel && (
                  <select
                    className="flex-1 bg-background-base border border-black-alpha-8 rounded-8 px-8 py-6 text-body-small appearance-none cursor-pointer focus:border-heat-100 focus:outline-none"
                    value={config.subAgentModel.model}
                    onChange={(e) =>
                      onChange({ ...config, subAgentModel: { ...config.subAgentModel!, model: e.target.value } })
                    }
                  >
                    {(AVAILABLE_MODELS[config.subAgentModel.provider] ?? []).map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* API Key */}
            <div>
              <div className="text-label-small text-black-alpha-48 mb-6">API Key</div>
              <input
                type="password"
                className="w-full bg-background-base border border-black-alpha-8 rounded-8 px-10 py-6 text-body-small placeholder:text-black-alpha-24 focus:border-heat-100 focus:outline-none"
                placeholder="Uses server default if empty"
                value={config.model.apiKey ?? ""}
                onChange={(e) =>
                  onChange({ ...config, model: { ...config.model, apiKey: e.target.value || undefined } })
                }
              />
            </div>

            {/* Max steps */}
            <div>
              <div className="text-label-small text-black-alpha-48 mb-6">Max steps</div>
              <input
                type="number"
                min={1}
                max={50}
                className="w-80 bg-background-base border border-black-alpha-8 rounded-8 px-10 py-6 text-body-small focus:border-heat-100 focus:outline-none"
                value={config.maxSteps ?? 20}
                onChange={(e) => onChange({ ...config, maxSteps: parseInt(e.target.value) || 20 })}
              />
            </div>

            {/* Advanced: per-operation models */}
            <div>
              <button
                type="button"
                className="flex items-center gap-6 text-label-small text-black-alpha-40 hover:text-accent-black transition-colors"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <svg fill="none" height="10" viewBox="0 0 24 24" width="10" className={cn("transition-transform", showAdvanced && "rotate-90")} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
                Per-operation model overrides
              </button>

              {showAdvanced && (
                <div className="mt-10 flex flex-col gap-10 pl-16 border-l-2 border-border-faint">
                  {OPERATIONS.map((op) => {
                    const override = config.operationModels?.[op.id];
                    return (
                      <div key={op.id}>
                        <div className="flex items-center gap-6 mb-4">
                          <span className="text-label-small text-black-alpha-48">{op.label}</span>
                          {!override && <span className="text-mono-x-small text-black-alpha-20">(default)</span>}
                        </div>
                        <div className="flex gap-4">
                          <select
                            className="flex-1 bg-background-base border border-black-alpha-8 rounded-6 px-6 py-4 text-mono-x-small appearance-none cursor-pointer focus:border-heat-100 focus:outline-none"
                            value={override?.provider ?? ""}
                            onChange={(e) => {
                              const opModels = { ...(config.operationModels ?? {}) };
                              if (!e.target.value) {
                                delete opModels[op.id];
                              } else {
                                const provider = e.target.value as ModelConfig["provider"];
                                const models = AVAILABLE_MODELS[provider] ?? [];
                                opModels[op.id] = { provider, model: models[0]?.id ?? "" };
                              }
                              onChange({ ...config, operationModels: Object.keys(opModels).length ? opModels : undefined });
                            }}
                          >
                            <option value="">Default</option>
                            {(Object.keys(PROVIDER_META).filter(k => k !== "acp") as Provider[]).map((p) => (
                              <option key={p} value={p}>{PROVIDER_META[p].name}</option>
                            ))}
                          </select>
                          {override && (
                            <select
                              className="flex-1 bg-background-base border border-black-alpha-8 rounded-6 px-6 py-4 text-mono-x-small appearance-none cursor-pointer focus:border-heat-100 focus:outline-none"
                              value={override.model}
                              onChange={(e) => {
                                const opModels = { ...(config.operationModels ?? {}) };
                                opModels[op.id] = { ...override, model: e.target.value };
                                onChange({ ...config, operationModels: opModels });
                              }}
                            >
                              {(AVAILABLE_MODELS[override.provider] ?? []).map((m) => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Summary footer */}
          <div className="px-16 py-10 border-t border-border-faint bg-background-base">
            <div className="flex items-center gap-6 text-body-small text-black-alpha-40">
              <ProviderModelIcon icon={currentModel?.icon ?? "openai"} size={14} />
              <span>{currentModel?.name ?? config.model.model}</span>
              <span className="text-black-alpha-16">·</span>
              <span>{config.maxSteps ?? 20} steps</span>
              {config.subAgentModel && (
                <>
                  <span className="text-black-alpha-16">·</span>
                  <span>Sub: {AVAILABLE_MODELS[config.subAgentModel.provider]?.find(m => m.id === config.subAgentModel!.model)?.name ?? config.subAgentModel.model}</span>
                </>
              )}
              {config.model.apiKey && (
                <>
                  <span className="text-black-alpha-16">·</span>
                  <span className="text-accent-forest">Custom key</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
