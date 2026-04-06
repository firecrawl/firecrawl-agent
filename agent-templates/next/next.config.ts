import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

const monorepoRoot = path.resolve(__dirname, "../..");
const usesExternalAgentCore = fs.existsSync(
  path.join(monorepoRoot, "agent-core", "src", "index.ts"),
);

const nextConfig: NextConfig = {
  experimental: usesExternalAgentCore ? { externalDir: true } : undefined,
  outputFileTracingRoot: usesExternalAgentCore ? monorepoRoot : undefined,
  serverExternalPackages: [
    "gray-matter",
    "better-sqlite3",
    "just-bash",
    "@mongodb-js/zstd",
    "@agentclientprotocol/sdk",
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals ?? [];
      config.externals.push(({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
        if (
          request === "just-bash" ||
          request === "@mongodb-js/zstd" ||
          request === "node-liblzma" ||
          request?.endsWith(".node")
        ) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }

    return config;
  },
};

export default nextConfig;
