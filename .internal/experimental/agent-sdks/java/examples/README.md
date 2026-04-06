# Java Example

A minimal Java program that sends a prompt to the Firecrawl Agent API and prints the result. Uses only `java.net.HttpURLConnection` -- no external dependencies.

## Prerequisites

- Java 17+
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
javac Main.java && java Main
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 javac Main.java && java Main
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Prints a snippet of the JSON response
3. Counts and prints the number of agent steps
