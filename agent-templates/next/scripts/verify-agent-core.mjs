#!/usr/bin/env node
/**
 * agent-core should be a vendored copy under ./agent-core (see ../../../.internal/scripts/sync-agent-core.mjs from this file).
 * Missing or empty ./agent-core → opaque build failures on Vercel.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const marker = path.join(root, "agent-core", "src", "index.ts");

function isBrokenSymlink(p) {
  try {
    const st = fs.lstatSync(p);
    if (!st.isSymbolicLink()) return false;
    const target = path.resolve(path.dirname(p), fs.readlinkSync(p));
    return !fs.existsSync(target);
  } catch {
    return true;
  }
}

const acPath = path.join(root, "agent-core");

if (!fs.existsSync(marker)) {
  const broken = fs.existsSync(acPath) && isBrokenSymlink(acPath);
  console.error(`
┌─────────────────────────────────────────────────────────────────────────────┐
│ agent-core is missing or incomplete                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Expected:  agent-core/src/index.ts                                          │
│ Got:       ${fs.existsSync(acPath) ? (broken ? "broken symlink (target not in repo)" : "incomplete folder") : "nothing at ./agent-core"}
├─────────────────────────────────────────────────────────────────────────────┤
│ Fix: from firecrawl-agent repo root run:                                    │
│   node .internal/scripts/sync-agent-core.mjs                                │
│                                                                             │
│ Standalone fork: copy agent-core/ from upstream or run that script once,   │
│ then commit the vendored folder.                                            │
│                                                                             │
│ See README.md → Deploy (Vercel) and .internal/scripts/sync-agent-core.mjs.  │
└─────────────────────────────────────────────────────────────────────────────┘
`);
  process.exit(1);
}
