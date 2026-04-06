# AgentEvent
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Type** | [**AnyType**](.md) |  | [optional] 
**Content** | **String** |  | [optional] 
**Name** | **String** |  | [optional] 
**VarInput** | [**SystemCollectionsHashtable**](.md) |  | [optional] 
**Output** | [**SystemCollectionsHashtable**](.md) |  | [optional] 
**Usage** | [**Usage**](Usage.md) |  | [optional] 
**Text** | **String** |  | [optional] 
**Steps** | [**StepDetail[]**](StepDetail.md) |  | [optional] 
**VarError** | **String** |  | [optional] 

## Examples

- Prepare the resource
```powershell
$AgentEvent = Initialize-FirecrawlAgentAgentEvent  -Type null `
 -Content null `
 -Name null `
 -VarInput null `
 -Output null `
 -Usage null `
 -Text null `
 -Steps null `
 -VarError null
```

- Convert the resource to JSON
```powershell
$AgentEvent | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

