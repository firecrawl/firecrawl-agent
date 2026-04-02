# C# Example

A minimal C# program that sends a prompt to the Firecrawl Agent API and prints the result.

## Prerequisites

- .NET SDK 8+
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
dotnet run
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 dotnet run
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Parses the JSON response
3. Prints the response text and token usage
