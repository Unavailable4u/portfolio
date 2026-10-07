import { FiArrowRight } from "react-icons/fi";
import ProjectLinks from "../components/ProjectLinks";
import Reveal from "../components/Reveal";
import ResearchChart from "../components/ResearchChart";
import SectionHeading from "../components/SectionHeading";
import StatusBadge from "../components/StatusBadge";
import Tag from "../components/Tag";
import { projects } from "../data/projects";
import { research } from "../data/research";
import { openProject } from "../lib/events";
import type { ResearchStatus } from "../types";

const statusLabel: Record<ResearchStatus, string> = {
  "under-review": "Under review",
  "preprint-draft": "Preprint draft",
  published: "Published",
};

const ongoing = projects.filter((p) => p.category === "research");

function Research() {
  return (
    <section id="research" className="px-6 md:px-12 py-24 md:py-36 bg-bg-elevated">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading
            tag="02 · RESEARCH"
            title="Questions I'm working on."
            description="A paper under review and open research on AI systems, reported with the results that didn't go my way left in."
          />
        </Reveal>

        {research.map((paper) => (
          <Reveal key={paper.id}>
            <article className="bg-bg-card border border-line rounded-md p-7 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide uppercase border rounded-full px-2.5 py-1 text-amber border-amber/40 bg-amber/5">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current" />
                  {statusLabel[paper.status]}
                </span>
                <span className="font-mono text-xs text-text-faint">{paper.statusNote}</span>
              </div>

              <h3 className="font-display text-xl md:text-3xl font-semibold tracking-tight leading-snug max-w-4xl mb-5">{paper.title}</h3>

              <p className="text-sm text-text-dim mb-1">
                {paper.authors.map((author, i) => (
                  <span key={author}>
                    <span className={author === paper.highlightAuthor ? "text-text font-medium" : ""}>{author}</span>
                    {i < paper.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="font-mono text-xs text-text-faint mb-10">{paper.affiliation}</p>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 mb-10">
                <div className="lg:col-span-2">
                  <p className="text-text-dim leading-relaxed mb-6">{paper.summary}</p>
                  <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-3">Contributions</span>
                  <ul className="space-y-3">
                    {paper.contributions.map((c) => (
                      <li key={c} className="text-sm text-text-dim leading-relaxed pl-5 relative">
                        <span aria-hidden="true" className="absolute left-0 text-cyan">→</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-3 bg-bg border border-line-soft rounded-md p-4 md:p-6">
                  <ResearchChart />
                </div>
              </div>

              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 py-6 border-y border-line-soft mb-10">
                {paper.stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="font-mono text-[11px] text-text-faint leading-snug">{s.label}</dt>
                    <dd className="font-display text-2xl md:text-3xl text-text mb-1">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-l-2 border-amber pl-5 mb-10">
                <span className="font-mono text-[11px] text-amber uppercase tracking-wide block mb-3">What the paper also reports</span>
                <ul className="space-y-2.5">
                  {paper.honestFindings.map((f) => (
                    <li key={f} className="text-sm text-text-dim leading-relaxed">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((k) => (
                    <Tag key={k} label={k} tone="faint" />
                  ))}
                </div>
                <ProjectLinks links={paper.links} />
              </div>
            </article>
          </Reveal>
        ))}

        {ongoing.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6">
            {ongoing.map((p) => (
              <Reveal key={p.id} delay={0.05}>
                <article className="bg-bg-card border border-line rounded-md p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-line-strong transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {p.status && <StatusBadge status={p.status} />}
                      <span className="font-mono text-xs text-text-faint">Preprint in draft</span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-text-dim leading-relaxed max-w-3xl">{p.summary}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                    <ProjectLinks links={p.links} />
                    <button
                      type="button"
                      onClick={() => openProject(p.id)}
                      className="inline-flex items-center gap-2 font-mono text-xs text-cyan hover:gap-3 transition-all"
                    >
                      Read the details <FiArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Research;
