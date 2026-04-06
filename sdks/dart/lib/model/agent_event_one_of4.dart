//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class AgentEventOneOf4 {
  /// Returns a new [AgentEventOneOf4] instance.
  AgentEventOneOf4({
    this.type,
    this.text,
    this.steps = const [],
    this.usage,
  });

  Object? type;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? text;

  List<StepDetail> steps;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  Usage? usage;

  @override
  bool operator ==(Object other) => identical(this, other) || other is AgentEventOneOf4 &&
    other.type == type &&
    other.text == text &&
    _deepEquality.equals(other.steps, steps) &&
    other.usage == usage;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (type == null ? 0 : type!.hashCode) +
    (text == null ? 0 : text!.hashCode) +
    (steps.hashCode) +
    (usage == null ? 0 : usage!.hashCode);

  @override
  String toString() => 'AgentEventOneOf4[type=$type, text=$text, steps=$steps, usage=$usage]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.type != null) {
      json[r'type'] = this.type;
    } else {
      json[r'type'] = null;
    }
    if (this.text != null) {
      json[r'text'] = this.text;
    } else {
      json[r'text'] = null;
    }
      json[r'steps'] = this.steps;
    if (this.usage != null) {
      json[r'usage'] = this.usage;
    } else {
      json[r'usage'] = null;
    }
    return json;
  }

  /// Returns a new [AgentEventOneOf4] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static AgentEventOneOf4? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return AgentEventOneOf4(
        type: mapValueOfType<Object>(json, r'type'),
        text: mapValueOfType<String>(json, r'text'),
        steps: StepDetail.listFromJson(json[r'steps']),
        usage: Usage.fromJson(json[r'usage']),
      );
    }
    return null;
  }

  static List<AgentEventOneOf4> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <AgentEventOneOf4>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = AgentEventOneOf4.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, AgentEventOneOf4> mapFromJson(dynamic json) {
    final map = <String, AgentEventOneOf4>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = AgentEventOneOf4.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of AgentEventOneOf4-objects as value to a dart map
  static Map<String, List<AgentEventOneOf4>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<AgentEventOneOf4>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = AgentEventOneOf4.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

