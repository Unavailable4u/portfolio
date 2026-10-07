export interface SectionDef {
  id: string;
  label: string;
}

/** Page order. Used by the nav, the command palette and the tab title. */
export const sections: SectionDef[] = [
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "about", label: "About" },
  { id: "activity", label: "Activity" },
  { id: "contact", label: "Contact" },
];

export const sectionIds = sections.map((s) => s.id);
