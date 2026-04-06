# FirecrawlAgent.Model.SubAgentConfig

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**Name** | **string** | Human-readable name shown in the tool description. | 
**Description** | **string** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**Instructions** | **string** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**Model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**Tools** | **List&lt;SubAgentConfig.ToolsEnum&gt;** | Firecrawl tools available to this sub-agent. | [optional] 
**Skills** | **List&lt;string&gt;** | Skills to pre-load for this sub-agent. | [optional] 
**MaxSteps** | **int** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

[[Back to Model list]](../../README.md#documentation-for-models) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to README]](../../README.md)

