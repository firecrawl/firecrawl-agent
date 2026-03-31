# DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getWorkerProgress**](DefaultApi.md#getworkerprogress) | **GET** /workers/progress | Get parallel worker progress |
| [**listSkills**](DefaultApi.md#listskills) | **GET** /skills | List available skills |
| [**run**](DefaultApi.md#runoperation) | **POST** /run | Run the agent |



## getWorkerProgress

> { [key: string]: WorkerProgress; } getWorkerProgress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@firecrawl/agent-sdk';
import type { GetWorkerProgressRequest } from '@firecrawl/agent-sdk';

async function example() {
  console.log("🚀 Testing @firecrawl/agent-sdk SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getWorkerProgress();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**{ [key: string]: WorkerProgress; }**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Worker progress map |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSkills

> Array&lt;Skill&gt; listSkills()

List available skills

Returns all discovered skills the agent can use.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@firecrawl/agent-sdk';
import type { ListSkillsRequest } from '@firecrawl/agent-sdk';

async function example() {
  console.log("🚀 Testing @firecrawl/agent-sdk SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.listSkills();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;Skill&gt;**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of skills |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## run

> RunResponse run(runRequest)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@firecrawl/agent-sdk';
import type { RunOperationRequest } from '@firecrawl/agent-sdk';

async function example() {
  console.log("🚀 Testing @firecrawl/agent-sdk SDK...");
  const api = new DefaultApi();

  const body = {
    // RunRequest
    runRequest: ...,
  } satisfies RunOperationRequest;

  try {
    const data = await api.run(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **runRequest** | [RunRequest](RunRequest.md) |  | |

### Return type

[**RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `text/event-stream`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |
| **400** | Bad request |  -  |
| **500** | Server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

