import { profile } from "../../../data/profile";
import { research } from "../../../data/research";
import type { ProjectItem } from "../../../types";
import { displayUrl, flagship, gridProjects, linkProps, ongoingResearch, ongoingTitle } from "../content";

function Footer() {
  const projectNames = [flagship, ...gridProjects].filter((p): p is ProjectItem => Boolean(p)).slice(0, 4);
  const manuscript = research[0]?.links?.find((l) => l.kind === "mail");

  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <a className="brand" href="#home">
              <span className="dot" aria-hidden="true" />
              {profile.shortName}
            </a>
            <p>{profile.headline}</p>
          </div>
          <div>
            <h4>Projects</h4>
            <ul>
              {projectNames.map((p) => (
                <li key={p.id}>
                  <a href="#projects">{p.title.split(" & ")[0].split(" Maa42")[0]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Research</h4>
            <ul>
              {research.map((paper) => (
                <li key={paper.id}>
                  <a href="#research">{paper.title.split(":")[0]}</a>
                </li>
              ))}
              {ongoingResearch.map((item) => (
                <li key={item.id}>
                  <a href="#research">{ongoingTitle(item)}</a>
                </li>
              ))}
              {manuscript && (
                <li>
                  <a href={manuscript.url}>Request manuscript</a>
                </li>
              )}
              <li>
                <a href="#experience">Experience</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
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
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
              <li>
                <a href={profile.siteUrl} {...linkProps(profile.siteUrl)}>
                  {displayUrl(profile.siteUrl)}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>© 2026 {profile.name}. All rights reserved.</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
