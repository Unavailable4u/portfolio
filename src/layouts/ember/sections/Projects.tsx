import type { ProjectItem } from "../../../types";
import Icon from "../Icon";
import {
  flagship,
  flagshipCopy,
  gridProjects,
  gridSpans,
  linkProps,
  projectImages,
  statusClass,
  statusLabel,
  summaryOf,
  tagsOf,
  titleOf,
} from "../content";

function StatusChip({ project }: { project: ProjectItem }) {
  if (!project.status) return null;
  return <span className={`status ${statusClass[project.status]}`}>{statusLabel[project.status]}</span>;
}

function Flagship({ project }: { project: ProjectItem }) {
  const [image] = projectImages(project);
  const [primary, ...others] = project.links ?? [];

  return (
    <article className="card mini rv">
      <div className="art">
        <div className={`tilt${image.fit === "contain" ? " contain" : ""}`}>
          <img
            src={image.src}
            alt={image.real ? `${project.title} screenshot` : `${project.title} (placeholder screenshot)`}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="mid">
        <StatusChip project={project} />
        <h3>{project.title}</h3>
        <p className="sum">{flagshipCopy.summary}</p>
        <ul className="checks">
          {flagshipCopy.checks.map((text) => (
            <li key={text}>
              <Icon name="check" />
              {text}
            </li>
          ))}
        </ul>
        <div className="tags">
          {tagsOf(project).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="side">
        <p className="stages">{flagshipCopy.stages.join(" → ")}</p>
        {primary && (
          <a className="btn primary" href={primary.url} {...linkProps(primary.url)}>
            <Icon name="github" />
            {primary.label}
          </a>
        )}
        {others.map((link) => (
          <a key={link.url} className="btn ghost" href={link.url} {...linkProps(link.url)}>
            {link.label} <Icon name="arrow" />
          </a>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ project, span }: { project: ProjectItem; span: number }) {
  const images = projectImages(project);
  const dual = images.length > 1;

  return (
    <article className={`card hover proj rv s${span}`}>
      <div className={`shot${dual ? " dual" : ""}${images[0].fit === "contain" ? " contain" : ""}`}>
        <StatusChip project={project} />
        {images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.real ? `${project.title} screenshot` : `${project.title} (placeholder screenshot)`}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <div className="body">
        <h3>{titleOf(project)}</h3>
        <p>{summaryOf(project)}</p>
        <div className="tags">
          {tagsOf(project).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {project.links && project.links.length > 0 && (
          <div className="links">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} {...linkProps(link.url)}>
                {link.label} <Icon name="ext" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Projects() {
  const spans = gridSpans(gridProjects.length);

  return (
    <section id="projects" style={{ paddingTop: 56 }}>
      <div className="wrap">
        {flagship && (
          <>
            <div className="sec-head rv">
              <span className="eyebrow">Featured project</span>
              <h2>
                The flagship: <em>MiniMe</em>
              </h2>
            </div>
            <Flagship project={flagship} />
          </>
        )}

        <div className="sec-head rv" style={{ marginTop: 88 }}>
          <span className="eyebrow">More builds</span>
          <h2>
            Selected <em>projects</em>
          </h2>
        </div>
        <div className="pgrid">
          {gridProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} span={spans[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
