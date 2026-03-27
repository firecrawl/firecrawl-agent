\-\-\-
name: lobe-icons
description: Use \`@lobehub/icons\` — a collection of 200+ AI/LLM brand SVG logos and icon React components. Covers installation, React component usage (with variants like Color, Brand, Text, Combine, Avatar), CDN URL generation for static assets (SVG/PNG/WebP), helper components (ModelIcon, ProviderIcon, ProviderCombine), the icon table-of-contents metadata, and custom icon creation via IconType. Use when working with AI brand logos, model provider icons, or needing icon assets in any format.
\-\-\-

\# Lobe Icons

200+ AI / LLM brand SVG logo and icon collection as React components with CDN static asset support.

\- \*\*Package\*\*: \`@lobehub/icons\`
\- \*\*Browse all icons\*\*: \[lobehub.com/icons\](https://lobehub.com/icons)
\- \*\*Component docs\*\*: \[icons.lobehub.com\](https://icons.lobehub.com)
\- \*\*GitHub\*\*: \[github.com/lobehub/lobe-icons\](https://github.com/lobehub/lobe-icons)

\## Skill Files

\| File \| URL \|
\| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \|
\| \*\*SKILL.md\*\* (this file) \| \`https://lobehub.com/only-ai/skills/icons\` \|
\| \*\*reference/providers.md\*\* \| \`https://lobehub.com/only-ai/skills/icons/reference/providers\` \|

\*\*Install locally\*\* (replace \`~/.claude\` with your agent's skill directory, e.g. \`~/.claude\`, \`~/.agents\`, \`~/.moltbot\`, etc.):

\`\`\`bash
SKILL\_DIR=~/.claude/skills/lobe-icons # adjust path for your agent
mkdir -p "$SKILL\_DIR/reference"
curl -s https://lobehub.com/only-ai/skills/icons > "$SKILL\_DIR/SKILL.md"
curl -s https://lobehub.com/only-ai/skills/icons/reference/providers > "$SKILL\_DIR/reference/providers.md"
\`\`\`

\*\*Or just read them from the URLs above!\*\*

\## Installation

\`\`\`bash
npm install @lobehub/icons
\# or
bun add @lobehub/icons
\`\`\`

\## React Components

Each icon exports a base component and variant sub-components:

\`\`\`tsx
import { OpenAI } from '@lobehub/icons';

// Base (mono)

// Variants (availability depends on icon, check \`param\` flags in toc)
 // hasColor
 // hasBrand
 // hasBrandColor
 // hasText
 // hasTextCn
 // hasTextColor
 // hasCombine
 // hasCombine (color variant)
 // hasAvatar
\`\`\`

Common props: \`size\`, \`style\`, \`className\`.

\### Available Icon Names

Icons are exported by PascalCase id. Examples: \`OpenAI\`, \`Claude\`, \`DeepSeek\`, \`Google\`, \`Aws\`, \`Bedrock\`, \`Microsoft\`, \`LobeHub\`, \`Github\`, \`Anthropic\`, \`Gemini\`, \`Meta\`, \`Mistral\`, \`Perplexity\`, \`Cohere\`, \`Zhipu\`, \`ByteDance\`, \`AlibabaCloud\`, etc.

For the full list, see \[reference/providers.md\](reference/providers.md).

\## Helper Components

\### ModelIcon — Render icon by model ID string

\`\`\`tsx
import { ModelIcon } from '@lobehub/icons';

\`\`\`

\### ProviderIcon — Render icon by provider key

\`\`\`tsx
import { ProviderIcon } from '@lobehub/icons';

\`\`\`

\### ProviderCombine — Logo + text combined

\`\`\`tsx
import { ProviderCombine, ModelProvider } from '@lobehub/icons';

\`\`\`

\### ModelProvider enum

\`\`\`tsx
import { ModelProvider } from '@lobehub/icons';

ModelProvider.OpenAI; // "openai"
ModelProvider.Anthropic; // "anthropic"
ModelProvider.Google; // "google"
ModelProvider.DeepSeek; // "deepseek"
// ... 130+ providers
\`\`\`

\## CDN URLs (Static Assets)

Use \`getLobeIconCDN\` to generate direct URLs to icon images without React:

\`\`\`tsx
import { getLobeIconCDN } from '@lobehub/icons';

// Default: PNG, light mode, color variant, GitHub CDN
getLobeIconCDN('openai');
// → https://raw.githubusercontent.com/.../light/openai-color.png

getLobeIconCDN('openai', {
 format: 'svg', // 'svg' \| 'png' \| 'webp' \| 'avatar'
 type: 'mono', // 'mono' \| 'color' \| 'text' \| 'text-cn' \| 'brand' \| 'brand-color'
 isDarkMode: true, // affects PNG/WebP path (dark/ vs light/)
 cdn: 'aliyun', // 'github' (default) \| 'aliyun' \| 'unpkg'
});
\`\`\`

\### CDN URL Patterns

\*\*SVG\*\* (no light/dark distinction):

\`\`\`
\# GitHub
https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-svg/icons/{id}.svg
https://raw.githubusercontent.com/.../icons/{id}-color.svg
https://raw.githubusercontent.com/.../icons/{id}-text.svg

\# unpkg
https://unpkg.com/@lobehub/icons-static-svg@latest/icons/{id}.svg

\# Aliyun (npmmirror)
https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/{id}.svg
\`\`\`

\*\*PNG/WebP\*\* (with light/dark):

\`\`\`
\# GitHub
https://raw.githubusercontent.com/.../packages/static-png/{light\|dark}/{id}.png
https://raw.githubusercontent.com/.../packages/static-png/{light\|dark}/{id}-color.png

\# unpkg
https://unpkg.com/@lobehub/icons-static-png@latest/{light\|dark}/{id}.png
\`\`\`

\*\*Avatar\*\* (WebP only):

\`\`\`
https://raw.githubusercontent.com/.../packages/static-png/avatars/{id}.webp
\`\`\`

Slug naming: \`{id}\` = lowercase icon id. Variant suffix: \`-color\`, \`-text\`, \`-text-cn\`, \`-brand\`, \`-brand-color\`. Mono has no suffix.

\## Icon Table of Contents (toc)

\`\`\`tsx
import { toc } from '@lobehub/icons';

// toc: IconToc\[\]
\`\`\`

\`\`\`typescript
interface IconToc {
 id: string; // PascalCase identifier, e.g. "OpenAI"
 title: string; // Short name
 fullTitle: string; // Full display name
 color: string; // Brand hex color
 colorGradient?: string; // Optional gradient
 desc: string; // Official URL
 docsUrl: string; // Docs path
 group: 'model' \| 'provider' \| 'application';
 param: {
 hasColor: boolean;
 hasText: boolean;
 hasTextCn: boolean;
 hasTextColor: boolean;
 hasBrand: boolean;
 hasBrandColor: boolean;
 hasCombine: boolean;
 hasAvatar: boolean;
 };
}
\`\`\`

Use \`toc\` to discover available icons, filter by group, or check which variants an icon supports.

\## Custom Icons with IconType

Create custom icons compatible with the lobe-icons system:

\`\`\`tsx
import { type IconType, useFillIds } from '@lobehub/icons';
import { memo } from 'react';

const MyIcon: IconType = memo(({ size = '1em', style, ...rest }) => {
 const \[maskA, maskB\] = useFillIds('my-icon', 2); // unique SVG mask IDs
 return (

 {/\\* SVG content \*/}

 );
});
\`\`\`

\## Related Packages

\| Package \| Use case \|
\| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \|
\| \`@lobehub/icons\` \| React components (tree-shakable) \|
\| \`@lobehub/icons-rn\` \| React Native \|
\| \`@lobehub/icons-static-svg\` \| Static SVG files \|
\| \`@lobehub/icons-static-png\` \| Static PNG files (light/dark) \|
\| \`@lobehub/icons-static-webp\` \| Static WebP files (light/dark) \|