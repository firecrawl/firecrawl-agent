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
**skillInstructions** | **map(character)** | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  | [optional] 
**subAgents** | [**array[SubAgentConfig]**](SubAgentConfig.md) | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  | [optional] 
**exportSkill** | **character** | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  | [optional] [default to FALSE] 


