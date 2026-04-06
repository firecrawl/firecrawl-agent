# FirecrawlAgent.FirecrawlAgent\Api.DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**Get-WorkerProgress**](DefaultApi.md#Get-WorkerProgress) | **GET** /workers/progress | Get parallel worker progress
[**Invoke-ListSkills**](DefaultApi.md#Invoke-ListSkills) | **GET** /skills | List available skills
[**Invoke-Run**](DefaultApi.md#Invoke-Run) | **POST** /run | Run the agent


<a id="Get-WorkerProgress"></a>
# **Get-WorkerProgress**
> System.Collections.Hashtable Get-WorkerProgress<br>

Get parallel worker progress

Poll for progress of currently running parallel workers.

### Example
```powershell

# Get parallel worker progress
try {
    $Result = Get-WorkerProgress
} catch {
    Write-Host ("Exception occurred when calling Get-WorkerProgress: {0}" -f ($_.ErrorDetails | ConvertFrom-Json))
    Write-Host ("Response headers: {0}" -f ($_.Exception.Response.Headers | ConvertTo-Json))
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**System.Collections.Hashtable**](WorkerProgress.md) (PSCustomObject)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="Invoke-ListSkills"></a>
# **Invoke-ListSkills**
> Skill[] Invoke-ListSkills<br>

List available skills

Returns all discovered skills the agent can use.

### Example
```powershell

# List available skills
try {
    $Result = Invoke-ListSkills
} catch {
    Write-Host ("Exception occurred when calling Invoke-ListSkills: {0}" -f ($_.ErrorDetails | ConvertFrom-Json))
    Write-Host ("Response headers: {0}" -f ($_.Exception.Response.Headers | ConvertTo-Json))
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Skill[]**](Skill.md) (PSCustomObject)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a id="Invoke-Run"></a>
# **Invoke-Run**
> RunResponse Invoke-Run<br>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[-RunRequest] <PSCustomObject><br>

Run the agent

Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 

### Example
```powershell
$ModelConfig = Initialize-ModelConfig -Provider "anthropic" -Model "MyModel"

"search"$SubAgentConfig = Initialize-SubAgentConfig -Id "MyId" -Name "MyName" -Description "MyDescription" -Instructions "MyInstructions" -Model $ModelConfig -Tools 
"search" -Skills "MySkills" -MaxSteps 0

$RunRequest = Initialize-RunRequest -Prompt "Get pricing for Vercel, Netlify, and Cloudflare Pages" -Stream $false -Format "json" -Schema  -Columns "MyColumns" -Urls "MyUrls" -Model $ModelConfig -SubAgentModel $ModelConfig -MaxSteps 0 -Skills "MySkills" -SkillInstructions @{ key_example = "MyInner" } -SubAgents $SubAgentConfig -ExportSkill $false # RunRequest | 

# Run the agent
try {
    $Result = Invoke-Run -RunRequest $RunRequest
} catch {
    Write-Host ("Exception occurred when calling Invoke-Run: {0}" -f ($_.ErrorDetails | ConvertFrom-Json))
    Write-Host ("Response headers: {0}" -f ($_.Exception.Response.Headers | ConvertTo-Json))
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **RunRequest** | [**RunRequest**](RunRequest.md)|  | 

### Return type

[**RunResponse**](RunResponse.md) (PSCustomObject)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/event-stream

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

