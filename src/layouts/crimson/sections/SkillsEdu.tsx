import { education } from "../../../data/education";
import { honors } from "../../../data/honors";
import { skills } from "../../../data/skills";
import { linkProps, skillClasses, skillNotes } from "../content";

function SkillsEdu() {
  return (
    <div className="row r-se" id="skills">
      <section className="cell rv" aria-labelledby="h-skills">
        <h2 className="h2" id="h-skills">
          Skills
        </h2>
        {skills.map((tier, i) => (
          <div key={tier.label} className={`tier ${skillClasses[i] ?? ""}`}>
            <h4>
              {tier.label}
              {skillNotes[i] && <small>{skillNotes[i]}</small>}
            </h4>
            <ul className="chips">
              {tier.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="cell rv" aria-labelledby="h-edu">
        <h2 className="h2" id="h-edu">
          Education &amp; honors
        </h2>
        <ul className="edu">
          {education.map((item) => (
            <li key={item.degree}>
              <b>{item.degree}</b>
              <span>{item.institution}</span>
              <em>{item.dateRange}</em>
            </li>
          ))}
        </ul>
        <div className="sub">Honors</div>
        <ul className="hon">
          {honors.map((honor) => (
            <li key={honor.name}>
              <b>
                {honor.url ? (
                  <a href={honor.url} {...linkProps(honor.url)}>
                    {honor.name}
                  </a>
                ) : (
                  honor.name
                )}
              </b>
              <em>{honor.year}</em>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default SkillsEdu;
