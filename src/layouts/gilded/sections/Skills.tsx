import { skills } from "../../../data/skills";
import Icon from "../Icon";
import { tierNumerals } from "../content";

function Skills() {
  return (
    <section className="sec" id="skills" aria-labelledby="sk-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <h2 id="sk-h">
            Skills <Icon name="spark" className="spark" />
          </h2>
          <span className="rule" />
        </div>
        <div className="tiers">
          {skills.map((tier, i) => (
            <div key={tier.label} className={`tier t${i + 1} rv`}>
              <div className="n">{tierNumerals[i] ?? i + 1}</div>
              <h3>{tier.label}</h3>
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
