# FirecrawlAgent::ModelConfig

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **provider** | **String** | LLM provider. | [optional] |
| **model** | **String** | Model identifier (e.g. \&quot;gemini-3-flash-preview\&quot;, \&quot;claude-sonnet-4-6\&quot;). | [optional] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::ModelConfig.new(
  provider: null,
  model: null
)
```

