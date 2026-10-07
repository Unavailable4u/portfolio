import { useEffect, useState } from "react";
import { fetchContributions, type ContributionData } from "../lib/github";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; data: ContributionData };

const levelClass = ["bg-line", "bg-cyan/25", "bg-cyan/50", "bg-cyan/75", "bg-cyan"];

interface ContributionGraphProps {
  user: string;
  profileUrl: string;
}

/** GitHub-style contribution heatmap for the last 12 months, loaded live in the browser. */
function ContributionGraph({ user, profileUrl }: ContributionGraphProps) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetchContributions(user, controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((err: unknown) => {
        if ((err as Error).name !== "AbortError") setState({ status: "error" });
      });
    return () => controller.abort();
  }, [user]);

  if (state.status === "error") {
    return (
      <p className="text-sm text-text-dim">
        The contribution graph could not be loaded right now.{" "}
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-cyan underline underline-offset-2">
          See it on GitHub
        </a>
        .
      </p>
    );
  }

  if (state.status === "loading") {
    return <div aria-hidden="true" className="h-[118px] rounded-sm bg-line-soft animate-pulse" />;
  }

  const { days, total } = state.data;
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();

  return (
    <div>
      <div className="overflow-x-auto scrollbar-thin pb-2">
        <div
          role="img"
          aria-label={`${total} contributions on GitHub in the last year`}
          className="grid grid-rows-7 grid-flow-col gap-[3px] w-max"
        >
          {Array.from({ length: lead }).map((_, i) => (
            <span key={`pad-${i}`} className="w-[11px] h-[11px]" />
          ))}
          {days.map((d) => (
            <span
              key={d.date}
              title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
              className={`w-[11px] h-[11px] rounded-[2px] ${levelClass[d.level]}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <span className="font-mono text-xs text-text-dim">{total.toLocaleString()} contributions in the last year</span>
        <span aria-hidden="true" className="flex items-center gap-1.5 font-mono text-[11px] text-text-faint">
          Less
          {levelClass.map((c) => (
            <span key={c} className={`w-[11px] h-[11px] rounded-[2px] ${c}`} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

export default ContributionGraph;
