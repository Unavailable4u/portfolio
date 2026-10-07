import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Tag from "../components/Tag";
import { skills } from "../data/skills";

const tones = ["strong", "default", "faint"] as const;

function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-24 md:py-36 bg-bg-elevated">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading
            tag="04 · SKILLS"
            title="The stack behind the systems."
            description="Grouped by how deeply I use each tool, not by a self-assigned percentage."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((tier, i) => (
            <Reveal key={tier.label} delay={i * 0.08}>
              <div className="h-full bg-bg-card border border-line rounded-md p-7">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-lg font-semibold">{tier.label}</h3>
                  <span aria-hidden="true" className="flex gap-1">
                    {tones.map((_, d) => (
                      <span key={d} className={`w-1.5 h-1.5 rounded-full ${d < 3 - i ? "bg-cyan" : "bg-line-strong"}`} />
                    ))}
                  </span>
                </div>
                <p className="text-xs text-text-faint mb-5">{tier.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tier.items.map((item) => (
                    <Tag key={item} label={item} tone={tones[i]} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
