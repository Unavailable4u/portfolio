import { useCallback, useId, useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { cvStyles } from "../../lib/cv";
import Icon from "./Icon";

/** "Download CV" button in the header with a small panel listing the generated CV styles. */
function GildedCvMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, open, close);

  return (
    <div className="cvm" ref={ref}>
      <button
        type="button"
        className="cvm-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Download CV"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="download" />
        <span className="cvm-label">Download CV</span>
        <Icon name="chevron" className="ico cvm-chev" />
      </button>
      {open && (
        <div id={panelId} className="cvm-panel">
          <h3>Choose a style</h3>
          {cvStyles.map((style) => (
            <a key={style.id} className="cvm-item" href={style.file} download onClick={close}>
              <div>
                <b>{style.label}</b>
                <span>{style.description}</span>
              </div>
              <Icon name="download" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default GildedCvMenu;
