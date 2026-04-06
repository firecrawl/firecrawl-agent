# RunResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Text** | Pointer to **string** | The agent&#39;s final text response. | [optional] 
**Data** | Pointer to **string** | Formatted output (present when format was specified). | [optional] 
**Format** | Pointer to **string** | The format of the data field. | [optional] 
**Steps** | Pointer to [**[]StepDetail**](StepDetail.md) |  | [optional] 
**Usage** | Pointer to [**Usage**](Usage.md) |  | [optional] 
**ExportedSkill** | Pointer to [**ExportedSkill**](ExportedSkill.md) |  | [optional] 

## Methods

### NewRunResponse

`func NewRunResponse() *RunResponse`

NewRunResponse instantiates a new RunResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewRunResponseWithDefaults

`func NewRunResponseWithDefaults() *RunResponse`

NewRunResponseWithDefaults instantiates a new RunResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetText

`func (o *RunResponse) GetText() string`

GetText returns the Text field if non-nil, zero value otherwise.

### GetTextOk

`func (o *RunResponse) GetTextOk() (*string, bool)`

GetTextOk returns a tuple with the Text field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetText

`func (o *RunResponse) SetText(v string)`

SetText sets Text field to given value.

### HasText

`func (o *RunResponse) HasText() bool`

HasText returns a boolean if a field has been set.

### GetData

`func (o *RunResponse) GetData() string`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *RunResponse) GetDataOk() (*string, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *RunResponse) SetData(v string)`

SetData sets Data field to given value.

### HasData

`func (o *RunResponse) HasData() bool`

HasData returns a boolean if a field has been set.

### GetFormat

`func (o *RunResponse) GetFormat() string`

GetFormat returns the Format field if non-nil, zero value otherwise.

### GetFormatOk

`func (o *RunResponse) GetFormatOk() (*string, bool)`

GetFormatOk returns a tuple with the Format field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormat

`func (o *RunResponse) SetFormat(v string)`

SetFormat sets Format field to given value.

### HasFormat

`func (o *RunResponse) HasFormat() bool`

HasFormat returns a boolean if a field has been set.

### GetSteps

`func (o *RunResponse) GetSteps() []StepDetail`

GetSteps returns the Steps field if non-nil, zero value otherwise.

### GetStepsOk

`func (o *RunResponse) GetStepsOk() (*[]StepDetail, bool)`

GetStepsOk returns a tuple with the Steps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSteps

`func (o *RunResponse) SetSteps(v []StepDetail)`

SetSteps sets Steps field to given value.

### HasSteps

`func (o *RunResponse) HasSteps() bool`

HasSteps returns a boolean if a field has been set.

### GetUsage

`func (o *RunResponse) GetUsage() Usage`

GetUsage returns the Usage field if non-nil, zero value otherwise.

### GetUsageOk

`func (o *RunResponse) GetUsageOk() (*Usage, bool)`

GetUsageOk returns a tuple with the Usage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsage

`func (o *RunResponse) SetUsage(v Usage)`

SetUsage sets Usage field to given value.

### HasUsage

`func (o *RunResponse) HasUsage() bool`

HasUsage returns a boolean if a field has been set.

### GetExportedSkill

`func (o *RunResponse) GetExportedSkill() ExportedSkill`

GetExportedSkill returns the ExportedSkill field if non-nil, zero value otherwise.

### GetExportedSkillOk

`func (o *RunResponse) GetExportedSkillOk() (*ExportedSkill, bool)`

GetExportedSkillOk returns a tuple with the ExportedSkill field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExportedSkill

`func (o *RunResponse) SetExportedSkill(v ExportedSkill)`

SetExportedSkill sets ExportedSkill field to given value.

### HasExportedSkill

`func (o *RunResponse) HasExportedSkill() bool`

HasExportedSkill returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


