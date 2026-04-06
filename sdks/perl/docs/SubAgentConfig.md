# WWW::OpenAPIClient::Object::SubAgentConfig

## Load the model package
```perl
use WWW::OpenAPIClient::Object::SubAgentConfig;
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**name** | **string** | Human-readable name shown in the tool description. | 
**description** | **string** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**instructions** | **string** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**tools** | **ARRAY[string]** | Firecrawl tools available to this sub-agent. | [optional] 
**skills** | **ARRAY[string]** | Skills to pre-load for this sub-agent. | [optional] 
**max_steps** | **int** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


