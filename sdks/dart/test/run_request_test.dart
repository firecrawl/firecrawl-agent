//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

import 'package:firecrawl_agent/api.dart';
import 'package:test/test.dart';

// tests for RunRequest
void main() {
  // final instance = RunRequest();

  group('test RunRequest', () {
    // The research task or question.
    // String prompt
    test('to test the property `prompt`', () async {
      // TODO
    });

    // If true, response is an SSE stream of AgentEvent objects.
    // bool stream (default value: false)
    test('to test the property `stream`', () async {
      // TODO
    });

    // Desired output format. If set, agent will format data accordingly.
    // String format
    test('to test the property `format`', () async {
      // TODO
    });

    // JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \"find all items.\" The final output is compiled into this exact shape. Used with format=json. 
    // Object schema
    test('to test the property `schema`', () async {
      // TODO
    });

    // Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry. 
    // List<String> columns (default value: const [])
    test('to test the property `columns`', () async {
      // TODO
    });

    // Seed URLs to start from instead of searching.
    // List<String> urls (default value: const [])
    test('to test the property `urls`', () async {
      // TODO
    });

    // ModelConfig model
    test('to test the property `model`', () async {
      // TODO
    });

    // ModelConfig subAgentModel
    test('to test the property `subAgentModel`', () async {
      // TODO
    });

    // Maximum agent steps before stopping.
    // int maxSteps (default value: 15)
    test('to test the property `maxSteps`', () async {
      // TODO
    });

    // Skills to pre-load for this run.
    // List<String> skills (default value: const [])
    test('to test the property `skills`', () async {
      // TODO
    });

    // Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded. 
    // Map<String, String> skillInstructions (default value: const {})
    test('to test the property `skillInstructions`', () async {
      // TODO
    });

    // Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to. 
    // List<SubAgentConfig> subAgents (default value: const [])
    test('to test the property `subAgents`', () async {
      // TODO
    });

    // When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response. 
    // bool exportSkill (default value: false)
    test('to test the property `exportSkill`', () async {
      // TODO
    });


  });

}
