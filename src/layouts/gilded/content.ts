import { projects } from "../../data/projects";
import type { ProjectItem, ProjectLink, ProjectStatus, ResearchStatus } from "../../types";

// Facts (links, status, dates, authors, skills, certificates) come from src/data/.
// This file only holds what is specific to the Gilded design: short card copy, image paths,
// the focus / tools / recognition panels, and small helpers that turn data into display text.

/* ── Navigation ─────────────────────────────────────────────────── */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "focus", label: "Focus" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
export const navIds = navLinks.map((l) => l.id);

/** The numbered contents card under the hero. */
export const tocLinks = [
  { id: "about", label: "About Me" },
  { id: "focus", label: "Focus" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Selected Work" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];

export const monogram = "SS";
export const year = "2026";

/* ── Photos ─────────────────────────────────────────────────────── */

export const photos = {
  cutout: "/gilded/cutout.webp",
  cutoutAlt: "Sayad in a grey suit, hands in pockets",
  portrait: "/gilded/portrait.webp",
  portraitAlt: "Black and white portrait of Sayad, arms crossed, wearing a striped shirt, tie and RUET lanyard",
};

/* ── Helpers ────────────────────────────────────────────────────── */

/** Opens web links in a new tab, leaves mailto: and relative links alone. */
export function linkProps(url: string) {
  return /^https?:/i.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/* ── Projects ───────────────────────────────────────────────────── */

/** The featured projects, in order. Research projects (such as FBEBC) are never listed here. */
export const featuredIds = ["minime", "medsophia", "focusos"];

const byId = (id: string) => projects.find((p) => p.id === id);
const listed = projects.filter((p) => p.category !== "research");

export const featuredProjects = featuredIds.map(byId).filter((p): p is ProjectItem => Boolean(p));
/** Every other project becomes a small card under the featured ones. */
export const otherProjects = listed.filter((p) => !featuredIds.includes(p.id));
/** Ongoing research that has no paper yet, shown in the Research section. */
export const ongoingResearch = projects.filter((p) => p.category === "research");

interface ProjectCopy {
  /** Card heading as two parts, so the second one can be set in gold italics. */
  lead?: string;
  em?: string;
  summary?: string;
  highlights?: string[];
  stack?: string;
  /** Caption under the image in the "Selected projects" strip. */
  kind?: string;
  shortStack?: string;
  /** Title used in the strip when the full title is too long for it. */
  shortTitle?: string;
}

/** Copy written for this design. Anything missing here falls back to the data file. */
const copy: Record<string, ProjectCopy> = {
  minime: {
    lead: "Mini",
    em: "Me",
    summary:
      "Multi-agent AI workspace that takes a student project from idea to launch across six stages (Notebooks, Research, Plan, Build, Test, Growth) with shared memory and one chat in every stage.",
    highlights: [
      "70+ specialist agent modules with a tiered orchestrator that classifies tasks by complexity",
      "Three-tier memory with a semantic knowledge graph",
      "Software-generation pipeline: planning, parallel codegen, multi-reviewer consolidation, sandboxed test runs",
      "Local daemon that only runs commands in a user-approved folder",
      "Multi-provider LLM fallback (Groq, Cerebras, GitHub Models, Cloudflare Workers AI)",
    ],
    stack: "Python · FastAPI · Next.js / React · PostgreSQL (Supabase) · Redis & vector DB (Upstash)",
    kind: "Multi-agent AI workspace",
    shortStack: "Python · FastAPI · Next.js",
  },
  medsophia: {
    lead: "MedSophia Maa42 ",
    em: "& MaterniBot",
    summary:
      "AI-assisted maternal care and 42-day postpartum recovery, from a care-circle app to an ESP32 voice-and-vision companion device. A team project with co-founder Shaikh Md Abu Ahad (source on his GitHub).",
    highlights: [
      "Pregnancy-week tracking, kick counter, mood and breathing tools, SOS, care circle with clinical oversight",
      "Stage-aware AI assistant with safe fallbacks",
      "FastAPI backend: speech-to-text / text-to-speech, camera scanning, sensor ingestion, reminders, safety layer",
    ],
    stack: "React 19 · Firebase · Express · Groq · FastAPI · OpenAI · ESP32",
    kind: "Maternal care app + ESP32 device",
    shortStack: "React 19 · FastAPI · ESP32",
    shortTitle: "MedSophia & MaterniBot",
  },
  focusos: {
    lead: "Focus",
    em: "OS",
    summary: "Cross-platform desktop productivity suite that keeps focus, tasks, money and reflection in one place.",
    highlights: [
      "Pomodoro sessions, Eisenhower task manager and streak gamification",
      "Budget tracker, journal and an analytics dashboard",
      "Glass-morphism themes, backup and restore, CSV export",
    ],
    stack: "Python · Flet",
    kind: "Desktop productivity suite",
    shortStack: "Python · Flet",
  },
  "spherex-blink": {
    summary:
      "Blink comparator for NASA SPHEREx images; pulls FITS cutouts from NASA/IPAC IRSA, grouped by epoch and bandpass. Browser viewer under construction.",
    stack: "Python · astropy · astroquery · JavaScript",
  },
  "credit-scoring": {
    summary: "Predicts loan default risk, comparing three classifiers (CodeAlpha task 1).",
    stack: "Logistic Regression · Decision Tree · Random Forest",
  },
  handwriting: {
    summary: "Deep-learning image classification pipeline.",
    stack: "Deep learning · CodeAlpha",
  },
  "discord-uploader": {
    summary: "Python tool that batch-uploads whole folders past Discord's 10-file limit.",
    stack: "Python",
  },
};

export const summaryOf = (p: ProjectItem) => copy[p.id]?.summary ?? p.summary;
export const stackOf = (p: ProjectItem) => copy[p.id]?.stack ?? p.stack;
export const highlightsOf = (p: ProjectItem) => copy[p.id]?.highlights ?? [];
export const kindOf = (p: ProjectItem) => copy[p.id]?.kind ?? p.summary;
export const shortStackOf = (p: ProjectItem) => copy[p.id]?.shortStack ?? p.stack;
export const stripTitleOf = (p: ProjectItem) => copy[p.id]?.shortTitle ?? p.title;
export const headingOf = (p: ProjectItem) => ({
  lead: copy[p.id]?.lead ?? p.title,
  em: copy[p.id]?.em,
});

export const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  research: "Research",
  "in-progress": "In progress",
  completed: "Completed",
};

/**
 * Projects with media use their real screenshot. The rest get one of the design's placeholder
 * illustrations, so add `media.thumbnail` in projects.ts to replace it.
 */
const placeholderFor: Record<string, string> = {
  medsophia: "phone-app",
  "spherex-blink": "sky",
};

export function projectImage(p: ProjectItem) {
  if (p.media?.thumbnail) {
    return { src: p.media.thumbnail, real: true, fit: p.media.thumbnailFit ?? "cover" };
  }
  const name = placeholderFor[p.id] ?? "desktop";
  return { src: `/gilded/placeholders/${name}.svg`, real: false, fit: "cover" as const };
}

export const primaryLink = (p: ProjectItem): ProjectLink | undefined => p.links?.[0];

/* ── Research ───────────────────────────────────────────────────── */

export const researchStatusLabel: Record<ResearchStatus, string> = {
  "under-review": "Under peer review",
  "preprint-draft": "Preprint in draft",
  published: "Published",
};

/** Short card text for research that has no paper yet. Falls back to the project's own title and summary. */
const ongoingCopy: Record<string, { title: string; blurb: string }> = {
  fbebc: {
    title: "FBEBC",
    blurb: "Governing LLM-driven code evolution: an untrusted proposer, a trusted evaluator, six admission gates.",
  },
};
export const ongoingTitle = (p: ProjectItem) => ongoingCopy[p.id]?.title ?? p.title;
export const ongoingBlurb = (p: ProjectItem) => ongoingCopy[p.id]?.blurb ?? p.summary;

/** "RoLA-Net: A Lightweight … Architecture for Robust …" with the middle part set in gold italics. */
export function splitTitle(title: string): { lead: string; em?: string; tail?: string } {
  const match = /^(.*?:\s)(.*?)(\sfor\s.*)$/.exec(title);
  return match ? { lead: match[1], em: match[2], tail: match[3] } : { lead: title };
}

/* ── Focus, tools, recognition ──────────────────────────────────── */

export const focusAreas = [
  { icon: "agents", title: "Multi-agent systems", text: "Orchestrated specialists with shared memory" },
  { icon: "api", title: "Backend & APIs", text: "FastAPI services built to be tested" },
  { icon: "signal", title: "ML & signal research", text: "Lightweight models, honest evaluation" },
  { icon: "chip", title: "Embedded / ESP32", text: "Voice-and-vision companion hardware" },
  { icon: "heart", title: "Healthcare AI", text: "Safer care continuity, not diagnosis" },
  { icon: "team", title: "Team & product leadership", text: "Three early-stage teams co-founded" },
];

export const tools = [
  { mark: "Py", name: "Python" },
  { mark: "FA", name: "FastAPI" },
  { mark: "Nx", name: "Next.js" },
  { mark: "PG", name: "PostgreSQL" },
  { mark: "Dk", name: "Docker" },
  { mark: "Gt", name: "Git" },
];

export const recognition = [
  {
    icon: "laurel",
    title: "Aspire Leaders Program finalist",
    text: "One of 9,362 finalists from 45,228 students. Cohort 4, Aspire Institute, 2025.",
  },
  { icon: "star", title: "BdMO & BdJSO regional winner", text: "BdMO 2021; BdJSO 2020 and 2021." },
  {
    icon: "paper",
    title: "RoLA-Net co-author",
    text: "Lightweight modulation-classification paper, currently under peer review.",
  },
];

/** Roman numerals for the three skill tiers. */
export const tierNumerals = ["I", "II", "III"];
