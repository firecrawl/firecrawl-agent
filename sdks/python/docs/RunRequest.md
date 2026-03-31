# RunRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **str** | The research task or question. | 
**stream** | **bool** | If true, response is an SSE stream of AgentEvent objects. | [optional] [default to False]
**format** | **str** | Desired output format. If set, agent will format data accordingly. | [optional] 
**var_schema** | **object** | JSON Schema for structured output (used with format&#x3D;json). | [optional] 
**columns** | **List[str]** | Column names for CSV output. | [optional] 
**urls** | **List[str]** | Seed URLs to start from instead of searching. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**sub_agent_model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**max_steps** | **int** | Maximum agent steps before stopping. | [optional] [default to 15]
**skills** | **List[str]** | Skills to pre-load for this run. | [optional] 

## Example

```python
from firecrawl_agent.models.run_request import RunRequest

# TODO update the JSON string below
json = "{}"
# create an instance of RunRequest from a JSON string
run_request_instance = RunRequest.from_json(json)
# print the JSON string representation of the object
print(RunRequest.to_json())

# convert the object into a dict
run_request_dict = run_request_instance.to_dict()
# create an instance of RunRequest from a dict
run_request_from_dict = RunRequest.from_dict(run_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


