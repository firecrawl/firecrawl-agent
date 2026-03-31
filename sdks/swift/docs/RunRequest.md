# RunRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **String** | The research task or question. | 
**stream** | **Bool** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to false]
**format** | **String** | Desired output format. If set, agent will format data accordingly. | [optional] 
**schema** | **JSONValue** | JSON Schema for structured output (used with format&#x3D;json). | [optional] 
**columns** | **[String]** | Column names for CSV output. | [optional] 
**urls** | **[String]** | Seed URLs to start from instead of searching. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**subAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**maxSteps** | **Int** | Maximum agent steps before stopping. | [optional] [default to 15]
**skills** | **[String]** | Skills to pre-load for this run. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


