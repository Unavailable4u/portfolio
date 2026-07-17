interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
  return (
    <span className="font-mono text-xs text-text-dim border border-line rounded-full px-3 py-1.5 transition-colors duration-200 hover:border-cyan hover:text-cyan">
      {label}
    </span>
  );
}

export default Tag;