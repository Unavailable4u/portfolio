import SectionHeading from "../components/SectionHeading";
import Tag from "../components/Tag";
import Reveal from "../components/Reveal";
import { skills } from "../data/skills";

function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading tag="02 · SKILLS" title="The stack behind the systems." />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {skills.map((group) => (
              <div key={group.label}>
                <span className="font-mono text-xs text-text-faint tracking-wide uppercase mb-4 block">{group.label}</span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;