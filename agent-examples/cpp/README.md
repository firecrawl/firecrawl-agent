# C++ Example

A minimal C++ program that sends a prompt to the Firecrawl Agent API and prints the result. Uses raw POSIX sockets -- no external dependencies.

## Prerequisites

- clang++ (or g++) with C++17 support
- A running Firecrawl Agent server (default: http://localhost:3000)

## Build and Run

```sh
clang++ -std=c++17 main.cpp -o agent_test
./agent_test
```

## What it does

1. Opens a TCP socket to localhost:3000
2. Sends a raw HTTP POST to `/v1/run`
3. Reads the full response and prints the JSON body
