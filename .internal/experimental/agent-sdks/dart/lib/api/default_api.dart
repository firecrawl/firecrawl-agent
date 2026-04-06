//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class DefaultApi {
  DefaultApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Get parallel worker progress
  ///
  /// Poll for progress of currently running parallel workers.
  ///
  /// Note: This method returns the HTTP [Response].
  Future<Response> getWorkerProgressWithHttpInfo() async {
    // ignore: prefer_const_declarations
    final path = r'/workers/progress';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get parallel worker progress
  ///
  /// Poll for progress of currently running parallel workers.
  Future<Map<String, WorkerProgress>?> getWorkerProgress() async {
    final response = await getWorkerProgressWithHttpInfo();
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return Map<String, WorkerProgress>.from(await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'Map<String, WorkerProgress>'),);

    }
    return null;
  }

  /// List available skills
  ///
  /// Returns all discovered skills the agent can use.
  ///
  /// Note: This method returns the HTTP [Response].
  Future<Response> listSkillsWithHttpInfo() async {
    // ignore: prefer_const_declarations
    final path = r'/skills';

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// List available skills
  ///
  /// Returns all discovered skills the agent can use.
  Future<List<Skill>?> listSkills() async {
    final response = await listSkillsWithHttpInfo();
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<Skill>') as List)
        .cast<Skill>()
        .toList(growable: false);

    }
    return null;
  }

  /// Run the agent
  ///
  /// Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [RunRequest] runRequest (required):
  Future<Response> runWithHttpInfo(RunRequest runRequest,) async {
    // ignore: prefer_const_declarations
    final path = r'/run';

    // ignore: prefer_final_locals
    Object? postBody = runRequest;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>['application/json'];


    return apiClient.invokeAPI(
      path,
      'POST',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Run the agent
  ///
  /// Execute a web research task. Supports both streaming (SSE) and non-streaming responses. This is the single consolidated endpoint that replaces /query, /extract, and /plan. 
  ///
  /// Parameters:
  ///
  /// * [RunRequest] runRequest (required):
  Future<RunResponse?> run(RunRequest runRequest,) async {
    final response = await runWithHttpInfo(runRequest,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'RunResponse',) as RunResponse;
    
    }
    return null;
  }
}
