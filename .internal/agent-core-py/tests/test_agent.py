"""Tests for agent construction (no LLM calls)."""

from unittest.mock import patch, MagicMock

from firecrawl_agent.agent import create_agent, FirecrawlAgent
from firecrawl_agent.types import CreateAgentOptions, ModelConfig, RunParams


def _make_agent(**kwargs):
    """Create agent with mocked Firecrawl + PydanticAI Agent."""
    defaults = dict(
        firecrawl_api_key="fc-test",
        model=ModelConfig(provider="google", model="gemini-3-flash-preview"),
    )
    defaults.update(kwargs)
    return create_agent(CreateAgentOptions(**defaults))


class TestCreateAgent:
    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_returns_firecrawl_agent(self, mock_firecrawl, mock_agent):
        agent = _make_agent()
        assert isinstance(agent, FirecrawlAgent)

    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_initializes_firecrawl_client(self, mock_firecrawl, mock_agent):
        _make_agent(firecrawl_api_key="fc-test-key")
        mock_firecrawl.assert_called_once_with(api_key="fc-test-key")

    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_creates_pydantic_agent_with_model(self, mock_firecrawl, mock_agent):
        _make_agent(model=ModelConfig(provider="anthropic", model="claude-sonnet-4-6"))
        mock_agent.assert_called_once()
        call_kwargs = mock_agent.call_args
        assert call_kwargs[0][0] == "anthropic:claude-sonnet-4-6"

    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_accepts_app_sections(self, mock_firecrawl, mock_agent):
        agent = _make_agent(app_sections=["<custom>policy</custom>"])
        assert isinstance(agent, FirecrawlAgent)


class TestBuildPrompt:
    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_basic_prompt(self, mock_firecrawl, mock_agent):
        agent = _make_agent()
        prompt = agent._build_prompt(RunParams(prompt="find data"))
        assert "find data" in prompt

    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_prompt_with_urls(self, mock_firecrawl, mock_agent):
        agent = _make_agent()
        prompt = agent._build_prompt(
            RunParams(
                prompt="scrape this",
                urls=["https://example.com", "https://other.com"],
            )
        )
        assert "https://example.com" in prompt
        assert "https://other.com" in prompt

    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_prompt_with_schema(self, mock_firecrawl, mock_agent):
        agent = _make_agent()
        prompt = agent._build_prompt(
            RunParams(
                prompt="extract",
                schema={"type": "object", "properties": {"name": {"type": "string"}}},
            )
        )
        assert '"name"' in prompt

    @patch("firecrawl_agent.agent.Agent")
    @patch("firecrawl_agent.agent.Firecrawl")
    def test_prompt_with_format(self, mock_firecrawl, mock_agent):
        agent = _make_agent()
        prompt = agent._build_prompt(RunParams(prompt="get data", format="json"))
        assert "json" in prompt
        assert "format_output" in prompt
