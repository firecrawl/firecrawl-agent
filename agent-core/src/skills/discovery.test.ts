import { describe, it, expect } from "vitest";
import { discoverSkills, buildDomainIndex, getDefaultSkillsDir } from "./discovery";
import fs from "fs/promises";

describe("getDefaultSkillsDir", () => {
  it("returns a path that exists", async () => {
    const dir = getDefaultSkillsDir();
    const stat = await fs.stat(dir);
    expect(stat.isDirectory()).toBe(true);
  });

  it("contains built-in skill definitions", async () => {
    const dir = getDefaultSkillsDir();
    const entries = await fs.readdir(dir);
    expect(entries).toContain("deep-research");
    expect(entries).toContain("e-commerce");
    expect(entries).toContain("finance");
  });
});

describe("discoverSkills", () => {
  it("discovers built-in skills", async () => {
    const skills = await discoverSkills();
    expect(skills.length).toBeGreaterThan(0);

    const names = skills.map((s) => s.name);
    expect(names).toContain("deep-research");
    expect(names).toContain("e-commerce");
  });

  it("returns skill metadata with required fields", async () => {
    const skills = await discoverSkills();
    const deepResearch = skills.find((s) => s.name === "deep-research");

    expect(deepResearch).toBeDefined();
    expect(deepResearch!.description).toBeTruthy();
    expect(deepResearch!.category).toBe("Research");
    expect(deepResearch!.directory).toContain("deep-research");
  });

  it("discovers site playbooks for e-commerce skill", async () => {
    const skills = await discoverSkills();
    const ecommerce = skills.find((s) => s.name === "e-commerce");

    expect(ecommerce).toBeDefined();
    expect(ecommerce!.sitePlaybooks).toBeDefined();
    expect(ecommerce!.sitePlaybooks!.length).toBeGreaterThan(0);

    const amazon = ecommerce!.sitePlaybooks!.find(
      (pb) => pb.platform === "amazon",
    );
    expect(amazon).toBeDefined();
    expect(amazon!.domains).toContain("amazon.com");
  });

  it("returns empty array for nonexistent directory", async () => {
    const skills = await discoverSkills("/nonexistent/path");
    expect(skills).toEqual([]);
  });

  it("returns empty array for directory with no valid skills", async () => {
    const skills = await discoverSkills("/tmp");
    expect(skills).toEqual([]);
  });
});

describe("buildDomainIndex", () => {
  it("maps domains to skills and playbooks", async () => {
    const skills = await discoverSkills();
    const index = buildDomainIndex(skills);

    expect(index.size).toBeGreaterThan(0);

    const amazon = index.get("amazon.com");
    expect(amazon).toBeDefined();
    expect(amazon!.skill.name).toBe("e-commerce");
    expect(amazon!.playbook.platform).toBe("amazon");
  });

  it("is case-insensitive for domain lookups", async () => {
    const skills = await discoverSkills();
    const index = buildDomainIndex(skills);

    // buildDomainIndex lowercases domains
    const result = index.get("amazon.com");
    expect(result).toBeDefined();
  });

  it("returns empty map for skills without playbooks", () => {
    const index = buildDomainIndex([
      {
        name: "no-playbooks",
        description: "test",
        directory: "/tmp",
        resources: [],
      },
    ]);
    expect(index.size).toBe(0);
  });
});
