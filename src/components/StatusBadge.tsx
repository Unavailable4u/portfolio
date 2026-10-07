import type { ProjectStatus } from "../types";

const config: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "text-cyan border-cyan/40 bg-cyan/5" },
  research: { label: "Research", className: "text-amber border-amber/40 bg-amber/5" },
  "in-progress": { label: "In progress", className: "text-amber border-amber/40 bg-amber/5" },
  completed: { label: "Completed", className: "text-text-dim border-line bg-transparent" },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide uppercase border rounded-full px-2.5 py-1 ${className}`}>
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export default StatusBadge;
