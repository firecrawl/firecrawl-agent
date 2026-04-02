# Dart Example

A minimal Dart program that sends a prompt to the Firecrawl Agent API and prints the result. Uses only `dart:io` and `dart:convert` -- no pub packages required.

## Prerequisites

- Dart SDK 3.0+
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
dart run main.dart
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 dart run main.dart
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Parses the JSON response
3. Prints the response text, step count, and token usage
