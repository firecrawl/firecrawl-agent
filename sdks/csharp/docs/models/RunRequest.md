# FirecrawlAgent.Model.RunRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Prompt** | **string** | The research task or question. | 
**Stream** | **bool** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to false]
**Format** | **string** | Desired output format. If set, agent will format data accordingly. | [optional] 
**Schema** | **Object** | JSON Schema for structured output (used with format&#x3D;json). | [optional] 
**Columns** | **List&lt;string&gt;** | Column names for CSV output. | [optional] 
**Urls** | **List&lt;string&gt;** | Seed URLs to start from instead of searching. | [optional] 
**Model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**SubAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**MaxSteps** | **int** | Maximum agent steps before stopping. | [optional] [default to 15]
**Skills** | **List&lt;string&gt;** | Skills to pre-load for this run. | [optional] 

[[Back to Model list]](../../README.md#documentation-for-models) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to README]](../../README.md)

