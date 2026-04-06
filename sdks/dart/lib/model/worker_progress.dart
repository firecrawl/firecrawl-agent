//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class WorkerProgress {
  /// Returns a new [WorkerProgress] instance.
  WorkerProgress({
    this.id,
    this.status,
    this.steps,
    this.currentTool,
    this.tokens,
    this.stepLog = const [],
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? id;

  WorkerProgressStatusEnum? status;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? steps;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? currentTool;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? tokens;

  List<WorkerProgressStepLogInner> stepLog;

  @override
  bool operator ==(Object other) => identical(this, other) || other is WorkerProgress &&
    other.id == id &&
    other.status == status &&
    other.steps == steps &&
    other.currentTool == currentTool &&
    other.tokens == tokens &&
    _deepEquality.equals(other.stepLog, stepLog);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (id == null ? 0 : id!.hashCode) +
    (status == null ? 0 : status!.hashCode) +
    (steps == null ? 0 : steps!.hashCode) +
    (currentTool == null ? 0 : currentTool!.hashCode) +
    (tokens == null ? 0 : tokens!.hashCode) +
    (stepLog.hashCode);

  @override
  String toString() => 'WorkerProgress[id=$id, status=$status, steps=$steps, currentTool=$currentTool, tokens=$tokens, stepLog=$stepLog]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.id != null) {
      json[r'id'] = this.id;
    } else {
      json[r'id'] = null;
    }
    if (this.status != null) {
      json[r'status'] = this.status;
    } else {
      json[r'status'] = null;
    }
    if (this.steps != null) {
      json[r'steps'] = this.steps;
    } else {
      json[r'steps'] = null;
    }
    if (this.currentTool != null) {
      json[r'currentTool'] = this.currentTool;
    } else {
      json[r'currentTool'] = null;
    }
    if (this.tokens != null) {
      json[r'tokens'] = this.tokens;
    } else {
      json[r'tokens'] = null;
    }
      json[r'stepLog'] = this.stepLog;
    return json;
  }

  /// Returns a new [WorkerProgress] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static WorkerProgress? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return WorkerProgress(
        id: mapValueOfType<String>(json, r'id'),
        status: WorkerProgressStatusEnum.fromJson(json[r'status']),
        steps: mapValueOfType<int>(json, r'steps'),
        currentTool: mapValueOfType<String>(json, r'currentTool'),
        tokens: mapValueOfType<int>(json, r'tokens'),
        stepLog: WorkerProgressStepLogInner.listFromJson(json[r'stepLog']),
      );
    }
    return null;
  }

  static List<WorkerProgress> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <WorkerProgress>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = WorkerProgress.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, WorkerProgress> mapFromJson(dynamic json) {
    final map = <String, WorkerProgress>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = WorkerProgress.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of WorkerProgress-objects as value to a dart map
  static Map<String, List<WorkerProgress>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<WorkerProgress>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = WorkerProgress.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


class WorkerProgressStatusEnum {
  /// Instantiate a new enum with the provided [value].
  const WorkerProgressStatusEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const running = WorkerProgressStatusEnum._(r'running');
  static const done = WorkerProgressStatusEnum._(r'done');
  static const error = WorkerProgressStatusEnum._(r'error');

  /// List of all possible values in this [enum][WorkerProgressStatusEnum].
  static const values = <WorkerProgressStatusEnum>[
    running,
    done,
    error,
  ];

  static WorkerProgressStatusEnum? fromJson(dynamic value) => WorkerProgressStatusEnumTypeTransformer().decode(value);

  static List<WorkerProgressStatusEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <WorkerProgressStatusEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = WorkerProgressStatusEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [WorkerProgressStatusEnum] to String,
/// and [decode] dynamic data back to [WorkerProgressStatusEnum].
class WorkerProgressStatusEnumTypeTransformer {
  factory WorkerProgressStatusEnumTypeTransformer() => _instance ??= const WorkerProgressStatusEnumTypeTransformer._();

  const WorkerProgressStatusEnumTypeTransformer._();

  String encode(WorkerProgressStatusEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a WorkerProgressStatusEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  WorkerProgressStatusEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'running': return WorkerProgressStatusEnum.running;
        case r'done': return WorkerProgressStatusEnum.done;
        case r'error': return WorkerProgressStatusEnum.error;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [WorkerProgressStatusEnumTypeTransformer] instance.
  static WorkerProgressStatusEnumTypeTransformer? _instance;
}


