# FirecrawlAgent::ExportedSkill

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **name** | **String** | Slug identifier for the skill. | [optional] |
| **skill_md** | **String** | Full SKILL.md content with frontmatter. | [optional] |
| **workflow** | **String** | Deterministic workflow.mjs script content. | [optional] |
| **schema** | **String** | Expected output schema.json content. | [optional] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::ExportedSkill.new(
  name: null,
  skill_md: null,
  workflow: null,
  schema: null
)
```

