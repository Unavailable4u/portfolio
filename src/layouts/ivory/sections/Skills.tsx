import { skills } from "../../../data/skills";
import { skillTitles } from "../content";

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="shead rv">
          <span className="label center">Skills</span>
          <h2>
            Tools I <em>reach for</em>
          </h2>
        </div>
        <div className="sk3">
          {skills.map((tier, i) => (
            <div key={tier.label} className={`rv${i === 0 ? " core" : ""}${i > 0 ? ` d${i}` : ""}`}>
              <h3>
                <small>{tier.label}</small>
                {skillTitles[tier.label] ?? tier.description}
              </h3>
              <ul>
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
