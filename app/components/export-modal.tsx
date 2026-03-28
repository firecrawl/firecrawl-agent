"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import type { UIMessage } from "ai";
import { cn } from "@/utils/cn";
import { Streamdown } from "streamdown";
import { createCodePlugin } from "@streamdown/code";

const code = createCodePlugin({ themes: ["github-light", "github-light"] });

const FORMATS = [
  {
    id: "json",
    label: "JSON",
    prompt: "Format ALL the collected data from this conversation as clean, structured JSON. Use camelCase keys, keep it flat where practical, include every data point. Return ONLY the JSON, no explanation.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H7a2 2 0 00-2 2v5a2 2 0 01-2 2 2 2 0 012 2v5a2 2 0 002 2h1M16 3h1a2 2 0 012 2v5a2 2 0 002 2 2 2 0 00-2 2v5a2 2 0 01-2 2h-1" /></svg>,
  },
  {
    id: "csv",
    label: "CSV",
    prompt: "Format ALL the collected data from this conversation as a CSV table. One row per entity, consistent columns, human-readable headers. Return ONLY the CSV, no explanation.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18M9 6v12M15 6v12" /></svg>,
  },
  {
    id: "markdown",
    label: "Report",
    prompt: "Format ALL the collected data from this conversation as a structured markdown report with executive summary, findings organized by topic, tables for comparisons, key takeaways, and sources. Return ONLY the markdown.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
  },
  {
    id: "html",
    label: "HTML",
    prompt: "Format ALL the collected data from this conversation as a complete, styled HTML document with inline CSS, clean tables, sans-serif font, responsive layout. Return ONLY the HTML starting with <!DOCTYPE html>.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>,
  },
  {
    id: "spreadsheet",
    label: "Spreadsheet",
    prompt: "Structure ALL the collected data from this conversation as CSV spreadsheet tables with typed columns, summary rows if applicable. Return ONLY the CSV.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></svg>,
  },
  {
    id: "document",
    label: "Document",
    prompt: "Structure ALL the collected data from this conversation as a formal document with title, executive summary, sections, analysis, and sources. Return ONLY the markdown.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" /></svg>,
  },
  {
    id: "slides",
    label: "Slides",
    prompt: "Structure ALL the collected data from this conversation as a slide deck outline with 5-12 slides. Each slide: title, 3-5 bullet points, speaker notes. Return ONLY the markdown.",
    icon: <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
];

// --- Helpers ---

let jobCounter = 0;

function getOutputMeta(content: string, formatId: string) {
  const isHtml = /^\s*<!doctype\s+html|^\s*<html/i.test(content.trim());
  const isCsv = formatId === "csv" || formatId === "spreadsheet";
  const isJson = formatId === "json";
  const ext = isJson ? "json" : isCsv ? "csv" : isHtml ? "html" : "md";
  const label = isJson ? "JSON" : isCsv ? "CSV" : isHtml ? "HTML" : "Markdown";
  return { ext, label, isHtml, isCsv, isJson };
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

function extractConversationContext(messages: UIMessage[]): string {
  const parts: string[] = [];
  for (const msg of messages) {
    for (const part of msg.parts) {
      if (part.type === "text" && part.text.trim()) {
        parts.push(`[${msg.role}]: ${part.text.slice(0, 2000)}`);
      }
      const p = part as Record<string, unknown>;
      if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
        const toolName = (p.toolName ?? "") as string;
        if ((p.state === "output-available" || p.state === "result") && p.output) {
          const out = p.output as Record<string, unknown>;
          const content = out.markdown ?? out.content ?? out.answer ?? out.text ?? out.data;
          if (content) {
            const str = typeof content === "string" ? content : JSON.stringify(content);
            parts.push(`[tool:${toolName}]: ${str.slice(0, 3000)}`);
          }
        }
      }
    }
  }
  return parts.join("\n\n").slice(0, 30000);
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
      try { const doc = iframe.contentDocument; if (doc?.body) setHeight(Math.min(Math.max(doc.body.scrollHeight + 16, 150), 500)); } catch { /* */ }
    };
    iframe.addEventListener("load", onLoad);
    return () => { iframe.removeEventListener("load", onLoad); URL.revokeObjectURL(url); };
  }, [html, fullHeight]);
  return <iframe ref={iframeRef} className="w-full border-0" style={{ height: fullHeight ? "100%" : height }} sandbox="allow-same-origin" title="HTML output" />;
}

function OutputContent({ content, formatId, maxH }: { content: string; formatId: string; maxH?: string }) {
  const { isHtml, isCsv, isJson } = getOutputMeta(content, formatId);
  return (
    <div className={cn("overflow-auto", maxH)}>
      {isJson && <div className="p-14"><JsonViewer data={content} /></div>}
      {isCsv && <CsvTable data={content} />}
      {isHtml && <HtmlViewer html={content} />}
      {!isJson && !isCsv && !isHtml && (
        <div className="p-14 text-body-medium text-accent-black leading-relaxed prose prose-base max-w-none prose-headings:text-accent-black prose-a:text-heat-100 prose-strong:text-accent-black">
          <Streamdown plugins={{ code }}>{content}</Streamdown>
        </div>
      )}
    </div>
  );
}

// --- Fullscreen Viewer ---

function FullscreenViewer({ content, formatId, onClose }: { content: string; formatId: string; onClose: () => void }) {
  const { ext, label, isHtml } = getOutputMeta(content, formatId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-accent-white">
      <div className="flex items-center justify-between px-20 py-12 border-b border-border-faint bg-background-base flex-shrink-0">
        <div className="flex items-center gap-12">
          <span className="text-mono-x-small text-black-alpha-48 bg-black-alpha-4 px-8 py-2 rounded-4">{label}</span>
          <span className="text-body-small text-black-alpha-32">{(content.length / 1000).toFixed(1)}k chars</span>
        </div>
        <div className="flex items-center gap-8">
          <button type="button" className="flex items-center gap-6 px-12 py-6 rounded-8 text-label-small text-black-alpha-48 hover:bg-black-alpha-4 transition-all" onClick={() => download(content, `export.${ext}`)}>
            <svg fill="none" height="14" viewBox="0 0 24 24" width="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            Download .{ext}
          </button>
          <button type="button" className="p-8 rounded-8 text-black-alpha-32 hover:text-accent-black hover:bg-black-alpha-4 transition-all" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {isHtml ? <HtmlViewer html={content} fullHeight /> : (
          <div className="max-w-[900px] mx-auto"><OutputContent content={content} formatId={formatId} /></div>
        )}
      </div>
    </div>
  );
}

// --- Export Job ---

interface ExportJob {
  id: string;
  formatId: string;
  label: string;
  status: "running" | "done" | "error";
  content?: string;
  error?: string;
}

function JobCard({ job, onFullscreen, onRemove }: { job: ExportJob; onFullscreen: () => void; onRemove: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const formatDef = FORMATS.find((f) => f.id === job.formatId);

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(onRemove, 200);
  };

  const { ext } = job.content ? getOutputMeta(job.content, job.formatId) : { ext: "" };
  const isDone = job.status === "done" && !!job.content;

  return (
    <div
      className={cn(
        "rounded-8 border overflow-hidden transition-all duration-200",
        mounted && !removing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        isDone ? "border-border-faint hover:border-black-alpha-16" : "border-border-faint",
      )}
    >
      <button
        type="button"
        className={cn(
          "w-full flex items-center gap-8 px-10 py-8 text-left transition-colors",
          isDone && "cursor-pointer hover:bg-black-alpha-2",
        )}
        onClick={() => { if (isDone) setExpanded(!expanded); }}
        disabled={!isDone}
      >
        {formatDef && <span className="flex-shrink-0 text-black-alpha-40">{formatDef.icon}</span>}
        <span className="text-body-small text-accent-black flex-1 truncate">{job.label}</span>

        {job.status === "running" && (
          <div className="w-10 h-10 rounded-full border-2 border-heat-100 border-t-transparent animate-spin flex-shrink-0" />
        )}
        {job.status === "error" && (
          <>
            <span className="text-mono-x-small text-accent-crimson">failed</span>
            <span
              role="button"
              tabIndex={0}
              className="p-4 rounded-4 text-black-alpha-24 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); handleRemove(); } }}
              title="Dismiss"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </span>
          </>
        )}
        {isDone && (
          <>
            <span
              role="button"
              tabIndex={0}
              className="p-4 rounded-4 text-black-alpha-24 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
              onClick={(e) => { e.stopPropagation(); download(job.content!, `export.${ext}`); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); download(job.content!, `export.${ext}`); } }}
              title="Download"
            >
              <svg fill="none" height="12" viewBox="0 0 24 24" width="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
            </span>
            <span
              role="button"
              tabIndex={0}
              className="p-4 rounded-4 text-black-alpha-24 hover:text-accent-black hover:bg-black-alpha-4 transition-all"
              onClick={(e) => { e.stopPropagation(); onFullscreen(); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onFullscreen(); } }}
              title="Fullscreen"
            >
              <svg fill="none" height="12" viewBox="0 0 24 24" width="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            </span>
            <svg fill="none" height="12" viewBox="0 0 24 24" width="12" className={cn("transition-transform text-black-alpha-24 flex-shrink-0", expanded && "rotate-180")} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
          </>
        )}
      </button>

      <div
        className={cn(
          "transition-all duration-200 overflow-hidden",
          expanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {job.content && (
          <div className="border-t border-border-faint">
            <OutputContent content={job.content} formatId={job.formatId} maxH="max-h-[350px]" />
          </div>
        )}
      </div>
    </div>
  );
}

// --- Export Sidebar ---

interface ExportSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  messages: UIMessage[];
}

export default function ExportSidebar({ collapsed, onToggleCollapse, messages }: ExportSidebarProps) {
  const [jobs, setJobs] = useState<ExportJob[]>([]);
  const [fullscreenJob, setFullscreenJob] = useState<ExportJob | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const runExport = useCallback((formatId: string) => {
    const format = FORMATS.find((f) => f.id === formatId);
    if (!format) return;

    const jobId = `${formatId}-${++jobCounter}`;
    const newJob: ExportJob = { id: jobId, formatId, label: format.label, status: "running" };
    setJobs((prev) => [newJob, ...prev]);

    const context = extractConversationContext(messagesRef.current);
    const fullPrompt = `${format.prompt}\n\nHere is the conversation data to format:\n\n${context}`;

    fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: fullPrompt, maxSteps: 3 }),
    })
      .then((r) => r.json())
      .then((data) => {
        setJobs((prev) => prev.map((j) =>
          j.id === jobId ? { ...j, status: "done", content: data.text ?? "" } : j
        ));
      })
      .catch((err) => {
        setJobs((prev) => prev.map((j) =>
          j.id === jobId ? { ...j, status: "error", error: err.message } : j
        ));
      });
  }, []);

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const runningCount = jobs.filter((j) => j.status === "running").length;
  const doneCount = jobs.filter((j) => j.status === "done").length;

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
            <span className="text-label-small text-black-alpha-48 flex-1">Export</span>
          )}
          {!collapsed && runningCount > 0 && (
            <div className="w-10 h-10 rounded-full border-2 border-heat-100 border-t-transparent animate-spin flex-shrink-0" />
          )}
          {!collapsed && doneCount > 0 && (
            <span className="text-mono-x-small text-accent-forest bg-accent-forest/8 px-6 py-1 rounded-4">
              {doneCount}
            </span>
          )}
        </div>

        {!collapsed && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Format grid */}
            <div className="flex-shrink-0 px-8 pb-10">
              <div className="grid grid-cols-2 gap-4">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className="flex items-center gap-6 px-10 py-6 rounded-8 text-body-small text-black-alpha-56 bg-black-alpha-2 hover:bg-black-alpha-4 hover:text-accent-black transition-all whitespace-nowrap"
                    onClick={() => runExport(f.id)}
                  >
                    <span className="flex-shrink-0">{f.icon}</span>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job list */}
            <div className="flex-1 overflow-y-auto px-8 pb-12">
              {jobs.length === 0 && (
                <div className="text-body-small text-black-alpha-24 text-center py-20">
                  Choose a format above to export
                </div>
              )}
              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onFullscreen={() => setFullscreenJob(job)}
                    onRemove={() => removeJob(job.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {fullscreenJob?.content && (
        <FullscreenViewer content={fullscreenJob.content} formatId={fullscreenJob.formatId} onClose={() => setFullscreenJob(null)} />
      )}
    </>
  );
}
