# AgentEventOneOf4

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Type** | Pointer to **interface{}** |  | [optional] 
**Text** | Pointer to **string** |  | [optional] 
**Steps** | Pointer to [**[]StepDetail**](StepDetail.md) |  | [optional] 
**Usage** | Pointer to [**Usage**](Usage.md) |  | [optional] 

## Methods

### NewAgentEventOneOf4

`func NewAgentEventOneOf4() *AgentEventOneOf4`

NewAgentEventOneOf4 instantiates a new AgentEventOneOf4 object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAgentEventOneOf4WithDefaults

`func NewAgentEventOneOf4WithDefaults() *AgentEventOneOf4`

NewAgentEventOneOf4WithDefaults instantiates a new AgentEventOneOf4 object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetType

`func (o *AgentEventOneOf4) GetType() interface{}`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *AgentEventOneOf4) GetTypeOk() (*interface{}, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *AgentEventOneOf4) SetType(v interface{})`

SetType sets Type field to given value.

### HasType

`func (o *AgentEventOneOf4) HasType() bool`

HasType returns a boolean if a field has been set.

### SetTypeNil

`func (o *AgentEventOneOf4) SetTypeNil(b bool)`

 SetTypeNil sets the value for Type to be an explicit nil

### UnsetType
`func (o *AgentEventOneOf4) UnsetType()`

UnsetType ensures that no value is present for Type, not even an explicit nil
### GetText

`func (o *AgentEventOneOf4) GetText() string`

GetText returns the Text field if non-nil, zero value otherwise.

### GetTextOk

`func (o *AgentEventOneOf4) GetTextOk() (*string, bool)`

GetTextOk returns a tuple with the Text field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetText

`func (o *AgentEventOneOf4) SetText(v string)`

SetText sets Text field to given value.

### HasText

`func (o *AgentEventOneOf4) HasText() bool`

HasText returns a boolean if a field has been set.

### GetSteps

`func (o *AgentEventOneOf4) GetSteps() []StepDetail`

GetSteps returns the Steps field if non-nil, zero value otherwise.

### GetStepsOk

`func (o *AgentEventOneOf4) GetStepsOk() (*[]StepDetail, bool)`

GetStepsOk returns a tuple with the Steps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSteps

`func (o *AgentEventOneOf4) SetSteps(v []StepDetail)`

SetSteps sets Steps field to given value.

### HasSteps

`func (o *AgentEventOneOf4) HasSteps() bool`

HasSteps returns a boolean if a field has been set.

### GetUsage

`func (o *AgentEventOneOf4) GetUsage() Usage`

GetUsage returns the Usage field if non-nil, zero value otherwise.

### GetUsageOk

`func (o *AgentEventOneOf4) GetUsageOk() (*Usage, bool)`

GetUsageOk returns a tuple with the Usage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsage

`func (o *AgentEventOneOf4) SetUsage(v Usage)`

SetUsage sets Usage field to given value.

### HasUsage

`func (o *AgentEventOneOf4) HasUsage() bool`

HasUsage returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


