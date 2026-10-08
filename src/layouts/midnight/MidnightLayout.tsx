import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import CommandPalette from "../../components/CommandPalette";
import Nav from "../../components/Nav";
import ScrollProgress from "../../components/ScrollProgress";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { sectionIds, sections } from "../../lib/sections";
import About from "../../sections/About";
import Activity from "../../sections/Activity";
import Certificates from "../../sections/Certificates";
import Contact from "../../sections/Contact";
import Experience from "../../sections/Experience";
import Hero from "../../sections/Hero";
import Projects from "../../sections/Projects";
import Research from "../../sections/Research";
import Skills from "../../sections/Skills";

const baseTitle = `${profile.name} · ${profile.title}`;

function MidnightLayout() {
  const active = useActiveSection(sectionIds);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // Tab title follows the section in view.
  useEffect(() => {
    const label = sections.find((s) => s.id === active)?.label;
    document.title = label ? `${profile.shortName} · ${label}` : baseTitle;
  }, [active]);

  // Cmd/Ctrl + K opens the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-cyan focus:text-bg focus:px-4 focus:py-2 focus:rounded-sm font-mono text-sm"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav active={active} onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <Projects />
        <Research />
        <Experience />
        <Skills />
        <Certificates />
        <About />
        <Activity />
      </main>
      <Contact />
      <AnimatePresence>{paletteOpen && <CommandPalette onClose={closePalette} />}</AnimatePresence>
    </div>
  );
}

export default MidnightLayout;
