# Perl Example

A minimal Perl script that sends a prompt to the Firecrawl Agent API and prints the result. Uses only core modules -- no CPAN install required.

## Prerequisites

- Perl 5.14+ (HTTP::Tiny and JSON::PP are core since 5.14)
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
perl main.pl
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 perl main.pl
```

## What it does

1. POSTs a prompt to `/v1/run`
2. Parses the JSON response
3. Prints the response text, step count, and token usage
