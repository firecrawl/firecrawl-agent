import { SkillMetadata, SitePlaybook } from '../types.js';
import 'ai';

/** Returns the path to the built-in skills directory. */
declare function getDefaultSkillsDir(): string;
declare function discoverSkills(skillsDir?: string): Promise<SkillMetadata[]>;
/**
 * Build a domain -> site playbook lookup from all discovered skills.
 */
declare function buildDomainIndex(skills: SkillMetadata[]): Map<string, {
    skill: SkillMetadata;
    playbook: SitePlaybook;
}>;

export { buildDomainIndex, discoverSkills, getDefaultSkillsDir };
