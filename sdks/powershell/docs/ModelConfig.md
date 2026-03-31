# ModelConfig
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Provider** | **String** | LLM provider. | [optional] 
**Model** | **String** | Model identifier (e.g. &quot;&quot;gemini-3-flash-preview&quot;&quot;, &quot;&quot;claude-sonnet-4-6&quot;&quot;). | [optional] 

## Examples

- Prepare the resource
```powershell
$ModelConfig = Initialize-FirecrawlAgentModelConfig  -Provider null `
 -Model null
```

- Convert the resource to JSON
```powershell
$ModelConfig | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

