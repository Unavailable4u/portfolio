/**
 * Loads the site's data files, the single source of truth for every CV, and
 * adds a few small selectors. Nothing here rewrites content.
 */
import { profile } from "../../src/data/profile.ts";
import { experience } from "../../src/data/experience.ts";
import { education } from "../../src/data/education.ts";
import { projects } from "../../src/data/projects.ts";
import { skills } from "../../src/data/skills.ts";
import { honors } from "../../src/data/honors.ts";
import { certifications } from "../../src/data/certifications.ts";
import { research } from "../../src/data/research.ts";
import type { ProjectItem, ProjectLink } from "../../src/types/index.ts";

export const cv = { profile, experience, education, projects, skills, honors, certifications, research };
export type CvData = typeof cv;

/** https://www.example.com/path/ -> example.com/path */
export function displayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

export function project(id: string): ProjectItem {
  const found = projects.find((p) => p.id === id);
  if (!found) throw new Error(`Project "${id}" not found in src/data/projects.ts`);
  return found;
}

export function githubLinks(p: ProjectItem): ProjectLink[] {
  return (p.links ?? []).filter((l) => l.kind === "github");
}

export function statusLabel(status: ProjectItem["status"]): string | undefined {
  switch (status) {
    case "active":
      return "active";
    case "research":
      return "research";
    case "in-progress":
      return "in progress";
    case "completed":
      return "completed";
    default:
      return undefined;
  }
}

/** Contact details shared by every template. The phone is intentionally CV-only. */
export function contactDetails(p: typeof profile) {
  return {
    location: p.location,
    phone: p.phone,
    email: { text: p.email, url: `mailto:${p.email}` },
    linkedin: { text: displayUrl(p.linkedin), url: p.linkedin },
    github: { text: displayUrl(p.github), url: p.github },
    site: { text: displayUrl(p.siteUrl), url: p.siteUrl },
  };
}

export const metaKeywords = [
  "Electronics and Telecommunication Engineering",
  "RUET",
  "AI systems",
  "multi-agent systems",
  "LLM agents",
  "machine learning",
  "Python",
  "FastAPI",
  "React",
].join(", ");
