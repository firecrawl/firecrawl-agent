base_url <- Sys.getenv("AGENT_URL", "http://localhost:3000/api/v1")
url <- paste0(base_url, "/run")

payload <- '{"prompt":"What are the top 3 stories on Hacker News right now?"}'
cmd <- paste0("curl -s -X POST '", url, "' -H 'Content-Type: application/json' -d '", payload, "'")

raw <- system(cmd, intern = TRUE)
json <- paste(raw, collapse = "")

result <- jsonlite::fromJSON(json)

cat(result$text, "\n")

steps <- if (!is.null(result$steps)) length(result$steps) else 0
tokens <- if (!is.null(result$usage$totalTokens)) result$usage$totalTokens else "N/A"
cat("\nSteps: ", steps, "\n")
cat("Tokens:", tokens, "\n")
