# openapi::RunResponse


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**text** | **character** | The agent&#39;s final text response. | [optional] 
**data** | **character** | Formatted output (present when format was specified). | [optional] 
**format** | **character** | The format of the data field. | [optional] [Enum: [json, csv, markdown, text]] 
**steps** | [**array[StepDetail]**](StepDetail.md) |  | [optional] 
**usage** | [**Usage**](Usage.md) |  | [optional] 


