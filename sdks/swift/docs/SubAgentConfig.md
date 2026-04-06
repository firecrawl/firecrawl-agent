# SubAgentConfig

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**name** | **String** | Human-readable name shown in the tool description. | 
**description** | **String** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**instructions** | **String** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**tools** | **[String]** | Firecrawl tools available to this sub-agent. | [optional] 
**skills** | **[String]** | Skills to pre-load for this sub-agent. | [optional] 
**maxSteps** | **Int** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


