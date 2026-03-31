# FirecrawlAgent::RunRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **prompt** | **String** | The research task or question. |  |
| **stream** | **Boolean** | If true, response is an SSE stream of AgentEvent objects. | [optional][default to false] |
| **format** | **String** | Desired output format. If set, agent will format data accordingly. | [optional] |
| **schema** | **Object** | JSON Schema for structured output (used with format&#x3D;json). | [optional] |
| **columns** | **Array&lt;String&gt;** | Column names for CSV output. | [optional] |
| **urls** | **Array&lt;String&gt;** | Seed URLs to start from instead of searching. | [optional] |
| **model** | [**ModelConfig**](ModelConfig.md) |  | [optional] |
| **sub_agent_model** | [**ModelConfig**](ModelConfig.md) |  | [optional] |
| **max_steps** | **Integer** | Maximum agent steps before stopping. | [optional][default to 15] |
| **skills** | **Array&lt;String&gt;** | Skills to pre-load for this run. | [optional] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::RunRequest.new(
  prompt: Get pricing for Vercel, Netlify, and Cloudflare Pages,
  stream: null,
  format: null,
  schema: null,
  columns: null,
  urls: null,
  model: null,
  sub_agent_model: null,
  max_steps: null,
  skills: null
)
```

