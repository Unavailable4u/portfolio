import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { experience } from "../data/experience";

function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-24 md:py-36 bg-bg-elevated">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading tag="04 · EXPERIENCE" title="Where the work has happened." />
        </Reveal>

        <div className="relative border-l border-line pl-8 space-y-16">
          {experience.map((item, i) => (
            <Reveal key={item.role + item.org} delay={i * 0.1}>
              <div className="relative">
                <span className="absolute -left-[35px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
                <span className="font-mono text-xs text-text-faint tracking-wide uppercase block mb-2">{item.dateRange}</span>
                <h4 className="font-display text-xl font-semibold mb-1">{item.role}</h4>
                <span className="text-text-dim text-sm block mb-4">{item.org} · {item.location}</span>
                <ul className="space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-text-dim leading-relaxed pl-5 relative">
                      <span className="absolute left-0 text-cyan">→</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;