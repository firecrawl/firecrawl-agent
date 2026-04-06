# DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetWorkerProgress**](DefaultApi.md#GetWorkerProgress) | **GET** /workers/progress | Get parallel worker progress
[**ListSkills**](DefaultApi.md#ListSkills) | **GET** /skills | List available skills
[**Run**](DefaultApi.md#Run) | **POST** /run | Run the agent


# **GetWorkerProgress**
> map(WorkerProgress) GetWorkerProgress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```R
library(openapi)

# Get parallel worker progress
#

api_instance <- DefaultApi$new()
# to save the result into a file, simply add the optional `data_file` parameter, e.g.
# result <- api_instance$GetWorkerProgress(data_file = "result.txt")
result <- api_instance$GetWorkerProgress()
dput(result)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**map(WorkerProgress)**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Worker progress map |  -  |

# **ListSkills**
> array[Skill] ListSkills()

List available skills

Returns all discovered skills the agent can use.

### Example
```R
library(openapi)

# List available skills
#

api_instance <- DefaultApi$new()
# to save the result into a file, simply add the optional `data_file` parameter, e.g.
# result <- api_instance$ListSkills(data_file = "result.txt")
result <- api_instance$ListSkills()
dput(result)
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**array[Skill]**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of skills |  -  |

# **Run**
> RunResponse Run(run_request)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```R
library(openapi)

# Run the agent
#
# prepare function argument(s)
var_run_request <- RunRequest$new("prompt_example", "stream_example", "json", 123, c("columns_example"), c("urls_example"), ModelConfig$new("anthropic", "model_example"), ModelConfig$new("anthropic", "model_example"), 123, c("skills_example"), c(key = "inner_example"), c(SubAgentConfig$new("id_example", "name_example", "description_example", "instructions_example", ModelConfig$new("anthropic", "model_example"), c("search"), c("skills_example"), 123)), "exportSkill_example") # RunRequest | 

api_instance <- DefaultApi$new()
# to save the result into a file, simply add the optional `data_file` parameter, e.g.
# result <- api_instance$Run(var_run_requestdata_file = "result.txt")
result <- api_instance$Run(var_run_request)
dput(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **run_request** | [**RunRequest**](RunRequest.md)|  | 

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

