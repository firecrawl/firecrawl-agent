"""Firecrawl Agent Core — Python edition.

Built on PydanticAI + Firecrawl SDK. Same architecture as the TypeScript
version: model + tools + prompts → agent loop.
"""

from .agent import create_agent, FirecrawlAgent
from .types import (
    CreateAgentOptions,
    ModelConfig,
    RunParams,
    RunResult,
    StepEvent,
    AgentEvent,
)

__all__ = [
    "create_agent",
    "FirecrawlAgent",
    "CreateAgentOptions",
    "ModelConfig",
    "RunParams",
    "RunResult",
    "StepEvent",
    "AgentEvent",
]
