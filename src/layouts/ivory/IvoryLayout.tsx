import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/dm-sans";
import "@fontsource/pinyon-script";
import "./ivory.css";
import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navIds } from "./content";
import IconSprite from "./IconSprite";
import IvoryNav from "./IvoryNav";
import About from "./sections/About";
import Certificates from "./sections/Certificates";
import Cta from "./sections/Cta";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Now from "./sections/Now";
import Recognition from "./sections/Recognition";
import Research from "./sections/Research";
import Services from "./sections/Services";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import { useReveal } from "./useReveal";

/** Ivory: warm paper, serif display, terracotta accent. Content comes from src/data/. */
function IvoryLayout() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(navIds);
  useReveal(rootRef);

  useEffect(() => {
    document.title = `${profile.name} · ${profile.title}`;
  }, []);

  return (
    <div ref={rootRef} className="ivory">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <IconSprite />
      <IvoryNav active={active} />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Work />
        <Research />
        <Recognition />
        <Experience />
        <Skills />
        <Certificates />
        <Education />
        <Now />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default IvoryLayout;
