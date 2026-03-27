"use client";

import { useState } from "react";
import type { UIMessage } from "ai";
import { cn } from "@/utils/cn";

type OutputFormat = "json" | "csv" | "text";

interface FormattedOutput {
  format: OutputFormat;
  content: string;
}

function isToolPart(
  part: { type: string },
): part is { type: string; toolCallId: string; state: string; toolName?: string; output?: unknown } {
  return part.type.startsWith("tool-") || part.type === "dynamic-tool";
}

function extractOutput(messages: UIMessage[]): FormattedOutput | null {
  // Walk messages in reverse to find the last formatOutput result
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "assistant") continue;
    for (const part of msg.parts) {
      if (isToolPart(part)) {
        const toolName =
          (part as { toolName?: string }).toolName ??
          part.type.replace("tool-", "");
        const state = (part as { state?: string }).state;
        const output = (part as { output?: unknown }).output;

        if (toolName === "formatOutput" && state === "result" && output) {
          const result = output as FormattedOutput;
          if (result.format && result.content) return result;
        }
      }
    }
  }

  // Fallback: get the last text content from assistant
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "assistant") continue;
    for (const part of msg.parts) {
      if (part.type === "text" && part.text.trim()) {
        return { format: "text", content: part.text };
      }
    }
  }

  return null;
}

function download(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function OutputPanel({
  messages,
}: {
  messages: UIMessage[];
}) {
  const [activeTab, setActiveTab] = useState<OutputFormat>("text");
  const output = extractOutput(messages);

  const tabs: { id: OutputFormat; label: string }[] = [
    { id: "text", label: "Text" },
    { id: "json", label: "JSON" },
    { id: "csv", label: "CSV" },
  ];

  return (
    <div className="border-t border-border-faint">
      <div className="flex items-center justify-between px-16 pt-10">
        <div className="flex gap-2 bg-black-alpha-4 rounded-8 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(
                "px-10 py-4 rounded-6 text-label-small transition-all",
                activeTab === tab.id
                  ? "bg-accent-white text-accent-black shadow-sm"
                  : "text-black-alpha-56 hover:text-accent-black",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {output && (
          <button
            type="button"
            className="text-label-small text-black-alpha-48 hover:text-accent-black transition-colors"
            onClick={() => {
              const ext =
                activeTab === "json"
                  ? "json"
                  : activeTab === "csv"
                    ? "csv"
                    : "md";
              download(output.content, `agent-output.${ext}`);
            }}
          >
            Download
          </button>
        )}
      </div>

      <div className="p-16 min-h-120">
        {!output ? (
          <div className="text-body-small text-black-alpha-32 text-center py-24">
            Output will appear here when the agent completes
          </div>
        ) : (
          <pre className="text-mono-medium text-accent-black whitespace-pre-wrap break-words bg-background-lighter rounded-10 p-12 border border-border-faint overflow-auto max-h-400">
            {output.content}
          </pre>
        )}
      </div>
    </div>
  );
}
