import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Button from "../components/Button";
import CvMenu from "../components/CvMenu";
import { profile } from "../data/profile";
import { useScramble } from "../hooks/useScramble";

function Hero() {
  const scrambled = useScramble(profile.name);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-cyan/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto md:mx-0 md:max-w-4xl">
        <span className="font-mono text-sm text-cyan tracking-wide mb-6 flex items-center gap-2.5">
          <span aria-hidden="true" className="w-6 h-px bg-cyan" />
          {profile.availability}
        </span>

        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-7 relative">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="invisible block">
            {profile.name}
          </span>
          <span aria-hidden="true" className="absolute inset-0 block">
            {scrambled}
          </span>
        </h1>

        <p className="text-text text-xl md:text-2xl max-w-2xl leading-snug mb-4">{profile.headline}</p>
        <p className="text-text-dim text-base max-w-xl leading-relaxed mb-10">{profile.now}</p>

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <Button href="#projects" variant="primary">
            View Projects
          </Button>
          <CvMenu variant="hero" />
          <Button href={`mailto:${profile.email}`} variant="secondary">
            Get in Touch
          </Button>
        </div>

        <div className="flex items-center gap-5 text-text-dim">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-cyan transition-colors">
            <FiGithub size={20} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan transition-colors">
            <FiLinkedin size={20} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-cyan transition-colors">
            <FiMail size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
