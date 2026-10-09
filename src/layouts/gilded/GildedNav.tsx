import { useState } from "react";
import { profile } from "../../data/profile";
import LayoutSwitcher from "../LayoutSwitcher";
import { navLinks, year } from "./content";
import GildedCvMenu from "./GildedCvMenu";

function GildedNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top" aria-label={`${profile.shortName}, back to top`}>
          {profile.shortName.toUpperCase()}
          <i>est. {year}</i>
        </a>
        <nav aria-label="Primary">
          <ul id="menu" className={open ? "open" : undefined} onClick={() => setOpen(false)}>
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
          <LayoutSwitcher className="switch" size={17} strokeWidth={1.4} />
          <GildedCvMenu />
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
    </header>
  );
}

export default GildedNav;
