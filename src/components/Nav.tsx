const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-bg/70 backdrop-blur-md border-b border-line-soft">
      <a href="#" className="font-mono text-sm text-text flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_theme(colors.cyan)]" />
        Sayad
      </a>
      <div className="hidden md:flex gap-9">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="font-mono text-xs text-text-dim hover:text-text transition-colors duration-200">
            {link.label}
          </a>
        ))}
      </div>
      <a href="#contact" className="font-mono text-xs border border-line px-4 py-2 rounded-sm text-text-dim hover:border-cyan hover:text-cyan transition-all duration-200">
        Contact
      </a>
    </nav>
  );
}

export default Nav;