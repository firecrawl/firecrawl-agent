# FirecrawlAgent::SubAgentConfig

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** | Unique identifier for this sub-agent (used as the tool name suffix). |  |
| **name** | **String** | Human-readable name shown in the tool description. |  |
| **description** | **String** | What this sub-agent does. Included in the tool description for the orchestrator. |  |
| **instructions** | **String** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] |
| **model** | [**ModelConfig**](ModelConfig.md) |  | [optional] |
| **tools** | **Array&lt;String&gt;** | Firecrawl tools available to this sub-agent. | [optional] |
| **skills** | **Array&lt;String&gt;** | Skills to pre-load for this sub-agent. | [optional] |
| **max_steps** | **Integer** | Maximum steps before the sub-agent stops. | [optional][default to 10] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::SubAgentConfig.new(
  id: null,
  name: null,
  description: null,
  instructions: null,
  model: null,
  tools: null,
  skills: null,
  max_steps: null
)
```

