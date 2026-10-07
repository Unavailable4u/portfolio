import ContributionGraph from "../components/ContributionGraph";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { building, upNext } from "../data/now";
import { profile } from "../data/profile";

function Activity() {
  const user = profile.github.split("/").filter(Boolean).pop() ?? "";

  return (
    <section id="activity" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading
            tag="07 · ACTIVITY"
            title="Still building."
            description="What I'm working on this month, what comes next, and the commit history behind it."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Reveal>
            <div className="h-full bg-bg-card border border-line rounded-md p-7">
              <span className="font-mono text-[11px] text-cyan uppercase tracking-wide flex items-center gap-2 mb-5">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                Currently building
              </span>
              <ul className="space-y-4">
                {building.map((b) => (
                  <li key={b.title}>
                    <span className="font-display text-base text-text block">{b.title}</span>
                    <span className="text-sm text-text-dim">{b.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full bg-bg-card border border-line rounded-md p-7">
              <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-5">Up next</span>
              <ul className="space-y-4">
                {upNext.map((b) => (
                  <li key={b.title}>
                    <span className="font-display text-base text-text block">{b.title}</span>
                    <span className="text-sm text-text-dim">{b.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="bg-bg-card border border-line rounded-md p-7">
            <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-5">GitHub contributions</span>
            <ContributionGraph user={user} profileUrl={profile.github} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Activity;
