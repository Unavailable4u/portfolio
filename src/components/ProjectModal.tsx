import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { parseVideo } from "../lib/media";
import type { ProjectItem } from "../types";
import Modal from "./Modal";
import ProjectLinks from "./ProjectLinks";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const media = project.media;
  const shots = media?.screenshots ?? [];
  const hasVideo = Boolean(media?.video);
  const [tab, setTab] = useState<"video" | "shots">(hasVideo ? "video" : "shots");
  const [index, setIndex] = useState(0);
  const video = media?.video ? parseVideo(media.video) : null;
  const showMedia = hasVideo || shots.length > 0;

  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + shots.length) % shots.length);

  return (
    <Modal label={project.title} onClose={onClose}>
      {showMedia && (
        <div className="bg-bg">
          {tab === "video" && video ? (
            <div className="aspect-video w-full bg-black">
              {video.kind === "youtube" ? (
                <iframe
                  src={video.src}
                  title={`${project.title} demo`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <video src={video.src} controls playsInline preload="metadata" className="w-full h-full" />
              )}
            </div>
          ) : (
            shots.length > 0 && (
              <div className="relative aspect-video w-full bg-black">
                <img src={shots[index]} alt={`${project.title} screenshot ${index + 1} of ${shots.length}`} className="w-full h-full object-contain" />
                {shots.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous screenshot"
                      onClick={() => step(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg/80 border border-line text-text hover:border-cyan"
                    >
                      <FiChevronLeft />
                    </button>
                    <button
                      type="button"
                      aria-label="Next screenshot"
                      onClick={() => step(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg/80 border border-line text-text hover:border-cyan"
                    >
                      <FiChevronRight />
                    </button>
                    <span className="absolute bottom-3 right-3 font-mono text-xs bg-bg/80 border border-line rounded-full px-2.5 py-1">
                      {index + 1} / {shots.length}
                    </span>
                  </>
                )}
              </div>
            )
          )}
          {hasVideo && shots.length > 0 && (
            <div role="tablist" aria-label="Media" className="flex gap-2 px-6 py-3 border-b border-line-soft">
              {(["video", "shots"] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                    tab === t ? "border-cyan text-cyan" : "border-line text-text-dim hover:text-text"
                  }`}
                >
                  {t === "video" ? "Demo video" : `Screenshots (${shots.length})`}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6 md:p-10">
        <div className="flex items-center gap-3 mb-4">{project.status && <StatusBadge status={project.status} />}</div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-3 pr-10">{project.title}</h3>
        <p className="text-text-dim mb-2 leading-relaxed">{project.summary}</p>
        <p className="font-mono text-xs text-text-faint mb-6">{project.stack}</p>

        {project.note && (
          <p className="text-sm text-text border-l-2 border-amber pl-4 py-1 mb-6 bg-amber/5">{project.note}</p>
        )}

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

        <ul className="space-y-3 mb-8">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="text-sm text-text-dim leading-relaxed pl-5 relative">
              <span aria-hidden="true" className="absolute left-0 text-cyan">→</span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <ProjectLinks links={project.links} />
      </div>
    </Modal>
  );
}

export default ProjectModal;
