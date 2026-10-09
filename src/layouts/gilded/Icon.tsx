/** Draws a symbol from <IconSprite />. */
function Icon({ name, className = "ico" }: { name: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#g-${name}`} />
    </svg>
  );
}

export default Icon;
