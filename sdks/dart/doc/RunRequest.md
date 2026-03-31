# firecrawl_agent.model.RunRequest

## Load the model package
```dart
import 'package:firecrawl_agent/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **String** | The research task or question. | 
**stream** | **bool** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to false]
**format** | **String** | Desired output format. If set, agent will format data accordingly. | [optional] 
**schema** | **Object** | JSON Schema for structured output (used with format=json). | [optional] 
**columns** | **List<String>** | Column names for CSV output. | [optional] [default to const []]
**urls** | **List<String>** | Seed URLs to start from instead of searching. | [optional] [default to const []]
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**subAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**maxSteps** | **int** | Maximum agent steps before stopping. | [optional] [default to 15]
**skills** | **List<String>** | Skills to pre-load for this run. | [optional] [default to const []]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


