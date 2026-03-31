# StepDetail

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Text** | Pointer to **string** |  | [optional] 
**ToolCalls** | Pointer to [**[]StepDetailToolCallsInner**](StepDetailToolCallsInner.md) |  | [optional] 
**ToolResults** | Pointer to [**[]StepDetailToolResultsInner**](StepDetailToolResultsInner.md) |  | [optional] 

## Methods

### NewStepDetail

`func NewStepDetail() *StepDetail`

NewStepDetail instantiates a new StepDetail object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewStepDetailWithDefaults

`func NewStepDetailWithDefaults() *StepDetail`

NewStepDetailWithDefaults instantiates a new StepDetail object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetText

`func (o *StepDetail) GetText() string`

GetText returns the Text field if non-nil, zero value otherwise.

### GetTextOk

`func (o *StepDetail) GetTextOk() (*string, bool)`

GetTextOk returns a tuple with the Text field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetText

`func (o *StepDetail) SetText(v string)`

SetText sets Text field to given value.

### HasText

`func (o *StepDetail) HasText() bool`

HasText returns a boolean if a field has been set.

### GetToolCalls

`func (o *StepDetail) GetToolCalls() []StepDetailToolCallsInner`

GetToolCalls returns the ToolCalls field if non-nil, zero value otherwise.

### GetToolCallsOk

`func (o *StepDetail) GetToolCallsOk() (*[]StepDetailToolCallsInner, bool)`

GetToolCallsOk returns a tuple with the ToolCalls field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetToolCalls

`func (o *StepDetail) SetToolCalls(v []StepDetailToolCallsInner)`

SetToolCalls sets ToolCalls field to given value.

### HasToolCalls

`func (o *StepDetail) HasToolCalls() bool`

HasToolCalls returns a boolean if a field has been set.

### GetToolResults

`func (o *StepDetail) GetToolResults() []StepDetailToolResultsInner`

GetToolResults returns the ToolResults field if non-nil, zero value otherwise.

### GetToolResultsOk

`func (o *StepDetail) GetToolResultsOk() (*[]StepDetailToolResultsInner, bool)`

GetToolResultsOk returns a tuple with the ToolResults field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetToolResults

`func (o *StepDetail) SetToolResults(v []StepDetailToolResultsInner)`

SetToolResults sets ToolResults field to given value.

### HasToolResults

`func (o *StepDetail) HasToolResults() bool`

HasToolResults returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


