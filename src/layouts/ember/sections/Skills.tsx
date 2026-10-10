import { skills } from "../../../data/skills";
import { skillLevels } from "../content";

function Skills() {
  return (
    <section id="skills" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Skills</span>
          <h2>
            What I <em>reach for</em>
          </h2>
        </div>
        <div className="tiers">
          {skills.map((tier, i) => {
            const level = skillLevels[i];
            return (
              <div key={tier.label} className={`card tier${i === 0 ? " core" : ""} rv`}>
                <h3>{tier.label}</h3>
                <div className="sub">
                  {level && (
                    <>
                      <span className="bars" aria-hidden="true">
                        {[0, 1, 2].map((bar) => (
                          <i key={bar} className={bar < level.bars ? "on" : undefined} />
                        ))}
                      </span>
                      {level.note}
                    </>
                  )}
                </div>
                <div className="tags">
                  {tier.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
