//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class RunRequest {
  /// Returns a new [RunRequest] instance.
  RunRequest({
    required this.prompt,
    this.stream = false,
    this.format,
    this.schema,
    this.columns = const [],
    this.urls = const [],
    this.model,
    this.subAgentModel,
    this.maxSteps = 15,
    this.skills = const [],
    this.skillInstructions = const {},
    this.subAgents = const [],
    this.exportSkill = false,
  });

  /// The research task or question.
  String prompt;

  /// If true, response is an SSE stream of AgentEvent objects.
  bool stream;

  /// Desired output format. If set, agent will format data accordingly.
  RunRequestFormatEnum? format;

  /// JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \"find all items.\" The final output is compiled into this exact shape. Used with format=json. 
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  Object? schema;

  /// Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry. 
  List<String> columns;

  /// Seed URLs to start from instead of searching.
  List<String> urls;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  ModelConfig? model;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  ModelConfig? subAgentModel;

  /// Maximum agent steps before stopping.
  ///
  /// Minimum value: 1
  /// Maximum value: 50
  int maxSteps;

  /// Skills to pre-load for this run.
  List<String> skills;

  /// Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded. 
  Map<String, String> skillInstructions;

  /// Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to. 
  List<SubAgentConfig> subAgents;

  /// When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response. 
  bool exportSkill;

  @override
  bool operator ==(Object other) => identical(this, other) || other is RunRequest &&
    other.prompt == prompt &&
    other.stream == stream &&
    other.format == format &&
    other.schema == schema &&
    _deepEquality.equals(other.columns, columns) &&
    _deepEquality.equals(other.urls, urls) &&
    other.model == model &&
    other.subAgentModel == subAgentModel &&
    other.maxSteps == maxSteps &&
    _deepEquality.equals(other.skills, skills) &&
    _deepEquality.equals(other.skillInstructions, skillInstructions) &&
    _deepEquality.equals(other.subAgents, subAgents) &&
    other.exportSkill == exportSkill;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (prompt.hashCode) +
    (stream.hashCode) +
    (format == null ? 0 : format!.hashCode) +
    (schema == null ? 0 : schema!.hashCode) +
    (columns.hashCode) +
    (urls.hashCode) +
    (model == null ? 0 : model!.hashCode) +
    (subAgentModel == null ? 0 : subAgentModel!.hashCode) +
    (maxSteps.hashCode) +
    (skills.hashCode) +
    (skillInstructions.hashCode) +
    (subAgents.hashCode) +
    (exportSkill.hashCode);

  @override
  String toString() => 'RunRequest[prompt=$prompt, stream=$stream, format=$format, schema=$schema, columns=$columns, urls=$urls, model=$model, subAgentModel=$subAgentModel, maxSteps=$maxSteps, skills=$skills, skillInstructions=$skillInstructions, subAgents=$subAgents, exportSkill=$exportSkill]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'prompt'] = this.prompt;
      json[r'stream'] = this.stream;
    if (this.format != null) {
      json[r'format'] = this.format;
    } else {
      json[r'format'] = null;
    }
    if (this.schema != null) {
      json[r'schema'] = this.schema;
    } else {
      json[r'schema'] = null;
    }
      json[r'columns'] = this.columns;
      json[r'urls'] = this.urls;
    if (this.model != null) {
      json[r'model'] = this.model;
    } else {
      json[r'model'] = null;
    }
    if (this.subAgentModel != null) {
      json[r'subAgentModel'] = this.subAgentModel;
    } else {
      json[r'subAgentModel'] = null;
    }
      json[r'maxSteps'] = this.maxSteps;
      json[r'skills'] = this.skills;
      json[r'skillInstructions'] = this.skillInstructions;
      json[r'subAgents'] = this.subAgents;
      json[r'exportSkill'] = this.exportSkill;
    return json;
  }

  /// Returns a new [RunRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static RunRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        assert(json.containsKey(r'prompt'), 'Required key "RunRequest[prompt]" is missing from JSON.');
        assert(json[r'prompt'] != null, 'Required key "RunRequest[prompt]" has a null value in JSON.');
        return true;
      }());

      return RunRequest(
        prompt: mapValueOfType<String>(json, r'prompt')!,
        stream: mapValueOfType<bool>(json, r'stream') ?? false,
        format: RunRequestFormatEnum.fromJson(json[r'format']),
        schema: mapValueOfType<Object>(json, r'schema'),
        columns: json[r'columns'] is Iterable
            ? (json[r'columns'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        urls: json[r'urls'] is Iterable
            ? (json[r'urls'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        model: ModelConfig.fromJson(json[r'model']),
        subAgentModel: ModelConfig.fromJson(json[r'subAgentModel']),
        maxSteps: mapValueOfType<int>(json, r'maxSteps') ?? 15,
        skills: json[r'skills'] is Iterable
            ? (json[r'skills'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        skillInstructions: mapCastOfType<String, String>(json, r'skillInstructions') ?? const {},
        subAgents: SubAgentConfig.listFromJson(json[r'subAgents']),
        exportSkill: mapValueOfType<bool>(json, r'exportSkill') ?? false,
      );
    }
    return null;
  }

  static List<RunRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <RunRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = RunRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, RunRequest> mapFromJson(dynamic json) {
    final map = <String, RunRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = RunRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of RunRequest-objects as value to a dart map
  static Map<String, List<RunRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<RunRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = RunRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'prompt',
  };
}

/// Desired output format. If set, agent will format data accordingly.
class RunRequestFormatEnum {
  /// Instantiate a new enum with the provided [value].
  const RunRequestFormatEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const json = RunRequestFormatEnum._(r'json');
  static const csv = RunRequestFormatEnum._(r'csv');
  static const markdown = RunRequestFormatEnum._(r'markdown');

  /// List of all possible values in this [enum][RunRequestFormatEnum].
  static const values = <RunRequestFormatEnum>[
    json,
    csv,
    markdown,
  ];

  static RunRequestFormatEnum? fromJson(dynamic value) => RunRequestFormatEnumTypeTransformer().decode(value);

  static List<RunRequestFormatEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <RunRequestFormatEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = RunRequestFormatEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [RunRequestFormatEnum] to String,
/// and [decode] dynamic data back to [RunRequestFormatEnum].
class RunRequestFormatEnumTypeTransformer {
  factory RunRequestFormatEnumTypeTransformer() => _instance ??= const RunRequestFormatEnumTypeTransformer._();

  const RunRequestFormatEnumTypeTransformer._();

  String encode(RunRequestFormatEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a RunRequestFormatEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  RunRequestFormatEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'json': return RunRequestFormatEnum.json;
        case r'csv': return RunRequestFormatEnum.csv;
        case r'markdown': return RunRequestFormatEnum.markdown;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [RunRequestFormatEnumTypeTransformer] instance.
  static RunRequestFormatEnumTypeTransformer? _instance;
}


