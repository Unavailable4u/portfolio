import "@fontsource/anton";
import "@fontsource/pinyon-script";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/oswald";
import "./gilded.css";
import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useReveal } from "../../hooks/useReveal";
import { navIds } from "./content";
import GildedNav from "./GildedNav";
import IconSprite from "./IconSprite";
import About from "./sections/About";
import Band from "./sections/Band";
import Certificates from "./sections/Certificates";
import Cta from "./sections/Cta";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Research from "./sections/Research";
import Skills from "./sections/Skills";
import Toc from "./sections/Toc";
import Work from "./sections/Work";

/** Gilded: near-black with brushed gold, condensed display type and a cut-out portrait. Content comes from src/data/. */
function GildedLayout() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(navIds);
  useReveal(rootRef);

  useEffect(() => {
    document.title = `${profile.name} · ${profile.title}`;
  }, []);

  return (
    <div ref={rootRef} className="gilded">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <IconSprite />
      <GildedNav active={active} />
      <main id="main">
        <Hero />
        <Toc />
        <Work />
        <Band />
        <About />
        <Experience />
        <Research />
        <Skills />
        <Certificates />
        <Education />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default GildedLayout;
