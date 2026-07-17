export interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  dateRange: string;
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  stack: string;
  bullets: string[];
  tags: string[];
  featured?: boolean;
  links?: { label: string; url: string }[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface HonorItem {
  name: string;
  year: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  dateRange: string;
  detail?: string;
}

export interface CertificationItem {
  name: string;
  year?: string;
}