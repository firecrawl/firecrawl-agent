
# RunResponse

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **text** | **kotlin.String** | The agent&#39;s final text response. |  [optional] |
| **&#x60;data&#x60;** | **kotlin.String** | Formatted output (present when format was specified). |  [optional] |
| **format** | [**inline**](#Format) | The format of the data field. |  [optional] |
| **steps** | [**kotlin.collections.List&lt;StepDetail&gt;**](StepDetail.md) |  |  [optional] |
| **usage** | [**Usage**](Usage.md) |  |  [optional] |
| **exportedSkill** | [**ExportedSkill**](ExportedSkill.md) |  |  [optional] |


<a id="Format"></a>
## Enum: format
| Name | Value |
| ---- | ----- |
| format | json, csv, markdown, text |



