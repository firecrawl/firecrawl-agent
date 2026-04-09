"""FirecrawlAgent — PydanticAI agent with Firecrawl tools.

Architecture mirrors the TypeScript version:
  model + tools + prompts → agent loop (PydanticAI)
"""

from __future__ import annotations

import json
from datetime import date
from typing import Any, AsyncIterator

from pydantic_ai import Agent, RunContext

from firecrawl import Firecrawl

from .prompts import load_system_prompt
from .types import (
    AgentEvent,
    CreateAgentOptions,
    RunParams,
    RunResult,
)


class FirecrawlAgent:
    """Web research agent powered by Firecrawl + PydanticAI.

    Usage:
        agent = create_agent(CreateAgentOptions(
            firecrawl_api_key="fc-...",
            model=ModelConfig(provider="anthropic", model="claude-sonnet-4-6"),
        ))
        result = agent.run_sync(RunParams(prompt="Compare Vercel vs Netlify pricing"))
    """

    def __init__(self, options: CreateAgentOptions) -> None:
        self._options = options
        self._firecrawl = Firecrawl(api_key=options.firecrawl_api_key)

        instructions = load_system_prompt(
            today=date.today().isoformat(),
            app_sections=options.app_sections or None,
        )

        self._agent: Agent[Firecrawl, str] = Agent(
            options.model.to_pydantic_ai(),
            deps_type=Firecrawl,
            output_type=str,
            instructions=instructions,
        )

        self._register_tools()

    def _register_tools(self) -> None:
        """Register Firecrawl tools on the PydanticAI agent."""

        @self._agent.tool
        async def search(ctx: RunContext[Firecrawl], query: str, limit: int = 5) -> str:
            """Search the web. Returns relevant pages with titles, URLs, and snippets."""
            result = ctx.deps.search(query, params={"limit": limit})
            if not result:
                return json.dumps({"results": [], "message": "No results found"})
            # Normalize to list of dicts
            items = []
            for r in result.get("data", result) if isinstance(result, dict) else result:
                if isinstance(r, dict):
                    items.append({
                        "title": r.get("title", ""),
                        "url": r.get("url", ""),
                        "snippet": r.get("description", r.get("snippet", "")),
                    })
            return json.dumps(items[:limit])

        @self._agent.tool
        async def scrape(ctx: RunContext[Firecrawl], url: str, query: str | None = None) -> str:
            """Scrape a URL. Use the query parameter for targeted extraction."""
            params: dict[str, Any] = {"formats": ["markdown"]}
            if query:
                params["extract"] = {"prompt": query}
            result = ctx.deps.scrape(url, params=params)
            if isinstance(result, dict):
                md = result.get("markdown", result.get("content", ""))
                extract = result.get("extract", "")
                if extract:
                    return json.dumps({"url": url, "extract": extract, "markdown": md[:2000]})
                return json.dumps({"url": url, "markdown": md[:4000]})
            return json.dumps({"url": url, "content": str(result)[:4000]})

        @self._agent.tool
        async def format_output(ctx: RunContext[Firecrawl], format: str, data: str) -> str:
            """Format final output as JSON, CSV, or text. Call this when you have all the data."""
            if format == "json":
                try:
                    parsed = json.loads(data)
                    return json.dumps({"format": "json", "content": json.dumps(parsed, indent=2)})
                except json.JSONDecodeError:
                    return json.dumps({"format": "json", "content": data})
            elif format == "csv":
                return json.dumps({"format": "csv", "content": data})
            else:
                return json.dumps({"format": "text", "content": data})

    def run_sync(self, params: RunParams) -> RunResult:
        """Run the agent synchronously. Blocks until complete."""
        prompt = self._build_prompt(params)
        result = self._agent.run_sync(prompt, deps=self._firecrawl)
        return RunResult(
            text=result.output,
            steps=[],
        )

    async def run(self, params: RunParams) -> RunResult:
        """Run the agent asynchronously."""
        prompt = self._build_prompt(params)
        result = await self._agent.run(prompt, deps=self._firecrawl)
        return RunResult(
            text=result.output,
            steps=[],
        )

    async def stream(self, params: RunParams) -> AsyncIterator[AgentEvent]:
        """Stream agent events as they happen."""
        prompt = self._build_prompt(params)
        async with self._agent.iter(prompt, deps=self._firecrawl) as run:
            async for node in run:
                if Agent.is_model_request_node(node):
                    async with node.stream(run.ctx) as request_stream:
                        async for event in request_stream:
                            from pydantic_ai import (
                                PartDeltaEvent,
                                TextPartDelta,
                                FunctionToolCallEvent,
                                FunctionToolResultEvent,
                            )

                            if isinstance(event, PartDeltaEvent) and isinstance(
                                event.delta, TextPartDelta
                            ):
                                yield AgentEvent(
                                    type="text",
                                    content=event.delta.content_delta,
                                )
                            elif isinstance(event, FunctionToolCallEvent):
                                yield AgentEvent(
                                    type="tool-call",
                                    tool_name=event.part.tool_name,
                                    input=event.part.args,
                                )
                elif Agent.is_call_tools_node(node):
                    async with node.stream(run.ctx) as handle_stream:
                        async for event in handle_stream:
                            from pydantic_ai import FunctionToolResultEvent

                            if isinstance(event, FunctionToolResultEvent):
                                yield AgentEvent(
                                    type="tool-result",
                                    tool_name=event.tool_name,
                                    output=str(event.result.content)[:500],
                                )

        yield AgentEvent(type="done")

    def _build_prompt(self, params: RunParams) -> str:
        """Assemble the user prompt with context."""
        parts = [params.prompt]
        if params.urls:
            parts.append(f"\nStart with these URLs: {', '.join(params.urls)}")
        if params.schema:
            parts.append(f"\nExtract data matching this schema:\n```json\n{json.dumps(params.schema, indent=2)}\n```")
        if params.format:
            parts.append(f"\nReturn results as {params.format}. Call format_output when done.")
        return "\n".join(parts)


def create_agent(options: CreateAgentOptions) -> FirecrawlAgent:
    """Create a Firecrawl Agent instance.

    Example:
        from firecrawl_agent import create_agent, CreateAgentOptions, ModelConfig, RunParams

        agent = create_agent(CreateAgentOptions(
            firecrawl_api_key="fc-...",
            model=ModelConfig(provider="google", model="gemini-3-flash-preview"),
        ))

        result = agent.run_sync(RunParams(prompt="Compare pricing for Vercel vs Netlify"))
        print(result.text)
    """
    return FirecrawlAgent(options)
