import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import LayoutSwitcher from "../LayoutSwitcher";
import CrimsonCvMenu from "./CrimsonCvMenu";
import Icon from "./Icon";
import { navLinks, pad2 } from "./content";

function CrimsonNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="#top" aria-label={`${profile.shortName}, back to top`}>
          {profile.shortName.toUpperCase()}
          <b>.</b>
        </a>
        <nav aria-label="Primary">
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <a
                  className={`l${active === link.id ? " on" : ""}`}
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  <span>{pad2(i + 1)}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <LayoutSwitcher className="switch" size={18} strokeWidth={1.5} />
          <CrimsonCvMenu />
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mnav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
      <nav className={`mnav${open ? " open" : ""}`} id="mnav" aria-label="Mobile" onClick={() => setOpen(false)}>
        {navLinks.map((link, i) => (
          <a key={link.id} href={`#${link.id}`}>
            <span>{pad2(i + 1)}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default CrimsonNav;
