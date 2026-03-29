import { tool } from "ai";
import { z } from "zod";

type BashInstance = { exec: (cmd: string) => Promise<{ stdout: string; stderr: string; exitCode: number }> };

// Persist across Next.js HMR in dev
const g = globalThis as unknown as { __firecrawlBash?: BashInstance };

function getSharedBash(): BashInstance | null {
  return g.__firecrawlBash ?? null;
}
function setSharedBash(b: BashInstance) {
  g.__firecrawlBash = b;
}

export async function initBashWithFiles(
  files: Record<string, string>,
) {
  const { Bash } = await import("just-bash");
  const bash = new Bash();
  setSharedBash(bash);
  for (const [path, content] of Object.entries(files)) {
    await bash.exec(`mkdir -p "$(dirname "${path}")"`);
    await bash.exec(
      `cat > "${path}" << 'FIRECRAWL_EOF'\n${content}\nFIRECRAWL_EOF`,
    );
  }
}

export async function listBashFiles(): Promise<{ path: string; size: number }[]> {
  const bash = getSharedBash();
  if (!bash) return [];
  const result = await bash.exec("ls -R /data 2>/dev/null");
  if (result.exitCode !== 0 || !result.stdout.trim()) return [];
  const files: { path: string; size: number }[] = [];
  let currentDir = "/data";
  for (const line of result.stdout.split("\n")) {
    if (line.endsWith(":")) {
      currentDir = line.slice(0, -1);
    } else if (line.trim() && !line.startsWith("total")) {
      const path = `${currentDir}/${line.trim()}`;
      const sizeResult = await bash.exec(`wc -c < "${path}" 2>/dev/null`);
      const size = parseInt(sizeResult.stdout.trim()) || 0;
      if (size > 0) files.push({ path, size });
    }
  }
  return files;
}

export async function readBashFile(path: string): Promise<string> {
  const bash = getSharedBash();
  if (!bash) return "";
  const result = await bash.exec(`cat "${path}"`);
  return result.stdout;
}

export const bashExec = tool({
  description:
    "Execute a bash command in a sandboxed environment with a persistent filesystem. Available tools: jq, awk, sed, grep, sort, uniq, wc, head, tail, cut, tr, paste, cat, echo, printf, expr, ls, mkdir, rm, cp, mv, tee, xargs. NOT available: node, python, curl, wget, npm, pip, bc. For math use awk (e.g. awk 'BEGIN{print 10*1.5}') or expr. The filesystem persists between calls — write files in one call, read them in the next. Use jq for JSON processing, awk for CSV/text processing. If a CSV was uploaded, it's at /data/input.csv.",
  inputSchema: z.object({
    command: z
      .string()
      .describe(
        "The bash command to execute. Examples: 'cat /data/input.csv | head -5', 'echo data | jq .', 'awk -F, \\'NR>1{print $2}\\' /data/input.csv | sort | uniq -c | sort -rn'",
      ),
  }),
  execute: async ({ command }) => {
    let bash = getSharedBash();
    if (!bash) {
      const { Bash } = await import("just-bash");
      bash = new Bash();
      setSharedBash(bash);
    }
    const result = await bash.exec(command);
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
    };
  },
});
