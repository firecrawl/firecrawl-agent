# Usage
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**InputTokens** | **Int32** |  | [optional] 
**OutputTokens** | **Int32** |  | [optional] 
**TotalTokens** | **Int32** |  | [optional] 

## Examples

- Prepare the resource
```powershell
$Usage = Initialize-FirecrawlAgentUsage  -InputTokens null `
 -OutputTokens null `
 -TotalTokens null
```

- Convert the resource to JSON
```powershell
$Usage | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

