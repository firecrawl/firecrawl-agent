# firecrawl_agent.api.DefaultApi

## Load the API package
```dart
import 'package:firecrawl_agent/api.dart';
```

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getWorkerProgress**](DefaultApi.md#getworkerprogress) | **GET** /workers/progress | Get parallel worker progress
[**listSkills**](DefaultApi.md#listskills) | **GET** /skills | List available skills
[**run**](DefaultApi.md#run) | **POST** /run | Run the agent


# **getWorkerProgress**
> Map<String, WorkerProgress> getWorkerProgress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```dart
import 'package:firecrawl_agent/api.dart';

final api_instance = DefaultApi();

try {
    final result = api_instance.getWorkerProgress();
    print(result);
} catch (e) {
    print('Exception when calling DefaultApi->getWorkerProgress: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Map<String, WorkerProgress>**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listSkills**
> List<Skill> listSkills()

List available skills

Returns all discovered skills the agent can use.

### Example
```dart
import 'package:firecrawl_agent/api.dart';

final api_instance = DefaultApi();

try {
    final result = api_instance.listSkills();
    print(result);
} catch (e) {
    print('Exception when calling DefaultApi->listSkills: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List<Skill>**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **run**
> RunResponse run(runRequest)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```dart
import 'package:firecrawl_agent/api.dart';

final api_instance = DefaultApi();
final runRequest = RunRequest(); // RunRequest | 

try {
    final result = api_instance.run(runRequest);
    print(result);
} catch (e) {
    print('Exception when calling DefaultApi->run: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **runRequest** | [**RunRequest**](RunRequest.md)|  | 

### Return type

[**RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/event-stream

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

