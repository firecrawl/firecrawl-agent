#!/usr/bin/env bash
# Generate SDKs from the OpenAPI spec.
# Requires: Java (brew install openjdk), npx
set -euo pipefail

SPEC="agent-core/openapi.yaml"
OUT="sdks"

export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"

echo "Generating Python SDK..."
npx @openapitools/openapi-generator-cli generate \
  -i "$SPEC" -g python -o "$OUT/python" \
  --additional-properties=packageName=firecrawl_agent,projectName=firecrawl-agent \
  2>&1 | grep -E "^\[main\]" | tail -3

echo "Generating Go SDK..."
npx @openapitools/openapi-generator-cli generate \
  -i "$SPEC" -g go -o "$OUT/go" \
  --additional-properties=packageName=firecrawlagent \
  2>&1 | grep -E "^\[main\]" | tail -3

echo "Generating JavaScript/TypeScript SDK..."
npx @openapitools/openapi-generator-cli generate \
  -i "$SPEC" -g typescript-fetch -o "$OUT/javascript" \
  --additional-properties=npmName=@firecrawl/agent-sdk,typescriptThreePlus=true,supportsES6=true \
  2>&1 | grep -E "^\[main\]" | tail -3

echo "Done. SDKs generated in $OUT/"
