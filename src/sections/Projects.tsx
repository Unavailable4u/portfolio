import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/projects";
import { OPEN_PROJECT_EVENT } from "../lib/events";
import type { ProjectItem } from "../types";

const listed = projects.filter((p) => p.category !== "research");
const featured = listed.filter((p) => p.featured);
const rest = listed.filter((p) => !p.featured);

function Projects() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  // Lets the command palette and the Research section open a project by id.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const match = projects.find((p) => p.id === id);
      if (match) setSelected(match);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, []);

  return (
    <section id="projects" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading
            tag="01 · PROJECTS"
            title="Things I've built."
            description="Full-stack AI systems, a healthcare device platform, desktop tools and applied ML. Select any card for the full story."
          />
        </Reveal>

        <div className="space-y-7 mb-7">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <ProjectCard project={project} onOpen={setSelected} featured />
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
