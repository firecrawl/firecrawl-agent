"""Tests for prompt loader."""

from pathlib import Path

from firecrawl_agent.prompts import load_system_prompt, PROMPTS_DIR


class TestPromptsDir:
    def test_prompts_dir_exists(self):
        assert PROMPTS_DIR.is_dir()

    def test_system_prompt_exists(self):
        assert (PROMPTS_DIR / "system.md").is_file()

    def test_skills_prompt_exists(self):
        assert (PROMPTS_DIR / "skills.md").is_file()


class TestLoadSystemPrompt:
    def test_loads_and_interpolates(self):
        prompt = load_system_prompt(today="2026-04-07")
        assert "2026-04-07" in prompt
        assert "<role>" in prompt
        assert "<tool_policy>" in prompt

    def test_includes_skills_section(self):
        prompt = load_system_prompt(today="2026-04-07")
        assert "skill_policy" in prompt

    def test_app_sections_appended(self):
        prompt = load_system_prompt(
            today="2026-04-07",
            app_sections=["<custom>My custom policy</custom>"],
        )
        assert "My custom policy" in prompt

    def test_multiple_app_sections(self):
        prompt = load_system_prompt(
            today="2026-04-07",
            app_sections=[
                "<planning>Plan with mermaid</planning>",
                "<presentation>Use viewer panel</presentation>",
            ],
        )
        assert "Plan with mermaid" in prompt
        assert "Use viewer panel" in prompt

    def test_firecrawl_tools_hint(self):
        prompt = load_system_prompt(
            today="2026-04-07",
            firecrawl_tools_hint="Use search, scrape, interact tools.",
        )
        assert "Use search, scrape, interact tools." in prompt

    def test_no_unresolved_placeholders(self):
        prompt = load_system_prompt(today="2026-04-07")
        # All {PLACEHOLDERS} should be resolved (empty string if not provided)
        import re
        unresolved = re.findall(r"\{[A-Z_]+\}", prompt)
        assert unresolved == [], f"Unresolved placeholders: {unresolved}"
