# Elixir Example

A minimal Elixir script that sends a prompt to the Firecrawl Agent API and prints the result. Uses Mix.install for the jason dependency and stdlib :httpc for HTTP.

## Prerequisites

- Elixir 1.14+
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
elixir main.exs
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 elixir main.exs
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Parses the JSON response
3. Prints the response text, step count, and token usage
