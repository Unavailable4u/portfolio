import { building, upNext } from "../../../data/now";
import { featuredProjects, linkProps, otherProjects, blurbOf, pad2, primaryLink, statusLabel } from "../content";

function MoreNow() {
  const start = featuredProjects.length;

  return (
    <div className="row r-mn" id="more">
      <section className="cell rv" aria-labelledby="h-more">
        <h2 className="h2" id="h-more">
          More work
        </h2>
        <ul className="mlist">
          {otherProjects.map((project, i) => {
            const link = primaryLink(project);
            const status = project.status ? statusLabel[project.status] : undefined;
            return (
              <li key={project.id}>
                <span className="n">{pad2(start + i + 1)}</span>
                <div>
                  <h3>
                    {project.title}
                    {status && <em>{status}</em>}
                  </h3>
                  <p>{blurbOf(project)}</p>
                </div>
                {link && (
                  <a className="go" href={link.url} {...linkProps(link.url)}>
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="cell nn rv" aria-labelledby="h-now">
        <h2 className="h2" id="h-now">
          Now &amp; next
        </h2>
        <h4>
          <i className="dot" aria-hidden="true" />
          Now
        </h4>
        <ul>
          {building.map((item) => (
            <li key={item.title}>
              <b>{item.title}</b> {item.detail}
            </li>
          ))}
        </ul>
        <h4>Up next</h4>
        <ul>
          {upNext.map((item) => (
            <li key={item.title}>
              <b>{item.title}</b> {item.detail}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MoreNow;
