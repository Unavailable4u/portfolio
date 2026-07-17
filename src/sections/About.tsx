import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";
import { education } from "../data/education";
import { honors } from "../data/honors";
import { certifications } from "../data/certifications";

function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionHeading tag="03 · ABOUT" title="Background & recognition." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-text-dim leading-relaxed mb-8">
              {profile.summary}
            </p>

            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.degree} className="border-l-2 border-line pl-5">
                  <h4 className="font-display text-base font-medium mb-1">
                    {edu.degree}
                  </h4>
                  <span className="text-text-dim text-sm">
                    {edu.institution} · {edu.dateRange}
                    {edu.detail ? ` · ${edu.detail}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-xs text-text-faint tracking-wide uppercase mb-4 block">
              Honors & Certifications
            </span>
            <div className="divide-y divide-line-soft">
              {honors.map((h) => (
                <div key={h.name} className="flex justify-between gap-4 py-3.5">
                  <span className="text-sm text-text">{h.name}</span>
                  <span className="font-mono text-xs text-text-faint whitespace-nowrap">{h.year}</span>
                </div>
              ))}
              {certifications.map((c) => (
                <div key={c.name} className="flex justify-between gap-4 py-3.5">
                  <span className="text-sm text-text">{c.name}</span>
                  <span className="font-mono text-xs text-text-faint whitespace-nowrap">{c.year ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;