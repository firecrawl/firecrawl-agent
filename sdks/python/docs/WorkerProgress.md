# WorkerProgress


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**steps** | **int** |  | [optional] 
**current_tool** | **str** |  | [optional] 
**tokens** | **int** |  | [optional] 
**step_log** | [**List[WorkerProgressStepLogInner]**](WorkerProgressStepLogInner.md) |  | [optional] 

## Example

```python
from firecrawl_agent.models.worker_progress import WorkerProgress

# TODO update the JSON string below
json = "{}"
# create an instance of WorkerProgress from a JSON string
worker_progress_instance = WorkerProgress.from_json(json)
# print the JSON string representation of the object
print(WorkerProgress.to_json())

# convert the object into a dict
worker_progress_dict = worker_progress_instance.to_dict()
# create an instance of WorkerProgress from a dict
worker_progress_from_dict = WorkerProgress.from_dict(worker_progress_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


