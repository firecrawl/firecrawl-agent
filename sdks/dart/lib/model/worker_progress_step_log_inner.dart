//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class WorkerProgressStepLogInner {
  /// Returns a new [WorkerProgressStepLogInner] instance.
  WorkerProgressStepLogInner({
    this.tool,
    this.detail,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? tool;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? detail;

  @override
  bool operator ==(Object other) => identical(this, other) || other is WorkerProgressStepLogInner &&
    other.tool == tool &&
    other.detail == detail;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (tool == null ? 0 : tool!.hashCode) +
    (detail == null ? 0 : detail!.hashCode);

  @override
  String toString() => 'WorkerProgressStepLogInner[tool=$tool, detail=$detail]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.tool != null) {
      json[r'tool'] = this.tool;
    } else {
      json[r'tool'] = null;
    }
    if (this.detail != null) {
      json[r'detail'] = this.detail;
    } else {
      json[r'detail'] = null;
    }
    return json;
  }

  /// Returns a new [WorkerProgressStepLogInner] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static WorkerProgressStepLogInner? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return WorkerProgressStepLogInner(
        tool: mapValueOfType<String>(json, r'tool'),
        detail: mapValueOfType<String>(json, r'detail'),
      );
    }
    return null;
  }

  static List<WorkerProgressStepLogInner> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <WorkerProgressStepLogInner>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = WorkerProgressStepLogInner.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, WorkerProgressStepLogInner> mapFromJson(dynamic json) {
    final map = <String, WorkerProgressStepLogInner>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = WorkerProgressStepLogInner.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of WorkerProgressStepLogInner-objects as value to a dart map
  static Map<String, List<WorkerProgressStepLogInner>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<WorkerProgressStepLogInner>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = WorkerProgressStepLogInner.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

