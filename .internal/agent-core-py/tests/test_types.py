"""Tests for types module."""

from firecrawl_agent.types import ModelConfig, CreateAgentOptions, RunParams, RunResult


class TestModelConfig:
    def test_anthropic_model_string(self):
        config = ModelConfig(provider="anthropic", model="claude-sonnet-4-6")
        assert config.to_pydantic_ai() == "anthropic:claude-sonnet-4-6"

    def test_openai_model_string(self):
        config = ModelConfig(provider="openai", model="gpt-4o")
        assert config.to_pydantic_ai() == "openai:gpt-4o"

    def test_google_model_string(self):
        config = ModelConfig(provider="google", model="gemini-3-flash-preview")
        assert config.to_pydantic_ai() == "google-gla:gemini-3-flash-preview"

    def test_unknown_provider_passthrough(self):
        config = ModelConfig(provider="custom", model="my-model")
        assert config.to_pydantic_ai() == "custom:my-model"


class TestCreateAgentOptions:
    def test_defaults(self):
        opts = CreateAgentOptions(
            firecrawl_api_key="fc-test",
            model=ModelConfig(provider="google", model="gemini-flash"),
        )
        assert opts.max_steps == 20
        assert opts.app_sections == []

    def test_custom_options(self):
        opts = CreateAgentOptions(
            firecrawl_api_key="fc-test",
            model=ModelConfig(provider="anthropic", model="claude-sonnet-4-6"),
            max_steps=50,
            app_sections=["<custom_policy>Do X</custom_policy>"],
        )
        assert opts.max_steps == 50
        assert len(opts.app_sections) == 1


class TestRunParams:
    def test_minimal(self):
        params = RunParams(prompt="test query")
        assert params.prompt == "test query"
        assert params.urls is None
        assert params.schema is None
        assert params.format is None

    def test_full(self):
        params = RunParams(
            prompt="extract data",
            urls=["https://example.com"],
            schema={"type": "object", "properties": {"name": {"type": "string"}}},
            format="json",
            max_steps=10,
        )
        assert len(params.urls) == 1
        assert params.format == "json"


class TestRunResult:
    def test_minimal(self):
        result = RunResult(text="found data")
        assert result.text == "found data"
        assert result.data is None
        assert result.steps == []

    def test_with_data(self):
        result = RunResult(
            text="done",
            data='{"name": "test"}',
            format="json",
        )
        assert result.format == "json"
