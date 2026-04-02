# RunRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Prompt** | **string** | The research task or question. | 
**Stream** | Pointer to **bool** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to false]
**Format** | Pointer to **string** | Desired output format. If set, agent will format data accordingly. | [optional] 
**Schema** | Pointer to **map[string]interface{}** | JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \&quot;find all items.\&quot; The final output is compiled into this exact shape. Used with format&#x3D;json.  | [optional] 
**Columns** | Pointer to **[]string** | Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.  | [optional] 
**Urls** | Pointer to **[]string** | Seed URLs to start from instead of searching. | [optional] 
**Model** | Pointer to [**ModelConfig**](ModelConfig.md) |  | [optional] 
**SubAgentModel** | Pointer to [**ModelConfig**](ModelConfig.md) |  | [optional] 
**MaxSteps** | Pointer to **int32** | Maximum agent steps before stopping. | [optional] [default to 15]
**Skills** | Pointer to **[]string** | Skills to pre-load for this run. | [optional] 

## Methods

### NewRunRequest

`func NewRunRequest(prompt string, ) *RunRequest`

NewRunRequest instantiates a new RunRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewRunRequestWithDefaults

`func NewRunRequestWithDefaults() *RunRequest`

NewRunRequestWithDefaults instantiates a new RunRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPrompt

`func (o *RunRequest) GetPrompt() string`

GetPrompt returns the Prompt field if non-nil, zero value otherwise.

### GetPromptOk

`func (o *RunRequest) GetPromptOk() (*string, bool)`

GetPromptOk returns a tuple with the Prompt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrompt

`func (o *RunRequest) SetPrompt(v string)`

SetPrompt sets Prompt field to given value.


### GetStream

`func (o *RunRequest) GetStream() bool`

GetStream returns the Stream field if non-nil, zero value otherwise.

### GetStreamOk

`func (o *RunRequest) GetStreamOk() (*bool, bool)`

GetStreamOk returns a tuple with the Stream field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStream

`func (o *RunRequest) SetStream(v bool)`

SetStream sets Stream field to given value.

### HasStream

`func (o *RunRequest) HasStream() bool`

HasStream returns a boolean if a field has been set.

### GetFormat

`func (o *RunRequest) GetFormat() string`

GetFormat returns the Format field if non-nil, zero value otherwise.

### GetFormatOk

`func (o *RunRequest) GetFormatOk() (*string, bool)`

GetFormatOk returns a tuple with the Format field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormat

`func (o *RunRequest) SetFormat(v string)`

SetFormat sets Format field to given value.

### HasFormat

`func (o *RunRequest) HasFormat() bool`

HasFormat returns a boolean if a field has been set.

### GetSchema

`func (o *RunRequest) GetSchema() map[string]interface{}`

GetSchema returns the Schema field if non-nil, zero value otherwise.

### GetSchemaOk

`func (o *RunRequest) GetSchemaOk() (*map[string]interface{}, bool)`

GetSchemaOk returns a tuple with the Schema field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSchema

`func (o *RunRequest) SetSchema(v map[string]interface{})`

SetSchema sets Schema field to given value.

### HasSchema

`func (o *RunRequest) HasSchema() bool`

HasSchema returns a boolean if a field has been set.

### GetColumns

`func (o *RunRequest) GetColumns() []string`

GetColumns returns the Columns field if non-nil, zero value otherwise.

### GetColumnsOk

`func (o *RunRequest) GetColumnsOk() (*[]string, bool)`

GetColumnsOk returns a tuple with the Columns field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetColumns

`func (o *RunRequest) SetColumns(v []string)`

SetColumns sets Columns field to given value.

### HasColumns

`func (o *RunRequest) HasColumns() bool`

HasColumns returns a boolean if a field has been set.

### GetUrls

`func (o *RunRequest) GetUrls() []string`

GetUrls returns the Urls field if non-nil, zero value otherwise.

### GetUrlsOk

`func (o *RunRequest) GetUrlsOk() (*[]string, bool)`

GetUrlsOk returns a tuple with the Urls field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrls

`func (o *RunRequest) SetUrls(v []string)`

SetUrls sets Urls field to given value.

### HasUrls

`func (o *RunRequest) HasUrls() bool`

HasUrls returns a boolean if a field has been set.

### GetModel

`func (o *RunRequest) GetModel() ModelConfig`

GetModel returns the Model field if non-nil, zero value otherwise.

### GetModelOk

`func (o *RunRequest) GetModelOk() (*ModelConfig, bool)`

GetModelOk returns a tuple with the Model field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetModel

`func (o *RunRequest) SetModel(v ModelConfig)`

SetModel sets Model field to given value.

### HasModel

`func (o *RunRequest) HasModel() bool`

HasModel returns a boolean if a field has been set.

### GetSubAgentModel

`func (o *RunRequest) GetSubAgentModel() ModelConfig`

GetSubAgentModel returns the SubAgentModel field if non-nil, zero value otherwise.

### GetSubAgentModelOk

`func (o *RunRequest) GetSubAgentModelOk() (*ModelConfig, bool)`

GetSubAgentModelOk returns a tuple with the SubAgentModel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubAgentModel

`func (o *RunRequest) SetSubAgentModel(v ModelConfig)`

SetSubAgentModel sets SubAgentModel field to given value.

### HasSubAgentModel

`func (o *RunRequest) HasSubAgentModel() bool`

HasSubAgentModel returns a boolean if a field has been set.

### GetMaxSteps

`func (o *RunRequest) GetMaxSteps() int32`

GetMaxSteps returns the MaxSteps field if non-nil, zero value otherwise.

### GetMaxStepsOk

`func (o *RunRequest) GetMaxStepsOk() (*int32, bool)`

GetMaxStepsOk returns a tuple with the MaxSteps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxSteps

`func (o *RunRequest) SetMaxSteps(v int32)`

SetMaxSteps sets MaxSteps field to given value.

### HasMaxSteps

`func (o *RunRequest) HasMaxSteps() bool`

HasMaxSteps returns a boolean if a field has been set.

### GetSkills

`func (o *RunRequest) GetSkills() []string`

GetSkills returns the Skills field if non-nil, zero value otherwise.

### GetSkillsOk

`func (o *RunRequest) GetSkillsOk() (*[]string, bool)`

GetSkillsOk returns a tuple with the Skills field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSkills

`func (o *RunRequest) SetSkills(v []string)`

SetSkills sets Skills field to given value.

### HasSkills

`func (o *RunRequest) HasSkills() bool`

HasSkills returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


