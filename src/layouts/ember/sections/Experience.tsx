import { experience } from "../../../data/experience";
import { linkProps } from "../content";

function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Experience</span>
          <h2>
            Roles &amp; <em>teams</em>
          </h2>
        </div>
        <ol className="tl">
          {experience.map((role) => (
            <li key={`${role.org}-${role.role}`} className={`${role.current ? "" : "past "}rv`}>
              <div className="card">
                <div className="top">
                  <div>
                    <h3>{role.role}</h3>
                    <div className="org">
                      {role.orgUrl ? (
                        <a href={role.orgUrl} {...linkProps(role.orgUrl)}>
                          {role.org}
                        </a>
                      ) : (
                        role.org
                      )}
                    </div>
                  </div>
                  <span className="when">{role.dateRange.toUpperCase()}</span>
                </div>
                {role.location && <div className="where">{role.location}</div>}
                {role.bullets.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experience;
