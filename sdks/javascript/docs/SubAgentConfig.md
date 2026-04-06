
# SubAgentConfig


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`instructions` | string
`model` | [ModelConfig](ModelConfig.md)
`tools` | Array&lt;string&gt;
`skills` | Array&lt;string&gt;
`maxSteps` | number

## Example

```typescript
import type { SubAgentConfig } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "instructions": null,
  "model": null,
  "tools": null,
  "skills": null,
  "maxSteps": null,
} satisfies SubAgentConfig

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SubAgentConfig
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


