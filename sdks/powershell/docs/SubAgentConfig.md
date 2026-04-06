# SubAgentConfig
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **String** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**Name** | **String** | Human-readable name shown in the tool description. | 
**Description** | **String** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**Instructions** | **String** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**Model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**Tools** | **String[]** | Firecrawl tools available to this sub-agent. | [optional] 
**Skills** | **String[]** | Skills to pre-load for this sub-agent. | [optional] 
**MaxSteps** | **Int32** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

## Examples

- Prepare the resource
```powershell
$SubAgentConfig = Initialize-FirecrawlAgentSubAgentConfig  -Id null `
 -Name null `
 -Description null `
 -Instructions null `
 -Model null `
 -Tools null `
 -Skills null `
 -MaxSteps null
```

- Convert the resource to JSON
```powershell
$SubAgentConfig | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

