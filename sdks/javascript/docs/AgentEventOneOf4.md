
# AgentEventOneOf4


## Properties

Name | Type
------------ | -------------
`type` | any
`text` | string
`steps` | [Array&lt;StepDetail&gt;](StepDetail.md)
`usage` | [Usage](Usage.md)

## Example

```typescript
import type { AgentEventOneOf4 } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "text": null,
  "steps": null,
  "usage": null,
} satisfies AgentEventOneOf4

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AgentEventOneOf4
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


