import SectionHeading from "../components/SectionHeading";
import Tag from "../components/Tag";
import { projects } from "../data/projects";

function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          tag="01 · PROJECTS"
          title="Things I've built."
          description="A mix of full-stack systems, desktop tools, and applied ML experiments."
        />

        <div className="space-y-7 mb-16">
          {featured.map((project) => (
            <div
              key={project.title}
              className="bg-bg-card border border-line rounded-md p-8 md:p-12 hover:border-[#2a323d] transition-colors duration-300"
            >
              <span className="font-mono text-xs text-amber tracking-wide block mb-4">
                FEATURED
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                {project.title}
              </h3>
              <p className="text-text-dim text-sm mb-6">{project.stack}</p>

              <ul className="space-y-2 mb-7">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-text-dim leading-relaxed pl-5 relative">
                    <span className="absolute left-0 text-cyan">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project) => (
            <div
              key={project.title}
              className="bg-bg-card border border-line rounded-md p-7 hover:border-[#2a323d] transition-colors duration-300"
            >
              <h3 className="font-display text-lg font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-text-dim text-xs mb-4">{project.stack}</p>

              <ul className="space-y-2 mb-5">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-text-dim leading-relaxed pl-5 relative">
                    <span className="absolute left-0 text-cyan">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;