import { experience } from "../../../data/experience";

function Experience() {
  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <div className="shead rv">
          <span className="label center">Experience</span>
          <h2>
            Roles &amp; <em>teams</em>
          </h2>
        </div>
        <div className="tl">
          {experience.map((role, i) => (
            <article key={`${role.org}-${role.role}`} className={`rv${i % 2 === 1 ? " d1" : ""}`}>
              <div className="when">
                {role.current && <i />}
                {role.dateRange}
              </div>
              <h3>{role.role}</h3>
              <p className="org">
                {role.org} · {role.location}
              </p>
              <ul>
                {role.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
