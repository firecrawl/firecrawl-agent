

# WorkerProgress


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**id** | **String** |  |  [optional] |
|**status** | [**StatusEnum**](#StatusEnum) |  |  [optional] |
|**steps** | **Integer** |  |  [optional] |
|**currentTool** | **String** |  |  [optional] |
|**tokens** | **Integer** |  |  [optional] |
|**stepLog** | [**List&lt;WorkerProgressStepLogInner&gt;**](WorkerProgressStepLogInner.md) |  |  [optional] |



## Enum: StatusEnum

| Name | Value |
|---- | -----|
| RUNNING | &quot;running&quot; |
| DONE | &quot;done&quot; |
| ERROR | &quot;error&quot; |



