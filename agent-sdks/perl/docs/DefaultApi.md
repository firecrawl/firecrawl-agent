# WWW::OpenAPIClient::DefaultApi

## Load the API package
```perl
use WWW::OpenAPIClient::Object::DefaultApi;
```

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_worker_progress**](DefaultApi.md#get_worker_progress) | **GET** /workers/progress | Get parallel worker progress
[**list_skills**](DefaultApi.md#list_skills) | **GET** /skills | List available skills
[**run**](DefaultApi.md#run) | **POST** /run | Run the agent


# **get_worker_progress**
> HASH[string,WorkerProgress] get_worker_progress()

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```perl
use Data::Dumper;
use WWW::OpenAPIClient::DefaultApi;
my $api_instance = WWW::OpenAPIClient::DefaultApi->new(
);


eval {
    my $result = $api_instance->get_worker_progress();
    print Dumper($result);
};
if ($@) {
    warn "Exception when calling DefaultApi->get_worker_progress: $@\n";
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**HASH[string,WorkerProgress]**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_skills**
> ARRAY[Skill] list_skills()

List available skills

Returns all discovered skills the agent can use.

### Example
```perl
use Data::Dumper;
use WWW::OpenAPIClient::DefaultApi;
my $api_instance = WWW::OpenAPIClient::DefaultApi->new(
);


eval {
    my $result = $api_instance->list_skills();
    print Dumper($result);
};
if ($@) {
    warn "Exception when calling DefaultApi->list_skills: $@\n";
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ARRAY[Skill]**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **run**
> RunResponse run(run_request => $run_request)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```perl
use Data::Dumper;
use WWW::OpenAPIClient::DefaultApi;
my $api_instance = WWW::OpenAPIClient::DefaultApi->new(
);

my $run_request = WWW::OpenAPIClient::Object::RunRequest->new(); # RunRequest | 

eval {
    my $result = $api_instance->run(run_request => $run_request);
    print Dumper($result);
};
if ($@) {
    warn "Exception when calling DefaultApi->run: $@\n";
}
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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

