# PHP Example

A minimal PHP script that sends a prompt to the Firecrawl Agent API and prints the result.

## Prerequisites

- PHP 8.0+ with the `curl` extension enabled

## Run

Start the agent server first (`npm run dev` in the project root), then:

```sh
php main.php
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 php main.php
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Parses the JSON response
3. Prints the response text and token usage
