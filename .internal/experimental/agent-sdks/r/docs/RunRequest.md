# openapi::RunRequest


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **character** | The research task or question. | 
**stream** | **character** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to FALSE] 
**format** | **character** | Desired output format. If set, agent will format data accordingly. | [optional] [Enum: [json, csv, markdown]] 
**schema** | **object** | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  | [optional] 
**columns** | **array[character]** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional] 
**urls** | **array[character]** | Seed URLs to start from instead of searching. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**subAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**maxSteps** | **integer** | Maximum agent steps before stopping. | [optional] [default to 15] [Max: 50] [Min: 1] 
**skills** | **array[character]** | Skills to pre-load for this run. | [optional] 


