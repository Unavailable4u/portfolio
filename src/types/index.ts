export interface LinkItem {
  label: string;
  url: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  /** Short display name used in the nav, tab titles and the command palette. */
  shortName: string;
  /** One-line positioning statement shown under the name. */
  headline: string;
  /** Short role line used in meta tags and downloadable CVs. */
  title: string;
  location: string;
  email: string;
  /** Used only in the downloadable CVs. It is never rendered on the website. */
  phone?: string;
  github: string;
  linkedin: string;
  siteUrl: string;
  availability: string;
  summary: string;
  /** One or two sentences on what is happening right now. */
  now: string;
  languages: LanguageItem[];
  /** Public olympiad profiles. */
  profiles: LinkItem[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  orgUrl?: string;
  location: string;
  dateRange: string;
  current?: boolean;
  bullets: string[];
}

export type ProjectLinkKind = "github" | "live" | "docs" | "paper" | "mail";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  url: string;
}

export interface ProjectMedia {
  /** Image shown on the card, e.g. /projects/minime/thumb.webp */
  thumbnail?: string;
  /** Alternate image the card crossfades to on hover. */
  hoverImage?: string;
  /** Extra screenshots shown in the project modal gallery. */
  screenshots?: string[];
  /** YouTube link (watch, youtu.be or embed) or a path to a self-hosted .mp4/.webm. */
  video?: string;
}

export type ProjectStatus = "active" | "research" | "in-progress" | "completed";

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  /** One line shown on the card. */
  summary: string;
  stack: string;
  bullets: string[];
  tags: string[];
  featured?: boolean;
  /** Research projects are listed in the Research section instead of the project grid. */
  category?: "research";
  status?: ProjectStatus;
  stats?: ProjectStat[];
  /** Honest context such as team attribution. */
  note?: string;
  links?: ProjectLink[];
  media?: ProjectMedia;
}

export interface SkillTier {
  label: string;
  description: string;
  items: string[];
}

export interface HonorItem {
  name: string;
  year: string;
  url?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  dateRange: string;
}

export type CertificationCategory = "credential" | "competition";

export interface CertificateExtra {
  label: string;
  image: string;
  thumb: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  category: CertificationCategory;
  note?: string;
  /** Full-size image. Items without one appear in the text-only list. */
  image?: string;
  thumb?: string;
  /** Supporting letter shown next to the certificate in the lightbox. */
  extra?: CertificateExtra;
  verifyUrl?: string;
}

export interface NowItem {
  title: string;
  detail: string;
}

export interface Milestone {
  when: string;
  title: string;
  detail?: string;
}

export type ResearchStatus = "under-review" | "preprint-draft" | "published";

export interface ModelPoint {
  name: string;
  paramsK: number;
  /** Mean accuracy over 5 seeds, in percent. */
  accuracy: number;
  /** Standard deviation over 5 seeds, in percentage points. */
  std: number;
  ours?: boolean;
}

export interface ResearchItem {
  id: string;
  title: string;
  authors: string[];
  /** Exact entry in `authors` to emphasise. */
  highlightAuthor: string;
  affiliation: string;
  status: ResearchStatus;
  statusNote: string;
  summary: string;
  contributions: string[];
  stats: ProjectStat[];
  /** Results the paper reports that do not favour the proposed model. */
  honestFindings: string[];
  keywords: string[];
  links?: ProjectLink[];
}
