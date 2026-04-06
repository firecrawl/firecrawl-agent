//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class RunResponse {
  /// Returns a new [RunResponse] instance.
  RunResponse({
    this.text,
    this.data,
    this.format,
    this.steps = const [],
    this.usage,
  });

  /// The agent's final text response.
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? text;

  /// Formatted output (present when format was specified).
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? data;

  /// The format of the data field.
  RunResponseFormatEnum? format;

  List<StepDetail> steps;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  Usage? usage;

  @override
  bool operator ==(Object other) => identical(this, other) || other is RunResponse &&
    other.text == text &&
    other.data == data &&
    other.format == format &&
    _deepEquality.equals(other.steps, steps) &&
    other.usage == usage;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (text == null ? 0 : text!.hashCode) +
    (data == null ? 0 : data!.hashCode) +
    (format == null ? 0 : format!.hashCode) +
    (steps.hashCode) +
    (usage == null ? 0 : usage!.hashCode);

  @override
  String toString() => 'RunResponse[text=$text, data=$data, format=$format, steps=$steps, usage=$usage]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.text != null) {
      json[r'text'] = this.text;
    } else {
      json[r'text'] = null;
    }
    if (this.data != null) {
      json[r'data'] = this.data;
    } else {
      json[r'data'] = null;
    }
    if (this.format != null) {
      json[r'format'] = this.format;
    } else {
      json[r'format'] = null;
    }
      json[r'steps'] = this.steps;
    if (this.usage != null) {
      json[r'usage'] = this.usage;
    } else {
      json[r'usage'] = null;
    }
    return json;
  }

  /// Returns a new [RunResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static RunResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return RunResponse(
        text: mapValueOfType<String>(json, r'text'),
        data: mapValueOfType<String>(json, r'data'),
        format: RunResponseFormatEnum.fromJson(json[r'format']),
        steps: StepDetail.listFromJson(json[r'steps']),
        usage: Usage.fromJson(json[r'usage']),
      );
    }
    return null;
  }

  static List<RunResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <RunResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = RunResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, RunResponse> mapFromJson(dynamic json) {
    final map = <String, RunResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = RunResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of RunResponse-objects as value to a dart map
  static Map<String, List<RunResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<RunResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = RunResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

/// The format of the data field.
class RunResponseFormatEnum {
  /// Instantiate a new enum with the provided [value].
  const RunResponseFormatEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const json = RunResponseFormatEnum._(r'json');
  static const csv = RunResponseFormatEnum._(r'csv');
  static const markdown = RunResponseFormatEnum._(r'markdown');
  static const text = RunResponseFormatEnum._(r'text');

  /// List of all possible values in this [enum][RunResponseFormatEnum].
  static const values = <RunResponseFormatEnum>[
    json,
    csv,
    markdown,
    text,
  ];

  static RunResponseFormatEnum? fromJson(dynamic value) => RunResponseFormatEnumTypeTransformer().decode(value);

  static List<RunResponseFormatEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <RunResponseFormatEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = RunResponseFormatEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [RunResponseFormatEnum] to String,
/// and [decode] dynamic data back to [RunResponseFormatEnum].
class RunResponseFormatEnumTypeTransformer {
  factory RunResponseFormatEnumTypeTransformer() => _instance ??= const RunResponseFormatEnumTypeTransformer._();

  const RunResponseFormatEnumTypeTransformer._();

  String encode(RunResponseFormatEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a RunResponseFormatEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  RunResponseFormatEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'json': return RunResponseFormatEnum.json;
        case r'csv': return RunResponseFormatEnum.csv;
        case r'markdown': return RunResponseFormatEnum.markdown;
        case r'text': return RunResponseFormatEnum.text;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [RunResponseFormatEnumTypeTransformer] instance.
  static RunResponseFormatEnumTypeTransformer? _instance;
}


