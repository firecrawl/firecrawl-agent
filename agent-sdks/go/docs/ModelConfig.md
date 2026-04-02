# ModelConfig

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Provider** | Pointer to **string** | LLM provider. | [optional] 
**Model** | Pointer to **string** | Model identifier (e.g. \&quot;gemini-3-flash-preview\&quot;, \&quot;claude-sonnet-4-6\&quot;). | [optional] 

## Methods

### NewModelConfig

`func NewModelConfig() *ModelConfig`

NewModelConfig instantiates a new ModelConfig object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewModelConfigWithDefaults

`func NewModelConfigWithDefaults() *ModelConfig`

NewModelConfigWithDefaults instantiates a new ModelConfig object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProvider

`func (o *ModelConfig) GetProvider() string`

GetProvider returns the Provider field if non-nil, zero value otherwise.

### GetProviderOk

`func (o *ModelConfig) GetProviderOk() (*string, bool)`

GetProviderOk returns a tuple with the Provider field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProvider

`func (o *ModelConfig) SetProvider(v string)`

SetProvider sets Provider field to given value.

### HasProvider

`func (o *ModelConfig) HasProvider() bool`

HasProvider returns a boolean if a field has been set.

### GetModel

`func (o *ModelConfig) GetModel() string`

GetModel returns the Model field if non-nil, zero value otherwise.

### GetModelOk

`func (o *ModelConfig) GetModelOk() (*string, bool)`

GetModelOk returns a tuple with the Model field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetModel

`func (o *ModelConfig) SetModel(v string)`

SetModel sets Model field to given value.

### HasModel

`func (o *ModelConfig) HasModel() bool`

HasModel returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


