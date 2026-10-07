import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import CvMenu from "../components/CvMenu";
import Reveal from "../components/Reveal";
import { profile } from "../data/profile";
import { shortcutLabel } from "../lib/platform";

const linkClass =
  "font-mono text-sm text-text border-b border-line pb-1 hover:text-cyan hover:border-cyan transition-colors duration-200 inline-flex items-center gap-2";

function Contact() {
  return (
    <footer id="contact" className="px-6 md:px-12 py-24 md:py-36 border-t border-line-soft">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div>
            <span className="font-mono text-xs text-cyan tracking-wide mb-4 block">08 · CONTACT</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-5">
              Let's build
              <br />
              something together.
            </h2>
            <p className="text-text-dim text-base mb-12 max-w-md">
              {profile.availability}. The quickest way to reach me is email.
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-5 mb-16">
              <a href={`mailto:${profile.email}`} className={linkClass}>
                <FiMail aria-hidden="true" /> {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FiGithub aria-hidden="true" /> GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <FiLinkedin aria-hidden="true" /> LinkedIn ↗
              </a>
              <CvMenu variant="nav" />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-text-faint font-mono pt-8 border-t border-line-soft">
          <span>© 2026 {profile.name}</span>
          <span className="hidden sm:inline">
            Press <kbd className="border border-line rounded-sm px-1.5 py-0.5 text-text-dim">{shortcutLabel}</kbd> to search this site
          </span>
          <span>Built with intention, in Rajshahi.</span>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
