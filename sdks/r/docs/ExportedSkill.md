# openapi::ExportedSkill

A reusable skill package generated from the run's tool call history. Present when exportSkill=true in the request. 

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **character** | Slug identifier for the skill. | [optional] 
**skillMd** | **character** | Full SKILL.md content with frontmatter. | [optional] 
**workflow** | **character** | Deterministic workflow.mjs script content. | [optional] 
**schema** | **character** | Expected output schema.json content. | [optional] 


