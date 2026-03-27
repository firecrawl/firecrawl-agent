"use client";

import type { UIMessage } from "ai";
import { cn } from "@/utils/cn";

function extractDomain(input: unknown): string | null {
  if (!input || typeof input !== "object") return null;
  const obj = input as Record<string, unknown>;
  const url = (obj.url ?? obj.query ?? "") as string;
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.hostname;
  } catch {
    return null;
  }
}

function Favicon({ domain, size = 16 }: { domain: string; size?: number }) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
      width={size}
      height={size}
      alt=""
      className="rounded-2 flex-shrink-0"
    />
  );
}

const TOOL_STYLES: Record<
  string,
  { label: string; color: string; verb: string }
> = {
  search: {
    label: "Search",
    color: "text-accent-bluetron",
    verb: "Searching",
  },
  scrape: {
    label: "Scrape",
    color: "text-accent-forest",
    verb: "Scraping",
  },
  interact: {
    label: "Interact",
    color: "text-accent-amethyst",
    verb: "Interacting",
  },
  map: {
    label: "Map",
    color: "text-accent-honey",
    verb: "Mapping",
  },
  load_skill: {
    label: "Skill",
    color: "text-accent-honey",
    verb: "Loading skill",
  },
  read_skill_resource: {
    label: "Resource",
    color: "text-accent-honey",
    verb: "Reading",
  },
  formatOutput: {
    label: "Output",
    color: "text-heat-100",
    verb: "Formatting",
  },
};

function getToolStyle(name: string) {
  if (name.startsWith("subagent_"))
    return {
      label: "Sub-agent",
      color: "text-accent-amethyst",
      verb: "Delegating",
    };
  return (
    TOOL_STYLES[name] ?? {
      label: name,
      color: "text-black-alpha-56",
      verb: "Running",
    }
  );
}

function summarizeInput(toolName: string, input: unknown): string {
  if (!input || typeof input !== "object") return "";
  const obj = input as Record<string, unknown>;

  if (toolName === "search" && obj.query) return String(obj.query);
  if (toolName === "scrape" && obj.url) return String(obj.url);
  if (toolName === "interact" && obj.url) return String(obj.url);
  if (toolName === "map" && obj.url) return String(obj.url);
  if (toolName === "load_skill" && obj.name) return String(obj.name);
  if (toolName === "formatOutput" && obj.format)
    return `as ${obj.format}`;
  if (obj.task) return String(obj.task).slice(0, 100);

  return "";
}

interface ToolCallInfo {
  id: string;
  name: string;
  input: unknown;
  result?: unknown;
  status: "running" | "complete";
}

function isToolPart(part: { type: string }): part is {
  type: string;
  toolCallId: string;
  state: string;
  toolName?: string;
  input?: unknown;
  output?: unknown;
  args?: unknown;
} {
  return part.type.startsWith("tool-") || part.type === "dynamic-tool";
}

function extractToolCalls(messages: UIMessage[]): ToolCallInfo[] {
  const calls: ToolCallInfo[] = [];

  for (const msg of messages) {
    if (msg.role !== "assistant") continue;
    for (const part of msg.parts) {
      if (!isToolPart(part)) continue;

      const toolCallId =
        (part as { toolCallId?: string }).toolCallId ?? "";
      const state = (part as { state?: string }).state ?? "";
      const toolName =
        (part as { toolName?: string }).toolName ??
        part.type.replace("tool-", "");
      const input =
        (part as { input?: unknown }).input ??
        (part as { args?: unknown }).args;
      const output = (part as { output?: unknown }).output;

      const existing = calls.find((c) => c.id === toolCallId);
      if (existing) {
        if (state === "result") {
          existing.result = output;
          existing.status = "complete";
        }
      } else {
        calls.push({
          id: toolCallId,
          name: toolName,
          input,
          result: state === "result" ? output : undefined,
          status: state === "result" ? "complete" : "running",
        });
      }
    }
  }

  return calls;
}

export default function PlanVisualization({
  messages,
  isRunning,
}: {
  messages: UIMessage[];
  isRunning: boolean;
}) {
  const toolCalls = extractToolCalls(messages);

  if (toolCalls.length === 0 && !isRunning) {
    return (
      <div className="flex-1 flex items-center justify-center p-24">
        <div className="text-center">
          <div className="text-body-large text-black-alpha-24">
            Agent activity will appear here
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-16 overflow-y-auto">
      <div className="flex flex-col gap-2">
        {toolCalls.map((call) => {
          const style = getToolStyle(call.name);
          const summary = summarizeInput(call.name, call.input);
          const domain = extractDomain(call.input);

          return (
            <div
              key={call.id}
              className={cn(
                "flex items-center gap-10 px-12 py-8 rounded-10 transition-all",
                call.status === "running"
                  ? "bg-heat-4"
                  : "hover:bg-black-alpha-2",
              )}
            >
              {/* Status dot */}
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex-shrink-0",
                  call.status === "complete"
                    ? "bg-accent-forest"
                    : "bg-heat-100 animate-pulse",
                )}
              />

              {/* Favicon or tool badge */}
              {domain ? (
                <Favicon domain={domain} size={18} />
              ) : (
                <div
                  className={cn(
                    "w-18 h-18 rounded-4 flex-shrink-0 flex-center text-[10px] font-medium",
                    call.name === "search" && "bg-accent-bluetron/10 text-accent-bluetron",
                    call.name === "scrape" && "bg-accent-forest/10 text-accent-forest",
                    call.name === "interact" && "bg-accent-amethyst/10 text-accent-amethyst",
                    call.name === "load_skill" && "bg-accent-honey/10 text-accent-honey",
                    call.name === "formatOutput" && "bg-heat-8 text-heat-100",
                    !["search", "scrape", "interact", "load_skill", "formatOutput"].includes(call.name) &&
                      "bg-black-alpha-4 text-black-alpha-48",
                  )}
                >
                  {style.label[0]}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-6">
                  <span
                    className={cn(
                      "text-label-small font-medium",
                      style.color,
                    )}
                  >
                    {call.status === "running" ? style.verb : style.label}
                  </span>
                  {summary && (
                    <span className="text-body-small text-black-alpha-48 truncate">
                      {summary}
                    </span>
                  )}
                </div>
              </div>

              {/* Status indicator */}
              {call.status === "complete" && (
                <svg
                  className="w-14 h-14 text-accent-forest flex-shrink-0"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.3 4.3L6 11.6 2.7 8.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}

        {/* Thinking indicator */}
        {isRunning &&
          (toolCalls.length === 0 ||
            toolCalls[toolCalls.length - 1]?.status === "complete") && (
            <div className="flex items-center gap-10 px-12 py-8">
              <div className="w-6 h-6 rounded-full bg-black-alpha-12 animate-pulse" />
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-black-alpha-16 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-4 h-4 rounded-full bg-black-alpha-16 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-4 h-4 rounded-full bg-black-alpha-16 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-body-small text-black-alpha-32">
                Thinking...
              </span>
            </div>
          )}
      </div>
    </div>
  );
}
