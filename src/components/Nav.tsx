import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { profile } from "../data/profile";
import { cvStyles } from "../lib/cv";
import { shortcutLabel } from "../lib/platform";
import { sections } from "../lib/sections";
import CvMenu from "./CvMenu";

interface NavProps {
  active: string;
  onOpenPalette: () => void;
}

const links = sections.filter((s) => s.id !== "contact");

function Nav({ active, onOpenPalette }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/75 backdrop-blur-md border-b border-line-soft">
      <nav aria-label="Primary" className="flex items-center justify-between gap-4 px-6 md:px-12 py-4">
        <a href="#" className="font-mono text-sm text-text flex items-center gap-2" aria-label={`${profile.shortName}, back to top`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          {profile.shortName}
        </a>

        <ul className="hidden xl:flex gap-6">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative font-mono text-xs py-1.5 transition-colors duration-200 hover:text-text ${
                    isActive ? "text-cyan" : "text-text-dim"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-px bg-cyan origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-text-dim border border-line px-3 py-2 rounded-sm hover:border-text-dim hover:text-text transition-colors"
          >
            <FiSearch aria-hidden="true" />
            <kbd className="font-mono text-[11px] text-text-faint">{shortcutLabel}</kbd>
          </button>
          <div className="hidden sm:block">
            <CvMenu variant="nav" />
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-block font-mono text-xs border border-line px-4 py-2 rounded-sm text-text-dim hover:border-cyan hover:text-cyan transition-all duration-200"
          >
            Contact
          </a>
          <button
            type="button"
            className="xl:hidden p-2 -mr-2 text-text-dim hover:text-text"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="xl:hidden border-t border-line-soft bg-bg-elevated px-6 py-5 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="space-y-1">
            {sections.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-mono text-sm py-2.5 ${active === link.id ? "text-cyan" : "text-text-dim"}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-line-soft">
            <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-2">Download CV</span>
            <div className="flex flex-wrap gap-2">
              {cvStyles.map((style) => (
                <a
                  key={style.id}
                  href={style.file}
                  download
                  className="font-mono text-xs border border-line rounded-sm px-3 py-2 text-text-dim hover:border-cyan hover:text-cyan"
                >
                  {style.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenPalette();
              }}
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-text-dim hover:text-text"
            >
              <FiSearch aria-hidden="true" /> Search the site
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
