[Home](../README.md) > Examples

# Examples

Working examples for calling the Firecrawl Agent from 17 languages and frameworks.

**See also**: [Agent Core](../agent-core/) | [Templates](../templates/) | [SDKs](../sdks/) | [Deploy](../deploy/)

## Quick start

Start the agent server:

```bash
npm run dev
```

Pick your language and run. Each one hits `POST /v1/run` and prints results.

## All examples

| Example | Language | Dependencies | Run |
|---------|----------|-------------|-----|
| [curl](./curl/) | Shell | None | `bash run.sh` |
| [python-basic](./python-basic/) | Python | requests | `python main.py` |
| [python-langchain](./python-langchain/) | Python | langchain | `python main.py` |
| [typescript-ai-sdk](./typescript-ai-sdk/) | TypeScript | agent-core | `npx tsx index.ts` |
| [go-basic](./go-basic/) | Go | stdlib | `go run main.go` |
| [ruby](./ruby/) | Ruby | stdlib | `ruby main.rb` |
| [java](./java/) | Java | stdlib | `javac Main.java && java Main` |
| [rust](./rust/) | Rust | stdlib | `rustc main.rs && ./main` |
| [php](./php/) | PHP | curl ext | `php main.php` |
| [dart](./dart/) | Dart | stdlib | `dart run main.dart` |
| [kotlin](./kotlin/) | Kotlin | JVM stdlib | `kotlinc -script main.kts` |
| [csharp](./csharp/) | C# | .NET 8+ | `dotnet run` |
| [elixir](./elixir/) | Elixir | jason | `elixir main.exs` |
| [perl](./perl/) | Perl | core modules | `perl main.pl` |
| [r](./r/) | R | curl CLI | `Rscript main.R` |
| [cpp](./cpp/) | C++ | POSIX sockets | `clang++ -std=c++17 main.cpp && ./a.out` |
| [scala](./scala/) | Scala | JVM stdlib | `scala-cli run Main.scala` |

## Two integration paths

**HTTP client (any language)** -- POST to `/v1/run`, get JSON back. All examples except typescript-ai-sdk use this.

**Direct import (TypeScript only)** -- import agent-core as a library. No server needed. See [typescript-ai-sdk](./typescript-ai-sdk/).

## Configuration

All examples accept `AGENT_URL` env var (defaults to `http://localhost:3000/api/v1`):

```bash
AGENT_URL=https://my-agent.railway.app/api/v1 python examples/python-basic/main.py
```
