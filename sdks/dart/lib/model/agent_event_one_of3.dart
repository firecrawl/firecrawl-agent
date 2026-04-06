//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class AgentEventOneOf3 {
  /// Returns a new [AgentEventOneOf3] instance.
  AgentEventOneOf3({
    this.type,
    this.usage,
  });

  Object? type;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  Usage? usage;

  @override
  bool operator ==(Object other) => identical(this, other) || other is AgentEventOneOf3 &&
    other.type == type &&
    other.usage == usage;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (type == null ? 0 : type!.hashCode) +
    (usage == null ? 0 : usage!.hashCode);

  @override
  String toString() => 'AgentEventOneOf3[type=$type, usage=$usage]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.type != null) {
      json[r'type'] = this.type;
    } else {
      json[r'type'] = null;
    }
    if (this.usage != null) {
      json[r'usage'] = this.usage;
    } else {
      json[r'usage'] = null;
    }
    return json;
  }

  /// Returns a new [AgentEventOneOf3] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static AgentEventOneOf3? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return AgentEventOneOf3(
        type: mapValueOfType<Object>(json, r'type'),
        usage: Usage.fromJson(json[r'usage']),
      );
    }
    return null;
  }

  static List<AgentEventOneOf3> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <AgentEventOneOf3>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = AgentEventOneOf3.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, AgentEventOneOf3> mapFromJson(dynamic json) {
    final map = <String, AgentEventOneOf3>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = AgentEventOneOf3.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of AgentEventOneOf3-objects as value to a dart map
  static Map<String, List<AgentEventOneOf3>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<AgentEventOneOf3>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = AgentEventOneOf3.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

