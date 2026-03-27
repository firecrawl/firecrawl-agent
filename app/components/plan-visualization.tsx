"use client";

import { useState } from "react";
import type { UIMessage } from "ai";
import { cn } from "@/utils/cn";

// --- Icons ---

function SearchIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" className="flex-shrink-0">
      <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" className="flex-shrink-0">
      <path d="M12 19.7C16.26 19.7 19.7 16.26 19.7 12S16.26 4.3 12 4.3 4.3 7.74 4.3 12s3.44 7.7 7.7 7.7zM12 19.7c-1.96 0-3.54-3.44-3.54-7.7S10.04 4.3 12 4.3s3.54 3.44 3.54 7.7-1.58 7.7-3.54 7.7zM19.5 12H4.5" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" className="flex-shrink-0">
      <path d="M4 17l6-5-6-5M12 19h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function SkillIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" className="flex-shrink-0">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function Favicon({ domain }: { domain: string }) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      width={16} height={16} alt="" className="rounded-2 flex-shrink-0"
    />
  );
}

function getDomain(url: string): string | null {
  try { return new URL(url.startsWith("http") ? url : `https://${url}`).hostname; }
  catch { return null; }
}

// --- Search results rendering ---

interface SearchResult {
  title?: string;
  url?: string;
  description?: string;
  markdown?: string;
}

function SearchResults({ query, results }: { query: string; results: SearchResult[] }) {
  return (
    <div className="my-12">
      <div className="flex items-center gap-8 mb-10 text-black-alpha-40">
        <SearchIcon />
        <span className="text-label-medium">Searched: &ldquo;{query}&rdquo;</span>
      </div>
      <div className="flex flex-col gap-6 ml-26">
        {results.map((r, i) => {
          const domain = r.url ? getDomain(r.url) : null;
          return (
            <div key={i} className="flex items-start gap-10 py-6 px-10 rounded-8 hover:bg-black-alpha-2 transition-colors">
              {domain ? <Favicon domain={domain} /> : <GlobeIcon />}
              <div className="min-w-0 flex-1">
                <div className="text-label-medium text-accent-black truncate">
                  {r.title || r.url || `Result ${i + 1}`}
                </div>
                {r.url && (
                  <div className="text-body-small text-black-alpha-32 truncate">{r.url}</div>
                )}
                {r.description && (
                  <div className="text-body-small text-black-alpha-48 line-clamp-2 mt-2">{r.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Scrape result rendering ---

function ScrapeResult({ url, content }: { url: string; content: string }) {
  const [expanded, setExpanded] = useState(false);
  const domain = getDomain(url);
  const preview = content.slice(0, 300);

  return (
    <div className="my-12">
      <div className="flex items-center gap-8 mb-6 text-black-alpha-40">
        {domain ? <Favicon domain={domain} /> : <GlobeIcon />}
        <span className="text-label-medium truncate">Scraped: {url}</span>
      </div>
      <div className="ml-26 bg-background-lighter rounded-10 border border-border-faint p-12">
        <pre className="text-mono-small text-black-alpha-56 whitespace-pre-wrap">
          {expanded ? content : preview}
          {content.length > 300 && !expanded && "..."}
        </pre>
        {content.length > 300 && (
          <button
            type="button"
            className="text-label-small text-heat-100 hover:text-[color:var(--heat-90)] mt-6 transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : `Show more (${(content.length / 1000).toFixed(1)}k chars)`}
          </button>
        )}
      </div>
    </div>
  );
}

// --- Bash result rendering ---

function BashResult({ command, stdout, stderr, exitCode }: { command: string; stdout: string; stderr: string; exitCode: number }) {
  return (
    <div className="my-12">
      <div className="flex items-center gap-8 mb-6 text-black-alpha-40">
        <TerminalIcon />
        <code className="text-mono-small text-accent-black bg-black-alpha-4 px-6 py-2 rounded-4">{command}</code>
        {exitCode !== 0 && <span className="text-body-small text-accent-crimson">exit {exitCode}</span>}
      </div>
      {(stdout || stderr) && (
        <div className="ml-26 bg-[#1a1a1a] rounded-10 p-12 overflow-auto max-h-300">
          {stdout && <pre className="text-mono-small text-[#e0e0e0] whitespace-pre-wrap">{stdout}</pre>}
          {stderr && <pre className="text-mono-small text-accent-crimson whitespace-pre-wrap">{stderr}</pre>}
        </div>
      )}
    </div>
  );
}

// --- Skill load rendering ---

function SkillLoad({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-8 my-8 py-4 text-black-alpha-40">
      <SkillIcon />
      <span className="text-label-medium">Loaded {name} skill</span>
    </div>
  );
}

// --- Data extraction ---

function isToolPart(part: { type: string }): boolean {
  return part.type.startsWith("tool-") || part.type === "dynamic-tool";
}

interface TimelineItem {
  type: "text" | "search" | "scrape" | "interact" | "bash" | "skill" | "subagent" | "format" | "other";
  // text
  text?: string;
  // search
  query?: string;
  searchResults?: SearchResult[];
  // scrape/interact
  url?: string;
  content?: string;
  // bash
  command?: string;
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  // skill
  skillName?: string;
  // status
  status: "running" | "complete";
}

function extractTimeline(messages: UIMessage[]): TimelineItem[] {
  const items: TimelineItem[] = [];

  for (const msg of messages) {
    if (msg.role !== "assistant") continue;
    for (const part of msg.parts) {
      if (part.type === "text" && part.text.trim()) {
        items.push({ type: "text", text: part.text, status: "complete" });
      } else if (isToolPart(part)) {
        const p = part as Record<string, unknown>;
        const state = (p.state ?? "") as string;
        const toolName = (p.toolName ?? (part.type as string).replace("tool-", "")) as string;
        const input = (p.input ?? p.args ?? {}) as Record<string, unknown>;
        const output = (p.output ?? {}) as Record<string, unknown>;
        const status = state === "result" ? "complete" as const : "running" as const;

        if (toolName === "search") {
          // Parse search results from output
          const results: SearchResult[] = [];
          if (output && typeof output === "object") {
            const data = (output as { data?: SearchResult[] }).data;
            if (Array.isArray(data)) {
              results.push(...data.map((r: SearchResult) => ({
                title: r.title,
                url: r.url,
                description: r.description,
                markdown: r.markdown,
              })));
            }
          }
          items.push({
            type: "search",
            query: String(input.query ?? ""),
            searchResults: results,
            status,
          });
        } else if (toolName === "scrape" || toolName === "interact" || toolName === "map") {
          const markdown = typeof output === "object" && output
            ? String((output as { markdown?: string }).markdown ?? (output as { content?: string }).content ?? "")
            : "";
          items.push({
            type: toolName === "interact" ? "interact" : "scrape",
            url: String(input.url ?? ""),
            content: markdown,
            status,
          });
        } else if (toolName === "bashExec") {
          items.push({
            type: "bash",
            command: String(input.command ?? ""),
            stdout: String((output as { stdout?: string }).stdout ?? ""),
            stderr: String((output as { stderr?: string }).stderr ?? ""),
            exitCode: Number((output as { exitCode?: number }).exitCode ?? 0),
            status,
          });
        } else if (toolName === "load_skill" || toolName === "read_skill_resource") {
          items.push({
            type: "skill",
            skillName: String(input.name ?? input.skill ?? ""),
            status,
          });
        } else if (toolName.startsWith("subagent_")) {
          const result = (output as { result?: string }).result;
          items.push({
            type: "subagent",
            text: result ? String(result) : String(input.task ?? ""),
            status,
          });
        } else if (toolName === "formatOutput") {
          // Skip — handled by OutputPanel
          items.push({ type: "format", status });
        } else {
          items.push({ type: "other", text: toolName, status });
        }
      }
    }
  }
  return items;
}

// --- Main ---

export default function PlanVisualization({
  messages,
  isRunning,
}: {
  messages: UIMessage[];
  isRunning: boolean;
}) {
  const timeline = extractTimeline(messages);

  if (timeline.length === 0 && !isRunning) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="text-body-large text-black-alpha-24">
          Agent activity will appear here
        </div>
      </div>
    );
  }

  return (
    <div>
      {timeline.map((item, i) => {
        switch (item.type) {
          case "text":
            return (
              <div key={i} className="text-body-x-large text-accent-black leading-relaxed my-12 whitespace-pre-wrap">
                {item.text}
              </div>
            );
          case "search":
            return (
              <SearchResults
                key={i}
                query={item.query!}
                results={item.status === "complete" && item.searchResults?.length ? item.searchResults : []}
              />
            );
          case "scrape":
          case "interact":
            return item.status === "complete" && item.content ? (
              <ScrapeResult key={i} url={item.url!} content={item.content} />
            ) : (
              (() => {
                const domain = item.url ? getDomain(item.url) : null;
                return (
                  <div key={i} className="flex items-center gap-8 my-8 py-4 text-black-alpha-40">
                    {domain ? <Favicon domain={domain} /> : <GlobeIcon />}
                    <span className="text-label-medium">
                      {item.type === "interact" ? "Interacting with" : "Scraping"} {item.url}
                    </span>
                    {item.status === "running" && (
                      <div className="w-4 h-4 rounded-full bg-heat-100 animate-pulse" />
                    )}
                  </div>
                );
              })()
            );
          case "bash":
            return item.status === "complete" ? (
              <BashResult key={i} command={item.command!} stdout={item.stdout!} stderr={item.stderr!} exitCode={item.exitCode!} />
            ) : (
              <div key={i} className="flex items-center gap-8 my-8 py-4 text-black-alpha-40">
                <TerminalIcon />
                <code className="text-mono-small">{item.command}</code>
                <div className="w-4 h-4 rounded-full bg-heat-100 animate-pulse" />
              </div>
            );
          case "skill":
            return <SkillLoad key={i} name={item.skillName!} />;
          case "subagent":
            return (
              <div key={i} className="my-12 ml-16 pl-12 border-l-2 border-accent-amethyst/20">
                <div className="text-label-small text-accent-amethyst mb-4">Sub-agent</div>
                <div className="text-body-medium text-black-alpha-56 whitespace-pre-wrap">
                  {item.text}
                </div>
              </div>
            );
          case "format":
            return null; // Handled by OutputPanel
          default:
            return null;
        }
      })}

      {/* Running indicator */}
      {isRunning && (
        <div className="flex items-center gap-8 my-12 py-4">
          <div className="relative w-18 h-18 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-black-alpha-8 border-t-heat-100 animate-spin" />
          </div>
          <span className="text-body-medium text-black-alpha-32">Working...</span>
        </div>
      )}

      {/* Search results empty state while running */}
      {isRunning && timeline.length > 0 && timeline[timeline.length - 1].type === "search" && timeline[timeline.length - 1].status === "running" && (
        <div className="ml-26 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-10 py-6 px-10 animate-pulse">
              <div className="w-16 h-16 rounded-2 bg-black-alpha-8" />
              <div className="flex-1">
                <div className="h-14 bg-black-alpha-6 rounded-4 w-3/4 mb-4" />
                <div className="h-10 bg-black-alpha-4 rounded-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
