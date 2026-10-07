import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { education } from "../data/education";
import { honors } from "../data/honors";
import { milestones } from "../data/milestones";
import { profile } from "../data/profile";

function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-36 bg-bg-elevated">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading tag="06 · ABOUT" title="Background & recognition." />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 mb-20">
          <Reveal delay={0.05}>
            <div>
              <p className="text-text-dim leading-relaxed mb-8">{profile.summary}</p>

              <div className="border-l-2 border-cyan bg-cyan/5 pl-5 pr-4 py-4 mb-10">
                <span className="font-mono text-[11px] text-cyan uppercase tracking-wide block mb-1.5">Now</span>
                <p className="text-sm text-text leading-relaxed">{profile.now}</p>
              </div>

              <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-4">Education</span>
              <div className="space-y-6 mb-10">
                {education.map((edu) => (
                  <div key={edu.degree} className="border-l-2 border-line pl-5">
                    <h4 className="font-display text-base font-medium mb-1">{edu.degree}</h4>
                    <span className="text-text-dim text-sm">
                      {edu.institution} · {edu.location} · {edu.dateRange}
                    </span>
                  </div>
                ))}
              </div>

              <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-3">Languages</span>
              <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {profile.languages.map((l) => (
                  <li key={l.name}>
                    <span className="text-text">{l.name}</span> <span className="text-text-dim">· {l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-4">Honors &amp; awards</span>
              <ul className="divide-y divide-line-soft mb-8">
                {honors.map((h) => (
                  <li key={h.name} className="flex justify-between gap-4 py-3.5">
                    <span className="text-sm text-text">
                      {h.url ? (
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan inline-flex items-start gap-1 transition-colors"
                        >
                          {h.name}
                          <FiArrowUpRight aria-hidden="true" size={14} className="mt-0.5 shrink-0" />
                        </a>
                      ) : (
                        h.name
                      )}
                    </span>
                    <span className="font-mono text-xs text-text-faint whitespace-nowrap">{h.year}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-faint leading-relaxed">
                Certificates for these and more than a dozen other competitions are in the{" "}
                <a href="#certificates" className="text-text-dim underline underline-offset-2 hover:text-cyan">
                  certificates section
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-6">The story so far</span>
          <ol className="relative flex md:grid md:grid-cols-10 gap-0 overflow-x-auto scrollbar-thin snap-x pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] h-px bg-line hidden md:block" />
            {milestones.map((m, i) => (
              <li key={m.when + m.title} className="relative snap-start shrink-0 w-44 md:w-auto pr-4 md:pr-3">
                <span
                  aria-hidden="true"
                  className={`block w-3.5 h-3.5 rounded-full border-2 border-bg-elevated mb-4 relative z-10 ${
                    i === milestones.length - 1 ? "bg-cyan shadow-[0_0_8px_var(--color-cyan)]" : "bg-line-strong"
                  }`}
                />
                <span className="font-mono text-[11px] text-cyan block mb-1">{m.when}</span>
                <span className="font-display text-sm text-text block leading-snug mb-0.5">{m.title}</span>
                {m.detail && <span className="text-xs text-text-faint leading-snug block">{m.detail}</span>}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
