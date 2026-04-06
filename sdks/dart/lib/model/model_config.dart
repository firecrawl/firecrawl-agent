//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class ModelConfig {
  /// Returns a new [ModelConfig] instance.
  ModelConfig({
    this.provider,
    this.model,
  });

  /// LLM provider.
  ModelConfigProviderEnum? provider;

  /// Model identifier (e.g. \"gemini-3-flash-preview\", \"claude-sonnet-4-6\").
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? model;

  @override
  bool operator ==(Object other) => identical(this, other) || other is ModelConfig &&
    other.provider == provider &&
    other.model == model;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (provider == null ? 0 : provider!.hashCode) +
    (model == null ? 0 : model!.hashCode);

  @override
  String toString() => 'ModelConfig[provider=$provider, model=$model]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.provider != null) {
      json[r'provider'] = this.provider;
    } else {
      json[r'provider'] = null;
    }
    if (this.model != null) {
      json[r'model'] = this.model;
    } else {
      json[r'model'] = null;
    }
    return json;
  }

  /// Returns a new [ModelConfig] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static ModelConfig? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return ModelConfig(
        provider: ModelConfigProviderEnum.fromJson(json[r'provider']),
        model: mapValueOfType<String>(json, r'model'),
      );
    }
    return null;
  }

  static List<ModelConfig> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <ModelConfig>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = ModelConfig.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, ModelConfig> mapFromJson(dynamic json) {
    final map = <String, ModelConfig>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = ModelConfig.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of ModelConfig-objects as value to a dart map
  static Map<String, List<ModelConfig>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<ModelConfig>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = ModelConfig.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

/// LLM provider.
class ModelConfigProviderEnum {
  /// Instantiate a new enum with the provided [value].
  const ModelConfigProviderEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const anthropic = ModelConfigProviderEnum._(r'anthropic');
  static const openai = ModelConfigProviderEnum._(r'openai');
  static const google = ModelConfigProviderEnum._(r'google');
  static const gateway = ModelConfigProviderEnum._(r'gateway');
  static const firecrawl = ModelConfigProviderEnum._(r'firecrawl');
  static const acp = ModelConfigProviderEnum._(r'acp');

  /// List of all possible values in this [enum][ModelConfigProviderEnum].
  static const values = <ModelConfigProviderEnum>[
    anthropic,
    openai,
    google,
    gateway,
    firecrawl,
    acp,
  ];

  static ModelConfigProviderEnum? fromJson(dynamic value) => ModelConfigProviderEnumTypeTransformer().decode(value);

  static List<ModelConfigProviderEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <ModelConfigProviderEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = ModelConfigProviderEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [ModelConfigProviderEnum] to String,
/// and [decode] dynamic data back to [ModelConfigProviderEnum].
class ModelConfigProviderEnumTypeTransformer {
  factory ModelConfigProviderEnumTypeTransformer() => _instance ??= const ModelConfigProviderEnumTypeTransformer._();

  const ModelConfigProviderEnumTypeTransformer._();

  String encode(ModelConfigProviderEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a ModelConfigProviderEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  ModelConfigProviderEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'anthropic': return ModelConfigProviderEnum.anthropic;
        case r'openai': return ModelConfigProviderEnum.openai;
        case r'google': return ModelConfigProviderEnum.google;
        case r'gateway': return ModelConfigProviderEnum.gateway;
        case r'firecrawl': return ModelConfigProviderEnum.firecrawl;
        case r'acp': return ModelConfigProviderEnum.acp;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [ModelConfigProviderEnumTypeTransformer] instance.
  static ModelConfigProviderEnumTypeTransformer? _instance;
}


