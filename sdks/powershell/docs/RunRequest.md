# RunRequest
## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Prompt** | **String** | The research task or question. | 
**Stream** | **Boolean** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to $false]
**Format** | **String** | Desired output format. If set, agent will format data accordingly. | [optional] 
**Schema** | [**SystemCollectionsHashtable**](.md) | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean &quot;&quot;find all items.&quot;&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  | [optional] 
**Columns** | **String[]** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional] 
**Urls** | **String[]** | Seed URLs to start from instead of searching. | [optional] 
**Model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**SubAgentModel** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**MaxSteps** | **Int32** | Maximum agent steps before stopping. | [optional] [default to 15]
**Skills** | **String[]** | Skills to pre-load for this run. | [optional] 
**SkillInstructions** | **System.Collections.Hashtable** | Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.  | [optional] 
**SubAgents** | [**SubAgentConfig[]**](SubAgentConfig.md) | Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.  | [optional] 
**ExportSkill** | **Boolean** | When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.  | [optional] [default to $false]

## Examples

- Prepare the resource
```powershell
$RunRequest = Initialize-FirecrawlAgentRunRequest  -Prompt Get pricing for Vercel, Netlify, and Cloudflare Pages `
 -Stream null `
 -Format null `
 -Schema null `
 -Columns null `
 -Urls null `
 -Model null `
 -SubAgentModel null `
 -MaxSteps null `
 -Skills null `
 -SkillInstructions null `
 -SubAgents null `
 -ExportSkill null
```

- Convert the resource to JSON
```powershell
$RunRequest | ConvertTo-JSON
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

