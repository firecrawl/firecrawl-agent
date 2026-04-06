

# RunResponse


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**text** | **String** | The agent&#39;s final text response. |  [optional] |
|**data** | **String** | Formatted output (present when format was specified). |  [optional] |
|**format** | [**FormatEnum**](#FormatEnum) | The format of the data field. |  [optional] |
|**steps** | [**List&lt;StepDetail&gt;**](StepDetail.md) |  |  [optional] |
|**usage** | [**Usage**](Usage.md) |  |  [optional] |
|**exportedSkill** | [**ExportedSkill**](ExportedSkill.md) |  |  [optional] |



## Enum: FormatEnum

| Name | Value |
|---- | -----|
| JSON | &quot;json&quot; |
| CSV | &quot;csv&quot; |
| MARKDOWN | &quot;markdown&quot; |
| TEXT | &quot;text&quot; |



