# FirecrawlAgent::AgentEvent

## Class instance methods

### `openapi_one_of`

Returns the list of classes defined in oneOf.

#### Example

```ruby
require 'firecrawl_agent'

FirecrawlAgent::AgentEvent.openapi_one_of
# =>
# [
#   :'AgentEventOneOf',
#   :'AgentEventOneOf1',
#   :'AgentEventOneOf2',
#   :'AgentEventOneOf3',
#   :'AgentEventOneOf4',
#   :'AgentEventOneOf5'
# ]
```

### build

Find the appropriate object from the `openapi_one_of` list and casts the data into it.

#### Example

```ruby
require 'firecrawl_agent'

FirecrawlAgent::AgentEvent.build(data)
# => #<AgentEventOneOf:0x00007fdd4aab02a0>

FirecrawlAgent::AgentEvent.build(data_that_doesnt_match)
# => nil
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| **data** | **Mixed** | data to be matched against the list of oneOf items |

#### Return type

- `AgentEventOneOf`
- `AgentEventOneOf1`
- `AgentEventOneOf2`
- `AgentEventOneOf3`
- `AgentEventOneOf4`
- `AgentEventOneOf5`
- `nil` (if no type matches)

