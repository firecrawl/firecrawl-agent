"use client";

import { OpenAI, Claude, Anthropic, Gemini, Google } from "@lobehub/icons";

const ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  openai: OpenAI,
  claude: Claude,
  anthropic: Anthropic,
  gemini: Gemini,
  google: Google,
};

export default function ProviderModelIcon({
  icon,
  size = 16,
}: {
  icon: string;
  size?: number;
}) {
  const Icon = ICON_MAP[icon];
  if (!Icon) return null;
  return <Icon size={size} />;
}
