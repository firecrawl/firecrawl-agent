import * as ai from 'ai';
import { SkillMetadata } from '../types.js';

declare function createSkillTools(skills: SkillMetadata[], customInstructions?: Record<string, string>): {
    load_skill: ai.Tool<{
        name: string;
    }, {
        error: string;
    } | {
        available_site_playbooks?: string[] | undefined;
        name: string;
        instructions: string;
        error?: undefined;
    }>;
    lookup_site_playbook: ai.Tool<{
        url: string;
    }, {
        found: boolean;
        message: string;
        platform?: undefined;
        skill?: undefined;
        playbook?: undefined;
    } | {
        found: boolean;
        platform: string;
        skill: string;
        playbook: string;
        message?: undefined;
    }>;
    read_skill_resource: ai.Tool<{
        skill: string;
        file: string;
    }, {
        error: string;
        file?: undefined;
        content?: undefined;
    } | {
        file: string;
        content: string;
        error?: undefined;
    }>;
};

export { createSkillTools };
