import { experience } from "../../../data/experience";
import Icon from "../Icon";
import { linkProps } from "../content";

function Experience() {
  return (
    <section className="sec" id="experience" aria-labelledby="xp-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <h2 id="xp-h">
            Experience <Icon name="spark" className="spark" />
          </h2>
          <span className="rule" />
        </div>
        <ol className="xp">
          {experience.map((role) => (
            <li key={`${role.org}-${role.role}`} className={`${role.current ? "cur " : ""}rv`}>
              <div className="when">
                {role.dateRange}
                <small>{role.location}</small>
              </div>
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
