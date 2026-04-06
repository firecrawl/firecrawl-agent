
# AgentEvent

Server-sent event payload (when stream=true)

## Properties

Name | Type
------------ | -------------
`type` | any
`content` | string
`name` | string
`input` | object
`output` | object
`usage` | [Usage](Usage.md)
`text` | string
`steps` | [Array&lt;StepDetail&gt;](StepDetail.md)
`error` | string

## Example

```typescript
import type { AgentEvent } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "content": null,
  "name": null,
  "input": null,
  "output": null,
  "usage": null,
  "text": null,
  "steps": null,
  "error": null,
} satisfies AgentEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AgentEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


