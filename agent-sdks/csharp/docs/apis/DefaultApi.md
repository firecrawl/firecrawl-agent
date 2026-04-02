# FirecrawlAgent.Api.DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**GetWorkerProgress**](DefaultApi.md#getworkerprogress) | **GET** /workers/progress | Get parallel worker progress |
| [**ListSkills**](DefaultApi.md#listskills) | **GET** /skills | List available skills |
| [**Run**](DefaultApi.md#run) | **POST** /run | Run the agent |

<a id="getworkerprogress"></a>
# **GetWorkerProgress**
> Dictionary&lt;string, WorkerProgress&gt; GetWorkerProgress ()

Get parallel worker progress

Poll for progress of currently running parallel workers.


### Parameters
This endpoint does not need any parameter.
### Return type

[**Dictionary&lt;string, WorkerProgress&gt;**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Worker progress map |  -  |

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

<a id="listskills"></a>
# **ListSkills**
> List&lt;Skill&gt; ListSkills ()

List available skills

Returns all discovered skills the agent can use.


### Parameters
This endpoint does not need any parameter.
### Return type

[**List&lt;Skill&gt;**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of skills |  -  |

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

<a id="run"></a>
# **Run**
> RunResponse Run (RunRequest runRequest)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 


### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **runRequest** | [**RunRequest**](RunRequest.md) |  |  |

### Return type

[**RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/event-stream


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |
| **400** | Bad request |  -  |
| **500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

