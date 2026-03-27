"use client";

import type { UIMessage } from "ai";
import { cn } from "@/utils/cn";

const TOOL_COLORS: Record<string, string> = {
  search: "bg-accent-bluetron/10 text-accent-bluetron border-accent-bluetron/20",
  scrape: "bg-accent-forest/10 text-accent-forest border-accent-forest/20",
  interact:
    "bg-accent-amethyst/10 text-accent-amethyst border-accent-amethyst/20",
  map: "bg-accent-honey/10 text-accent-honey border-accent-honey/20",
  load_skill: "bg-accent-honey/10 text-accent-honey border-accent-honey/20",
  read_skill_resource:
    "bg-accent-honey/10 text-accent-honey border-accent-honey/20",
  formatOutput: "bg-heat-8 text-heat-100 border-heat-20",
};

function getToolColor(name: string) {
  if (name.startsWith("subagent_"))
    return "bg-accent-amethyst/10 text-accent-amethyst border-accent-amethyst/20";
  return (
    TOOL_COLORS[name] ??
    "bg-black-alpha-4 text-black-alpha-64 border-black-alpha-8"
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
  if (toolName === "formatOutput" && obj.format) return `format: ${obj.format}`;
  if (obj.task) return String(obj.task).slice(0, 80);

  return "";
}

interface ToolCallInfo {
  id: string;
  name: string;
  input: unknown;
  result?: unknown;
  status: "running" | "complete";
}

function isToolPart(
  part: { type: string },
): part is { type: string; toolCallId: string; state: string; toolName?: string; input?: unknown; output?: unknown; args?: unknown } {
  return part.type.startsWith("tool-") || part.type === "dynamic-tool";
}

function extractToolCalls(messages: UIMessage[]): ToolCallInfo[] {
  const calls: ToolCallInfo[] = [];

  for (const msg of messages) {
    if (msg.role !== "assistant") continue;
    for (const part of msg.parts) {
      if (!isToolPart(part)) continue;

      const toolCallId = (part as { toolCallId?: string }).toolCallId ?? "";
      const state = (part as { state?: string }).state ?? "";
      const toolName =
        (part as { toolName?: string }).toolName ??
        part.type.replace("tool-", "");
      const input = (part as { input?: unknown; args?: unknown }).input ??
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
          <div className="text-body-large text-black-alpha-32 mb-8">
            Agent execution plan will appear here
          </div>
          <div className="text-body-small text-black-alpha-24">
            Each tool call, skill load, and sub-agent delegation shows as a step
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-16 overflow-y-auto">
      <div className="flex flex-col gap-6">
        {toolCalls.map((call, i) => {
          const summary = summarizeInput(call.name, call.input);
          const colorClass = getToolColor(call.name);
          const isLast = i === toolCalls.length - 1;

          return (
            <div key={call.id} className="flex gap-10">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full mt-8 flex-shrink-0",
                    call.status === "complete"
                      ? "bg-accent-forest"
                      : "bg-heat-100 animate-pulse",
                  )}
                />
                {!isLast && (
                  <div className="w-1 flex-1 bg-border-faint mt-2" />
                )}
              </div>

              <div
                className={cn(
                  "flex-1 rounded-10 border p-10 mb-2",
                  call.status === "running"
                    ? "border-heat-20 bg-heat-4"
                    : "border-border-faint bg-background-lighter",
                )}
              >
                <div className="flex items-center gap-6 mb-4">
                  <span
                    className={cn(
                      "px-6 py-2 rounded-6 text-mono-small border",
                      colorClass,
                    )}
                  >
                    {call.name}
                  </span>
                  {call.status === "running" && (
                    <span className="text-mono-small text-heat-100">
                      running...
                    </span>
                  )}
                </div>
                {summary && (
                  <div className="text-body-small text-black-alpha-56 truncate">
                    {summary}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isRunning && toolCalls.length > 0 && (
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full mt-8 bg-black-alpha-12 animate-pulse" />
            </div>
            <div className="flex-1 rounded-10 border border-border-faint bg-background-lighter p-10 opacity-50">
              <div className="text-body-small text-black-alpha-32">
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
