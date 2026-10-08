import { education } from "../../data/education";
import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import type { ProjectItem, ProjectLink, ProjectStatus, ResearchStatus } from "../../types";

// Facts (links, status, stats, dates, authors, skills, certificates) come from src/data/.
// This file only holds what is specific to the Ivory design: short card copy, photo paths,
// and small helpers that turn data into display text.

/* ── Navigation ─────────────────────────────────────────────────── */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
export const navIds = navLinks.map((l) => l.id);

/* ── Photos ─────────────────────────────────────────────────────── */

export const photos = {
  portrait: "/ivory/portrait.webp",
  portraitAlt: "Black and white portrait of Sayad with arms crossed, wearing a striped shirt, tie and RUET lanyard",
  bus: "/ivory/bus.webp",
  busAlt: "Sayad standing in front of a weathered teal-and-white bus with faded Bangla lettering",
};

/* ── Helpers ────────────────────────────────────────────────────── */

/** Opens web links in a new tab, leaves mailto: and relative links alone. */
export function linkProps(url: string) {
  return /^https?:/i.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Splits prose into sentences without breaking on "Inc.," or "S.M.". Each result ends with a period. */
export function sentences(text: string): string[] {
  return text
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
}

const numberWords = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
export const countWord = (n: number) => numberWords[n] ?? String(n);

/* ── About ──────────────────────────────────────────────────────── */

const summary = sentences(profile.summary);
/** The profile summary as two paragraphs: who I am, then teams and what I'm looking for. */
export const aboutParagraphs = [summary[0], summary.slice(1).join(" ")].filter(Boolean);

export const cofounded = experience.filter((e) => /co-founder/i.test(e.role)).length;

export const languagesLine = profile.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ");

export const facts = [
  { icon: "pin", label: "Based in", value: profile.location },
  { icon: "cap", label: "Studying", value: `ETE at RUET, ${(education[0]?.dateRange ?? "").replace(/\s*–\s*/g, "–")}` },
  { icon: "team", label: "Teams", value: `${cofounded} co-founded` },
  { icon: "send", label: "Availability", value: profile.availability },
];

/* ── Projects ───────────────────────────────────────────────────── */

/** The three large cards, in order. Every other project becomes a row under "More projects". */
export const featuredIds = ["minime", "fbebc", "medsophia"];

const byId = (id: string) => projects.find((p) => p.id === id);

export const featuredProjects = featuredIds.map(byId).filter((p): p is ProjectItem => Boolean(p));
export const otherProjects = projects.filter((p) => !featuredIds.includes(p.id));

/** Short copy written for this design. Anything missing here falls back to the data file. */
const copy: Record<string, { title?: string; blurb: string; stack?: string }> = {
  minime: {
    blurb: "Multi-agent AI workspace taking a student project from idea to launch across six stages.",
    stack: "Python · FastAPI · Next.js · PostgreSQL · Redis",
  },
  fbebc: {
    title: "FBEBC",
    blurb: "Governing LLM-driven code evolution: an untrusted proposer, a trusted evaluator, six admission gates.",
    stack: "Python · Docker · SQLite · Groq API · Preprint in draft",
  },
  medsophia: {
    title: "MedSophia Maa42",
    blurb: "Maternal care and 42-day postpartum recovery, from a care-circle app to an ESP32 companion device.",
    stack: "React 19 · Firebase · FastAPI · ESP32",
  },
  focusos: {
    blurb: "Desktop productivity suite",
    stack: "Python, Flet · Pomodoro, Eisenhower tasks, budget, journal",
  },
  "spherex-blink": { blurb: "Blink comparator for NASA SPHEREx" },
  "credit-scoring": {
    blurb: "Loan default risk, 3 classifiers",
    stack: "Logistic Regression, Decision Tree, Random Forest",
  },
  handwriting: {
    title: "Handwriting Recognition",
    blurb: "Handwritten character classification",
    stack: "Deep learning, image classification pipeline",
  },
  "discord-uploader": { blurb: "Batch folder uploads past the 10-file limit" },
};

export const titleOf = (p: ProjectItem) => copy[p.id]?.title ?? p.title;
export const blurbOf = (p: ProjectItem) => copy[p.id]?.blurb ?? p.summary;
export const stackOf = (p: ProjectItem) => copy[p.id]?.stack ?? p.stack;

export const statusView: Record<ProjectStatus, { label: string; tone: "prog" | "done" | "" }> = {
  active: { label: "Active", tone: "prog" },
  research: { label: "Research", tone: "prog" },
  "in-progress": { label: "In progress", tone: "prog" },
  completed: { label: "Completed", tone: "done" },
};

/**
 * Projects with media use their real screenshot. The rest get one of the design's placeholder
 * illustrations, so add `media.thumbnail` in projects.ts to replace it.
 */
const placeholderFor: Record<string, string> = {
  fbebc: "research-chart",
  medsophia: "phone-app",
  "spherex-blink": "sky",
};

export function projectImage(p: ProjectItem, kind: "card" | "row") {
  if (p.media?.thumbnail) return { src: p.media.thumbnail, real: true };
  const name = placeholderFor[p.id] ?? (kind === "card" ? "desktop" : "code");
  return { src: `/ivory/placeholders/${name}.svg`, real: false };
}

export const primaryLink = (p: ProjectItem): ProjectLink | undefined => p.links?.[0];
export const secondaryLink = (p: ProjectItem): ProjectLink | undefined => p.links?.[1];

/* ── Highlights ─────────────────────────────────────────────────── */

const minimeStat = (label: string) => byId("minime")?.stats?.find((s) => s.label === label)?.value ?? "";

export const highlights = [
  { icon: "layers", value: minimeStat("agent modules"), label: "Agent modules" },
  { icon: "check", value: minimeStat("tests"), label: "Tests in MiniMe" },
  { icon: "team", value: String(cofounded), label: "Teams co-founded" },
  { icon: "globe", value: "9,362", label: "Aspire finalists, of 45,228" },
];

/* ── Research ───────────────────────────────────────────────────── */

export const researchStatusLabel: Record<ResearchStatus, string> = {
  "under-review": "Under peer review",
  "preprint-draft": "Preprint in draft",
  published: "Published",
};

/* ── Skills ─────────────────────────────────────────────────────── */

export const skillTitles: Record<string, string> = {
  Core: "Daily drivers",
  "Working knowledge": "Comfortable with",
  "Familiar with": "Learning & exploring",
};
