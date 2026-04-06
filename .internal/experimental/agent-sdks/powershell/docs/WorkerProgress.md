# WorkerProgress
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **String** |  | [optional] 
**Status** | **String** |  | [optional] 
**Steps** | **Int32** |  | [optional] 
**CurrentTool** | **String** |  | [optional] 
**Tokens** | **Int32** |  | [optional] 
**StepLog** | [**WorkerProgressStepLogInner[]**](WorkerProgressStepLogInner.md) |  | [optional] 

## Examples

- Prepare the resource
```powershell
$WorkerProgress = Initialize-FirecrawlAgentWorkerProgress  -Id null `
 -Status null `
 -Steps null `
 -CurrentTool null `
 -Tokens null `
 -StepLog null
```

- Convert the resource to JSON
```powershell
$WorkerProgress | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

