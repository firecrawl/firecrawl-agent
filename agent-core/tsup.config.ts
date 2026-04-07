import { defineConfig } from "tsup";
import { cpSync } from "fs";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  clean: true,
  bundle: false,
  onSuccess: async () => {
    // Copy runtime assets that are loaded via fs.readFile at runtime
    cpSync("src/orchestrator/prompt.md", "dist/orchestrator/prompt.md");
    cpSync("src/worker/prompt.md", "dist/worker/prompt.md");
    cpSync("src/skills/definitions", "dist/skills/definitions", {
      recursive: true,
    });
  },
});
