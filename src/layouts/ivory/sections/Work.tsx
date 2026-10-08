import { profile } from "../../../data/profile";
import type { ProjectItem } from "../../../types";
import {
  blurbOf,
  countWord,
  featuredProjects,
  linkProps,
  otherProjects,
  primaryLink,
  projectImage,
  secondaryLink,
  stackOf,
  statusView,
  titleOf,
} from "../content";

function FeaturedCard({ project, index }: { project: ProjectItem; index: number }) {
  const title = titleOf(project);
  const image = projectImage(project, "card");
  const primary = primaryLink(project);
  const secondary = secondaryLink(project);

  return (
    <article className={`fcard rv${index > 0 ? ` d${index}` : ""}`}>
      <div className="shot">
        <img
          src={image.src}
          alt={image.real ? `${title} screenshot` : `${title} (placeholder screenshot)`}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="fmeta">
        <div>
          <h3>{title}</h3>
          <p>{blurbOf(project)}</p>
        </div>
        {primary && (
          <a className="go" href={primary.url} {...linkProps(primary.url)} aria-label={`${title}: ${primary.label}`}>
            ↗
          </a>
        )}
      </div>
      <p className="stack">
        {stackOf(project)}
        {secondary && (
          <a href={secondary.url} {...linkProps(secondary.url)}>
            {secondary.label}
          </a>
        )}
      </p>
    </article>
  );
}

function ProjectRow({ project }: { project: ProjectItem }) {
  const title = titleOf(project);
  const image = projectImage(project, "row");
  const link = primaryLink(project);
  const status = project.status ? statusView[project.status] : undefined;

  return (
    <div className="mp-row">
      <div
        className="mp-thumb"
        style={{ backgroundImage: `url(${image.src})` }}
        role="img"
        aria-label={image.real ? `${title} screenshot` : `${title} placeholder screenshot`}
      />
      <div>
        <h4>{title}</h4>
        <p className="d">{blurbOf(project)}</p>
      </div>
      <p className="stk">{stackOf(project)}</p>
      <span className="st-c">{status && <span className={`status ${status.tone}`}>{status.label}</span>}</span>
      {link ? (
        <a className="lk" href={link.url} {...linkProps(link.url)}>
          {link.label} →
        </a>
      ) : (
        <span />
      )}
    </div>
  );
}

function Work() {
  return (
    <>
      <section className="work" id="work">
        <div className="wrap">
          <div className="work-head rv">
            <div>
              <span className="label">Featured projects</span>
              <h2>
                Selected <em>work</em>
              </h2>
            </div>
            <a className="btn sm" href={profile.github} {...linkProps(profile.github)}>
              All on GitHub{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
          <div className="feat">
            {featuredProjects.map((project, i) => (
              <FeaturedCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section className="more-projects" aria-labelledby="more-projects-title">
          <div className="wrap">
            <div className="mp-title rv">
              <h3 id="more-projects-title">
                More <em>projects</em>
              </h3>
              <span>{countWord(otherProjects.length)} smaller builds</span>
            </div>
            <div className="rv">
              {otherProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Work;
