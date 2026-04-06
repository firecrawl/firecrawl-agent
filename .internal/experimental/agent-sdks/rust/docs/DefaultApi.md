# \DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_worker_progress**](DefaultApi.md#get_worker_progress) | **GET** /workers/progress | Get parallel worker progress
[**list_skills**](DefaultApi.md#list_skills) | **GET** /skills | List available skills
[**run**](DefaultApi.md#run) | **POST** /run | Run the agent



## get_worker_progress

> std::collections::HashMap<String, models::WorkerProgress> get_worker_progress()
Get parallel worker progress

Poll for progress of currently running parallel workers.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::WorkerProgress>**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## list_skills

> Vec<models::Skill> list_skills()
List available skills

Returns all discovered skills the agent can use.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::Skill>**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## run

> models::RunResponse run(run_request)
Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**run_request** | [**RunRequest**](RunRequest.md) |  | [required] |

### Return type

[**models::RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, text/event-stream

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

