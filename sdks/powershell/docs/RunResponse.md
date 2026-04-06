# RunResponse
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Text** | **String** | The agent&#39;s final text response. | [optional] 
**VarData** | **String** | Formatted output (present when format was specified). | [optional] 
**Format** | **String** | The format of the data field. | [optional] 
**Steps** | [**StepDetail[]**](StepDetail.md) |  | [optional] 
**Usage** | [**Usage**](Usage.md) |  | [optional] 
**ExportedSkill** | [**ExportedSkill**](ExportedSkill.md) |  | [optional] 

## Examples

- Prepare the resource
```powershell
$RunResponse = Initialize-FirecrawlAgentRunResponse  -Text null `
 -VarData null `
 -Format null `
 -Steps null `
 -Usage null `
 -ExportedSkill null
```

- Convert the resource to JSON
```powershell
$RunResponse | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

