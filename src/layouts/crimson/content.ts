import { projects } from "../../data/projects";
import type { ProjectItem, ProjectLink, ProjectStatus, ResearchStatus } from "../../types";

// Facts (links, status, dates, authors, skills, certificates) come from src/data/.
// This file only holds what is specific to the Crimson design: short card copy, image paths,
// the "what I do" and "how I build" panels, and small helpers that turn data into display text.

/* ── Navigation ─────────────────────────────────────────────────── */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
export const navIds = navLinks.map((l) => l.id);

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Opens web links in a new tab, leaves mailto: and relative links alone. */
export function linkProps(url: string) {
  return /^https?:/i.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** "https://www.linkedin.com/in/x/" becomes "linkedin.com/in/x". */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/* ── Photos ─────────────────────────────────────────────────────── */

export const photos = {
  cutout: "/crimson/cutout.webp",
  cutoutAlt: "Sayad in a grey suit and tie, hands in pockets",
  portrait: "/crimson/portrait.webp",
  portraitAlt: "Black and white portrait of Sayad, arms crossed, wearing a striped shirt, tie and RUET lanyard",
};

/**
 * QR codes for the contact section. They are static images that encode the GitHub and LinkedIn
 * addresses in src/data/profile.ts. If either address changes, replace the matching file in public/crimson/.
 */
export const qrCodes = {
  linkedin: { src: "/crimson/qr-linkedin.svg", alt: "QR code linking to Sayad's LinkedIn profile" },
  github: { src: "/crimson/qr-github.svg", alt: "QR code linking to Sayad's GitHub profile" },
};

/* ── Hero ───────────────────────────────────────────────────────── */

export const heroStack = ["AI /", "Systems /", "Research"];
export const heroSubs = ["Multi-agent systems", "Backend & APIs", "Signal-classification research"];
export const heroQuote = "I build AI systems that go from idea to launch.";
export const heroIntro = (location: string) =>
  `I build AI systems end to end, from a multi-agent workspace to research on governing LLM-driven code. Based in ${location}, and open to AI, ML and software internships.`;

/* ── What I do, how I build, traits, tools ──────────────────────── */

export const doCards = [
  { icon: "agents", title: "Multi-agent systems", text: "Orchestrators, specialist agents and shared memory working as one workspace." },
  { icon: "api", title: "Backend & APIs", text: "FastAPI services, Postgres, queues and sandboxes that hold up in use." },
  { icon: "ml", title: "ML research", text: "Lightweight signal classification and governed code-evolution experiments." },
  { icon: "chip", title: "Embedded / ESP32", text: "Voice-and-vision device work for the MedSophia MaterniBot." },
  { icon: "team", title: "Product & team leadership", text: "Co-founder of three early-stage teams; mentor in Technovation Girls." },
];

export const steps = [
  { title: "Discover", text: "Start from a real gap, like the distance between a student's idea and a launched project." },
  { title: "Define", text: "Fix the scope early: six stages in MiniMe, six admission gates in FBEBC." },
  {
    title: "Design",
    text: "Keep trusted and untrusted apart: a tiered orchestrator, a folder-scoped local daemon, an evaluator the proposer can't touch.",
  },
  { title: "Build", text: "Ship in tested increments: 549 commits and 4,400+ tests on MiniMe, 194 tests on FBEBC." },
  {
    title: "Ship",
    text: "Plan for failure with multi-provider LLM fallback, then show it with a recorded demo and a request-access flow.",
  },
];

export const traits = ["Builds end to end", "Safety-minded by design", "Research-curious", "Team-first founder"];

export const tools = [
  { mark: "Py", name: "Python" },
  { mark: "API", name: "FastAPI" },
  { mark: "Nx", name: "Next.js" },
  { mark: "PG", name: "PostgreSQL" },
  { mark: "Dk", name: "Docker" },
  { mark: "Git", name: "Git" },
];

/* ── Projects ───────────────────────────────────────────────────── */

/** The featured projects, in order. Research projects (such as FBEBC) are never listed here. */
export const featuredIds = ["minime", "medsophia", "focusos"];

const byId = (id: string) => projects.find((p) => p.id === id);
const listed = projects.filter((p) => p.category !== "research");

export const featuredProjects = featuredIds.map(byId).filter((p): p is ProjectItem => Boolean(p));
/** Every other project goes into the "More work" list. */
export const otherProjects = listed.filter((p) => !featuredIds.includes(p.id));
/** Ongoing research that has no paper yet, shown next to the paper. */
export const ongoingResearch = projects.filter((p) => p.category === "research");

interface ProjectCopy {
  title?: string;
  /** Line under the title on a featured card. */
  meta?: string;
  blurb: string;
}

/** Copy written for this design. Anything missing here falls back to the data file. */
const copy: Record<string, ProjectCopy> = {
  minime: {
    meta: "Multi-agent AI workspace",
    blurb: "Takes a student project from idea to launch across six stages, with 70+ agent modules and 174 API routes.",
  },
  medsophia: {
    title: "MedSophia Maa42",
    meta: "Maternal care app + ESP32 MaterniBot",
    blurb:
      "AI-assisted pregnancy and 42-day postpartum support, from a care-circle app to a voice-and-vision companion device.",
  },
  focusos: {
    meta: "Desktop productivity suite",
    blurb: "Pomodoro, Eisenhower task manager, budget tracker, journal and analytics in one Python + Flet app.",
  },
  "spherex-blink": {
    blurb:
      "Blink comparator for NASA SPHEREx images; pulls FITS cutouts from IRSA. Python, astropy, astroquery, JavaScript.",
  },
  "credit-scoring": { blurb: "Predicts loan default risk by comparing 3 classifiers (CodeAlpha task 1)." },
  handwriting: { blurb: "Deep-learning image classification pipeline." },
  "discord-uploader": { blurb: "Python tool that batch-uploads whole folders past Discord's 10-file limit." },
};

export const titleOf = (p: ProjectItem) => copy[p.id]?.title ?? p.title;
export const blurbOf = (p: ProjectItem) => copy[p.id]?.blurb ?? p.summary;
export const metaOf = (p: ProjectItem) => copy[p.id]?.meta ?? p.stack;

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
  minime: "workspace",
  medsophia: "phone-app",
};

export function projectImage(p: ProjectItem) {
  if (p.media?.thumbnail) {
    return { src: p.media.thumbnail, real: true, fit: p.media.thumbnailFit ?? "cover" };
  }
  const name = placeholderFor[p.id] ?? "desktop";
  return { src: `/crimson/placeholders/${name}.svg`, real: false, fit: "cover" as const };
}

export const primaryLink = (p: ProjectItem): ProjectLink | undefined => p.links?.[0];

/* ── Research ───────────────────────────────────────────────────── */

export const researchStatusLabel: Record<ResearchStatus, string> = {
  "under-review": "Under peer review",
  "preprint-draft": "Preprint in draft",
  published: "Published",
};

/** "mean accuracy, 5 seeds (±0.38)" becomes "mean accuracy"; "fewer parameters than X at equal accuracy" keeps the part before "at". */
export const shortLabel = (label: string) => label.split(/,| at /)[0].trim();

/** Short text for research that has no paper yet. Falls back to the project's own title and summary. */
const ongoingCopy: Record<string, { title: string; blurb: string }> = {
  fbebc: {
    title: "FBEBC",
    blurb: "Governing LLM-driven code evolution: an untrusted proposer, a trusted evaluator, six admission gates.",
  },
};
export const ongoingTitle = (p: ProjectItem) => ongoingCopy[p.id]?.title ?? p.title;
export const ongoingBlurb = (p: ProjectItem) => ongoingCopy[p.id]?.blurb ?? p.summary;

/* ── Skills ─────────────────────────────────────────────────────── */

export const skillNotes = ["Daily drivers", "Used in projects", "Growing"];
export const skillClasses = ["core", "work", "fam"];
