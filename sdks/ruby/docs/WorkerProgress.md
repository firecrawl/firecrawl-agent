# FirecrawlAgent::WorkerProgress

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** |  | [optional] |
| **status** | **String** |  | [optional] |
| **steps** | **Integer** |  | [optional] |
| **current_tool** | **String** |  | [optional] |
| **tokens** | **Integer** |  | [optional] |
| **step_log** | [**Array&lt;WorkerProgressStepLogInner&gt;**](WorkerProgressStepLogInner.md) |  | [optional] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::WorkerProgress.new(
  id: null,
  status: null,
  steps: null,
  current_tool: null,
  tokens: null,
  step_log: null
)
```

