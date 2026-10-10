import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/sora";
import "./ember.css";
import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useReveal } from "../../hooks/useReveal";
import { navIds } from "./content";
import EmberNav from "./EmberNav";
import IconSprite from "./IconSprite";
import About from "./sections/About";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Recognition from "./sections/Recognition";
import Research from "./sections/Research";
import Skills from "./sections/Skills";
import Work from "./sections/Work";

/** Ember: warm near-black with an orange glow, rounded cards and a cut-out portrait. Content comes from src/data/. */
function EmberLayout() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(navIds);
  useReveal(rootRef);

  useEffect(() => {
    document.title = `${profile.name} · ${profile.title}`;
  }, []);

  return (
    <div ref={rootRef} className="ember">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <IconSprite />
      <EmberNav active={active} />
      <main id="main">
        <Hero />
        <Work />
        <Recognition />
        <Projects />
        <Research />
        <Experience />
        <Skills />
        <Certificates />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default EmberLayout;
