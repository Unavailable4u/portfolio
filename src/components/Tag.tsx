interface TagProps {
  label: string;
  tone?: "default" | "strong" | "faint";
}

const tones = {
  default: "text-text-dim border-line hover:border-cyan hover:text-cyan",
  strong: "text-text border-cyan/40 bg-cyan/5 hover:border-cyan hover:text-cyan",
  faint: "text-text-faint border-line-soft hover:border-line-strong hover:text-text-dim",
};

function Tag({ label, tone = "default" }: TagProps) {
  return (
    <span
      className={`font-mono text-xs border rounded-full px-3 py-1.5 transition-colors duration-200 ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

export default Tag;
