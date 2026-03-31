
# StepDetail


## Properties

Name | Type
------------ | -------------
`text` | string
`toolCalls` | [Array&lt;StepDetailToolCallsInner&gt;](StepDetailToolCallsInner.md)
`toolResults` | [Array&lt;StepDetailToolResultsInner&gt;](StepDetailToolResultsInner.md)

## Example

```typescript
import type { StepDetail } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "text": null,
  "toolCalls": null,
  "toolResults": null,
} satisfies StepDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StepDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


