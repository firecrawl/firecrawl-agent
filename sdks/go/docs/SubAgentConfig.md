# SubAgentConfig

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**Name** | **string** | Human-readable name shown in the tool description. | 
**Description** | **string** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**Instructions** | Pointer to **string** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**Model** | Pointer to [**ModelConfig**](ModelConfig.md) |  | [optional] 
**Tools** | Pointer to **[]string** | Firecrawl tools available to this sub-agent. | [optional] 
**Skills** | Pointer to **[]string** | Skills to pre-load for this sub-agent. | [optional] 
**MaxSteps** | Pointer to **int32** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

## Methods

### NewSubAgentConfig

`func NewSubAgentConfig(id string, name string, description string, ) *SubAgentConfig`

NewSubAgentConfig instantiates a new SubAgentConfig object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSubAgentConfigWithDefaults

`func NewSubAgentConfigWithDefaults() *SubAgentConfig`

NewSubAgentConfigWithDefaults instantiates a new SubAgentConfig object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SubAgentConfig) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SubAgentConfig) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SubAgentConfig) SetId(v string)`

SetId sets Id field to given value.


### GetName

`func (o *SubAgentConfig) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SubAgentConfig) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SubAgentConfig) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *SubAgentConfig) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SubAgentConfig) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SubAgentConfig) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetInstructions

`func (o *SubAgentConfig) GetInstructions() string`

GetInstructions returns the Instructions field if non-nil, zero value otherwise.

### GetInstructionsOk

`func (o *SubAgentConfig) GetInstructionsOk() (*string, bool)`

GetInstructionsOk returns a tuple with the Instructions field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInstructions

`func (o *SubAgentConfig) SetInstructions(v string)`

SetInstructions sets Instructions field to given value.

### HasInstructions

`func (o *SubAgentConfig) HasInstructions() bool`

HasInstructions returns a boolean if a field has been set.

### GetModel

`func (o *SubAgentConfig) GetModel() ModelConfig`

GetModel returns the Model field if non-nil, zero value otherwise.

### GetModelOk

`func (o *SubAgentConfig) GetModelOk() (*ModelConfig, bool)`

GetModelOk returns a tuple with the Model field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetModel

`func (o *SubAgentConfig) SetModel(v ModelConfig)`

SetModel sets Model field to given value.

### HasModel

`func (o *SubAgentConfig) HasModel() bool`

HasModel returns a boolean if a field has been set.

### GetTools

`func (o *SubAgentConfig) GetTools() []string`

GetTools returns the Tools field if non-nil, zero value otherwise.

### GetToolsOk

`func (o *SubAgentConfig) GetToolsOk() (*[]string, bool)`

GetToolsOk returns a tuple with the Tools field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTools

`func (o *SubAgentConfig) SetTools(v []string)`

SetTools sets Tools field to given value.

### HasTools

`func (o *SubAgentConfig) HasTools() bool`

HasTools returns a boolean if a field has been set.

### GetSkills

`func (o *SubAgentConfig) GetSkills() []string`

GetSkills returns the Skills field if non-nil, zero value otherwise.

### GetSkillsOk

`func (o *SubAgentConfig) GetSkillsOk() (*[]string, bool)`

GetSkillsOk returns a tuple with the Skills field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSkills

`func (o *SubAgentConfig) SetSkills(v []string)`

SetSkills sets Skills field to given value.

### HasSkills

`func (o *SubAgentConfig) HasSkills() bool`

HasSkills returns a boolean if a field has been set.

### GetMaxSteps

`func (o *SubAgentConfig) GetMaxSteps() int32`

GetMaxSteps returns the MaxSteps field if non-nil, zero value otherwise.

### GetMaxStepsOk

`func (o *SubAgentConfig) GetMaxStepsOk() (*int32, bool)`

GetMaxStepsOk returns a tuple with the MaxSteps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxSteps

`func (o *SubAgentConfig) SetMaxSteps(v int32)`

SetMaxSteps sets MaxSteps field to given value.

### HasMaxSteps

`func (o *SubAgentConfig) HasMaxSteps() bool`

HasMaxSteps returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


