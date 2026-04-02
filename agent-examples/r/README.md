# R Example

A minimal R script that sends a prompt to the Firecrawl Agent API and prints the result. Uses `system("curl ...")` for HTTP so no R HTTP packages are required -- only `jsonlite` for JSON parsing.

## Prerequisites

- R 4.0+
- `jsonlite` package (`install.packages("jsonlite")`)
- `curl` available on PATH
- A running Firecrawl Agent server (default: http://localhost:3000)

## Run

```sh
Rscript main.R
```

To point at a different server:

```sh
AGENT_URL=http://localhost:3005/api/v1 Rscript main.R
```

## What it does

1. Shells out to `curl` to POST a prompt to `/v1/run`
2. Parses the JSON response with `jsonlite`
3. Prints the response text, step count, and token usage
