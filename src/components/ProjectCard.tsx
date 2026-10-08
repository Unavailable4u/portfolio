import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { FiPlay } from "react-icons/fi";
import type { ProjectItem } from "../types";
import ProjectLinks from "./ProjectLinks";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";

interface ProjectCardProps {
  project: ProjectItem;
  onOpen: (project: ProjectItem) => void;
  featured?: boolean;
}

function ProjectCard({ project, onOpen, featured = false }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 200, damping: 22 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [3.5, -3.5]), { stiffness: 200, damping: 22 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const media = project.media;
  const hasImage = Boolean(media?.thumbnail);
  const hasVideo = Boolean(media?.video);
  const contain = media?.thumbnailFit === "contain";

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex flex-col bg-bg-card border border-line rounded-md overflow-hidden hover:border-line-strong transition-colors duration-300 will-change-transform"
    >
      {hasImage && (
        <div className={`relative overflow-hidden bg-bg ${featured ? "aspect-[16/7]" : "aspect-video"}`}>
          <img
            src={media!.thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full transition-all duration-500 ${
              contain ? "object-contain p-8 md:p-12" : "object-cover"
            } ${
              media!.hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
          />
          {media!.hoverImage && (
            <img
              src={media!.hoverImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          {hasVideo && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 font-mono text-xs bg-bg/85 backdrop-blur border border-line rounded-full pl-2.5 pr-3 py-1.5 text-text">
              <FiPlay aria-hidden="true" size={12} className="text-cyan" />
              Watch demo
            </span>
          )}
        </div>
      )}

      <div className={`flex flex-col flex-1 ${featured ? "p-7 md:p-10" : "p-6 md:p-7"}`}>
        <div className="flex items-center gap-3 mb-4">
          {project.status && <StatusBadge status={project.status} />}
          {featured && <span className="font-mono text-[11px] text-amber tracking-wide">FEATURED</span>}
          {!hasImage && hasVideo && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyan tracking-wide">
              <FiPlay aria-hidden="true" size={11} />
              DEMO VIDEO
            </span>
          )}
        </div>

        <h3 className={`font-display font-semibold tracking-tight mb-2 ${featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-cyan"
            aria-haspopup="dialog"
          >
            {project.title}
          </button>
        </h3>

        <p className={`text-text-dim leading-relaxed mb-5 ${featured ? "text-base max-w-3xl" : "text-sm"}`}>{project.summary}</p>

        {project.stats && (
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mb-6 py-4 border-y border-line-soft">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="font-mono text-[11px] text-text-faint uppercase tracking-wide">{s.label}</dt>
                <dd className="font-display text-xl text-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <ProjectLinks links={project.links} className="relative z-10" />
          <span aria-hidden="true" className="font-mono text-xs text-text-faint group-hover:text-cyan transition-colors">
            Details →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
