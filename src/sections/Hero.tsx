import Button from "../components/Button";
import { profile } from "../data/profile";

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl">
        <span className="font-mono text-sm text-cyan tracking-wide mb-6 flex items-center gap-2.5">
          <span className="w-6 h-px bg-cyan" />
          Available for research & engineering roles
        </span>

        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight leading-none mb-7">
          {profile.name}
        </h1>

        <p className="text-text-dim text-lg max-w-xl leading-relaxed mb-10">
          {profile.summary}
        </p>

        <div className="flex flex-wrap gap-4">
          <Button href="#projects" variant="primary">
            View Projects
          </Button>
          <Button href={`mailto:${profile.email}`} variant="secondary">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;