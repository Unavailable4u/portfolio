interface SectionHeadingProps {
  tag: string;
  title: string;
  description?: string;
}

function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-xl mb-16">
      <span className="font-mono text-xs text-cyan tracking-wide mb-4 block">
        {tag}
      </span>
      <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-dim mt-4 text-base leading-relaxed max-w-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;