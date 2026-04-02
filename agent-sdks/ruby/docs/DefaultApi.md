# FirecrawlAgent::DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_worker_progress**](DefaultApi.md#get_worker_progress) | **GET** /workers/progress | Get parallel worker progress |
| [**list_skills**](DefaultApi.md#list_skills) | **GET** /skills | List available skills |
| [**run**](DefaultApi.md#run) | **POST** /run | Run the agent |


## get_worker_progress

> <Hash<String, WorkerProgress>> get_worker_progress

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Examples

```ruby
require 'time'
require 'firecrawl_agent'

api_instance = FirecrawlAgent::DefaultApi.new

begin
  # Get parallel worker progress
  result = api_instance.get_worker_progress
  p result
rescue FirecrawlAgent::ApiError => e
  puts "Error when calling DefaultApi->get_worker_progress: #{e}"
end
```

#### Using the get_worker_progress_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<Hash<String, WorkerProgress>>, Integer, Hash)> get_worker_progress_with_http_info

```ruby
begin
  # Get parallel worker progress
  data, status_code, headers = api_instance.get_worker_progress_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <Hash<String, WorkerProgress>>
rescue FirecrawlAgent::ApiError => e
  puts "Error when calling DefaultApi->get_worker_progress_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Hash&lt;String, WorkerProgress&gt;**](WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## list_skills

> <Array<Skill>> list_skills

List available skills

Returns all discovered skills the agent can use.

### Examples

```ruby
require 'time'
require 'firecrawl_agent'

api_instance = FirecrawlAgent::DefaultApi.new

begin
  # List available skills
  result = api_instance.list_skills
  p result
rescue FirecrawlAgent::ApiError => e
  puts "Error when calling DefaultApi->list_skills: #{e}"
end
```

#### Using the list_skills_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<Array<Skill>>, Integer, Hash)> list_skills_with_http_info

```ruby
begin
  # List available skills
  data, status_code, headers = api_instance.list_skills_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <Array<Skill>>
rescue FirecrawlAgent::ApiError => e
  puts "Error when calling DefaultApi->list_skills_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;Skill&gt;**](Skill.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## run

> <RunResponse> run(run_request)

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Examples

```ruby
require 'time'
require 'firecrawl_agent'

api_instance = FirecrawlAgent::DefaultApi.new
run_request = FirecrawlAgent::RunRequest.new({prompt: 'Get pricing for Vercel, Netlify, and Cloudflare Pages'}) # RunRequest | 

begin
  # Run the agent
  result = api_instance.run(run_request)
  p result
rescue FirecrawlAgent::ApiError => e
  puts "Error when calling DefaultApi->run: #{e}"
end
```

#### Using the run_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<RunResponse>, Integer, Hash)> run_with_http_info(run_request)

```ruby
begin
  # Run the agent
  data, status_code, headers = api_instance.run_with_http_info(run_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <RunResponse>
rescue FirecrawlAgent::ApiError => e
  puts "Error when calling DefaultApi->run_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **run_request** | [**RunRequest**](RunRequest.md) |  |  |

### Return type

[**RunResponse**](RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, text/event-stream

