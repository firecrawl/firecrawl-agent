const start = Date.now()
const r = await fetch("http://localhost:3005/api/v1/run", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: "Search for Firecrawl and tell me their tagline from the homepage. One sentence.",
    maxSteps: 5,
  }),
})
const elapsed = ((Date.now() - start) / 1000).toFixed(1)
const d = await r.json()
const text = (d.text || "").slice(0, 300)
console.log(`JavaScript | ${r.status} | ${elapsed}s | steps: ${(d.steps||[]).length}`)
console.log(`  tokens: ${d.usage?.totalTokens ?? "?"}`)
console.log(`  response: ${text}`)
