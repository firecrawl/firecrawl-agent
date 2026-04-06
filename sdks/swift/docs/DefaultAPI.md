# DefaultAPI

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getWorkerProgress**](DefaultAPI.md#getworkerprogress) | **GET** /workers/progress | Get parallel worker progress
[**listSkills**](DefaultAPI.md#listskills) | **GET** /skills | List available skills
[**run**](DefaultAPI.md#run) | **POST** /run | Run the agent


# **getWorkerProgress**
```swift
    open class func getWorkerProgress(completion: @escaping (_ data: [String: WorkerProgress]?, _ error: Error?) -> Void)
```

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import FirecrawlAgent


// Get parallel worker progress
DefaultAPI.getWorkerProgress() { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[String: WorkerProgress]**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listSkills**
```swift
    open class func listSkills(completion: @escaping (_ data: [Skill]?, _ error: Error?) -> Void)
```

List available skills

Returns all discovered skills the agent can use.

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import FirecrawlAgent


// List available skills
DefaultAPI.listSkills() { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[Skill]**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **run**
```swift
    open class func run(runRequest: RunRequest, completion: @escaping (_ data: RunResponse?, _ error: Error?) -> Void)
```

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import FirecrawlAgent

let runRequest = RunRequest(prompt: "prompt_example", stream: false, format: "format_example", schema: 123, columns: ["columns_example"], urls: ["urls_example"], model: ModelConfig(provider: "provider_example", model: "model_example"), subAgentModel: nil, maxSteps: 123, skills: ["skills_example"], skillInstructions: "TODO", subAgents: [SubAgentConfig(id: "id_example", name: "name_example", description: "description_example", instructions: "instructions_example", model: nil, tools: ["tools_example"], skills: ["skills_example"], maxSteps: 123)], exportSkill: false) // RunRequest | 

// Run the agent
DefaultAPI.run(runRequest: runRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **runRequest** | [**RunRequest**](RunRequest.md) |  | 

### Return type

[**RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/event-stream

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

