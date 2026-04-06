//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

library openapi.api;

import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:collection/collection.dart';
import 'package:http/http.dart';
import 'package:intl/intl.dart';
import 'package:meta/meta.dart';

part 'api_client.dart';
part 'api_helper.dart';
part 'api_exception.dart';
part 'auth/authentication.dart';
part 'auth/api_key_auth.dart';
part 'auth/oauth.dart';
part 'auth/http_basic_auth.dart';
part 'auth/http_bearer_auth.dart';

part 'api/default_api.dart';

part 'model/agent_event.dart';
part 'model/agent_event_one_of.dart';
part 'model/agent_event_one_of1.dart';
part 'model/agent_event_one_of2.dart';
part 'model/agent_event_one_of3.dart';
part 'model/agent_event_one_of4.dart';
part 'model/agent_event_one_of5.dart';
part 'model/error_response.dart';
part 'model/model_config.dart';
part 'model/run_request.dart';
part 'model/run_response.dart';
part 'model/skill.dart';
part 'model/step_detail.dart';
part 'model/step_detail_tool_calls_inner.dart';
part 'model/step_detail_tool_results_inner.dart';
part 'model/usage.dart';
part 'model/worker_progress.dart';
part 'model/worker_progress_step_log_inner.dart';


/// An [ApiClient] instance that uses the default values obtained from
/// the OpenAPI specification file.
var defaultApiClient = ApiClient();

const _delimiters = {'csv': ',', 'ssv': ' ', 'tsv': '\t', 'pipes': '|'};
const _dateEpochMarker = 'epoch';
const _deepEquality = DeepCollectionEquality();
final _dateFormatter = DateFormat('yyyy-MM-dd');
final _regList = RegExp(r'^List<(.*)>$');
final _regSet = RegExp(r'^Set<(.*)>$');
final _regMap = RegExp(r'^Map<String,(.*)>$');

bool _isEpochMarker(String? pattern) => pattern == _dateEpochMarker || pattern == '/$_dateEpochMarker/';
