//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class ExportedSkill {
  /// Returns a new [ExportedSkill] instance.
  ExportedSkill({
    this.name,
    this.skillMd,
    this.workflow,
    this.schema,
  });

  /// Slug identifier for the skill.
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? name;

  /// Full SKILL.md content with frontmatter.
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? skillMd;

  /// Deterministic workflow.mjs script content.
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? workflow;

  /// Expected output schema.json content.
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? schema;

  @override
  bool operator ==(Object other) => identical(this, other) || other is ExportedSkill &&
    other.name == name &&
    other.skillMd == skillMd &&
    other.workflow == workflow &&
    other.schema == schema;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (name == null ? 0 : name!.hashCode) +
    (skillMd == null ? 0 : skillMd!.hashCode) +
    (workflow == null ? 0 : workflow!.hashCode) +
    (schema == null ? 0 : schema!.hashCode);

  @override
  String toString() => 'ExportedSkill[name=$name, skillMd=$skillMd, workflow=$workflow, schema=$schema]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.skillMd != null) {
      json[r'skillMd'] = this.skillMd;
    } else {
      json[r'skillMd'] = null;
    }
    if (this.workflow != null) {
      json[r'workflow'] = this.workflow;
    } else {
      json[r'workflow'] = null;
    }
    if (this.schema != null) {
      json[r'schema'] = this.schema;
    } else {
      json[r'schema'] = null;
    }
    return json;
  }

  /// Returns a new [ExportedSkill] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static ExportedSkill? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return ExportedSkill(
        name: mapValueOfType<String>(json, r'name'),
        skillMd: mapValueOfType<String>(json, r'skillMd'),
        workflow: mapValueOfType<String>(json, r'workflow'),
        schema: mapValueOfType<String>(json, r'schema'),
      );
    }
    return null;
  }

  static List<ExportedSkill> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <ExportedSkill>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = ExportedSkill.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, ExportedSkill> mapFromJson(dynamic json) {
    final map = <String, ExportedSkill>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = ExportedSkill.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of ExportedSkill-objects as value to a dart map
  static Map<String, List<ExportedSkill>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<ExportedSkill>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = ExportedSkill.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

