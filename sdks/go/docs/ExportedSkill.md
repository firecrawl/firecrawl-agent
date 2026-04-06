# ExportedSkill

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | Pointer to **string** | Slug identifier for the skill. | [optional] 
**SkillMd** | Pointer to **string** | Full SKILL.md content with frontmatter. | [optional] 
**Workflow** | Pointer to **string** | Deterministic workflow.mjs script content. | [optional] 
**Schema** | Pointer to **string** | Expected output schema.json content. | [optional] 

## Methods

### NewExportedSkill

`func NewExportedSkill() *ExportedSkill`

NewExportedSkill instantiates a new ExportedSkill object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewExportedSkillWithDefaults

`func NewExportedSkillWithDefaults() *ExportedSkill`

NewExportedSkillWithDefaults instantiates a new ExportedSkill object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *ExportedSkill) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *ExportedSkill) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *ExportedSkill) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *ExportedSkill) HasName() bool`

HasName returns a boolean if a field has been set.

### GetSkillMd

`func (o *ExportedSkill) GetSkillMd() string`

GetSkillMd returns the SkillMd field if non-nil, zero value otherwise.

### GetSkillMdOk

`func (o *ExportedSkill) GetSkillMdOk() (*string, bool)`

GetSkillMdOk returns a tuple with the SkillMd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSkillMd

`func (o *ExportedSkill) SetSkillMd(v string)`

SetSkillMd sets SkillMd field to given value.

### HasSkillMd

`func (o *ExportedSkill) HasSkillMd() bool`

HasSkillMd returns a boolean if a field has been set.

### GetWorkflow

`func (o *ExportedSkill) GetWorkflow() string`

GetWorkflow returns the Workflow field if non-nil, zero value otherwise.

### GetWorkflowOk

`func (o *ExportedSkill) GetWorkflowOk() (*string, bool)`

GetWorkflowOk returns a tuple with the Workflow field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWorkflow

`func (o *ExportedSkill) SetWorkflow(v string)`

SetWorkflow sets Workflow field to given value.

### HasWorkflow

`func (o *ExportedSkill) HasWorkflow() bool`

HasWorkflow returns a boolean if a field has been set.

### GetSchema

`func (o *ExportedSkill) GetSchema() string`

GetSchema returns the Schema field if non-nil, zero value otherwise.

### GetSchemaOk

`func (o *ExportedSkill) GetSchemaOk() (*string, bool)`

GetSchemaOk returns a tuple with the Schema field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSchema

`func (o *ExportedSkill) SetSchema(v string)`

SetSchema sets Schema field to given value.

### HasSchema

`func (o *ExportedSkill) HasSchema() bool`

HasSchema returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


