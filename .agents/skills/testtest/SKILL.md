```markdown
---
name: testtest
description: Find top open-source LLM frameworks, scrape their GitHub READMEs, and compare stars, language, license, and deployment profiles
---

# Compare Top Open-Source LLM Frameworks

## When to Use
Load this skill when the user asks to research, compare, or evaluate open-source LLM frameworks — including questions about popularity (stars), tech stack, licensing, deployment context, or use-case fit.

## Tools Required
- search
- scrape

## Step-by-Step Instructions
1. Search for curated lists of top open-source LLM frameworks using queries like "top open-source LLM frameworks GitHub stars 2024" and "best open-source LLM frameworks ranked".
2. From search results and curated lists, identify the top 5 frameworks by GitHub star count. Prioritize frameworks (inference, training, orchestration) over chat UIs or model weights.
3. Resolve the canonical GitHub URL for each framework (e.g., `github.com/langchain-ai/langchain`).
4. Scrape each GitHub repository page simultaneously to extract: stars, primary language, license, and the README summary/description.
5. If deployment details are needed, scrape each project's documentation site or README sections covering deployment, hardware requirements, and cloud/local support.
6. If deeper cloud deployment data is needed for specific frameworks (e.g., vLLM Kubernetes support), run targeted searches like "vLLM Kubernetes production deployment" and scrape the relevant docs pages.
7. Compile all extracted data into a structured comparison table and written summaries per framework.
8. Synthesize cross-cutting observations: license distribution, language distribution, use-case segmentation (local vs. cloud vs. training vs. orchestration).

## Data Extraction
For each framework, extract and store:
- **Name**: Official project name
- **Stars**: Current GitHub star count (e.g., "166k")
- **Primary Language**: As reported on the GitHub repo header
- **License**: As listed in the GitHub repo (e.g., MIT, Apache-2.0)
- **GitHub URL**: Canonical repo URL
- **One-line description**: From README or repo description field
- **Deployment profile**: Local-friendly? GPU required? Kubernetes support? Cloud provider integrations?
- **Best-fit use case**: Summarized in one phrase (e.g., "high-throughput cloud serving", "local/edge inference")

## Output Format
Produce two sections:

**Section 1 — Comparison Table**
A markdown table with columns: Rank, Framework, Stars, Language, License, GitHub URL.

**Section 2 — Framework Summaries**
One paragraph per framework covering: what it does, standout features, hardware/deployment requirements, and ideal use case.

**Section 3 — Key Observations** (when comparing multiple dimensions)
Bullet points covering: license split, language split, use-case segmentation, and any notable relationships between frameworks (e.g., "Ollama runs on top of llama.cpp internally").

**Optional Section 4 — Decision Matrix** (when deployment context is requested)
A markdown table mapping deployment scenarios to recommended frameworks.

## Tips & Edge Cases
- GitHub star counts change frequently — always note that figures reflect the scrape date and may be approximate (e.g., "99.5k").
- Some repos have moved or forked (e.g., llama.cpp moved from `ggerganov` to `ggml-org`). Verify the canonical URL before scraping.
- Distinguish between "frameworks" (LangChain, vLLM, Transformers) and "model weights" (LLaMA, Mistral) or "chat UIs" (Open WebUI) — users often conflate these. Clarify scope upfront if ambiguous.
- LangChain is an orchestration/application layer, not an inference engine — it complements the other frameworks rather than competing directly. Make this architectural relationship explicit.
- Ollama internally uses llama.cpp as its inference backend — worth noting to avoid confusion when comparing the two.
- vLLM requires a GPU (NVIDIA CUDA or AMD ROCm) — flag this clearly when local/CPU deployment is part of the query.
- HuggingFace Transformers is a model library and training toolkit, not a standalone serving solution — pair it with vLLM or TGI for production inference use cases.
- Apache-2.0 and MIT are both permissive/commercial-friendly — clarify this if users have licensing concerns.
- If a README is very long, focus scraping on the top section (project description, badges, quickstart) which contains stars, language, and license metadata.

## Example Queries
- "Find the top 5 open-source LLM frameworks, scrape each repo's README, and compare stars, language, and license"
- "Which open-source LLM framework is best for local deployment vs cloud?"
- "Compare LangChain, vLLM, and Ollama by GitHub stars and license"
- "What are the most popular open-source frameworks for running LLMs, and what are their licenses?"
- "I need to deploy an LLM on Kubernetes — which open-source framework should I use?"
- "Compare open-source LLM inference engines by hardware requirements and throughput"
```