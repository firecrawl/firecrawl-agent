# Rust Basic Example

A minimal Rust program that sends a prompt to the Firecrawl Agent API using only the standard library (`std::net::TcpStream`). No external crates required.

## Prerequisites

- Rust toolchain (rustc, cargo) -- install via [rustup](https://rustup.rs/)
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
rustc main.rs -o agent_test && ./agent_test
```

## What it does

1. Opens a raw TCP connection to localhost:3000
2. Sends an HTTP POST to `/api/v1/run` with a JSON prompt
3. Parses the response body and prints the `text` field
