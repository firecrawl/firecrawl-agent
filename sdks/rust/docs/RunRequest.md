# RunRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **String** | The research task or question. | 
**stream** | Option<**bool**> | If true, response is an SSE stream of AgentEvent objects. | [optional][default to false]
**format** | Option<**Format**> | Desired output format. If set, agent will format data accordingly. (enum: json, csv, markdown) | [optional]
**schema** | Option<**serde_json::Value**> | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \"find all items.\" The final output is compiled into this exact shape. Used with format=json.  | [optional]
**columns** | Option<**Vec<String>**> | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional]
**urls** | Option<**Vec<String>**> | Seed URLs to start from instead of searching. | [optional]
**model** | Option<[**models::ModelConfig**](ModelConfig.md)> |  | [optional]
**sub_agent_model** | Option<[**models::ModelConfig**](ModelConfig.md)> |  | [optional]
**max_steps** | Option<**i32**> | Maximum agent steps before stopping. | [optional][default to 15]
**skills** | Option<**Vec<String>**> | Skills to pre-load for this run. | [optional]
**skill_instructions** | Option<**std::collections::HashMap<String, String>**> | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  | [optional]
**sub_agents** | Option<[**Vec<models::SubAgentConfig>**](SubAgentConfig.md)> | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  | [optional]
**export_skill** | Option<**bool**> | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  | [optional][default to false]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


