# openapi::SubAgentConfig


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **character** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**name** | **character** | Human-readable name shown in the tool description. | 
**description** | **character** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**instructions** | **character** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**tools** | **array[character]** | Firecrawl tools available to this sub-agent. | [optional] [Enum: ] 
**skills** | **array[character]** | Skills to pre-load for this sub-agent. | [optional] 
**maxSteps** | **integer** | Maximum steps before the sub-agent stops. | [optional] [default to 10] [Max: 50] [Min: 1] 


