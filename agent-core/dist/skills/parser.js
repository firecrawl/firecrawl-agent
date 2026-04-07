import matter from "gray-matter";
function parseSkillFrontmatter(content) {
  const { data } = matter(content);
  return {
    name: typeof data.name === "string" ? data.name : "",
    description: typeof data.description === "string" ? data.description : "",
    category: typeof data.category === "string" ? data.category : void 0,
    model: typeof data.model === "string" ? data.model : void 0,
    domains: Array.isArray(data.domains) ? data.domains.map(String) : void 0,
    platform: typeof data.platform === "string" ? data.platform : void 0
  };
}
function parseSkillBody(content) {
  const { content: body } = matter(content);
  return body.trim();
}
export {
  parseSkillBody,
  parseSkillFrontmatter
};
