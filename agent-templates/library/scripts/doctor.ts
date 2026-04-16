#!/usr/bin/env node
/**
 * Pre-flight check: verify that required env vars are set and the
 * selected model provider has a matching API key.
 *
 *   npm run doctor
 */
import "dotenv/config";

const checks: Array<{ name: string; ok: boolean; detail: string }> = [];

function add(name: string, ok: boolean, detail = ""): void {
  checks.push({ name, ok, detail });
}

// --- required ---
add(
  "FIRECRAWL_API_KEY",
  !!process.env.FIRECRAWL_API_KEY,
  process.env.FIRECRAWL_API_KEY
    ? `set (${process.env.FIRECRAWL_API_KEY.slice(0, 6)}...)`
    : "missing — get one at https://firecrawl.dev/app/api-keys",
);

// --- model provider + key ---
const provider = process.env.MODEL_PROVIDER ?? process.env.MODEL?.split(":")[0] ?? "google";
const providerKeyEnv: Record<string, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  google: "GOOGLE_GENERATIVE_AI_API_KEY",
  gateway: "AI_GATEWAY_API_KEY",
  "custom-openai": "CUSTOM_OPENAI_API_KEY",
};
const requiredKey = providerKeyEnv[provider];
if (requiredKey) {
  add(
    `${requiredKey} (for provider "${provider}")`,
    !!process.env[requiredKey],
    process.env[requiredKey]
      ? `set (${process.env[requiredKey]!.slice(0, 6)}...)`
      : `missing — set ${requiredKey} or change MODEL_PROVIDER`,
  );
}

// --- custom-openai baseURL ---
if (provider === "custom-openai") {
  add(
    "CUSTOM_OPENAI_BASE_URL",
    !!process.env.CUSTOM_OPENAI_BASE_URL,
    process.env.CUSTOM_OPENAI_BASE_URL || "missing — required for custom-openai provider",
  );
}

// --- report ---
const lines: string[] = [""];
for (const c of checks) {
  const mark = c.ok ? "✓" : "✗";
  lines.push(`  ${mark} ${c.name}: ${c.detail}`);
}
lines.push("");

const failed = checks.filter((c) => !c.ok).length;
if (failed === 0) {
  lines.push(`  All good. Ready to run: npm start`);
  console.log(lines.join("\n"));
  process.exit(0);
} else {
  lines.push(`  ${failed} check(s) failed. Fix the issues above and try again.`);
  console.error(lines.join("\n"));
  process.exit(1);
}
