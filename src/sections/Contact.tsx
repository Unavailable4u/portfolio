import { profile } from "../data/profile";

function Contact() {
  return (
    <footer id="contact" className="px-6 md:px-12 py-24 md:py-36 border-t border-line-soft">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-xs text-cyan tracking-wide mb-4 block">05 · CONTACT</span>
        <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-5">
          Let's build
          <br />
          something together.
        </h2>
        <p className="text-text-dim text-base mb-12 max-w-md">Open to research and applied engineering opportunities.</p>

        <div className="flex flex-wrap gap-x-10 gap-y-4 mb-16">
          <a href={`mailto:${profile.email}`} className="font-mono text-sm text-text border-b border-line pb-1 hover:text-cyan hover:border-cyan transition-colors duration-200">{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="font-mono text-sm text-text border-b border-line pb-1 hover:text-cyan hover:border-cyan transition-colors duration-200">{profile.phone}</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-text border-b border-line pb-1 hover:text-cyan hover:border-cyan transition-colors duration-200">GitHub ↗</a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-text border-b border-line pb-1 hover:text-cyan hover:border-cyan transition-colors duration-200">LinkedIn ↗</a>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-text-faint font-mono pt-8 border-t border-line-soft">
          <span>© 2026 {profile.name}</span>
          <span>Built with intention, in Rajshahi.</span>
        </div>
      </div>
    </footer>
  );
}

export default Contact;