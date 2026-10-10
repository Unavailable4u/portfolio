import "@fontsource/anton";
import "@fontsource-variable/oswald";
import "@fontsource-variable/playfair-display";
import "./crimson.css";
import { useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useReveal } from "../../hooks/useReveal";
import { navIds } from "./content";
import CrimsonNav from "./CrimsonNav";
import IconSprite from "./IconSprite";
import About from "./sections/About";
import Certificates from "./sections/Certificates";
import Cta from "./sections/Cta";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import MoreNow from "./sections/MoreNow";
import SkillsEdu from "./sections/SkillsEdu";
import TopStrip from "./sections/TopStrip";
import WhatIDo from "./sections/WhatIDo";
import Work from "./sections/Work";

/** Crimson: near-black with deep red, heavy condensed type and a cut-out portrait on a red disc. Content comes from src/data/. */
function CrimsonLayout() {
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(navIds);
  useReveal(rootRef);

  useEffect(() => {
    document.title = `${profile.name} · ${profile.title}`;
  }, []);

  return (
    <div ref={rootRef} className="crimson" id="top">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <IconSprite />
      <TopStrip />
      <CrimsonNav active={active} />
      <main id="main">
        <div className="wrap">
          <Hero />
          <div className="bento">
            <WhatIDo />
            <Work />
            <About />
            <MoreNow />
            <Experience />
            <SkillsEdu />
            <Certificates />
            <Cta />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default CrimsonLayout;
