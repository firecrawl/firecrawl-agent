"use client";

import Link from "next/link";
import SymbolColored from "@/components/shared/icons/symbol-colored";

function Endpoint({
  method,
  path,
  description,
  body,
  response,
}: {
  method: string;
  path: string;
  description: string;
  body?: string;
  response?: string;
}) {
  const methodColor =
    method === "GET" ? "bg-accent-forest/10 text-accent-forest"
    : method === "DELETE" ? "bg-accent-crimson/10 text-accent-crimson"
    : "bg-heat-8 text-heat-100";

  return (
    <div className="border border-border-faint rounded-12 overflow-hidden">
      <div className="flex items-center gap-10 px-16 py-10 bg-black-alpha-2 border-b border-border-faint">
        <span className={`text-label-small font-mono px-8 py-2 rounded-4 ${methodColor}`}>
          {method}
        </span>
        <code className="text-mono-small text-accent-black">{path}</code>
      </div>
      <div className="px-16 py-12">
        <p className="text-body-medium text-black-alpha-56 mb-12">{description}</p>
        {body && (
          <div className="mb-10">
            <div className="text-label-x-small text-black-alpha-32 mb-4">Request</div>
            <pre className="text-mono-small text-accent-black bg-black-alpha-2 rounded-8 p-12 overflow-auto whitespace-pre-wrap">{body}</pre>
          </div>
        )}
        {response && (
          <div>
            <div className="text-label-x-small text-black-alpha-32 mb-4">Response</div>
            <pre className="text-mono-small text-accent-black bg-black-alpha-2 rounded-8 p-12 overflow-auto whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

function CurlExample({ command, label }: { command: string; label: string }) {
  return (
    <div className="mb-12">
      <div className="text-label-x-small text-black-alpha-32 mb-4">{label}</div>
      <pre className="text-mono-small text-accent-black bg-black-alpha-2 rounded-8 p-12 overflow-auto whitespace-pre-wrap">{command}</pre>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background-base">
      <header className="border-b border-border-faint px-20 py-12 flex items-center gap-10">
        <Link href="/" className="flex items-center gap-10 hover:opacity-80 transition-opacity">
          <SymbolColored width={22} height={32} />
          <h1 className="text-title-h5 text-accent-black">Firecrawl Agent</h1>
        </Link>
        <div className="ml-auto flex items-center gap-8">
          <span className="text-label-small text-heat-100 bg-heat-8 px-8 py-4 rounded-6">API Docs</span>
        </div>
      </header>

      <div className="max-w-740 mx-auto px-20 py-32">
        <h2 className="text-title-h3 text-accent-black mb-6">API Reference</h2>
        <p className="text-body-large text-black-alpha-48 mb-32">
          The Firecrawl Agent exposes a REST API for programmatic web research, data extraction, and format conversion.
        </p>

        {/* Extract API */}
        <div className="mb-40">
          <h3 className="text-title-h4 text-accent-black mb-4">Extract</h3>
          <p className="text-body-medium text-black-alpha-48 mb-16">
            The primary endpoint. Give it a prompt, choose a format, and get structured data back.
          </p>

          <div className="flex flex-col gap-16">
            <Endpoint
              method="POST"
              path="/api/extract"
              description="Research the web and return extracted data in your chosen format. The agent will search, scrape, and interact with pages as needed, then format the results."
              body={`{
  "prompt": "Compare pricing for Vercel and Netlify",
  "format": "json",
  "schema": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "provider": { "type": "string" },
        "plan": { "type": "string" },
        "price": { "type": "string" },
        "features": { "type": "array", "items": { "type": "string" } }
      }
    }
  },
  "urls": ["https://vercel.com/pricing", "https://www.netlify.com/pricing"],
  "maxSteps": 15
}`}
              response={`{
  "format": "json",
  "data": "[{ \\"provider\\": \\"Vercel\\", \\"plan\\": \\"Pro\\", ... }]",
  "text": "I scraped both pricing pages and extracted...",
  "usage": { "promptTokens": 12500, "completionTokens": 3200 }
}`}
            />
          </div>

          <div className="mt-16">
            <h4 className="text-label-medium text-accent-black mb-10">Format options</h4>
            <div className="grid grid-cols-2 gap-8">
              <div className="border border-border-faint rounded-10 p-14">
                <div className="text-label-small text-heat-100 mb-4">json</div>
                <p className="text-body-small text-black-alpha-48 mb-8">Structured JSON. Pass a <code className="text-mono-x-small bg-black-alpha-4 px-4 py-1 rounded">schema</code> to enforce shape.</p>
              </div>
              <div className="border border-border-faint rounded-10 p-14">
                <div className="text-label-small text-heat-100 mb-4">csv</div>
                <p className="text-body-small text-black-alpha-48 mb-8">Tabular CSV. Pass <code className="text-mono-x-small bg-black-alpha-4 px-4 py-1 rounded">columns</code> to define headers.</p>
              </div>
              <div className="border border-border-faint rounded-10 p-14">
                <div className="text-label-small text-heat-100 mb-4">markdown</div>
                <p className="text-body-small text-black-alpha-48">A formatted markdown report with headings, tables, and lists.</p>
              </div>
              <div className="border border-border-faint rounded-10 p-14">
                <div className="text-label-small text-heat-100 mb-4">html</div>
                <p className="text-body-small text-black-alpha-48">A styled HTML document with inline CSS, ready to render.</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h4 className="text-label-medium text-accent-black mb-10">Examples</h4>

            <CurlExample
              label="Extract as JSON with schema"
              command={`curl -X POST http://localhost:3000/api/extract \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Get the top 5 YC W24 companies",
    "format": "json",
    "schema": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "description": { "type": "string" },
          "url": { "type": "string" }
        }
      }
    }
  }'`}
            />

            <CurlExample
              label="Extract as CSV with columns"
              command={`curl -X POST http://localhost:3000/api/extract \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Get pricing tiers for Firecrawl",
    "format": "csv",
    "columns": ["plan", "price", "credits", "features"],
    "urls": ["https://www.firecrawl.dev/pricing"]
  }'`}
            />

            <CurlExample
              label="Extract as Markdown report"
              command={`curl -X POST http://localhost:3000/api/extract \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Research and compare Supabase vs Firebase",
    "format": "markdown"
  }'`}
            />

            <CurlExample
              label="Extract as HTML document"
              command={`curl -X POST http://localhost:3000/api/extract \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Create a comparison page for the top 3 headless CMS platforms",
    "format": "html"
  }'`}
            />
          </div>
        </div>

        {/* Query API */}
        <div className="mb-40">
          <h3 className="text-title-h4 text-accent-black mb-4">Query</h3>
          <p className="text-body-medium text-black-alpha-48 mb-16">
            Free-form query endpoint. Returns the agent&apos;s full response with all steps. Supports streaming.
          </p>

          <div className="flex flex-col gap-16">
            <Endpoint
              method="POST"
              path="/api/query"
              description="Run the agent with a prompt and get the full response. Set stream: true for SSE streaming."
              body={`{
  "prompt": "What are the top stories on Hacker News right now?",
  "stream": false,
  "model": "claude-sonnet-4-6",
  "maxSteps": 15
}`}
              response={`{
  "text": "Here are the current top stories on HN...",
  "steps": [
    {
      "text": "Let me search for...",
      "toolCalls": [{ "name": "search", "input": { "query": "..." } }],
      "toolResults": [{ "name": "search", "output": { ... } }]
    }
  ],
  "usage": { "promptTokens": 8000, "completionTokens": 2100 }
}`}
            />
          </div>

          <div className="mt-12">
            <CurlExample
              label="Streaming mode"
              command={`curl -X POST http://localhost:3000/api/query \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Find the latest AI news", "stream": true}'

# Returns SSE events:
# data: {"type":"text","content":"Searching for..."}
# data: {"type":"tool-call","name":"search","input":{...}}
# data: {"type":"tool-result","name":"search","output":{...}}
# data: {"type":"done","text":"...","usage":{...}}`}
            />
          </div>
        </div>

        {/* Agent API */}
        <div className="mb-40">
          <h3 className="text-title-h4 text-accent-black mb-4">Agent (UI Stream)</h3>
          <p className="text-body-medium text-black-alpha-48 mb-16">
            The internal endpoint used by the web UI. Returns an AI SDK UI stream for use with <code className="text-mono-x-small bg-black-alpha-4 px-4 py-1 rounded">useChat</code>.
          </p>

          <Endpoint
            method="POST"
            path="/api/agent"
            description="Run the full agent with UI message streaming. Designed for the AI SDK React hook."
            body={`{
  "messages": [{ "role": "user", "content": "..." }],
  "config": {
    "prompt": "...",
    "model": { "provider": "anthropic", "model": "claude-sonnet-4-6" },
    "urls": [],
    "skills": [],
    "subAgents": [],
    "maxSteps": 20
  }
}`}
          />
        </div>

        {/* Skills */}
        <div className="mb-40">
          <h3 className="text-title-h4 text-accent-black mb-4">Skills</h3>
          <p className="text-body-medium text-black-alpha-48 mb-16">
            Manage reusable instruction sets that teach the agent domain-specific workflows.
          </p>

          <div className="flex flex-col gap-16">
            <Endpoint
              method="GET"
              path="/api/skills"
              description="List all available skills from .agents/skills/ directories."
              response={`[
  {
    "name": "competitive-analysis",
    "description": "Analyze competitors by extracting pricing and features",
    "resources": ["template.json"]
  }
]`}
            />

            <Endpoint
              method="GET"
              path="/api/skills/:name"
              description="Get a skill's full SKILL.md content."
              response={`{
  "name": "competitive-analysis",
  "content": "---\\nname: competitive-analysis\\n---\\n\\n# Competitive Analysis\\n..."
}`}
            />

            <Endpoint
              method="POST"
              path="/api/skills/generate"
              description="Generate a new SKILL.md from a conversation transcript. Analyzes what the agent did and creates reusable procedural instructions."
              body={`{
  "name": "pricing-comparison",
  "messages": [...],
  "prompt": "Original task description"
}`}
              response={`{
  "name": "pricing-comparison",
  "path": ".agents/skills/pricing-comparison/SKILL.md",
  "content": "---\\nname: pricing-comparison\\n---\\n..."
}`}
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="mb-40">
          <h3 className="text-title-h4 text-accent-black mb-4">Conversations</h3>
          <p className="text-body-medium text-black-alpha-48 mb-16">
            Persist and retrieve conversation history.
          </p>

          <div className="flex flex-col gap-16">
            <Endpoint
              method="GET"
              path="/api/conversations"
              description="List all saved conversations, sorted by most recent."
              response={`[
  { "id": "abc-123", "title": "Compare pricing...", "created_at": 1711540000, "updated_at": 1711540120 }
]`}
            />

            <Endpoint
              method="GET"
              path="/api/conversations/:id"
              description="Get a conversation with its full message history."
            />

            <Endpoint
              method="DELETE"
              path="/api/conversations/:id"
              description="Delete a conversation and its messages."
            />
          </div>
        </div>

        {/* Environment */}
        <div className="mb-20 pt-20 border-t border-border-faint">
          <h3 className="text-title-h5 text-accent-black mb-8">Environment Variables</h3>
          <div className="bg-black-alpha-2 rounded-12 p-16">
            <pre className="text-mono-small text-accent-black whitespace-pre-wrap">{`FIRECRAWL_API_KEY=fc-...        # Required -- powers search, scrape, interact
ANTHROPIC_API_KEY=sk-ant-...   # For Anthropic models (default)
OPENAI_API_KEY=sk-...          # For OpenAI models
GOOGLE_GENERATIVE_AI_API_KEY=  # For Google models`}</pre>
          </div>
        </div>

        <div className="text-body-small text-black-alpha-24 text-center py-12">
          Built with Firecrawl + AI SDK
        </div>
      </div>
    </div>
  );
}
