//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class StepDetail {
  /// Returns a new [StepDetail] instance.
  StepDetail({
    this.text,
    this.toolCalls = const [],
    this.toolResults = const [],
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? text;

  List<StepDetailToolCallsInner> toolCalls;

  List<StepDetailToolResultsInner> toolResults;

  @override
  bool operator ==(Object other) => identical(this, other) || other is StepDetail &&
    other.text == text &&
    _deepEquality.equals(other.toolCalls, toolCalls) &&
    _deepEquality.equals(other.toolResults, toolResults);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (text == null ? 0 : text!.hashCode) +
    (toolCalls.hashCode) +
    (toolResults.hashCode);

  @override
  String toString() => 'StepDetail[text=$text, toolCalls=$toolCalls, toolResults=$toolResults]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.text != null) {
      json[r'text'] = this.text;
    } else {
      json[r'text'] = null;
    }
      json[r'toolCalls'] = this.toolCalls;
      json[r'toolResults'] = this.toolResults;
    return json;
  }

  /// Returns a new [StepDetail] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static StepDetail? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        return true;
      }());

      return StepDetail(
        text: mapValueOfType<String>(json, r'text'),
        toolCalls: StepDetailToolCallsInner.listFromJson(json[r'toolCalls']),
        toolResults: StepDetailToolResultsInner.listFromJson(json[r'toolResults']),
      );
    }
    return null;
  }

  static List<StepDetail> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <StepDetail>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = StepDetail.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, StepDetail> mapFromJson(dynamic json) {
    final map = <String, StepDetail>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = StepDetail.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of StepDetail-objects as value to a dart map
  static Map<String, List<StepDetail>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<StepDetail>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = StepDetail.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

