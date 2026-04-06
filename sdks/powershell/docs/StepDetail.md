# StepDetail
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Text** | **String** |  | [optional] 
**ToolCalls** | [**StepDetailToolCallsInner[]**](StepDetailToolCallsInner.md) |  | [optional] 
**ToolResults** | [**StepDetailToolResultsInner[]**](StepDetailToolResultsInner.md) |  | [optional] 

## Examples

- Prepare the resource
```powershell
$StepDetail = Initialize-FirecrawlAgentStepDetail  -Text null `
 -ToolCalls null `
 -ToolResults null
```

- Convert the resource to JSON
```powershell
$StepDetail | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

