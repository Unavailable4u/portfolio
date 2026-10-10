import { experience } from "../../../data/experience";
import { linkProps, pad2 } from "../content";

function Experience() {
  return (
    <section className="row rv" id="experience" aria-labelledby="h-exp" style={{ gridTemplateColumns: "1fr" }}>
      <div className="cell">
        <h2 className="h2" id="h-exp">
          Experience
        </h2>
        <ol className="exp">
          {experience.map((role, i) => (
            <li key={`${role.org}-${role.role}`}>
              <span className="n">{pad2(i + 1)}</span>
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
                <span className="when">
                  {role.dateRange}
                  {role.location ? ` · ${role.location}` : ""}
                </span>
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
