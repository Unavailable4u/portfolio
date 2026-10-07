import { FiBookOpen, FiExternalLink, FiFileText, FiGithub, FiMail } from "react-icons/fi";
import type { ProjectLink, ProjectLinkKind } from "../types";

const icons: Record<ProjectLinkKind, typeof FiGithub> = {
  github: FiGithub,
  live: FiExternalLink,
  docs: FiBookOpen,
  paper: FiFileText,
  mail: FiMail,
};

/** Small icon + label links. Only links that exist are rendered, so there are no dead buttons. */
function ProjectLinks({ links, className = "" }: { links?: ProjectLink[]; className?: string }) {
  if (!links || links.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = icons[link.kind];
        const external = !link.url.startsWith("mailto:");
        return (
          <a
            key={link.url}
            href={link.url}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-text-dim border border-line rounded-sm px-2.5 py-1.5 hover:border-cyan hover:text-cyan transition-colors"
          >
            <Icon aria-hidden="true" size={13} />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

export default ProjectLinks;
