
# WorkerProgress


## Properties

Name | Type
------------ | -------------
`id` | string
`status` | string
`steps` | number
`currentTool` | string
`tokens` | number
`stepLog` | [Array&lt;WorkerProgressStepLogInner&gt;](WorkerProgressStepLogInner.md)

## Example

```typescript
import type { WorkerProgress } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "steps": null,
  "currentTool": null,
  "tokens": null,
  "stepLog": null,
} satisfies WorkerProgress

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkerProgress
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


