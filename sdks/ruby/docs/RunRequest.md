# FirecrawlAgent::RunRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **prompt** | **String** | The research task or question. |  |
| **stream** | **Boolean** | If true, response is an SSE stream of AgentEvent objects. | [optional][default to false] |
| **format** | **String** | Desired output format. If set, agent will format data accordingly. | [optional] |
| **schema** | **Object** | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  | [optional] |
| **columns** | **Array&lt;String&gt;** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional] |
| **urls** | **Array&lt;String&gt;** | Seed URLs to start from instead of searching. | [optional] |
| **model** | [**ModelConfig**](ModelConfig.md) |  | [optional] |
| **sub_agent_model** | [**ModelConfig**](ModelConfig.md) |  | [optional] |
| **max_steps** | **Integer** | Maximum agent steps before stopping. | [optional][default to 15] |
| **skills** | **Array&lt;String&gt;** | Skills to pre-load for this run. | [optional] |
| **skill_instructions** | **Hash&lt;String, String&gt;** | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  | [optional] |
| **sub_agents** | [**Array&lt;SubAgentConfig&gt;**](SubAgentConfig.md) | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  | [optional] |
| **export_skill** | **Boolean** | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  | [optional][default to false] |

## Example

```ruby
require 'firecrawl_agent'

instance = FirecrawlAgent::RunRequest.new(
  prompt: Get pricing for Vercel, Netlify, and Cloudflare Pages,
  stream: null,
  format: null,
  schema: null,
  columns: null,
  urls: null,
  model: null,
  sub_agent_model: null,
  max_steps: null,
  skills: null,
  skill_instructions: null,
  sub_agents: null,
  export_skill: null
)
```

