import { useState } from "react";
import { modelPoints } from "../data/research";

const W = 640;
const H = 340;
const M = { l: 54, r: 22, t: 22, b: 50 };
const X_MIN = 5;
const X_MAX = 700;
const Y_MIN = 50;
const Y_MAX = 66;
const X_TICKS = [10, 30, 100, 300];
const Y_TICKS = [52, 56, 60, 64];

const lx = Math.log10(X_MIN);
const span = Math.log10(X_MAX) - lx;
const sx = (k: number) => M.l + ((Math.log10(k) - lx) / span) * (W - M.l - M.r);
const sy = (a: number) => H - M.b - ((a - Y_MIN) / (Y_MAX - Y_MIN)) * (H - M.t - M.b);

type LabelPlacement = "right" | "left" | "above" | "below-left";
const placement: Record<string, LabelPlacement> = {
  "RoLA-Net (ours)": "above",
  LWAMCNet: "below-left",
  CSPMNet: "left",
};

/** Mean accuracy against parameter count for the six compared models (Table III of the manuscript). */
function ResearchChart() {
  const [active, setActive] = useState<string | null>(null);
  const hovered = modelPoints.find((p) => p.name === active);

  return (
    <figure className="m-0">
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Scatter plot of mean accuracy against parameter count for six modulation classifiers. RoLA-Net reaches 61.07 percent with 23.97 thousand parameters, close to CSPMNet at 61.94 percent with 240.97 thousand."
          className="w-full h-auto"
        >
          {Y_TICKS.map((t) => (
            <g key={t}>
              <line x1={M.l} x2={W - M.r} y1={sy(t)} y2={sy(t)} className="stroke-line-soft" strokeWidth={1} />
              <text x={M.l - 10} y={sy(t) + 4} textAnchor="end" className="fill-text-faint font-mono" fontSize={11}>
                {t}
              </text>
            </g>
          ))}
          {X_TICKS.map((t) => (
            <g key={t}>
              <line x1={sx(t)} x2={sx(t)} y1={H - M.b} y2={H - M.b + 5} className="stroke-line-strong" strokeWidth={1} />
              <text x={sx(t)} y={H - M.b + 19} textAnchor="middle" className="fill-text-faint font-mono" fontSize={11}>
                {t}K
              </text>
            </g>
          ))}
          <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} className="stroke-line-strong" strokeWidth={1} />
          <text x={(M.l + W - M.r) / 2} y={H - 8} textAnchor="middle" className="fill-text-dim font-mono" fontSize={11}>
            Trainable parameters (log scale)
          </text>
          <text
            transform={`translate(14 ${(M.t + H - M.b) / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-text-dim font-mono"
            fontSize={11}
          >
            Mean accuracy, 5 seeds (%)
          </text>

          {modelPoints.map((p) => {
            const cx = sx(p.paramsK);
            const cy = sy(p.accuracy);
            const top = sy(p.accuracy + p.std);
            const bottom = sy(p.accuracy - p.std);
            const place = placement[p.name] ?? "right";
            const dim = active !== null && active !== p.name;
            const label =
              place === "above"
                ? { x: cx, y: top - 9, anchor: "middle" as const }
                : place === "below-left"
                  ? { x: cx + 4, y: bottom + 17, anchor: "end" as const }
                  : place === "left"
                    ? { x: cx - 12, y: cy + 4, anchor: "end" as const }
                    : { x: cx + 12, y: cy + 4, anchor: "start" as const };
            return (
              <g key={p.name} opacity={dim ? 0.35 : 1} className="transition-opacity duration-150">
                <line x1={cx} x2={cx} y1={top} y2={bottom} className="stroke-text-faint" strokeWidth={1.5} />
                <line x1={cx - 4} x2={cx + 4} y1={top} y2={top} className="stroke-text-faint" strokeWidth={1.5} />
                <line x1={cx - 4} x2={cx + 4} y1={bottom} y2={bottom} className="stroke-text-faint" strokeWidth={1.5} />
                <circle
                  cx={cx}
                  cy={cy}
                  r={p.ours ? 7 : 6}
                  strokeWidth={2}
                  className={`stroke-bg-card ${p.ours ? "fill-cyan" : "fill-text-dim"}`}
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  className={`font-mono ${p.ours ? "fill-text" : "fill-text-dim"}`}
                  fontSize={12}
                  fontWeight={p.ours ? 600 : 400}
                >
                  {p.name}
                </text>
                <circle
                  cx={cx}
                  cy={cy}
                  r={18}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`${p.name}: ${p.accuracy}% mean accuracy, plus or minus ${p.std}, ${p.paramsK}K parameters`}
                  onMouseEnter={() => setActive(p.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.name)}
                  onBlur={() => setActive(null)}
                  className="cursor-default outline-none focus-visible:stroke-cyan"
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>

        {hovered && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full bg-bg-elevated border border-line rounded-sm px-3 py-2 shadow-xl shadow-black/40"
            style={{ left: `${(sx(hovered.paramsK) / W) * 100}%`, top: `${(sy(hovered.accuracy + hovered.std) / H) * 100 - 3}%` }}
          >
            <div className="font-mono text-xs text-text">{hovered.name}</div>
            <div className="font-mono text-[11px] text-text-dim whitespace-nowrap">
              {hovered.accuracy.toFixed(2)}% ± {hovered.std.toFixed(2)} · {hovered.paramsK}K params
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3 text-xs text-text-faint leading-relaxed">
        Mean accuracy on RadioML2016.10A with ±1 standard deviation across five training seeds. RoLA-Net sits level with CSPMNet
        at roughly a tenth of the size and has the smallest spread. Figures from Table III of the manuscript.
      </figcaption>

      <details className="mt-3 group">
        <summary className="cursor-pointer font-mono text-xs text-text-dim hover:text-cyan">View the data as a table</summary>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead className="font-mono text-text-faint">
              <tr>
                <th className="py-1.5 pr-4 font-normal">Model</th>
                <th className="py-1.5 pr-4 font-normal">Params (K)</th>
                <th className="py-1.5 font-normal">Accuracy (%)</th>
              </tr>
            </thead>
            <tbody className="text-text-dim">
              {[...modelPoints]
                .sort((a, b) => a.paramsK - b.paramsK)
                .map((p) => (
                  <tr key={p.name} className="border-t border-line-soft">
                    <td className="py-1.5 pr-4 text-text">{p.name}</td>
                    <td className="py-1.5 pr-4 font-mono">{p.paramsK}</td>
                    <td className="py-1.5 font-mono">
                      {p.accuracy.toFixed(2)} ± {p.std.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

export default ResearchChart;
