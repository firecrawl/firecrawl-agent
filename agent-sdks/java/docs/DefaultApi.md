# DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getWorkerProgress**](DefaultApi.md#getWorkerProgress) | **GET** /workers/progress | Get parallel worker progress |
| [**listSkills**](DefaultApi.md#listSkills) | **GET** /skills | List available skills |
| [**run**](DefaultApi.md#run) | **POST** /run | Run the agent |


<a id="getWorkerProgress"></a>
# **getWorkerProgress**
> Map&lt;String, WorkerProgress&gt; getWorkerProgress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```java
// Import classes:
import com.firecrawl.agent.ApiClient;
import com.firecrawl.agent.ApiException;
import com.firecrawl.agent.Configuration;
import com.firecrawl.agent.models.*;
import com.firecrawl.agent.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:3000/api/v1");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    try {
      Map<String, WorkerProgress> result = apiInstance.getWorkerProgress();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#getWorkerProgress");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Map&lt;String, WorkerProgress&gt;**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Worker progress map |  -  |

<a id="listSkills"></a>
# **listSkills**
> List&lt;Skill&gt; listSkills()

List available skills

Returns all discovered skills the agent can use.

### Example
```java
// Import classes:
import com.firecrawl.agent.ApiClient;
import com.firecrawl.agent.ApiException;
import com.firecrawl.agent.Configuration;
import com.firecrawl.agent.models.*;
import com.firecrawl.agent.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:3000/api/v1");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    try {
      List<Skill> result = apiInstance.listSkills();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#listSkills");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

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

<a id="run"></a>
# **run**
> RunResponse run(runRequest)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```java
// Import classes:
import com.firecrawl.agent.ApiClient;
import com.firecrawl.agent.ApiException;
import com.firecrawl.agent.Configuration;
import com.firecrawl.agent.models.*;
import com.firecrawl.agent.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:3000/api/v1");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    RunRequest runRequest = new RunRequest(); // RunRequest | 
    try {
      RunResponse result = apiInstance.run(runRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#run");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **runRequest** | [**RunRequest**](RunRequest.md)|  | |

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

