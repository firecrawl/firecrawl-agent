# FirecrawlAgent::RunResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **text** | **String** | The agent&#39;s final text response. | [optional] |
| **data** | **String** | Formatted output (present when format was specified). | [optional] |
| **format** | **String** | The format of the data field. | [optional] |
| **steps** | [**Array&lt;StepDetail&gt;**](StepDetail.md) |  | [optional] |
| **usage** | [**Usage**](Usage.md) |  | [optional] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::RunResponse.new(
  text: null,
  data: null,
  format: null,
  steps: null,
  usage: null
)
```

