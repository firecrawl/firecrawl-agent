
# ExportedSkill

A reusable skill package generated from the run\'s tool call history. Present when exportSkill=true in the request. 

## Properties

Name | Type
------------ | -------------
`name` | string
`skillMd` | string
`workflow` | string
`schema` | string

## Example

```typescript
import type { ExportedSkill } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "skillMd": null,
  "workflow": null,
  "schema": null,
} satisfies ExportedSkill

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExportedSkill
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


