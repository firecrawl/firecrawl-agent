# Kotlin Example

A minimal Kotlin script that sends a prompt to the Firecrawl Agent API and prints the result. Uses only `java.net.HttpURLConnection` -- no external dependencies.

## Prerequisites

- Kotlin compiler (`brew install kotlin`)
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
kotlinc -script main.kts
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 kotlinc -script main.kts
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Parses the JSON response with simple regex (no library dependencies)
3. Prints the response text and step count
