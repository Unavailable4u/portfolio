import type { ProjectItem } from "../../../types";
import Icon from "../Icon";
import {
  featuredProjects,
  headingOf,
  highlightsOf,
  kindOf,
  linkProps,
  otherProjects,
  pad2,
  projectImage,
  shortStackOf,
  statusLabel,
  stackOf,
  stripTitleOf,
  summaryOf,
} from "../content";

function Shot({ project, alt }: { project: ProjectItem; alt: string }) {
  const image = projectImage(project);
  return (
    <div className={`shot${image.fit === "contain" ? " contain" : ""}`}>
      <img
        src={image.src}
        alt={image.real ? `${alt} screenshot` : `${alt} (placeholder screenshot)`}
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function Links({ project }: { project: ProjectItem }) {
  if (!project.links?.length) return null;
  return (
    <div className="links">
      {project.links.map((link) => (
        <a key={link.url} href={link.url} {...linkProps(link.url)}>
          {link.label}
        </a>
      ))}
    </div>
  );
}

function FeatureCard({ project, index }: { project: ProjectItem; index: number }) {
  const { lead, em } = headingOf(project);
  const highlights = highlightsOf(project);
  const status = project.status ? statusLabel[project.status] : undefined;

  return (
    <article className="card rv" id={`p-${project.id}`}>
      <span className="no">{pad2(index + 1)}</span>
      <h3>
        {lead}
        {em && <em>{em}</em>}
      </h3>
      <span className="status">{status ? `Featured · ${status}` : "Featured"}</span>
      <p>{summaryOf(project)}</p>
      {highlights.length > 0 && (
        <ul className="hl">
          {highlights.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      )}
      <div className="stack">{stackOf(project)}</div>
      <Links project={project} />
    </article>
  );
}

function MiniCard({ project }: { project: ProjectItem }) {
  const status = project.status ? statusLabel[project.status] : undefined;
  return (
    <article className="card mini rv">
      <Shot project={project} alt={project.title} />
      <div className="body">
        {status && <span className="status">{status}</span>}
        <h3>{project.title}</h3>
        <p>{summaryOf(project)}</p>
        <div className="stack" style={{ marginTop: 0 }}>
          {stackOf(project)}
        </div>
        <Links project={project} />
      </div>
    </article>
  );
}

function Work() {
  return (
    <>
      <section className="sec" id="work" aria-labelledby="work-h" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="work-h">
              Selected projects <Icon name="spark" className="spark" />
            </h2>
            <span className="rule" />
            <a className="more" href="#all-projects">
              View all <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="strip">
            {featuredProjects.map((project, i) => (
              <article key={project.id} className="pc rv">
                <a href={`#p-${project.id}`} aria-label={`${stripTitleOf(project)} details`}>
                  <Shot project={project} alt={project.title} />
                  <div className="cap">
                    <b>{pad2(i + 1)}</b>
                    <div>
                      <h3>{stripTitleOf(project)}</h3>
                      <p>
                        {kindOf(project)}
                        <br />
                        {shortStackOf(project)}
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec allp" id="all-projects" aria-labelledby="all-h">
        <div className="wrap">
          <div className="sec-head rv">
            <h2 id="all-h">All projects</h2>
            <span className="rule" />
          </div>
          <div className="feat">
            {featuredProjects.map((project, i) => (
              <FeatureCard key={project.id} project={project} index={i} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <div className="minis">
              {otherProjects.map((project) => (
                <MiniCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Work;
