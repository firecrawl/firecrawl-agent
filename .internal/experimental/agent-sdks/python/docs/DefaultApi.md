# firecrawl_agent.DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_worker_progress**](DefaultApi.md#get_worker_progress) | **GET** /workers/progress | Get parallel worker progress
[**list_skills**](DefaultApi.md#list_skills) | **GET** /skills | List available skills
[**run**](DefaultApi.md#run) | **POST** /run | Run the agent


# **get_worker_progress**
> Dict[str, WorkerProgress] get_worker_progress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example


```python
import firecrawl_agent
from firecrawl_agent.models.worker_progress import WorkerProgress
from firecrawl_agent.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:3000/api/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = firecrawl_agent.Configuration(
    host = "http://localhost:3000/api/v1"
)


# Enter a context with an instance of the API client
with firecrawl_agent.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = firecrawl_agent.DefaultApi(api_client)

    try:
        # Get parallel worker progress
        api_response = api_instance.get_worker_progress()
        print("The response of DefaultApi->get_worker_progress:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_worker_progress: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**Dict[str, WorkerProgress]**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Worker progress map |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_skills**
> List[Skill] list_skills()

List available skills

Returns all discovered skills the agent can use.

### Example


```python
import firecrawl_agent
from firecrawl_agent.models.skill import Skill
from firecrawl_agent.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:3000/api/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = firecrawl_agent.Configuration(
    host = "http://localhost:3000/api/v1"
)


# Enter a context with an instance of the API client
with firecrawl_agent.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = firecrawl_agent.DefaultApi(api_client)

    try:
        # List available skills
        api_response = api_instance.list_skills()
        print("The response of DefaultApi->list_skills:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->list_skills: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[Skill]**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of skills |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **run**
> RunResponse run(run_request)

Run the agent

Execute a web research task. Supports both streaming (SSE) and
non-streaming responses. This is the single consolidated endpoint
that replaces /query, /extract, and /plan.


### Example


```python
import firecrawl_agent
from firecrawl_agent.models.run_request import RunRequest
from firecrawl_agent.models.run_response import RunResponse
from firecrawl_agent.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:3000/api/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = firecrawl_agent.Configuration(
    host = "http://localhost:3000/api/v1"
)


# Enter a context with an instance of the API client
with firecrawl_agent.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = firecrawl_agent.DefaultApi(api_client)
    run_request = firecrawl_agent.RunRequest() # RunRequest | 

    try:
        # Run the agent
        api_response = api_instance.run(run_request)
        print("The response of DefaultApi->run:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->run: %s\n" % e)
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
**200** | Successful response |  -  |
**400** | Bad request |  -  |
**500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

