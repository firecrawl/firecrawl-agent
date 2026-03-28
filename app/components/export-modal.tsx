"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import { cn } from "@/utils/cn";
import { Streamdown } from "streamdown";
import { createCodePlugin } from "@streamdown/code";

const code = createCodePlugin({ themes: ["github-light", "github-light"] });

const FORMATS = [
  {
    id: "json",
    label: "JSON",
    defaultPrompt: "Format the collected data as clean JSON. Write the result to /data/export.json using bashExec, then call formatOutput with format 'json' and the content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H7a2 2 0 00-2 2v5a2 2 0 01-2 2 2 2 0 012 2v5a2 2 0 002 2h1M16 3h1a2 2 0 012 2v5a2 2 0 002 2 2 2 0 00-2 2v5a2 2 0 01-2 2h-1" /></svg>,
  },
  {
    id: "csv",
    label: "CSV",
    defaultPrompt: "Format the collected data as a CSV table. Write the result to /data/export.csv using bashExec, then call formatOutput with format 'csv' and the content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18M9 6v12M15 6v12" /></svg>,
  },
  {
    id: "markdown",
    label: "Report",
    defaultPrompt: "Format the collected data as a structured markdown report. Write the result to /data/export.md using bashExec, then call formatOutput with format 'text' and the content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
  },
  {
    id: "html",
    label: "HTML",
    defaultPrompt: "Format the collected data as a styled HTML document with inline CSS. Write the result to /data/export.html using bashExec, then call formatOutput with format 'text' and the HTML content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>,
  },
  {
    id: "spreadsheet",
    label: "Spreadsheet",
    defaultPrompt: "Structure the collected data as CSV spreadsheet tables. Write the result to /data/export.csv using bashExec, then call formatOutput with format 'csv' and the content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></svg>,
  },
  {
    id: "document",
    label: "Document",
    defaultPrompt: "Structure the collected data as a formal document with sections. Write the result to /data/export.md using bashExec, then call formatOutput with format 'text' and the content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" /></svg>,
  },
  {
    id: "slides",
    label: "Slides",
    defaultPrompt: "Structure the collected data as a slide deck outline. Write the result to /data/export.md using bashExec, then call formatOutput with format 'text' and the content.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
];

function getOutputMeta(output: { format: string; content: string }) {
  const isHtml = output.format === "text" && /^\s*<!doctype\s+html|^\s*<html/i.test(output.content.trim());
  const ext = output.format === "json" ? "json" : output.format === "csv" ? "csv" : isHtml ? "html" : "md";
  const label = output.format === "json" ? "JSON" : output.format === "csv" ? "CSV" : isHtml ? "HTML" : "Markdown";
  return { ext, label, isHtml };
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

// --- Viewers ---

function JsonViewer({ data }: { data: string }) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const parsed = useMemo(() => { try { return JSON.parse(data); } catch { return null; } }, [data]);
  if (!parsed) return <pre className="text-mono-small text-accent-black whitespace-pre-wrap break-all">{data}</pre>;

  const toggle = (path: string) => {
    setCollapsed((prev) => { const next = new Set(prev); if (next.has(path)) next.delete(path); else next.add(path); return next; });
  };

  const renderValue = (value: unknown, path: string, depth: number): React.ReactNode => {
    if (value === null) return <span className="text-black-alpha-40">null</span>;
    if (typeof value === "boolean") return <span className="text-accent-bluetron">{String(value)}</span>;
    if (typeof value === "number") return <span className="text-accent-amethyst">{value}</span>;
    if (typeof value === "string") {
      const display = value.length > 120 ? value.slice(0, 120) + "..." : value;
      return <span className="text-accent-forest">&quot;{display}&quot;</span>;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return <span>[]</span>;
      const isC = collapsed.has(path);
      return (<span>
        <button type="button" className="text-black-alpha-40 hover:text-accent-black" onClick={() => toggle(path)}>{isC ? "\u25b8" : "\u25be"}</button>
        {isC ? <span className="text-black-alpha-40"> [{value.length} items]</span> : (<>{"[\n"}{value.map((item, i) => (<span key={i}>{"  ".repeat(depth + 1)}{renderValue(item, `${path}[${i}]`, depth + 1)}{i < value.length - 1 ? "," : ""}{"\n"}</span>))}{"  ".repeat(depth)}]</>)}
      </span>);
    }
    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) return <span>{"{}"}</span>;
      const isC = collapsed.has(path);
      return (<span>
        <button type="button" className="text-black-alpha-40 hover:text-accent-black" onClick={() => toggle(path)}>{isC ? "\u25b8" : "\u25be"}</button>
        {isC ? <span className="text-black-alpha-40"> {"{"}{entries.length} keys{"}"}</span> : (<>{"{\n"}{entries.map(([key, val], i) => (<span key={key}>{"  ".repeat(depth + 1)}<span className="text-heat-100">&quot;{key}&quot;</span>{": "}{renderValue(val, `${path}.${key}`, depth + 1)}{i < entries.length - 1 ? "," : ""}{"\n"}</span>))}{"  ".repeat(depth)}{"}"}</>)}
      </span>);
    }
    return <span>{String(value)}</span>;
  };

  return <pre className="text-mono-small text-accent-black whitespace-pre font-mono leading-relaxed">{renderValue(parsed, "$", 0)}</pre>;
}

function CsvTable({ data }: { data: string }) {
  const rows = useMemo(() => {
    const lines = data.split("\n").filter((l) => l.trim());
    return lines.map((line) => {
      const cells: string[] = [];
      let current = "";
      let inQuote = false;
      for (const ch of line) {
        if (ch === '"') inQuote = !inQuote;
        else if (ch === "," && !inQuote) { cells.push(current.trim()); current = ""; }
        else current += ch;
      }
      cells.push(current.trim());
      return cells;
    });
  }, [data]);

  if (rows.length < 2) return <pre className="text-mono-small text-accent-black whitespace-pre-wrap break-all">{data}</pre>;

  return (
    <div className="overflow-auto">
      <table className="w-full text-body-small border-collapse">
        <thead>
          <tr className="bg-black-alpha-2 border-b border-border-faint sticky top-0">
            {rows[0].map((h, i) => (
              <th key={i} className="text-left text-label-small text-black-alpha-56 px-12 py-8 whitespace-nowrap border-r border-border-faint last:border-r-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, ri) => (
            <tr key={ri} className={cn("border-b border-border-faint last:border-0", ri % 2 === 1 && "bg-black-alpha-1")}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-12 py-6 text-accent-black whitespace-nowrap border-r border-border-faint last:border-r-0">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HtmlViewer({ html, fullHeight }: { html: string; fullHeight?: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(fullHeight ? 600 : 300);
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    const onLoad = () => {
      if (fullHeight) return;
      try { const doc = iframe.contentDocument; if (doc?.body) setHeight(Math.min(Math.max(doc.body.scrollHeight + 16, 150), 500)); } catch { /* cross-origin */ }
    };
    iframe.addEventListener("load", onLoad);
    return () => { iframe.removeEventListener("load", onLoad); URL.revokeObjectURL(url); };
  }, [html, fullHeight]);
  return <iframe ref={iframeRef} className="w-full border-0" style={{ height: fullHeight ? "100%" : height }} sandbox="allow-same-origin" title="HTML output" />;
}

function OutputContent({ output, maxH }: { output: { format: string; content: string }; maxH?: string }) {
  const { isHtml } = getOutputMeta(output);
  return (
    <div className={cn("overflow-auto", maxH)}>
      {output.format === "json" && <div className="p-14"><JsonViewer data={output.content} /></div>}
      {output.format === "csv" && <div className="p-0"><CsvTable data={output.content} /></div>}
      {isHtml && <HtmlViewer html={output.content} />}
      {output.format === "text" && !isHtml && (
        <div className="p-14 text-body-medium text-accent-black leading-relaxed prose prose-base max-w-none prose-headings:text-accent-black prose-a:text-heat-100 prose-strong:text-accent-black prose-code:text-heat-100 prose-code:bg-heat-4 prose-code:px-4 prose-code:py-1 prose-code:rounded-4">
          <Streamdown plugins={{ code }}>{output.content}</Streamdown>
        </div>
      )}
    </div>
  );
}

// --- Fullscreen Viewer Modal ---

function FullscreenViewer({ output, onClose }: { output: { format: string; content: string }; onClose: () => void }) {
  const { ext, label, isHtml } = getOutputMeta(output);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-accent-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-20 py-12 border-b border-border-faint bg-background-base flex-shrink-0">
        <div className="flex items-center gap-12">
          <span className="text-mono-x-small text-black-alpha-48 bg-black-alpha-4 px-8 py-2 rounded-4">{label}</span>
          <span className="text-body-small text-black-alpha-32">
            {(output.content.length / 1000).toFixed(1)}k characters
          </span>
        </div>
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="flex items-center gap-6 px-12 py-6 rounded-8 text-label-small text-black-alpha-48 hover:bg-black-alpha-4 hover:text-accent-black transition-all"
            onClick={() => download(output.content, `export.${ext}`)}
          >
            <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download .{ext}
          </button>
          <button
            type="button"
            className="p-8 rounded-8 text-black-alpha-32 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {isHtml ? (
          <HtmlViewer html={output.content} fullHeight />
        ) : (
          <div className="max-w-[900px] mx-auto">
            <OutputContent output={output} />
          </div>
        )}
      </div>
    </div>
  );
}

// --- Extract formatOutput results from messages ---

function extractOutputs(messages: UIMessage[]): { format: string; content: string }[] {
  const outputs: { format: string; content: string }[] = [];
  for (const msg of messages) {
    if (msg.role !== "assistant") continue;
    for (const part of msg.parts) {
      const p = part as Record<string, unknown>;
      if (!part.type.startsWith("tool-") && part.type !== "dynamic-tool") continue;
      const toolName = (p.toolName ?? (part.type as string).replace("tool-", "")) as string;
      if (toolName === "formatOutput" && (p.state === "output-available" || p.state === "result") && p.output) {
        const output = p.output as { format?: string; content?: string };
        if (output.content) {
          outputs.push({ format: output.format ?? "text", content: output.content });
        }
      }
    }
  }
  return outputs;
}

// --- Export Sidebar ---

interface RequestedExport {
  formatId: string;
  outputCountAtRequest: number;
}

interface ExportSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onExport: (formatId: string, prompt: string, currentOutputCount: number) => void;
  generatingFormat: string;
  requestedExports: RequestedExport[];
  messages: UIMessage[];
  isRunning: boolean;
}

export default function ExportSidebar({ collapsed, onToggleCollapse, onExport, generatingFormat, requestedExports, messages, isRunning }: ExportSidebarProps) {
  const [selectedOutput, setSelectedOutput] = useState<number | null>(null);
  const [fullscreenOutput, setFullscreenOutput] = useState<{ format: string; content: string } | null>(null);

  const outputs = useMemo(() => extractOutputs(messages), [messages]);
  const hasOutputs = outputs.length > 0;
  const formatLabelMap: Record<string, string> = {};
  for (const f of FORMATS) formatLabelMap[f.id] = f.label;

  return (
    <>
      <div className={cn(
        "h-full border-l border-border-faint bg-background-base flex flex-col flex-shrink-0 transition-all duration-200 overflow-hidden",
        collapsed ? "w-48" : "w-320",
      )}>
        {/* Header */}
        <div className={cn("p-12 flex items-center", collapsed ? "justify-center" : "gap-8")}>
          <button
            type="button"
            className="p-6 rounded-6 text-black-alpha-40 hover:bg-black-alpha-4 hover:text-accent-black transition-all flex-shrink-0"
            onClick={onToggleCollapse}
            title={collapsed ? "Expand panel" : "Collapse panel"}
          >
            <svg fill="none" height="16" viewBox="0 0 24 24" width="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {collapsed ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
            </svg>
          </button>
          {!collapsed && (
            <span className="text-label-small text-black-alpha-48 flex-1">
              {hasOutputs ? "Output" : "Export"}
            </span>
          )}
          {!collapsed && hasOutputs && (
            <span className="text-mono-x-small text-accent-forest bg-accent-forest/8 px-6 py-1 rounded-4">
              {outputs.length}
            </span>
          )}
        </div>

        {!collapsed && (
          <div className="flex-1 overflow-y-auto px-8 pb-12">

            {/* Generated section */}
            {requestedExports.length > 0 && (
              <div className="mb-12">
                <div className="text-mono-x-small text-black-alpha-24 uppercase tracking-wider px-12 mb-6">Generated</div>
                <div className="flex flex-col gap-4">
                  {requestedExports.map((req, ri) => {
                    const isCurrentlyGenerating = generatingFormat === req.formatId && isRunning;
                    // The output for this request is the first output that appeared AFTER the request was made
                    const matchingOutput = outputs.length > req.outputCountAtRequest ? outputs[req.outputCountAtRequest] : undefined;
                    const label = formatLabelMap[req.formatId] ?? req.formatId;
                    const formatDef = FORMATS.find((f) => f.id === req.formatId);
                    const isOpen = selectedOutput === ri;

                    return (
                      <div key={`${req.formatId}-${ri}`} className="rounded-8 border border-border-faint overflow-hidden">
                        {/* Header row */}
                        <div className="flex items-center gap-8 px-10 py-8">
                          {formatDef && <span className="flex-shrink-0 text-black-alpha-40">{formatDef.icon}</span>}
                          <span className="text-body-small text-accent-black flex-1 truncate">{label}</span>
                          {(isCurrentlyGenerating || (!matchingOutput && isRunning)) ? (
                            <div className="w-10 h-10 rounded-full border-2 border-heat-100 border-t-transparent animate-spin flex-shrink-0" />
                          ) : matchingOutput ? (
                            <>
                              {/* Fullscreen button */}
                              <button
                                type="button"
                                className="p-4 rounded-4 text-black-alpha-24 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
                                onClick={() => setFullscreenOutput(matchingOutput)}
                                title="Open fullscreen"
                              >
                                <svg fill="none" height="12" viewBox="0 0 24 24" width="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                </svg>
                              </button>
                              {/* Inline toggle */}
                              <button
                                type="button"
                                className="p-4 rounded-4 text-black-alpha-24 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
                                onClick={() => setSelectedOutput(isOpen ? null : ri)}
                              >
                                <svg fill="none" height="12" viewBox="0 0 24 24" width="12" className={cn("transition-transform", isOpen && "rotate-180")} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              </button>
                              {/* Download */}
                              <button
                                type="button"
                                className="p-4 rounded-4 text-black-alpha-24 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
                                onClick={() => { const { ext } = getOutputMeta(matchingOutput); download(matchingOutput.content, `export.${ext}`); }}
                                title="Download"
                              >
                                <svg fill="none" height="12" viewBox="0 0 24 24" width="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <span className="text-mono-x-small text-black-alpha-24">pending</span>
                          )}
                        </div>
                        {/* Inline viewer */}
                        {isOpen && matchingOutput && (
                          <div className="border-t border-border-faint">
                            <OutputContent output={matchingOutput} maxH="max-h-[350px]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Export format buttons */}
            <div className="mb-8">
              <div className="text-mono-x-small text-black-alpha-24 uppercase tracking-wider px-12 mb-6">Export as</div>
              <div className="flex flex-col gap-1">
                {FORMATS.map((f) => {
                  const isGen = generatingFormat === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      disabled={isRunning || !!generatingFormat}
                      className={cn(
                        "w-full text-left px-12 py-6 rounded-8 transition-all flex items-center gap-8",
                        isRunning || generatingFormat ? "opacity-50 cursor-not-allowed" : "hover:bg-black-alpha-2",
                      )}
                      onClick={() => onExport(f.id, f.defaultPrompt, outputs.length)}
                    >
                      <span className="flex-shrink-0 text-black-alpha-40">{f.icon}</span>
                      <span className="text-body-small flex-1 truncate text-accent-black">{f.label}</span>
                      {isGen && (
                        <div className="w-8 h-8 rounded-full border-2 border-heat-100 border-t-transparent animate-spin flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen viewer modal */}
      {fullscreenOutput && (
        <FullscreenViewer output={fullscreenOutput} onClose={() => setFullscreenOutput(null)} />
      )}
    </>
  );
}
