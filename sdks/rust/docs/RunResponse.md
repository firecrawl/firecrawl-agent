# RunResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**text** | Option<**String**> | The agent's final text response. | [optional]
**data** | Option<**String**> | Formatted output (present when format was specified). | [optional]
**format** | Option<**Format**> | The format of the data field. (enum: json, csv, markdown, text) | [optional]
**steps** | Option<[**Vec<models::StepDetail>**](StepDetail.md)> |  | [optional]
**usage** | Option<[**models::Usage**](Usage.md)> |  | [optional]
**exported_skill** | Option<[**models::ExportedSkill**](ExportedSkill.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


