import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import LayoutSwitcher from "../LayoutSwitcher";
import EmberCvMenu from "./EmberCvMenu";
import Icon from "./Icon";
import { navLinks } from "./content";

function EmberNav({ active }: { active: string }) {
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
        <a className="brand" href="#home" aria-label={`${profile.shortName}, home`}>
          <span className="dot" aria-hidden="true" />
          {profile.shortName}
        </a>
        <nav aria-label="Primary">
          <ul className={`links${open ? " open" : ""}`} id="menu" onClick={() => setOpen(false)}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? "active" : undefined}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <LayoutSwitcher className="switch" size={18} strokeWidth={1.6} />
          <EmberCvMenu />
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default EmberNav;
