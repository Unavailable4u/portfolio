import type { SkillTier } from "../types";

// Tiers are grouped by depth rather than rated with percentages.
// This is a first pass based on what the repositories show. Edit freely.
export const skills: SkillTier[] = [
  {
    label: "Core",
    description: "Used daily and shipped in real projects.",
    items: [
      "Python",
      "FastAPI",
      "JavaScript",
      "React / Next.js",
      "PostgreSQL",
      "LLM APIs & agents",
      "AI prompt engineering",
      "Git / GitHub",
    ],
  },
  {
    label: "Working knowledge",
    description: "Comfortable building with these, with docs open.",
    items: [
      "TypeScript",
      "Tailwind CSS",
      "Redis",
      "Vector databases",
      "Docker",
      "scikit-learn",
      "Machine learning",
      "Flet",
      "Firebase",
    ],
  },
  {
    label: "Familiar with",
    description: "Used in coursework, experiments or team projects.",
    items: ["Deep learning", "C++", "ESP32 / embedded", "Flutter", "astropy / FITS data", "HTML"],
  },
];
