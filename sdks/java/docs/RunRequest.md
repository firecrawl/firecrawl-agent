

# RunRequest


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**prompt** | **String** | The research task or question. |  |
|**stream** | **Boolean** | If true, response is an SSE stream of AgentEvent objects. |  [optional] |
|**format** | [**FormatEnum**](#FormatEnum) | Desired output format. If set, agent will format data accordingly. |  [optional] |
|**schema** | **Object** | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  |  [optional] |
|**columns** | **List&lt;String&gt;** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  |  [optional] |
|**urls** | **List&lt;String&gt;** | Seed URLs to start from instead of searching. |  [optional] |
|**model** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
|**subAgentModel** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
|**maxSteps** | **Integer** | Maximum agent steps before stopping. |  [optional] |
|**skills** | **List&lt;String&gt;** | Skills to pre-load for this run. |  [optional] |
|**skillInstructions** | **Map&lt;String, String&gt;** | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  |  [optional] |
|**subAgents** | [**List&lt;SubAgentConfig&gt;**](SubAgentConfig.md) | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  |  [optional] |
|**exportSkill** | **Boolean** | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  |  [optional] |



## Enum: FormatEnum

| Name | Value |
|---- | -----|
| JSON | &quot;json&quot; |
| CSV | &quot;csv&quot; |
| MARKDOWN | &quot;markdown&quot; |



