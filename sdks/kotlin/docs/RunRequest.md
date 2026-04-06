
# RunRequest

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **prompt** | **kotlin.String** | The research task or question. |  |
| **stream** | **kotlin.Boolean** | If true, response is an SSE stream of AgentEvent objects. |  [optional] |
| **format** | [**inline**](#Format) | Desired output format. If set, agent will format data accordingly. |  [optional] |
| **schema** | [**kotlin.Any**](.md) | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  |  [optional] |
| **columns** | **kotlin.collections.List&lt;kotlin.String&gt;** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  |  [optional] |
| **urls** | **kotlin.collections.List&lt;kotlin.String&gt;** | Seed URLs to start from instead of searching. |  [optional] |
| **model** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
| **subAgentModel** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
| **maxSteps** | **kotlin.Int** | Maximum agent steps before stopping. |  [optional] |
| **skills** | **kotlin.collections.List&lt;kotlin.String&gt;** | Skills to pre-load for this run. |  [optional] |
| **skillInstructions** | **kotlin.collections.Map&lt;kotlin.String, kotlin.String&gt;** | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  |  [optional] |
| **subAgents** | [**kotlin.collections.List&lt;SubAgentConfig&gt;**](SubAgentConfig.md) | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  |  [optional] |
| **exportSkill** | **kotlin.Boolean** | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  |  [optional] |


<a id="Format"></a>
## Enum: format
| Name | Value |
| ---- | ----- |
| format | json, csv, markdown |



