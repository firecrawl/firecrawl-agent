# firecrawl_agent.model.RunResponse

## Load the model package
```dart
import 'package:firecrawl_agent/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**text** | **String** | The agent's final text response. | [optional] 
**data** | **String** | Formatted output (present when format was specified). | [optional] 
**format** | **String** | The format of the data field. | [optional] 
**steps** | [**List<StepDetail>**](StepDetail.md) |  | [optional] [default to const []]
**usage** | [**Usage**](Usage.md) |  | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


