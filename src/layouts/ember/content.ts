import { projects } from "../../data/projects";
import type { ProjectItem, ProjectStatus, ResearchStatus } from "../../types";

// Facts (links, status, dates, authors, skills, certificates) come from src/data/.
// This file only holds what is specific to the Ember design: short card copy, image paths,
// the recognition cards, and small helpers that turn data into display text.

/* ── Navigation ─────────────────────────────────────────────────── */

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
export const navIds = navLinks.map((l) => l.id);

/** Opens web links in a new tab, leaves mailto: and relative links alone. */
export function linkProps(url: string) {
  return /^https?:/i.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** "https://www.example.com/" becomes "example.com". */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** "Co-Founder & Chief Technology Officer" becomes "Co-Founder & CTO", so it fits the profile card. */
export const shortRole = (role: string) =>
  role.replace("Chief Technology Officer", "CTO").replace("Chief Operating Officer", "COO");

/* ── Photo ──────────────────────────────────────────────────────── */

export const photo = {
  src: "/ember/cutout.webp",
  alt: "Portrait of Sayad in a grey suit, hands in pockets",
  width: 471,
  height: 829,
};

/* ── Projects ───────────────────────────────────────────────────── */

const listed = projects.filter((p) => p.category !== "research");

/** The flagship project gets its own large card. */
export const flagship = projects.find((p) => p.id === "minime");
/** Everything else that is a project. Research projects (such as FBEBC) are never listed here. */
export const gridProjects = listed.filter((p) => p.id !== "minime");
/** Ongoing research that has no paper yet, shown in the Research section. */
export const ongoingResearch = projects.filter((p) => p.category === "research");
export const buildCount = listed.length;

interface ProjectCopy {
  title?: string;
  summary: string;
}

/** Copy written for this design. Anything missing here falls back to the data file. */
const copy: Record<string, ProjectCopy> = {
  medsophia: {
    title: "MedSophia Maa42 & MaterniBot",
    summary:
      "AI-assisted maternal care and 42-day postpartum recovery, from a care-circle app to an ESP32 voice-and-vision companion device. Team project with co-founder Shaikh Md Abu Ahad (source on his GitHub).",
  },
  focusos: {
    summary:
      "Cross-platform desktop productivity suite: Pomodoro, Eisenhower task manager, budget tracker, journal, analytics, streaks and glass-morphism themes.",
  },
  "spherex-blink": {
    summary:
      "Blink comparator for NASA SPHEREx images. Pulls FITS cutouts from NASA/IPAC IRSA and groups them by epoch and bandpass; browser viewer under construction.",
  },
  "credit-scoring": {
    summary:
      "Predicts loan default risk by comparing 3 classifiers: Logistic Regression, Decision Tree and Random Forest (CodeAlpha task 1).",
  },
  handwriting: { summary: "Deep-learning image classification pipeline (CodeAlpha internship project)." },
  "discord-uploader": { summary: "Python tool that batch-uploads whole folders past Discord's 10-file limit." },
};

export const titleOf = (p: ProjectItem) => copy[p.id]?.title ?? p.title;
export const summaryOf = (p: ProjectItem) => copy[p.id]?.summary ?? p.summary;
/** The stack as a list of tags: "Python, FastAPI" (or "Python · FastAPI") becomes ["Python", "FastAPI"]. */
export const tagsOf = (p: ProjectItem) =>
  p.stack
    .split(/,\s*|\s·\s/)
    .map((t) => t.trim())
    .filter(Boolean);

/** The flagship card: the design's own wording. */
export const flagshipCopy = {
  summary:
    "A multi-agent AI workspace that takes a student project from idea to launch across six stages with shared memory and one chat in every stage.",
  checks: [
    "70+ specialist agent modules with a tiered orchestrator that classifies tasks by complexity",
    "Three-tier memory plus a semantic knowledge graph",
    "Software-generation pipeline: planning, parallel codegen, multi-reviewer consolidation, sandboxed test runs",
    "Next.js frontend with editor, live preview and terminal",
    "Local daemon that only runs commands in a user-approved folder",
    "Multi-provider LLM fallback: Groq, Cerebras, GitHub Models, Cloudflare Workers AI",
  ],
  stages: ["Notebooks", "Research", "Plan", "Build", "Test", "Growth"],
};

export const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  research: "Research",
  "in-progress": "In progress",
  completed: "Completed",
};

/** The design's status colours: active/progress/review glow orange, done is green. */
export const statusClass: Record<ProjectStatus, string> = {
  active: "active",
  research: "review",
  "in-progress": "progress",
  completed: "done",
};

/**
 * Projects with media use their real screenshot. The rest get the design's placeholder
 * illustrations (MedSophia shows an app and a device side by side), so add `media.thumbnail`
 * in projects.ts to replace them.
 */
const placeholdersFor: Record<string, string[]> = {
  medsophia: ["phone-app", "device"],
  "spherex-blink": ["sky"],
};

export function projectImages(p: ProjectItem) {
  if (p.media?.thumbnail) {
    return [{ src: p.media.thumbnail, real: true, fit: p.media.thumbnailFit ?? "cover" }];
  }
  return (placeholdersFor[p.id] ?? ["desktop"]).map((name) => ({
    src: `/ember/placeholders/${name}.svg`,
    real: false,
    fit: "cover" as const,
  }));
}

/**
 * How many of the grid's six columns each card takes, so every row fills up:
 * a multiple of three gets thirds, an even count gets halves, and a remainder widens the last cards.
 */
export function gridSpans(count: number): number[] {
  if (count % 3 === 0) return Array(count).fill(2);
  if (count % 2 === 0) return Array(count).fill(3);
  const spans: number[] = Array(count).fill(2);
  const rest = count % 3;
  if (rest === 1) spans[count - 1] = 6;
  if (rest === 2) {
    spans[count - 1] = 3;
    spans[count - 2] = 3;
  }
  return spans;
}

/* ── Research ───────────────────────────────────────────────────── */

export const researchStatusLabel: Record<ResearchStatus, string> = {
  "under-review": "Under peer review",
  "preprint-draft": "Preprint in draft",
  published: "Published",
};

/** Short text for research that has no paper yet. Falls back to the project's own title and summary. */
const ongoingCopy: Record<string, { title: string; blurb: string }> = {
  fbebc: {
    title: "FBEBC",
    blurb: "Governing LLM-driven code evolution: an untrusted proposer, a trusted evaluator, six admission gates.",
  },
};
export const ongoingTitle = (p: ProjectItem) => ongoingCopy[p.id]?.title ?? p.title;
export const ongoingBlurb = (p: ProjectItem) => ongoingCopy[p.id]?.blurb ?? p.summary;

/* ── Recognition, skills ────────────────────────────────────────── */

export const recognition = [
  {
    title: "Aspire Leaders Program finalist",
    text: "One of 9,362 finalists chosen from 45,228 students in Cohort 4.",
    meta: "ASPIRE INSTITUTE · 2025",
  },
  {
    title: "Olympiad regional winner",
    text: "Regional round winner at BdMO (2021) and BdJSO (2020 and 2021).",
    meta: "BDMO · BDJSO",
  },
  {
    title: "Technovation Girls mentor",
    text: "Mentored teams building tech solutions, with at least 37 hours logged.",
    meta: "TECHNOVATION · 2025",
  },
  {
    title: "CodeAlpha ML internship completed",
    text: "Credit scoring and handwritten character recognition, completed with certificate.",
    meta: "CODEALPHA · JUN–JUL 2026",
  },
];

/** The label and how many of the three bars light up for each skill tier. */
export const skillLevels = [
  { note: "Daily drivers", bars: 3 },
  { note: "Comfortable", bars: 2 },
  { note: "Growing", bars: 1 },
];
