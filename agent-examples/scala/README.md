# Scala Example

A minimal Scala program that sends a prompt to the Firecrawl Agent API and prints the result. Uses `java.net.Socket` for raw HTTP -- no external dependencies or JVM HttpURLConnection.

## Prerequisites

- [scala-cli](https://scala-cli.virtuslab.org/) (or Scala 3 with sbt)
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
scala-cli run Main.scala
```

## What it does

1. Opens a TCP socket to localhost:3000
2. Sends a raw HTTP POST to `/v1/run`
3. Reads the full response and prints the JSON body
