# FirecrawlAgent::StepDetail

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **text** | **String** |  | [optional] |
| **tool_calls** | [**Array&lt;StepDetailToolCallsInner&gt;**](StepDetailToolCallsInner.md) |  | [optional] |
| **tool_results** | [**Array&lt;StepDetailToolResultsInner&gt;**](StepDetailToolResultsInner.md) |  | [optional] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::StepDetail.new(
  text: null,
  tool_calls: null,
  tool_results: null
)
```

