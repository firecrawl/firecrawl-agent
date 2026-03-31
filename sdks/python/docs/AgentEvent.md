# AgentEvent

Server-sent event payload (when stream=true)

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **object** |  | [optional] 
**content** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**input** | **object** |  | [optional] 
**output** | **object** |  | [optional] 
**usage** | [**Usage**](Usage.md) |  | [optional] 
**text** | **str** |  | [optional] 
**steps** | [**List[StepDetail]**](StepDetail.md) |  | [optional] 
**error** | **str** |  | [optional] 

## Example

```python
from firecrawl_agent.models.agent_event import AgentEvent

# TODO update the JSON string below
json = "{}"
# create an instance of AgentEvent from a JSON string
agent_event_instance = AgentEvent.from_json(json)
# print the JSON string representation of the object
print(AgentEvent.to_json())

# convert the object into a dict
agent_event_dict = agent_event_instance.to_dict()
# create an instance of AgentEvent from a dict
agent_event_from_dict = AgentEvent.from_dict(agent_event_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


