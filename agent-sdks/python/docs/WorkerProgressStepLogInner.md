# WorkerProgressStepLogInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tool** | **str** |  | [optional] 
**detail** | **str** |  | [optional] 

## Example

```python
from firecrawl_agent.models.worker_progress_step_log_inner import WorkerProgressStepLogInner

# TODO update the JSON string below
json = "{}"
# create an instance of WorkerProgressStepLogInner from a JSON string
worker_progress_step_log_inner_instance = WorkerProgressStepLogInner.from_json(json)
# print the JSON string representation of the object
print(WorkerProgressStepLogInner.to_json())

# convert the object into a dict
worker_progress_step_log_inner_dict = worker_progress_step_log_inner_instance.to_dict()
# create an instance of WorkerProgressStepLogInner from a dict
worker_progress_step_log_inner_from_dict = WorkerProgressStepLogInner.from_dict(worker_progress_step_log_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


