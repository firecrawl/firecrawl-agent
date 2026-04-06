# DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**getWorkerProgress**](DefaultApi.md#getWorkerProgress) | **GET** /workers/progress | Get parallel worker progress |
| [**listSkills**](DefaultApi.md#listSkills) | **GET** /skills | List available skills |
| [**run**](DefaultApi.md#run) | **POST** /run | Run the agent |


<a id="getWorkerProgress"></a>
# **getWorkerProgress**
> kotlin.collections.Map&lt;kotlin.String, WorkerProgress&gt; getWorkerProgress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```kotlin
// Import classes:
//import com.firecrawl.agent.infrastructure.*
//import com.firecrawl.agent.models.*

val apiInstance = DefaultApi()
try {
    val result : kotlin.collections.Map<kotlin.String, WorkerProgress> = apiInstance.getWorkerProgress()
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#getWorkerProgress")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#getWorkerProgress")
    e.printStackTrace()
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**kotlin.collections.Map&lt;kotlin.String, WorkerProgress&gt;**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="listSkills"></a>
# **listSkills**
> kotlin.collections.List&lt;Skill&gt; listSkills()

List available skills

Returns all discovered skills the agent can use.

### Example
```kotlin
// Import classes:
//import com.firecrawl.agent.infrastructure.*
//import com.firecrawl.agent.models.*

val apiInstance = DefaultApi()
try {
    val result : kotlin.collections.List<Skill> = apiInstance.listSkills()
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#listSkills")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#listSkills")
    e.printStackTrace()
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**kotlin.collections.List&lt;Skill&gt;**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a id="run"></a>
# **run**
> RunResponse run(runRequest)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```kotlin
// Import classes:
//import com.firecrawl.agent.infrastructure.*
//import com.firecrawl.agent.models.*

val apiInstance = DefaultApi()
val runRequest : RunRequest =  // RunRequest | 
try {
    val result : RunResponse = apiInstance.run(runRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling DefaultApi#run")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling DefaultApi#run")
    e.printStackTrace()
}
```

### Parameters
| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **runRequest** | [**RunRequest**](RunRequest.md)|  | |

### Return type

[**RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

