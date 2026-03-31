# FirecrawlAgent\DefaultApi



All URIs are relative to http://localhost:3000/api/v1, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**getWorkerProgress()**](DefaultApi.md#getWorkerProgress) | **GET** /workers/progress | Get parallel worker progress |
| [**listSkills()**](DefaultApi.md#listSkills) | **GET** /skills | List available skills |
| [**run()**](DefaultApi.md#run) | **POST** /run | Run the agent |


## `getWorkerProgress()`

```php
getWorkerProgress(): array<string,\FirecrawlAgent\Model\WorkerProgress>
```

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new FirecrawlAgent\Api\DefaultApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->getWorkerProgress();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->getWorkerProgress: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**array<string,\FirecrawlAgent\Model\WorkerProgress>**](../Model/WorkerProgress.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `listSkills()`

```php
listSkills(): \FirecrawlAgent\Model\Skill[]
```

List available skills

Returns all discovered skills the agent can use.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new FirecrawlAgent\Api\DefaultApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->listSkills();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->listSkills: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\FirecrawlAgent\Model\Skill[]**](../Model/Skill.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `run()`

```php
run($run_request): \FirecrawlAgent\Model\RunResponse
```

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new FirecrawlAgent\Api\DefaultApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$run_request = new \FirecrawlAgent\Model\RunRequest(); // \FirecrawlAgent\Model\RunRequest

try {
    $result = $apiInstance->run($run_request);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->run: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **run_request** | [**\FirecrawlAgent\Model\RunRequest**](../Model/RunRequest.md)|  | |

### Return type

[**\FirecrawlAgent\Model\RunResponse**](../Model/RunResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `text/event-stream`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
