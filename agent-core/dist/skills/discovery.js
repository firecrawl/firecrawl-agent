import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { parseSkillFrontmatter } from "./parser";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_SKILLS_DIR = path.join(__dirname, "definitions");
function getDefaultSkillsDir() {
  return DEFAULT_SKILLS_DIR;
}
async function discoverSitePlaybooks(skillDir) {
  const sitesDir = path.join(skillDir, "sites");
  try {
    const files = await fs.readdir(sitesDir);
    const playbooks = [];
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const filePath = path.join(sitesDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      const meta = parseSkillFrontmatter(content);
      if (meta.domains?.length) {
        playbooks.push({
          name: file.replace(/\.md$/, ""),
          platform: meta.platform || file.replace(/\.md$/, ""),
          domains: meta.domains,
          filePath
        });
      }
    }
    return playbooks;
  } catch {
    return [];
  }
}
async function discoverSkills(skillsDir = DEFAULT_SKILLS_DIR) {
  try {
    const entries = await fs.readdir(skillsDir, { withFileTypes: true });
    const skills = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const skillDir = path.join(skillsDir, entry.name);
      const skillFile = path.join(skillDir, "SKILL.md");
      try {
        const content = await fs.readFile(skillFile, "utf-8");
        const meta = parseSkillFrontmatter(content);
        const files = await fs.readdir(skillDir);
        const resources = files.filter(
          (f) => f !== "SKILL.md" && !f.startsWith(".") && f !== "sites"
        );
        const sitePlaybooks = await discoverSitePlaybooks(skillDir);
        skills.push({
          name: meta.name || entry.name,
          description: meta.description || "",
          category: meta.category,
          directory: skillDir,
          resources,
          sitePlaybooks: sitePlaybooks.length > 0 ? sitePlaybooks : void 0
        });
      } catch {
      }
    }
    return skills;
  } catch {
    return [];
  }
}
function buildDomainIndex(skills) {
  const index = /* @__PURE__ */ new Map();
  for (const skill of skills) {
    for (const pb of skill.sitePlaybooks ?? []) {
      for (const domain of pb.domains) {
        index.set(domain.toLowerCase(), { skill, playbook: pb });
      }
    }
  }
  return index;
}
export {
  buildDomainIndex,
  discoverSkills,
  getDefaultSkillsDir
};
