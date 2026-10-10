import { steps, featuredProjects, blurbOf, linkProps, metaOf, pad2, projectImage, statusLabel, titleOf } from "../content";
import Icon from "../Icon";

function Work() {
  return (
    <div className="row r-pw">
      <section className="cell rv" aria-labelledby="h-how">
        <h2 className="h2" id="h-how">
          How I build
        </h2>
        <ol className="steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="n">{pad2(i + 1)}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cell rv" id="work" aria-labelledby="h-work">
        <div className="cell-head">
          <h2 className="h2" id="h-work">
            Featured work
          </h2>
          <a className="more" href="#more">
            More projects <Icon name="arrow" className="more-i" />
          </a>
        </div>
        <div className="feat">
          {featuredProjects.map((project) => {
            const image = projectImage(project);
            const status = project.status ? statusLabel[project.status] : undefined;
            return (
              <article key={project.id} className="proj">
                <div className={`frame${image.fit === "contain" ? " contain" : ""}`}>
                  <img
                    src={image.src}
                    alt={image.real ? `${project.title} screenshot` : `${project.title} (placeholder screenshot)`}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                  />
                  {status && <span className="tag">{status}</span>}
                </div>
                <h3>{titleOf(project)}</h3>
                <div className="meta">{metaOf(project)}</div>
                <p>{blurbOf(project)}</p>
                {project.links && project.links.length > 0 && (
                  <div className="links">
                    {project.links.map((link) => (
                      <a key={link.url} href={link.url} {...linkProps(link.url)}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Work;
