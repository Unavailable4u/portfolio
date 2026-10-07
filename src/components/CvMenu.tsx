import { useCallback, useRef, useState } from "react";
import { FiChevronDown, FiDownload } from "react-icons/fi";
import { cvStyles } from "../lib/cv";
import { useClickOutside } from "../hooks/useClickOutside";
import { buttonBase, buttonStyles } from "./buttonStyles";

interface CvMenuProps {
  variant: "nav" | "hero";
}

/** "Download CV" button with a small menu of the generated CV styles. */
function CvMenu({ variant }: CvMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, open, close);

  const trigger =
    variant === "hero"
      ? `${buttonBase} ${buttonStyles.secondary}`
      : "font-mono text-xs border border-line px-3.5 py-2 rounded-sm text-text-dim hover:border-cyan hover:text-cyan transition-all duration-200 inline-flex items-center gap-2";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={trigger}
      >
        <FiDownload aria-hidden="true" />
        CV
        <FiChevronDown aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 md:left-0 md:right-auto top-full mt-2 w-64 bg-bg-elevated border border-line rounded-md shadow-2xl shadow-black/50 p-1.5 z-50"
        >
          {cvStyles.map((style) => (
            <a
              key={style.id}
              role="menuitem"
              href={style.file}
              download
              onClick={close}
              className="flex flex-col gap-0.5 px-3 py-2.5 rounded-sm hover:bg-bg-card focus-visible:bg-bg-card transition-colors"
            >
              <span className="font-mono text-xs text-text">{style.label}</span>
              <span className="text-xs text-text-dim">{style.description}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CvMenu;
