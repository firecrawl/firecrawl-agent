# ExportedSkill
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | **String** | Slug identifier for the skill. | [optional] 
**SkillMd** | **String** | Full SKILL.md content with frontmatter. | [optional] 
**Workflow** | **String** | Deterministic workflow.mjs script content. | [optional] 
**Schema** | **String** | Expected output schema.json content. | [optional] 

## Examples

- Prepare the resource
```powershell
$ExportedSkill = Initialize-FirecrawlAgentExportedSkill  -Name null `
 -SkillMd null `
 -Workflow null `
 -Schema null
```

- Convert the resource to JSON
```powershell
$ExportedSkill | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

