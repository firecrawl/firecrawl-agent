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
**skill_instructions** | **HASH[string,string]** | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  | [optional] 
**sub_agents** | [**ARRAY[SubAgentConfig]**](SubAgentConfig.md) | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  | [optional] 
**export_skill** | **boolean** | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  | [optional] [default to false]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


