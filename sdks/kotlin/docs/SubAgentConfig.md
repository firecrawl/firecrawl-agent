
# SubAgentConfig

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **id** | **kotlin.String** | Unique identifier for this sub-agent (used as the tool name suffix). |  |
| **name** | **kotlin.String** | Human-readable name shown in the tool description. |  |
| **description** | **kotlin.String** | What this sub-agent does. Included in the tool description for the orchestrator. |  |
| **instructions** | **kotlin.String** | Custom instructions appended to the sub-agent&#39;s system prompt. |  [optional] |
| **model** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
| **tools** | [**inline**](#kotlin.collections.List&lt;Tools&gt;) | Firecrawl tools available to this sub-agent. |  [optional] |
| **skills** | **kotlin.collections.List&lt;kotlin.String&gt;** | Skills to pre-load for this sub-agent. |  [optional] |
| **maxSteps** | **kotlin.Int** | Maximum steps before the sub-agent stops. |  [optional] |


<a id="kotlin.collections.List<Tools>"></a>
## Enum: tools
| Name | Value |
| ---- | ----- |
| tools | search, scrape, interact, map |



