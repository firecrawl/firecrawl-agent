"""Prompt loader — reads .md files from prompts/ directory.

Same pattern as the TypeScript version: core prompts live here,
app-specific sections are passed in via app_sections.
"""

from __future__ import annotations

import re
from pathlib import Path

PROMPTS_DIR = Path(__file__).parent / "prompts"

_cache: dict[str, str] = {}


def _load(name: str) -> str:
    if name in _cache:
        return _cache[name]
    content = (PROMPTS_DIR / name).read_text().strip()
    _cache[name] = content
    return content


def _interpolate(template: str, vars: dict[str, str]) -> str:
    def replace(m: re.Match) -> str:
        return vars.get(m.group(1), "")

    return re.sub(r"\{([A-Z_]+)\}", replace, template)


def load_system_prompt(
    *,
    today: str,
    firecrawl_tools_hint: str = "",
    app_sections: list[str] | None = None,
) -> str:
    """Load and assemble the full system prompt.

    Core prompts come from prompts/. App sections (planning, presentation)
    are passed in by the caller.
    """
    system = _load("system.md")
    skills = _load("skills.md")

    base = _interpolate(
        system,
        {
            "TODAY": today,
            "FIRECRAWL_TOOLS_HINT": firecrawl_tools_hint,
        },
    )

    sections = [skills]
    if app_sections:
        sections.extend(app_sections)

    return base + "\n\n" + "\n\n".join(sections)
