# SubAgentConfig


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Unique identifier for this sub-agent (used as the tool name suffix). | 
**name** | **str** | Human-readable name shown in the tool description. | 
**description** | **str** | What this sub-agent does. Included in the tool description for the orchestrator. | 
**instructions** | **str** | Custom instructions appended to the sub-agent&#39;s system prompt. | [optional] 
**model** | [**ModelConfig**](ModelConfig.md) |  | [optional] 
**tools** | **List[str]** | Firecrawl tools available to this sub-agent. | [optional] 
**skills** | **List[str]** | Skills to pre-load for this sub-agent. | [optional] 
**max_steps** | **int** | Maximum steps before the sub-agent stops. | [optional] [default to 10]

## Example

```python
from firecrawl_agent.models.sub_agent_config import SubAgentConfig

# TODO update the JSON string below
json = "{}"
# create an instance of SubAgentConfig from a JSON string
sub_agent_config_instance = SubAgentConfig.from_json(json)
# print the JSON string representation of the object
print(SubAgentConfig.to_json())

# convert the object into a dict
sub_agent_config_dict = sub_agent_config_instance.to_dict()
# create an instance of SubAgentConfig from a dict
sub_agent_config_from_dict = SubAgentConfig.from_dict(sub_agent_config_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


