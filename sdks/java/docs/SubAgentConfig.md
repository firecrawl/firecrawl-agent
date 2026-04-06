

# SubAgentConfig


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** | Unique identifier for this sub-agent (used as the tool name suffix). |  |
|**name** | **String** | Human-readable name shown in the tool description. |  |
|**description** | **String** | What this sub-agent does. Included in the tool description for the orchestrator. |  |
|**instructions** | **String** | Custom instructions appended to the sub-agent&#39;s system prompt. |  [optional] |
|**model** | [**ModelConfig**](ModelConfig.md) |  |  [optional] |
|**tools** | [**List&lt;ToolsEnum&gt;**](#List&lt;ToolsEnum&gt;) | Firecrawl tools available to this sub-agent. |  [optional] |
|**skills** | **List&lt;String&gt;** | Skills to pre-load for this sub-agent. |  [optional] |
|**maxSteps** | **Integer** | Maximum steps before the sub-agent stops. |  [optional] |



## Enum: List&lt;ToolsEnum&gt;

| Name | Value |
|---- | -----|
| SEARCH | &quot;search&quot; |
| SCRAPE | &quot;scrape&quot; |
| INTERACT | &quot;interact&quot; |
| MAP | &quot;map&quot; |



