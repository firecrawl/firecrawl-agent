<?php
/** Minimal example: run the Firecrawl Agent and print the result. */

$baseUrl = getenv('AGENT_URL') ?: 'http://localhost:3000/api/v1';

$ch = curl_init("$baseUrl/run");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'prompt' => 'What are the top 3 stories on Hacker News right now?',
]));

$body = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status !== 200) {
    fwrite(STDERR, "server error $status: $body\n");
    exit(1);
}

$result = json_decode($body, true);

echo $result['text'] ?? '', "\n";

$usage = $result['usage'] ?? [];
if ($usage) {
    printf("\nTokens  in: %d\n", $usage['inputTokens'] ?? 0);
    printf("Tokens out: %d\n", $usage['outputTokens'] ?? 0);
}
