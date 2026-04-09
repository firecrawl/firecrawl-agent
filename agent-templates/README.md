# Templates

Server templates for running the Firecrawl Agent. Each wraps [agent-core](../agent-core/) with a different framework.

## Install

```bash
firecrawl-agent init my-agent -t <template>
```

## Templates

| Template | Install | Best for |
|----------|---------|----------|
| [**Next.js**](./next/) | `firecrawl-agent init -t next` | Full app with chat UI, streaming, skills |
| [**Express**](./express/) | `firecrawl-agent init -t express` | API server, backend services |
| [**Library**](./library/) | `firecrawl-agent init -t library` | Scripts, custom integrations |

All templates import from [agent-core](../agent-core/). The core logic is identical. Templates only differ in the HTTP/UI layer.
