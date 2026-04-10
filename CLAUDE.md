### Vendored `agent-core` in templates

Next, Express, and Library embed a **copy** of `agent-core/` (no symlinks) so standalone deploys and Vercel builds work. After you change the canonical [`agent-core/`](./agent-core/) package, refresh the copies:

```bash
node .internal/scripts/sync-agent-core.mjs
# optional: write only to /tmp to inspect
node .internal/scripts/sync-agent-core.mjs --tmp
```
