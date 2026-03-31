# WWW::OpenAPIClient::Object::RunRequest

## Load the model package
```perl
use WWW::OpenAPIClient::Object::RunRequest;
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **string** | The research task or question. | 
**stream** | **boolean** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to false]
**format** | **string** | Desired output format. If set, agent will format data accordingly. | [optional] 
**schema** | **object** | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  | [optional] 
**columns** | **ARRAY[string]** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional] 
**urls** | **ARRAY[string]** | Seed URLs to start from instead of searching. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**sub_agent_model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**max_steps** | **int** | Maximum agent steps before stopping. | [optional] [default to 15]
**skills** | **ARRAY[string]** | Skills to pre-load for this run. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


