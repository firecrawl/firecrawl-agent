# Skill
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | **String** |  | [optional] 
**Description** | **String** |  | [optional] 
**Category** | **String** |  | [optional] 
**Resources** | **String[]** |  | [optional] 

## Examples

- Prepare the resource
```powershell
$Skill = Initialize-FirecrawlAgentSkill  -Name null `
 -Description null `
 -Category null `
 -Resources null
```

- Convert the resource to JSON
```powershell
$Skill | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

