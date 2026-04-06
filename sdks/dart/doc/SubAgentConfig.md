# firecrawl_agent.model.SubAgentConfig

## Load the model package
```dart
import 'package:firecrawl_agent/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**name** | **String** | Human-readable name shown in the tool description. | 
**description** | **String** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**instructions** | **String** | Custom instructions appended to the sub-agent's system prompt. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**tools** | **List<String>** | Firecrawl tools available to this sub-agent. | [optional] [default to const []]
**skills** | **List<String>** | Skills to pre-load for this sub-agent. | [optional] [default to const []]
**maxSteps** | **int** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


