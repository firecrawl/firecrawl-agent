//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SubAgentConfig {
  /// Returns a new [SubAgentConfig] instance.
  SubAgentConfig({
    required this.id,
    required this.name,
    required this.description,
    this.instructions,
    this.model,
    this.tools = const [],
    this.skills = const [],
    this.maxSteps = 10,
  });

  /// Unique identifier for this sub-agent (used as the tool name suffix).
  String id;

  /// Human-readable name shown in the tool description.
  String name;

  /// What this sub-agent does. Included in the tool description for the orchestrator.
  String description;

  /// Custom instructions appended to the sub-agent's system prompt.
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? instructions;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  ModelConfig? model;

  /// Firecrawl tools available to this sub-agent.
  List<SubAgentConfigToolsEnum> tools;

  /// Skills to pre-load for this sub-agent.
  List<String> skills;

  /// Maximum steps before the sub-agent stops.
  ///
  /// Minimum value: 1
  /// Maximum value: 50
  int maxSteps;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SubAgentConfig &&
    other.id == id &&
    other.name == name &&
    other.description == description &&
    other.instructions == instructions &&
    other.model == model &&
    _deepEquality.equals(other.tools, tools) &&
    _deepEquality.equals(other.skills, skills) &&
    other.maxSteps == maxSteps;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (id.hashCode) +
    (name.hashCode) +
    (description.hashCode) +
    (instructions == null ? 0 : instructions!.hashCode) +
    (model == null ? 0 : model!.hashCode) +
    (tools.hashCode) +
    (skills.hashCode) +
    (maxSteps.hashCode);

  @override
  String toString() => 'SubAgentConfig[id=$id, name=$name, description=$description, instructions=$instructions, model=$model, tools=$tools, skills=$skills, maxSteps=$maxSteps]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'id'] = this.id;
      json[r'name'] = this.name;
      json[r'description'] = this.description;
    if (this.instructions != null) {
      json[r'instructions'] = this.instructions;
    } else {
      json[r'instructions'] = null;
    }
    if (this.model != null) {
      json[r'model'] = this.model;
    } else {
      json[r'model'] = null;
    }
      json[r'tools'] = this.tools;
      json[r'skills'] = this.skills;
      json[r'maxSteps'] = this.maxSteps;
    return json;
  }

  /// Returns a new [SubAgentConfig] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SubAgentConfig? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        assert(json.containsKey(r'id'), 'Required key "SubAgentConfig[id]" is missing from JSON.');
        assert(json[r'id'] != null, 'Required key "SubAgentConfig[id]" has a null value in JSON.');
        assert(json.containsKey(r'name'), 'Required key "SubAgentConfig[name]" is missing from JSON.');
        assert(json[r'name'] != null, 'Required key "SubAgentConfig[name]" has a null value in JSON.');
        assert(json.containsKey(r'description'), 'Required key "SubAgentConfig[description]" is missing from JSON.');
        assert(json[r'description'] != null, 'Required key "SubAgentConfig[description]" has a null value in JSON.');
        return true;
      }());

      return SubAgentConfig(
        id: mapValueOfType<String>(json, r'id')!,
        name: mapValueOfType<String>(json, r'name')!,
        description: mapValueOfType<String>(json, r'description')!,
        instructions: mapValueOfType<String>(json, r'instructions'),
        model: ModelConfig.fromJson(json[r'model']),
        tools: SubAgentConfigToolsEnum.listFromJson(json[r'tools']),
        skills: json[r'skills'] is Iterable
            ? (json[r'skills'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        maxSteps: mapValueOfType<int>(json, r'maxSteps') ?? 10,
      );
    }
    return null;
  }

  static List<SubAgentConfig> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SubAgentConfig>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SubAgentConfig.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SubAgentConfig> mapFromJson(dynamic json) {
    final map = <String, SubAgentConfig>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SubAgentConfig.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SubAgentConfig-objects as value to a dart map
  static Map<String, List<SubAgentConfig>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SubAgentConfig>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SubAgentConfig.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'id',
    'name',
    'description',
  };
}


class SubAgentConfigToolsEnum {
  /// Instantiate a new enum with the provided [value].
  const SubAgentConfigToolsEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const search = SubAgentConfigToolsEnum._(r'search');
  static const scrape = SubAgentConfigToolsEnum._(r'scrape');
  static const interact = SubAgentConfigToolsEnum._(r'interact');
  static const map = SubAgentConfigToolsEnum._(r'map');

  /// List of all possible values in this [enum][SubAgentConfigToolsEnum].
  static const values = <SubAgentConfigToolsEnum>[
    search,
    scrape,
    interact,
    map,
  ];

  static SubAgentConfigToolsEnum? fromJson(dynamic value) => SubAgentConfigToolsEnumTypeTransformer().decode(value);

  static List<SubAgentConfigToolsEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SubAgentConfigToolsEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SubAgentConfigToolsEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [SubAgentConfigToolsEnum] to String,
/// and [decode] dynamic data back to [SubAgentConfigToolsEnum].
class SubAgentConfigToolsEnumTypeTransformer {
  factory SubAgentConfigToolsEnumTypeTransformer() => _instance ??= const SubAgentConfigToolsEnumTypeTransformer._();

  const SubAgentConfigToolsEnumTypeTransformer._();

  String encode(SubAgentConfigToolsEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a SubAgentConfigToolsEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  SubAgentConfigToolsEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'search': return SubAgentConfigToolsEnum.search;
        case r'scrape': return SubAgentConfigToolsEnum.scrape;
        case r'interact': return SubAgentConfigToolsEnum.interact;
        case r'map': return SubAgentConfigToolsEnum.map;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [SubAgentConfigToolsEnumTypeTransformer] instance.
  static SubAgentConfigToolsEnumTypeTransformer? _instance;
}


