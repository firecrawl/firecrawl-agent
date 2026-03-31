# RunRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **String** | The research task or question. | 
**stream** | Option<**bool**> | If true, response is an SSE stream of AgentEvent objects. | [optional][default to false]
**format** | Option<**Format**> | Desired output format. If set, agent will format data accordingly. (enum: json, csv, markdown) | [optional]
**schema** | Option<**serde_json::Value**> | JSON Schema for structured output (used with format=json). | [optional]
**columns** | Option<**Vec<String>**> | Column names for CSV output. | [optional]
**urls** | Option<**Vec<String>**> | Seed URLs to start from instead of searching. | [optional]
**model** | Option<[**models::ModelConfig**](ModelConfig.md)> |  | [optional]
**sub_agent_model** | Option<[**models::ModelConfig**](ModelConfig.md)> |  | [optional]
**max_steps** | Option<**i32**> | Maximum agent steps before stopping. | [optional][default to 15]
**skills** | Option<**Vec<String>**> | Skills to pre-load for this run. | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


