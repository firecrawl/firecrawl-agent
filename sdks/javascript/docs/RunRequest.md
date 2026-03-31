
# RunRequest


## Properties

Name | Type
------------ | -------------
`prompt` | string
`stream` | boolean
`format` | string
`schema` | object
`columns` | Array&lt;string&gt;
`urls` | Array&lt;string&gt;
`model` | [ModelConfig](ModelConfig.md)
`subAgentModel` | [ModelConfig](ModelConfig.md)
`maxSteps` | number
`skills` | Array&lt;string&gt;

## Example

```typescript
import type { RunRequest } from '@firecrawl/agent-sdk'

// TODO: Update the object below with actual values
const example = {
  "prompt": Get pricing for Vercel, Netlify, and Cloudflare Pages,
  "stream": null,
  "format": null,
  "schema": null,
  "columns": null,
  "urls": null,
  "model": null,
  "subAgentModel": null,
  "maxSteps": null,
  "skills": null,
} satisfies RunRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RunRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


