import matter from "gray-matter";

export interface SkillFrontmatter {
  name: string;
  description: string;
  category?: string;
  model?: string;
  domains?: string[];
  platform?: string;
}

export function parseSkillFrontmatter(content: string): SkillFrontmatter {
  const { data } = matter(content);
  return {
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : "",
    category: typeof data.category === "string" ? data.category : undefined,
    model: typeof data.model === "string" ? data.model : undefined,
    domains: Array.isArray(data.domains) ? data.domains.map(String) : undefined,
    platform: typeof data.platform === "string" ? data.platform : undefined,
  };
}

export function parseSkillBody(content: string): string {
  const { content: body } = matter(content);
  return body.trim();
}
