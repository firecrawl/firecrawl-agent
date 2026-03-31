# RunRequest
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Prompt** | **String** | The research task or question. | 
**Stream** | **Boolean** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to $false]
**Format** | **String** | Desired output format. If set, agent will format data accordingly. | [optional] 
**Schema** | [**SystemCollectionsHashtable**](.md) | JSON Schema for structured output (used with format&#x3D;json). | [optional] 
**Columns** | **String[]** | Column names for CSV output. | [optional] 
**Urls** | **String[]** | Seed URLs to start from instead of searching. | [optional] 
**Model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**SubAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**MaxSteps** | **Int32** | Maximum agent steps before stopping. | [optional] [default to 15]
**Skills** | **String[]** | Skills to pre-load for this run. | [optional] 

## Examples

- Prepare the resource
```powershell
$RunRequest = Initialize-FirecrawlAgentRunRequest  -Prompt Get pricing for Vercel, Netlify, and Cloudflare Pages `
 -Stream null `
 -Format null `
 -Schema null `
 -Columns null `
 -Urls null `
 -Model null `
 -SubAgentModel null `
 -MaxSteps null `
 -Skills null
```

- Convert the resource to JSON
```powershell
$RunRequest | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

