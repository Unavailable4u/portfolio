import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/experience";

function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading tag="03 · EXPERIENCE" title="Where the work has happened." />
        </Reveal>

        <ol className="relative border-l border-line pl-8 space-y-14">
          {experience.map((item, i) => (
            <li key={item.role + item.org}>
              <Reveal delay={Math.min(i, 3) * 0.06}>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-bg ${
                      item.current ? "bg-cyan shadow-[0_0_8px_var(--color-cyan)]" : "bg-line-strong"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-text-faint tracking-wide uppercase">{item.dateRange}</span>
                    {item.current && (
                      <span className="font-mono text-[10px] tracking-wide uppercase text-cyan border border-cyan/40 bg-cyan/5 rounded-full px-2 py-0.5">
                        Current
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-xl font-semibold mb-1">{item.role}</h4>
                  <span className="text-text-dim text-sm block mb-4">
                    {item.orgUrl ? (
                      <a
                        href={item.orgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text hover:text-cyan inline-flex items-center gap-0.5 transition-colors"
                      >
                        {item.org}
                        <FiArrowUpRight aria-hidden="true" size={14} />
                      </a>
                    ) : (
                      <span className="text-text">{item.org}</span>
                    )}{" "}
                    · {item.location}
                  </span>
                  <ul className="space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-text-dim leading-relaxed pl-5 relative">
                        <span aria-hidden="true" className="absolute left-0 text-cyan">→</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experience;
