/** Draws a symbol from <IconSprite />. */
function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg className={`i${className ? ` ${className}` : ""}`} aria-hidden="true">
      <use href={`#e-${name}`} />
    </svg>
  );
}

export default Icon;
