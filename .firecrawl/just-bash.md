[Skip to content](https://github.com/vercel-labs/just-bash#start-of-content)

You signed in with another tab or window. [Reload](https://github.com/vercel-labs/just-bash) to refresh your session.You signed out in another tab or window. [Reload](https://github.com/vercel-labs/just-bash) to refresh your session.You switched accounts on another tab or window. [Reload](https://github.com/vercel-labs/just-bash) to refresh your session.Dismiss alert

{{ message }}

[vercel-labs](https://github.com/vercel-labs)/ **[just-bash](https://github.com/vercel-labs/just-bash)** Public

- [Notifications](https://github.com/login?return_to=%2Fvercel-labs%2Fjust-bash) You must be signed in to change notification settings
- [Fork\\
139](https://github.com/login?return_to=%2Fvercel-labs%2Fjust-bash)
- [Star\\
2.3k](https://github.com/login?return_to=%2Fvercel-labs%2Fjust-bash)


main

[**107** Branches](https://github.com/vercel-labs/just-bash/branches) [**0** Tags](https://github.com/vercel-labs/just-bash/tags)

[Go to Branches page](https://github.com/vercel-labs/just-bash/branches)[Go to Tags page](https://github.com/vercel-labs/just-bash/tags)

Go to file

Code

Open more actions menu

## Folders and files

| Name | Name | Last commit message | Last commit date |
| --- | --- | --- | --- |
| ## Latest commit<br>[![cramforce](https://avatars.githubusercontent.com/u/89679?v=4&size=40)](https://github.com/cramforce)[cramforce](https://github.com/vercel-labs/just-bash/commits?author=cramforce)<br>[version](https://github.com/vercel-labs/just-bash/commit/d6a5ff0a5a1bcb8091f2c51b1551edac7468d9b5)<br>success<br>last weekMar 19, 2026<br>[d6a5ff0](https://github.com/vercel-labs/just-bash/commit/d6a5ff0a5a1bcb8091f2c51b1551edac7468d9b5) · last weekMar 19, 2026<br>## History<br>[314 Commits](https://github.com/vercel-labs/just-bash/commits/main/) <br>Open commit details<br>[View commit history for this file.](https://github.com/vercel-labs/just-bash/commits/main/) 314 Commits |
| [.github/workflows](https://github.com/vercel-labs/just-bash/tree/main/.github/workflows "This path skips through empty directories") | [.github/workflows](https://github.com/vercel-labs/just-bash/tree/main/.github/workflows "This path skips through empty directories") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [examples](https://github.com/vercel-labs/just-bash/tree/main/examples "examples") | [examples](https://github.com/vercel-labs/just-bash/tree/main/examples "examples") | [Upgrade just-bash in website](https://github.com/vercel-labs/just-bash/commit/b2b7a9dd5d5bae1c17b101b5b17c15b188feca88 "Upgrade just-bash in website") | 2 weeks agoMar 15, 2026 |
| [scripts](https://github.com/vercel-labs/just-bash/tree/main/scripts "scripts") | [scripts](https://github.com/vercel-labs/just-bash/tree/main/scripts "scripts") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [src](https://github.com/vercel-labs/just-bash/tree/main/src "src") | [src](https://github.com/vercel-labs/just-bash/tree/main/src "src") | [Harden network allow-list, error sanitization, and ReadWriteFs root v…](https://github.com/vercel-labs/just-bash/commit/0e2de26713466a0e1df20f8e250aecd9bc530331 "Harden network allow-list, error sanitization, and ReadWriteFs root validation (#160)  * Harden network allow-list, error sanitization, and ReadWriteFs root validation  - Fix path prefix matching to use segment boundaries instead of raw   startsWith, preventing /v1 from matching /v10 or /v1-admin - Reject ambiguous encoded separators (%2f, %5c) in path-scoped entries - Move allow-list check before DNS resolution to avoid leaking DNS   lookups for disallowed hosts - Add ReadWriteFs overlap guard to reject writable roots that contain   the just-bash package tree (src/, dist/, node_modules/, vendor/) - Split sanitizeErrorMessage into a lighter guest-facing variant and   an aggressive sanitizeHostErrorMessage for worker/bootstrap errors   that also scrubs file:// URLs, UNC paths, and additional host prefixes  * Take RW-overlap out of threat model  * Feedback") | last weekMar 19, 2026 |
| [vendor/cpython-emscripten](https://github.com/vercel-labs/just-bash/tree/main/vendor/cpython-emscripten "This path skips through empty directories") | [vendor/cpython-emscripten](https://github.com/vercel-labs/just-bash/tree/main/vendor/cpython-emscripten "This path skips through empty directories") | [Further cleanup of new python](https://github.com/vercel-labs/just-bash/commit/15ed4b542eb4867bbebf5253623269a94f67cb42 "Further cleanup of new python") | 3 weeks agoMar 5, 2026 |
| [.gitattributes](https://github.com/vercel-labs/just-bash/blob/main/.gitattributes ".gitattributes") | [.gitattributes](https://github.com/vercel-labs/just-bash/blob/main/.gitattributes ".gitattributes") | [Switch python implementation from pyodide to custom emscripten cpython (](https://github.com/vercel-labs/just-bash/commit/53ae1c6141d34b3b63827d4fccb8a7f8cbb63855 "Switch python implementation from pyodide to custom emscripten cpython (#133)  * Switch python implementation from pyodide to custom emscripten cpython  * lockfile  * move-tests  * magic bytes  * magic bytes2  * Update thread model") | 3 weeks agoMar 5, 2026 |
| [.gitignore](https://github.com/vercel-labs/just-bash/blob/main/.gitignore ".gitignore") | [.gitignore](https://github.com/vercel-labs/just-bash/blob/main/.gitignore ".gitignore") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [.npmignore](https://github.com/vercel-labs/just-bash/blob/main/.npmignore ".npmignore") | [.npmignore](https://github.com/vercel-labs/just-bash/blob/main/.npmignore ".npmignore") | [npm publish prep](https://github.com/vercel-labs/just-bash/commit/356552cb20817c545246ab80d79f6c1a1700abfa "npm publish prep") | 3 months agoDec 27, 2025 |
| [AGENTS.md](https://github.com/vercel-labs/just-bash/blob/main/AGENTS.md "AGENTS.md") | [AGENTS.md](https://github.com/vercel-labs/just-bash/blob/main/AGENTS.md "AGENTS.md") | [Integrate codex defense-in-depth findings (](https://github.com/vercel-labs/just-bash/commit/fa1c4ce3cc7309e20dfc80d64b32f8f352539e6d "Integrate codex defense-in-depth findings (#95)  * Integrate codex defense-in-depth findings  - Changes the behavior of ReadWriteFS to be robust for symlink creation (previously a documented limitation) - Replaces spread operator with a utility for null prototype copies  * Additional null prototype construction") [#95](https://github.com/vercel-labs/just-bash/pull/95) [)](https://github.com/vercel-labs/just-bash/commit/fa1c4ce3cc7309e20dfc80d64b32f8f352539e6d "Integrate codex defense-in-depth findings (#95)  * Integrate codex defense-in-depth findings  - Changes the behavior of ReadWriteFS to be robust for symlink creation (previously a documented limitation) - Replaces spread operator with a utility for null prototype copies  * Additional null prototype construction") | last monthFeb 5, 2026 |
| [AGENTS.npm.md](https://github.com/vercel-labs/just-bash/blob/main/AGENTS.npm.md "AGENTS.npm.md") | [AGENTS.npm.md](https://github.com/vercel-labs/just-bash/blob/main/AGENTS.npm.md "AGENTS.npm.md") | [Harden network allow-list, error sanitization, and ReadWriteFs root v…](https://github.com/vercel-labs/just-bash/commit/0e2de26713466a0e1df20f8e250aecd9bc530331 "Harden network allow-list, error sanitization, and ReadWriteFs root validation (#160)  * Harden network allow-list, error sanitization, and ReadWriteFs root validation  - Fix path prefix matching to use segment boundaries instead of raw   startsWith, preventing /v1 from matching /v10 or /v1-admin - Reject ambiguous encoded separators (%2f, %5c) in path-scoped entries - Move allow-list check before DNS resolution to avoid leaking DNS   lookups for disallowed hosts - Add ReadWriteFs overlap guard to reject writable roots that contain   the just-bash package tree (src/, dist/, node_modules/, vendor/) - Split sanitizeErrorMessage into a lighter guest-facing variant and   an aggressive sanitizeHostErrorMessage for worker/bootstrap errors   that also scrubs file:// URLs, UNC paths, and additional host prefixes  * Take RW-overlap out of threat model  * Feedback") | last weekMar 19, 2026 |
| [CLAUDE.md](https://github.com/vercel-labs/just-bash/blob/main/CLAUDE.md "CLAUDE.md") | [CLAUDE.md](https://github.com/vercel-labs/just-bash/blob/main/CLAUDE.md "CLAUDE.md") | [Also use null prototypes for read-only lookup tables (](https://github.com/vercel-labs/just-bash/commit/9fdca278c8d6d8fcc82600e84f134b9577a530ae "Also use null prototypes for read-only lookup tables (#152)  * Also use null prototypes for read-only lookup tables  * lint") [#152](https://github.com/vercel-labs/just-bash/pull/152) [)](https://github.com/vercel-labs/just-bash/commit/9fdca278c8d6d8fcc82600e84f134b9577a530ae "Also use null prototypes for read-only lookup tables (#152)  * Also use null prototypes for read-only lookup tables  * lint") | 2 weeks agoMar 11, 2026 |
| [LICENSE](https://github.com/vercel-labs/just-bash/blob/main/LICENSE "LICENSE") | [LICENSE](https://github.com/vercel-labs/just-bash/blob/main/LICENSE "LICENSE") | [LICENSE](https://github.com/vercel-labs/just-bash/commit/5b424b083b1c229bbdb06354f43986e37fccd992 "LICENSE") | 3 months agoDec 27, 2025 |
| [README.md](https://github.com/vercel-labs/just-bash/blob/main/README.md "README.md") | [README.md](https://github.com/vercel-labs/just-bash/blob/main/README.md "README.md") | [Harden network allow-list, error sanitization, and ReadWriteFs root v…](https://github.com/vercel-labs/just-bash/commit/0e2de26713466a0e1df20f8e250aecd9bc530331 "Harden network allow-list, error sanitization, and ReadWriteFs root validation (#160)  * Harden network allow-list, error sanitization, and ReadWriteFs root validation  - Fix path prefix matching to use segment boundaries instead of raw   startsWith, preventing /v1 from matching /v10 or /v1-admin - Reject ambiguous encoded separators (%2f, %5c) in path-scoped entries - Move allow-list check before DNS resolution to avoid leaking DNS   lookups for disallowed hosts - Add ReadWriteFs overlap guard to reject writable roots that contain   the just-bash package tree (src/, dist/, node_modules/, vendor/) - Split sanitizeErrorMessage into a lighter guest-facing variant and   an aggressive sanitizeHostErrorMessage for worker/bootstrap errors   that also scrubs file:// URLs, UNC paths, and additional host prefixes  * Take RW-overlap out of threat model  * Feedback") | last weekMar 19, 2026 |
| [THREAT\_MODEL.md](https://github.com/vercel-labs/just-bash/blob/main/THREAT_MODEL.md "THREAT_MODEL.md") | [THREAT\_MODEL.md](https://github.com/vercel-labs/just-bash/blob/main/THREAT_MODEL.md "THREAT_MODEL.md") | [Further defense-in-depth hardening (](https://github.com/vercel-labs/just-bash/commit/ff125590cbf8f748bca67fa689042974e8d623d4 "Further defense-in-depth hardening (#141)  * Further defense-in-depth hardening  * Fix python") [#141](https://github.com/vercel-labs/just-bash/pull/141) [)](https://github.com/vercel-labs/just-bash/commit/ff125590cbf8f748bca67fa689042974e8d623d4 "Further defense-in-depth hardening (#141)  * Further defense-in-depth hardening  * Fix python") | 3 weeks agoMar 6, 2026 |
| [biome.json](https://github.com/vercel-labs/just-bash/blob/main/biome.json "biome.json") | [biome.json](https://github.com/vercel-labs/just-bash/blob/main/biome.json "biome.json") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [knip.json](https://github.com/vercel-labs/just-bash/blob/main/knip.json "knip.json") | [knip.json](https://github.com/vercel-labs/just-bash/blob/main/knip.json "knip.json") | [Introduce a fuzzer for Bash, jq, awk, sed (](https://github.com/vercel-labs/just-bash/commit/035c9070257ae5eacc351001ad9f9023c9222d9b "Introduce a fuzzer for Bash, jq, awk, sed (#93)  * Fuzzing setup  * Update fuzzer") [#93](https://github.com/vercel-labs/just-bash/pull/93) [)](https://github.com/vercel-labs/just-bash/commit/035c9070257ae5eacc351001ad9f9023c9222d9b "Introduce a fuzzer for Bash, jq, awk, sed (#93)  * Fuzzing setup  * Update fuzzer") | last monthFeb 4, 2026 |
| [package.json](https://github.com/vercel-labs/just-bash/blob/main/package.json "package.json") | [package.json](https://github.com/vercel-labs/just-bash/blob/main/package.json "package.json") | [version](https://github.com/vercel-labs/just-bash/commit/d6a5ff0a5a1bcb8091f2c51b1551edac7468d9b5 "version") | last weekMar 19, 2026 |
| [pnpm-lock.yaml](https://github.com/vercel-labs/just-bash/blob/main/pnpm-lock.yaml "pnpm-lock.yaml") | [pnpm-lock.yaml](https://github.com/vercel-labs/just-bash/blob/main/pnpm-lock.yaml "pnpm-lock.yaml") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [tsconfig.json](https://github.com/vercel-labs/just-bash/blob/main/tsconfig.json "tsconfig.json") | [tsconfig.json](https://github.com/vercel-labs/just-bash/blob/main/tsconfig.json "tsconfig.json") | [New interpreter (](https://github.com/vercel-labs/just-bash/commit/d82db8944a78551b5882319fccbf5b96b34a5afd "New interpreter (#1)") [#1](https://github.com/vercel-labs/just-bash/pull/1) [)](https://github.com/vercel-labs/just-bash/commit/d82db8944a78551b5882319fccbf5b96b34a5afd "New interpreter (#1)") | 3 months agoDec 24, 2025 |
| [vitest.comparison.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.comparison.config.ts "vitest.comparison.config.ts") | [vitest.comparison.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.comparison.config.ts "vitest.comparison.config.ts") | [Skip cleanup 30 (](https://github.com/vercel-labs/just-bash/commit/11f2d3cc8d5477018c840479a294052947de3fcb "Skip cleanup 30 (#19)  * Fix skipped tests  * Comparison tests with fixtures  * Support locking for safe recording  * lint  * Record on CI  * Record on CI  * Record on CI  * lock") [#19](https://github.com/vercel-labs/just-bash/pull/19) [)](https://github.com/vercel-labs/just-bash/commit/11f2d3cc8d5477018c840479a294052947de3fcb "Skip cleanup 30 (#19)  * Fix skipped tests  * Comparison tests with fixtures  * Support locking for safe recording  * lint  * Record on CI  * Record on CI  * Record on CI  * lock") | 3 months agoDec 30, 2025 |
| [vitest.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.config.ts "vitest.config.ts") | [vitest.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.config.ts "vitest.config.ts") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [vitest.unit.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.unit.config.ts "vitest.unit.config.ts") | [vitest.unit.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.unit.config.ts "vitest.unit.config.ts") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| [vitest.wasm.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.wasm.config.ts "vitest.wasm.config.ts") | [vitest.wasm.config.ts](https://github.com/vercel-labs/just-bash/blob/main/vitest.wasm.config.ts "vitest.wasm.config.ts") | [Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by Qu…](https://github.com/vercel-labs/just-bash/commit/1c09948f4dc255684d75441bcda2ebaaaf64a36b "Adds js-exec, a sandboxed JavaScript/TypeScript runtime powered by QuickJS (WASM). (#122)  * version  * Introduce JS execution  * Full fetch  * Align fs sync cases  * Stabilize post merge  * Throw helpful errors on node.js compat errors  * Update error message to point to --help  * validate  * Better timeout handling and span execs  * Address feedback  * Make a 1st class feature for args forwarding  * QuickJS hardening  * Feedback  * Readme edits  * Address feedback") | 2 weeks agoMar 10, 2026 |
| View all files |

## Repository files navigation

# just-bash

[Permalink: just-bash](https://github.com/vercel-labs/just-bash#just-bash)

A virtual bash environment with an in-memory filesystem, written in TypeScript and designed for AI agents.

Broad support for standard unix commands and bash syntax with optional curl, Python, JS/TS, and sqlite support.

**Note**: This is beta software. Use at your own risk and please provide feedback. See [security model](https://github.com/vercel-labs/just-bash#security-model).

## Quick Start

[Permalink: Quick Start](https://github.com/vercel-labs/just-bash#quick-start)

```
npm install just-bash
```

```
import { Bash } from "just-bash";

const bash = new Bash();
await bash.exec('echo "Hello" > greeting.txt');
const result = await bash.exec("cat greeting.txt");
console.log(result.stdout); // "Hello\n"
console.log(result.exitCode); // 0
```

Each `exec()` call gets its own isolated shell state — environment variables, functions, and working directory reset between calls. The **filesystem is shared** across calls, so files written in one `exec()` are visible in the next.

## Custom Commands

[Permalink: Custom Commands](https://github.com/vercel-labs/just-bash#custom-commands)

Extend just-bash with your own TypeScript commands using `defineCommand`:

```
import { Bash, defineCommand } from "just-bash";

const hello = defineCommand("hello", async (args, ctx) => {
  const name = args[0] || "world";
  return { stdout: `Hello, ${name}!\n`, stderr: "", exitCode: 0 };
});

const upper = defineCommand("upper", async (args, ctx) => {
  return { stdout: ctx.stdin.toUpperCase(), stderr: "", exitCode: 0 };
});

const bash = new Bash({ customCommands: [hello, upper] });

await bash.exec("hello Alice"); // "Hello, Alice!\n"
await bash.exec("echo 'test' | upper"); // "TEST\n"
```

Custom commands receive a `CommandContext` with `fs`, `cwd`, `env`, `stdin`, and `exec` (for subcommands), and work with pipes, redirections, and all shell features.

## Supported Commands

[Permalink: Supported Commands](https://github.com/vercel-labs/just-bash#supported-commands)

### File Operations

[Permalink: File Operations](https://github.com/vercel-labs/just-bash#file-operations)

`cat`, `cp`, `file`, `ln`, `ls`, `mkdir`, `mv`, `readlink`, `rm`, `rmdir`, `split`, `stat`, `touch`, `tree`

### Text Processing

[Permalink: Text Processing](https://github.com/vercel-labs/just-bash#text-processing)

`awk`, `base64`, `column`, `comm`, `cut`, `diff`, `expand`, `fold`, `grep` (\+ `egrep`, `fgrep`), `head`, `join`, `md5sum`, `nl`, `od`, `paste`, `printf`, `rev`, `rg`, `sed`, `sha1sum`, `sha256sum`, `sort`, `strings`, `tac`, `tail`, `tr`, `unexpand`, `uniq`, `wc`, `xargs`

### Data Processing

[Permalink: Data Processing](https://github.com/vercel-labs/just-bash#data-processing)

`jq` (JSON), `sqlite3` (SQLite), `xan` (CSV), `yq` (YAML/XML/TOML/CSV)

### Optional Runtimes

[Permalink: Optional Runtimes](https://github.com/vercel-labs/just-bash#optional-runtimes)

`js-exec` (JavaScript/TypeScript via QuickJS; requires `javascript: true`), `python3`/`python` (Python via CPython; requires `python: true`)

### Compression & Archives

[Permalink: Compression & Archives](https://github.com/vercel-labs/just-bash#compression--archives)

`gzip` (\+ `gunzip`, `zcat`), `tar`

### Navigation & Environment

[Permalink: Navigation & Environment](https://github.com/vercel-labs/just-bash#navigation--environment)

`basename`, `cd`, `dirname`, `du`, `echo`, `env`, `export`, `find`, `hostname`, `printenv`, `pwd`, `tee`

### Shell Utilities

[Permalink: Shell Utilities](https://github.com/vercel-labs/just-bash#shell-utilities)

`alias`, `bash`, `chmod`, `clear`, `date`, `expr`, `false`, `help`, `history`, `seq`, `sh`, `sleep`, `time`, `timeout`, `true`, `unalias`, `which`, `whoami`

### Network

[Permalink: Network](https://github.com/vercel-labs/just-bash#network)

`curl`, `html-to-markdown` (require [network configuration](https://github.com/vercel-labs/just-bash#network-access))

All commands support `--help` for usage information.

### Shell Features

[Permalink: Shell Features](https://github.com/vercel-labs/just-bash#shell-features)

- **Pipes**: `cmd1 | cmd2`
- **Redirections**: `>`, `>>`, `2>`, `2>&1`, `<`
- **Command chaining**: `&&`, `||`, `;`
- **Variables**: `$VAR`, `${VAR}`, `${VAR:-default}`
- **Positional parameters**: `$1`, `$2`, `$@`, `$#`
- **Glob patterns**: `*`, `?`, `[...]`
- **If statements**: `if COND; then CMD; elif COND; then CMD; else CMD; fi`
- **Functions**: `function name { ... }` or `name() { ... }`
- **Local variables**: `local VAR=value`
- **Loops**: `for`, `while`, `until`
- **Symbolic links**: `ln -s target link`
- **Hard links**: `ln target link`

## Configuration

[Permalink: Configuration](https://github.com/vercel-labs/just-bash#configuration)

```
const env = new Bash({
  files: { "/data/file.txt": "content" }, // Initial files
  env: { MY_VAR: "value" }, // Initial environment
  cwd: "/app", // Starting directory (default: /home/user)
  executionLimits: { maxCallDepth: 50 }, // See "Execution Protection"
  python: true, // Enable python3/python commands
  javascript: true, // Enable js-exec command
  // Or with bootstrap: javascript: { bootstrap: "globalThis.X = 1;" }
});

// Per-exec overrides
await env.exec("echo $TEMP", { env: { TEMP: "value" }, cwd: "/tmp" });

// Pass stdin to the script
await env.exec("cat", { stdin: "hello from stdin\n" });

// Start with a clean environment
await env.exec("env", { replaceEnv: true, env: { ONLY: "this" } });

// Pass arguments without shell escaping (like spawnSync)
await env.exec("grep", { args: ["-r", "TODO", "src/"] });

// Cancel long-running scripts
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
await env.exec("while true; do sleep 1; done", { signal: controller.signal });

// Preserve leading whitespace (e.g., for heredocs)
await env.exec("cat <<EOF\n  indented\nEOF", { rawScript: true });
```

`exec()` options:

| Option | Type | Description |
| --- | --- | --- |
| `env` | `Record<string, string>` | Environment variables for this execution only |
| `cwd` | `string` | Working directory for this execution only |
| `stdin` | `string` | Standard input passed to the script |
| `args` | `string[]` | Additional argv passed directly to the first command (bypasses shell parsing; does not change `$1`, `$2`, ...) |
| `replaceEnv` | `boolean` | Start with empty env instead of merging (default: `false`) |
| `signal` | `AbortSignal` | Cooperative cancellation; stops at next statement boundary |
| `rawScript` | `boolean` | Skip leading-whitespace normalization (default: `false`) |

## Filesystem Options

[Permalink: Filesystem Options](https://github.com/vercel-labs/just-bash#filesystem-options)

Four filesystem implementations:

**InMemoryFs** (default) - Pure in-memory filesystem, no disk access:

```
import { Bash } from "just-bash";

const env = new Bash({
  files: {
    "/data/config.json": '{"key": "value"}',
    // Lazy: called on first read, cached. Never called if written before read.
    "/data/large.csv": () => "col1,col2\na,b\n",
    "/data/remote.txt": async () => (await fetch("https://example.com")).text(),
  },
});
```

**OverlayFs** \- Copy-on-write over a real directory. Reads come from disk, writes stay in memory:

```
import { Bash } from "just-bash";
import { OverlayFs } from "just-bash/fs/overlay-fs";

const overlay = new OverlayFs({ root: "/path/to/project" });
const env = new Bash({ fs: overlay, cwd: overlay.getMountPoint() });

await env.exec("cat package.json"); // reads from disk
await env.exec('echo "modified" > package.json'); // stays in memory
```

**ReadWriteFs** \- Direct read-write access to a real directory. Use this if you want the agent to be able to write to your disk:

```
import { Bash } from "just-bash";
import { ReadWriteFs } from "just-bash/fs/read-write-fs";

const rwfs = new ReadWriteFs({ root: "/path/to/sandbox" });
const env = new Bash({ fs: rwfs });

await env.exec('echo "hello" > file.txt'); // writes to real filesystem
```

Keep `ReadWriteFs` pointed at a workspace directory, not at the installed `just-bash` package or any other trusted runtime code. Guest-writable roots should stay separate from trusted code.

**MountableFs** \- Mount multiple filesystems at different paths. Combines read-only and read-write filesystems into a unified namespace:

```
import { Bash, MountableFs, InMemoryFs } from "just-bash";
import { OverlayFs } from "just-bash/fs/overlay-fs";
import { ReadWriteFs } from "just-bash/fs/read-write-fs";

const fs = new MountableFs({ base: new InMemoryFs() });

// Mount read-only knowledge base
fs.mount("/mnt/knowledge", new OverlayFs({ root: "/path/to/knowledge", readOnly: true }));

// Mount read-write workspace
fs.mount("/home/agent", new ReadWriteFs({ root: "/path/to/workspace" }));

const bash = new Bash({ fs, cwd: "/home/agent" });

await bash.exec("ls /mnt/knowledge"); // reads from knowledge base
await bash.exec("cp /mnt/knowledge/doc.txt ./"); // cross-mount copy
await bash.exec('echo "notes" > notes.txt'); // writes to workspace
```

You can also configure mounts in the constructor:

```
import { MountableFs, InMemoryFs } from "just-bash";
import { OverlayFs } from "just-bash/fs/overlay-fs";
import { ReadWriteFs } from "just-bash/fs/read-write-fs";

const fs = new MountableFs({
  base: new InMemoryFs(),
  mounts: [\
    { mountPoint: "/data", filesystem: new OverlayFs({ root: "/shared/data" }) },\
    { mountPoint: "/workspace", filesystem: new ReadWriteFs({ root: "/tmp/work" }) },\
  ],
});
```

## Optional Capabilities

[Permalink: Optional Capabilities](https://github.com/vercel-labs/just-bash#optional-capabilities)

### Network Access

[Permalink: Network Access](https://github.com/vercel-labs/just-bash#network-access)

Network access is disabled by default. Enable it with the `network` option:

```
// Allow specific URLs with GET/HEAD only (safest)
const env = new Bash({
  network: {
    allowedUrlPrefixes: [\
      "https://api.github.com/repos/myorg/",\
      "https://api.example.com",\
    ],
  },
});

// Allow specific URLs with additional methods
const env = new Bash({
  network: {
    allowedUrlPrefixes: ["https://api.example.com"],
    allowedMethods: ["GET", "HEAD", "POST"], // Default: ["GET", "HEAD"]
  },
});

// Inject credentials via header transforms (secrets never enter the sandbox)
const env = new Bash({
  network: {
    allowedUrlPrefixes: [\
      "https://public-api.com", // plain string — no transforms\
      {\
        url: "https://ai-gateway.vercel.sh",\
        transform: [{ headers: { Authorization: "Bearer secret" } }],\
      },\
    ],
  },
});

// Allow all URLs and methods (use with caution)
const env = new Bash({
  network: { dangerouslyAllowFullInternetAccess: true },
});
```

**Note:** The `curl` command only exists when network is configured. Without network configuration, `curl` returns "command not found".

#### Allow-List Security

[Permalink: Allow-List Security](https://github.com/vercel-labs/just-bash#allow-list-security)

The allow-list enforces:

- **Origin matching**: URLs must match the exact origin (scheme + host + port)
- **Path prefix**: Only paths starting with the specified prefix are allowed
- **HTTP method restrictions**: Only GET and HEAD by default (configure `allowedMethods` for more)
- **Redirect protection**: Redirects to non-allowed URLs are blocked
- **Header transforms**: Firewall headers are injected at the fetch boundary and override any user-supplied headers with the same name, preventing credential substitution from inside the sandbox. Headers are re-evaluated on each redirect so credentials are never leaked to non-transform hosts

#### Using curl

[Permalink: Using curl](https://github.com/vercel-labs/just-bash#using-curl)

```
# Fetch and process data
curl -s https://api.example.com/data | grep pattern

# Download and convert HTML to Markdown
curl -s https://example.com | html-to-markdown

# POST JSON data
curl -X POST -H "Content-Type: application/json" \
  -d '{"key":"value"}' https://api.example.com/endpoint
```

### JavaScript Support

[Permalink: JavaScript Support](https://github.com/vercel-labs/just-bash#javascript-support)

JavaScript and TypeScript execution via QuickJS is opt-in due to additional security surface. Enable with `javascript: true`:

```
const env = new Bash({
  javascript: true,
});

// Execute JavaScript code
await env.exec('js-exec -c "console.log(1 + 2)"');

// Run script files (.js, .mjs, .ts, .mts)
await env.exec('js-exec script.js');

// ES module mode with imports
await env.exec('js-exec -m -c "import fs from \'fs\'; console.log(fs.readFileSync(\'/data/file.txt\', \'utf8\'))"');
```

#### Bootstrap Code

[Permalink: Bootstrap Code](https://github.com/vercel-labs/just-bash#bootstrap-code)

Run setup code before every `js-exec` invocation with the `bootstrap` option:

```
const env = new Bash({
  javascript: {
    bootstrap: `
      globalThis.API_BASE = "https://api.example.com";
      globalThis.formatDate = (d) => new Date(d).toISOString();
    `,
  },
});

await env.exec('js-exec -c "console.log(API_BASE)"');
// Output: https://api.example.com
```

#### Node.js Compatibility

[Permalink: Node.js Compatibility](https://github.com/vercel-labs/just-bash#nodejs-compatibility)

`js-exec` supports `require()` and `import` with these Node.js modules:

- **fs**: `readFileSync`, `writeFileSync`, `readdirSync`, `statSync`, `existsSync`, `mkdirSync`, `rmSync`, `fs.promises.*`
- **path**: `join`, `resolve`, `dirname`, `basename`, `extname`, `relative`, `normalize`
- **child\_process**: `execSync`, `spawnSync`
- **process**: `argv`, `cwd()`, `exit()`, `env`, `platform`, `version`
- **Other modules**: `os`, `url`, `assert`, `util`, `events`, `buffer`, `stream`, `string_decoder`, `querystring`
- **Globals**: `console`, `fetch`, `Buffer`, `URL`, `URLSearchParams`

`fs.readFileSync()` returns a `Buffer` by default (matching Node.js). Pass an encoding like `'utf8'` to get a string.

**Note:** The `js-exec` command only exists when `javascript` is configured. It is not available in browser environments. Execution runs in a QuickJS WASM sandbox with a 64 MB memory limit and configurable timeout (default: 10s, 60s with network).

### Python Support

[Permalink: Python Support](https://github.com/vercel-labs/just-bash#python-support)

Python (CPython compiled to WASM) is opt-in due to additional security surface. Enable with `python: true`:

```
const env = new Bash({
  python: true,
});

// Execute Python code
await env.exec('python3 -c "print(1 + 2)"');

// Run Python scripts
await env.exec('python3 script.py');
```

**Note:** The `python3` and `python` commands only exist when `python: true` is configured. Python is not available in browser environments.

### SQLite Support

[Permalink: SQLite Support](https://github.com/vercel-labs/just-bash#sqlite-support)

`sqlite3` uses sql.js (SQLite compiled to WASM), sandboxed from the real filesystem:

```
const env = new Bash();

// Query in-memory database
await env.exec('sqlite3 :memory: "SELECT 1 + 1"');

// Query file-based database
await env.exec('sqlite3 data.db "SELECT * FROM users"');
```

**Note:** SQLite is not available in browser environments. Queries run in a worker thread with a configurable timeout (default: 5 seconds) to prevent runaway queries from blocking execution.

## AST Transform Plugins

[Permalink: AST Transform Plugins](https://github.com/vercel-labs/just-bash#ast-transform-plugins)

Parse bash scripts into an AST, transform them, and serialize back to bash. Good for instrumenting scripts (e.g., capturing per-command stdout/stderr) or extracting metadata before execution.

```
import { Bash, BashTransformPipeline, TeePlugin, CommandCollectorPlugin } from "just-bash";

// Standalone pipeline — output can be run by any shell
const pipeline = new BashTransformPipeline()
  .use(new TeePlugin({ outputDir: "/tmp/logs" }))
  .use(new CommandCollectorPlugin());
const result = pipeline.transform("echo hello | grep hello");
result.script;             // transformed bash string
result.metadata.commands;  // ["echo", "grep", "tee"]

// Integrated API — exec() auto-applies transforms and returns metadata
const bash = new Bash();
bash.registerTransformPlugin(new CommandCollectorPlugin());
const execResult = await bash.exec("echo hello | grep hello");
execResult.metadata?.commands; // ["echo", "grep"]
```

See [src/transform/README.md](https://github.com/vercel-labs/just-bash/blob/main/src/transform/README.md) for the full API, built-in plugins, and how to write custom plugins.

## Integrations

[Permalink: Integrations](https://github.com/vercel-labs/just-bash#integrations)

### AI SDK Tool

[Permalink: AI SDK Tool](https://github.com/vercel-labs/just-bash#ai-sdk-tool)

[`bash-tool`](https://github.com/vercel-labs/bash-tool) wraps just-bash as an [AI SDK](https://ai-sdk.dev/) tool:

```
npm install bash-tool
```

```
import { createBashTool } from "bash-tool";
import { generateText } from "ai";

const bashTool = createBashTool({
  files: { "/data/users.json": '[{"name": "Alice"}, {"name": "Bob"}]' },
});

const result = await generateText({
  model: "anthropic/claude-sonnet-4",
  tools: { bash: bashTool },
  prompt: "Count the users in /data/users.json",
});
```

See [bash-tool](https://github.com/vercel-labs/bash-tool) for more.

### Vercel Sandbox Compatible API

[Permalink: Vercel Sandbox Compatible API](https://github.com/vercel-labs/just-bash#vercel-sandbox-compatible-api)

`Sandbox` is a drop-in replacement for [`@vercel/sandbox`](https://vercel.com/docs/vercel-sandbox) — same API, but runs entirely in-process with the virtual filesystem. Start with just-bash for development and testing, swap in a real sandbox when you need a full VM.

```
import { Sandbox } from "just-bash";

// Create a sandbox instance
const sandbox = await Sandbox.create({ cwd: "/app" });

// Write files to the virtual filesystem
await sandbox.writeFiles({
  "/app/script.sh": 'echo "Hello World"',
  "/app/data.json": '{"key": "value"}',
});

// Run commands and get results
const cmd = await sandbox.runCommand("bash /app/script.sh");
const output = await cmd.stdout(); // "Hello World\n"
const exitCode = (await cmd.wait()).exitCode; // 0

// Read files back
const content = await sandbox.readFile("/app/data.json");

// Create directories
await sandbox.mkDir("/app/logs", { recursive: true });

// Clean up (no-op for Bash, but API-compatible)
await sandbox.stop();
```

## CLI

[Permalink: CLI](https://github.com/vercel-labs/just-bash#cli)

### CLI Binary

[Permalink: CLI Binary](https://github.com/vercel-labs/just-bash#cli-binary)

Install globally (`npm install -g just-bash`) for a sandboxed CLI:

```
# Execute inline script
just-bash -c 'ls -la && cat package.json | head -5'

# Execute with specific project root
just-bash -c 'grep -r "TODO" src/' --root /path/to/project

# Pipe script from stdin
echo 'find . -name "*.ts" | wc -l' | just-bash

# Execute a script file
just-bash ./scripts/deploy.sh

# Get JSON output for programmatic use
just-bash -c 'echo hello' --json
# Output: {"stdout":"hello\n","stderr":"","exitCode":0}
```

The CLI uses OverlayFS — reads come from the real filesystem, but all writes stay in memory and are discarded after execution.

**Important**: The project root is mounted at `/home/user/project`. Use this path (or relative paths from the default cwd) to access your files inside the sandbox.

Options:

- `-c <script>` \- Execute script from argument
- `--root <path>` \- Root directory (default: current directory)
- `--cwd <path>` \- Working directory in sandbox
- `-e, --errexit` \- Exit on first error
- `--json` \- Output as JSON

### Interactive Shell

[Permalink: Interactive Shell](https://github.com/vercel-labs/just-bash#interactive-shell)

```
pnpm shell
```

The interactive shell has full internet access by default. Disable with `--no-network`:

```
pnpm shell --no-network
```

## Execution Protection

[Permalink: Execution Protection](https://github.com/vercel-labs/just-bash#execution-protection)

Bash protects against infinite loops and deep recursion with configurable limits:

```
const env = new Bash({
  executionLimits: {
    maxCallDepth: 100, // Max function recursion depth
    maxCommandCount: 10000, // Max total commands executed
    maxLoopIterations: 10000, // Max iterations per loop
    maxAwkIterations: 10000, // Max iterations in awk programs
    maxSedIterations: 10000, // Max iterations in sed scripts
  },
});
```

All limits have defaults. Error messages tell you which limit was hit. Increase as needed for your workload.

## Security Model

[Permalink: Security Model](https://github.com/vercel-labs/just-bash#security-model)

- The shell only has access to the provided filesystem.
- All execution happens without VM isolation. This does introduce additional risk. The code base was designed to be robust against prototype-pollution attacks and other break outs to the host JS engine and filesystem.
- There is no network access by default. When enabled, requests are checked against URL prefix allow-lists and HTTP-method allow-lists.
- Python and JavaScript execution are off by default as they represent additional security surface.
- Execution is protected against infinite loops and deep recursion with configurable limits.
- Use [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) if you need a full VM with arbitrary binary execution.

## Browser Support

[Permalink: Browser Support](https://github.com/vercel-labs/just-bash#browser-support)

The core shell (parsing, execution, filesystem, and all built-in commands) works in browser environments. The following features require Node.js and are unavailable in browsers: `python3`/`python`, `sqlite3`, `js-exec`, and `OverlayFs`/`ReadWriteFs` (which access the real filesystem).

## Default Layout

[Permalink: Default Layout](https://github.com/vercel-labs/just-bash#default-layout)

When created without options, Bash provides a Unix-like directory structure:

- `/home/user` \- Default working directory (and `$HOME`)
- `/bin` \- Contains stubs for all built-in commands
- `/usr/bin` \- Additional binary directory
- `/tmp` \- Temporary files directory

Commands can be invoked by path (e.g., `/bin/ls`) or by name.

## AI Agent Instructions

[Permalink: AI Agent Instructions](https://github.com/vercel-labs/just-bash#ai-agent-instructions)

For AI agents, [`bash-tool`](https://github.com/vercel-labs/bash-tool) provides additional guidance in its `AGENTS.md`:

```
cat node_modules/bash-tool/dist/AGENTS.md
```

## License

[Permalink: License](https://github.com/vercel-labs/just-bash#license)

Apache-2.0

## About

Bash for Agents


[justbash.dev/](https://justbash.dev/ "https://justbash.dev/")

### Resources

[Readme](https://github.com/vercel-labs/just-bash#readme-ov-file)

### License

[Apache-2.0 license](https://github.com/vercel-labs/just-bash#Apache-2.0-1-ov-file)

### Uh oh!

There was an error while loading. [Please reload this page](https://github.com/vercel-labs/just-bash).

[Activity](https://github.com/vercel-labs/just-bash/activity)

[Custom properties](https://github.com/vercel-labs/just-bash/custom-properties)

### Stars

[**2.3k**\\
stars](https://github.com/vercel-labs/just-bash/stargazers)

### Watchers

[**8**\\
watching](https://github.com/vercel-labs/just-bash/watchers)

### Forks

[**139**\\
forks](https://github.com/vercel-labs/just-bash/forks)

[Report repository](https://github.com/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fjust-bash&report=vercel-labs+%28user%29)

## [Contributors\  19](https://github.com/vercel-labs/just-bash/graphs/contributors)

- [![@cramforce](https://avatars.githubusercontent.com/u/89679?s=64&v=4)](https://github.com/cramforce)
- [![@claude](https://avatars.githubusercontent.com/u/81847?s=64&v=4)](https://github.com/claude)
- [![@robertyates](https://avatars.githubusercontent.com/u/812444?s=64&v=4)](https://github.com/robertyates)
- [![@robertlyates](https://avatars.githubusercontent.com/u/36275641?s=64&v=4)](https://github.com/robertlyates)
- [![@jscheid](https://avatars.githubusercontent.com/u/3514?s=64&v=4)](https://github.com/jscheid)
- [![@ziegfried](https://avatars.githubusercontent.com/u/64849?s=64&v=4)](https://github.com/ziegfried)
- [![@zachwill](https://avatars.githubusercontent.com/u/172692?s=64&v=4)](https://github.com/zachwill)
- [![@adriancooney](https://avatars.githubusercontent.com/u/621110?s=64&v=4)](https://github.com/adriancooney)
- [![@AndrewBarba](https://avatars.githubusercontent.com/u/1316152?s=64&v=4)](https://github.com/AndrewBarba)
- [![@skoblenick](https://avatars.githubusercontent.com/u/1390364?s=64&v=4)](https://github.com/skoblenick)
- [![@izziaraffaele](https://avatars.githubusercontent.com/u/2734825?s=64&v=4)](https://github.com/izziaraffaele)
- [![@tobiaslins](https://avatars.githubusercontent.com/u/2978876?s=64&v=4)](https://github.com/tobiaslins)
- [![@jarneson](https://avatars.githubusercontent.com/u/3580111?s=64&v=4)](https://github.com/jarneson)
- [![@gonzalovargas](https://avatars.githubusercontent.com/u/11396563?s=64&v=4)](https://github.com/gonzalovargas)

[\+ 5 contributors](https://github.com/vercel-labs/just-bash/graphs/contributors)

## Languages

- [TypeScript89.2%](https://github.com/vercel-labs/just-bash/search?l=typescript)
- [Shell9.6%](https://github.com/vercel-labs/just-bash/search?l=shell)
- [JavaScript0.6%](https://github.com/vercel-labs/just-bash/search?l=javascript)
- [Awk0.5%](https://github.com/vercel-labs/just-bash/search?l=awk)
- [Python0.1%](https://github.com/vercel-labs/just-bash/search?l=python)
- [Reason0.0%](https://github.com/vercel-labs/just-bash/search?l=reason)

You can’t perform that action at this time.