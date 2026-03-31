
# RunRequest

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **prompt** | **kotlin.String** | The research task or question. |  |
| **stream** | **kotlin.Boolean** | If true, response is an SSE stream of AgentEvent objects. |  [optional] |
| **format** | [**inline**](#Format) | Desired output format. If set, agent will format data accordingly. |  [optional] |
| **schema** | [**kotlin.Any**](.md) | JSON Schema for structured output (used with format&#x3D;json). |  [optional] |
| **columns** | **kotlin.collections.List&lt;kotlin.String&gt;** | Column names for CSV output. |  [optional] |
| **urls** | **kotlin.collections.List&lt;kotlin.String&gt;** | Seed URLs to start from instead of searching. |  [optional] |
| **model** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
| **subAgentModel** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
| **maxSteps** | **kotlin.Int** | Maximum agent steps before stopping. |  [optional] |
| **skills** | **kotlin.collections.List&lt;kotlin.String&gt;** | Skills to pre-load for this run. |  [optional] |


<a id="Format"></a>
## Enum: format
| Name | Value |
| ---- | ----- |
| format | json, csv, markdown |



