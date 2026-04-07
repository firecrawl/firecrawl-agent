import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROMPT_PATH = path.join(__dirname, "prompt.md");
let cache = null;
async function loadRaw() {
  if (cache) return cache;
  const content = await fs.readFile(PROMPT_PATH, "utf-8");
  const parts = content.split("\n---\n");
  const body = parts.length > 1 ? parts[parts.length - 1].trim() : content.trim();
  cache = body;
  return body;
}
function interpolate(template, vars) {
  return template.replace(/\{([A-Z_]+)\}/g, (_, key) => vars[key] ?? "");
}
async function loadWorkerPrompt(vars) {
  const template = await loadRaw();
  return interpolate(template, vars);
}
export {
  loadWorkerPrompt
};
