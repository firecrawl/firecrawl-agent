"""Core types — mirrors the TypeScript version."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class ModelConfig:
    """Model provider + model ID. Maps to PydanticAI model strings."""

    provider: str  # "anthropic", "openai", "google"
    model: str  # "claude-sonnet-4-6", "gpt-4o", "gemini-3-flash-preview"

    def to_pydantic_ai(self) -> str:
        """Convert to PydanticAI model string format."""
        provider_map = {
            "anthropic": "anthropic",
            "openai": "openai",
            "google": "google-gla",
        }
        prefix = provider_map.get(self.provider, self.provider)
        return f"{prefix}:{self.model}"


@dataclass
class CreateAgentOptions:
    """Options for create_agent()."""

    firecrawl_api_key: str
    model: ModelConfig
    max_steps: int = 20
    app_sections: list[str] = field(default_factory=list)


@dataclass
class RunParams:
    """Parameters for agent.run()."""

    prompt: str
    urls: list[str] | None = None
    schema: dict[str, Any] | None = None
    format: str | None = None  # "json", "csv", "markdown"
    max_steps: int | None = None


@dataclass
class StepEvent:
    """Event emitted during agent execution."""

    type: str  # "text", "tool-call", "tool-result"
    text: str | None = None
    tool_name: str | None = None
    input: Any = None
    output: Any = None


@dataclass
class AgentEvent:
    """Event emitted during streaming."""

    type: str  # "text", "tool-call", "tool-result", "done", "error"
    content: str | None = None
    tool_name: str | None = None
    input: Any = None
    output: Any = None
    error: str | None = None


@dataclass
class RunResult:
    """Result from agent.run()."""

    text: str
    data: str | None = None
    format: str | None = None
    steps: list[dict[str, Any]] = field(default_factory=list)
