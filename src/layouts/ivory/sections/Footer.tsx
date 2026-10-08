import { profile } from "../../../data/profile";
import { featuredProjects, languagesLine, linkProps, navLinks, otherProjects, primaryLink, titleOf } from "../content";

const footerProjects = [...featuredProjects, ...otherProjects].filter((p) => primaryLink(p)).slice(0, 5);

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <a className="sig-mark" href="#top" aria-label="Back to top">
              {profile.shortName}
            </a>
            <p>AI systems builder and ETE student at RUET, building multi-agent software and research tooling.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              {navLinks
                .filter((l) => l.id !== "contact")
                .map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`}>{link.label}</a>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4>Projects</h4>
            <ul>
              {footerProjects.map((project) => {
                const link = primaryLink(project)!;
                return (
                  <li key={project.id}>
                    <a href={link.url} {...linkProps(link.url)}>
                      {titleOf(project)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li className="ct">{profile.location}</li>
              <li>
                <a href={profile.github} {...linkProps(profile.github)}>
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.linkedin} {...linkProps(profile.linkedin)}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>© 2026 {profile.name}</span>
          <span>{languagesLine}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
