# WorkerProgress

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Status** | Pointer to **string** |  | [optional] 
**Steps** | Pointer to **int32** |  | [optional] 
**CurrentTool** | Pointer to **string** |  | [optional] 
**Tokens** | Pointer to **int32** |  | [optional] 
**StepLog** | Pointer to [**[]WorkerProgressStepLogInner**](WorkerProgressStepLogInner.md) |  | [optional] 

## Methods

### NewWorkerProgress

`func NewWorkerProgress() *WorkerProgress`

NewWorkerProgress instantiates a new WorkerProgress object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWorkerProgressWithDefaults

`func NewWorkerProgressWithDefaults() *WorkerProgress`

NewWorkerProgressWithDefaults instantiates a new WorkerProgress object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *WorkerProgress) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *WorkerProgress) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *WorkerProgress) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *WorkerProgress) HasId() bool`

HasId returns a boolean if a field has been set.

### GetStatus

`func (o *WorkerProgress) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *WorkerProgress) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *WorkerProgress) SetStatus(v string)`

SetStatus sets Status field to given value.

### HasStatus

`func (o *WorkerProgress) HasStatus() bool`

HasStatus returns a boolean if a field has been set.

### GetSteps

`func (o *WorkerProgress) GetSteps() int32`

GetSteps returns the Steps field if non-nil, zero value otherwise.

### GetStepsOk

`func (o *WorkerProgress) GetStepsOk() (*int32, bool)`

GetStepsOk returns a tuple with the Steps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSteps

`func (o *WorkerProgress) SetSteps(v int32)`

SetSteps sets Steps field to given value.

### HasSteps

`func (o *WorkerProgress) HasSteps() bool`

HasSteps returns a boolean if a field has been set.

### GetCurrentTool

`func (o *WorkerProgress) GetCurrentTool() string`

GetCurrentTool returns the CurrentTool field if non-nil, zero value otherwise.

### GetCurrentToolOk

`func (o *WorkerProgress) GetCurrentToolOk() (*string, bool)`

GetCurrentToolOk returns a tuple with the CurrentTool field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCurrentTool

`func (o *WorkerProgress) SetCurrentTool(v string)`

SetCurrentTool sets CurrentTool field to given value.

### HasCurrentTool

`func (o *WorkerProgress) HasCurrentTool() bool`

HasCurrentTool returns a boolean if a field has been set.

### GetTokens

`func (o *WorkerProgress) GetTokens() int32`

GetTokens returns the Tokens field if non-nil, zero value otherwise.

### GetTokensOk

`func (o *WorkerProgress) GetTokensOk() (*int32, bool)`

GetTokensOk returns a tuple with the Tokens field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTokens

`func (o *WorkerProgress) SetTokens(v int32)`

SetTokens sets Tokens field to given value.

### HasTokens

`func (o *WorkerProgress) HasTokens() bool`

HasTokens returns a boolean if a field has been set.

### GetStepLog

`func (o *WorkerProgress) GetStepLog() []WorkerProgressStepLogInner`

GetStepLog returns the StepLog field if non-nil, zero value otherwise.

### GetStepLogOk

`func (o *WorkerProgress) GetStepLogOk() (*[]WorkerProgressStepLogInner, bool)`

GetStepLogOk returns a tuple with the StepLog field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStepLog

`func (o *WorkerProgress) SetStepLog(v []WorkerProgressStepLogInner)`

SetStepLog sets StepLog field to given value.

### HasStepLog

`func (o *WorkerProgress) HasStepLog() bool`

HasStepLog returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


