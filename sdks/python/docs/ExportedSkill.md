# ExportedSkill

A reusable skill package generated from the run's tool call history. Present when exportSkill=true in the request. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** | Slug identifier for the skill. | [optional] 
**skill_md** | **str** | Full SKILL.md content with frontmatter. | [optional] 
**workflow** | **str** | Deterministic workflow.mjs script content. | [optional] 
**var_schema** | **str** | Expected output schema.json content. | [optional] 

## Example

```python
from firecrawl_agent.models.exported_skill import ExportedSkill

# TODO update the JSON string below
json = "{}"
# create an instance of ExportedSkill from a JSON string
exported_skill_instance = ExportedSkill.from_json(json)
# print the JSON string representation of the object
print(ExportedSkill.to_json())

# convert the object into a dict
exported_skill_dict = exported_skill_instance.to_dict()
# create an instance of ExportedSkill from a dict
exported_skill_from_dict = ExportedSkill.from_dict(exported_skill_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


