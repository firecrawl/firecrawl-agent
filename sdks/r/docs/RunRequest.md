# openapi::RunRequest


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **character** | The research task or question. | 
**stream** | **character** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to FALSE] 
**format** | **character** | Desired output format. If set, agent will format data accordingly. | [optional] [Enum: [json, csv, markdown]] 
**schema** | **object** | JSON Schema for structured output (used with format&#x3D;json). | [optional] 
**columns** | **array[character]** | Column names for CSV output. | [optional] 
**urls** | **array[character]** | Seed URLs to start from instead of searching. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**subAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**maxSteps** | **integer** | Maximum agent steps before stopping. | [optional] [default to 15] [Max: 50] [Min: 1] 
**skills** | **array[character]** | Skills to pre-load for this run. | [optional] 


