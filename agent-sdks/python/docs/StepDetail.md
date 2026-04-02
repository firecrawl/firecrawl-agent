# StepDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**text** | **str** |  | [optional] 
**tool_calls** | [**List[StepDetailToolCallsInner]**](StepDetailToolCallsInner.md) |  | [optional] 
**tool_results** | [**List[StepDetailToolResultsInner]**](StepDetailToolResultsInner.md) |  | [optional] 

## Example

```python
from firecrawl_agent.models.step_detail import StepDetail

# TODO update the JSON string below
json = "{}"
# create an instance of StepDetail from a JSON string
step_detail_instance = StepDetail.from_json(json)
# print the JSON string representation of the object
print(StepDetail.to_json())

# convert the object into a dict
step_detail_dict = step_detail_instance.to_dict()
# create an instance of StepDetail from a dict
step_detail_from_dict = StepDetail.from_dict(step_detail_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


