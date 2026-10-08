import { useState } from "react";
import { profile } from "../../data/profile";
import LayoutSwitcher from "../LayoutSwitcher";
import { navLinks } from "./content";

function IvoryNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap">
        <a className="mono" href="#top" aria-label={`${profile.shortName}, home`}>
          S<i>S</i>
        </a>
        <nav aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? "on" : undefined}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <LayoutSwitcher className="switch" size={18} strokeWidth={1.4} />
          <a className="btn sm cta" href={`mailto:${profile.email}`}>
            Say hello
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
      <div className={`menu${open ? " open" : ""}`} id="menu" inert={!open} onClick={() => setOpen(false)}>
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export default IvoryNav;
