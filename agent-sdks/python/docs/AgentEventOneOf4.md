# AgentEventOneOf4


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **object** |  | [optional] 
**text** | **str** |  | [optional] 
**steps** | [**List[StepDetail]**](StepDetail.md) |  | [optional] 
**usage** | [**Usage**](Usage.md) |  | [optional] 

## Example

```python
from firecrawl_agent.models.agent_event_one_of4 import AgentEventOneOf4

# TODO update the JSON string below
json = "{}"
# create an instance of AgentEventOneOf4 from a JSON string
agent_event_one_of4_instance = AgentEventOneOf4.from_json(json)
# print the JSON string representation of the object
print(AgentEventOneOf4.to_json())

# convert the object into a dict
agent_event_one_of4_dict = agent_event_one_of4_instance.to_dict()
# create an instance of AgentEventOneOf4 from a dict
agent_event_one_of4_from_dict = AgentEventOneOf4.from_dict(agent_event_one_of4_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


