# SubAgentConfig

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**name** | **String** | Human-readable name shown in the tool description. | 
**description** | **String** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**instructions** | Option<**String**> | Custom instructions appended to the sub-agent's system prompt. | [optional]
**model** | Option<[**models::ModelConfig**](ModelConfig.md)> |  | [optional]
**tools** | Option<**Vec<Tools>**> | Firecrawl tools available to this sub-agent. (enum: search, scrape, interact, map) | [optional]
**skills** | Option<**Vec<String>**> | Skills to pre-load for this sub-agent. | [optional]
**max_steps** | Option<**i32**> | Maximum steps before the sub-agent stops. | [optional][default to 10]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


