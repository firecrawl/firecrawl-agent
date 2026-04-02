# FirecrawlAgent.Model.RunRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Prompt** | **string** | The research task or question. | 
**Stream** | **bool** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to false]
**Format** | **string** | Desired output format. If set, agent will format data accordingly. | [optional] 
**Schema** | **Object** | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  | [optional] 
**Columns** | **List&lt;string&gt;** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional] 
**Urls** | **List&lt;string&gt;** | Seed URLs to start from instead of searching. | [optional] 
**Model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**SubAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**MaxSteps** | **int** | Maximum agent steps before stopping. | [optional] [default to 15]
**Skills** | **List&lt;string&gt;** | Skills to pre-load for this run. | [optional] 

[[Back to Model list]](../../README.md#documentation-for-models) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to README]](../../README.md)

