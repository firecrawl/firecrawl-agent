interface SkillFrontmatter {
    name: string;
    description: string;
    category?: string;
    model?: string;
    domains?: string[];
    platform?: string;
}
declare function parseSkillFrontmatter(content: string): SkillFrontmatter;
declare function parseSkillBody(content: string): string;

export { type SkillFrontmatter, parseSkillBody, parseSkillFrontmatter };
