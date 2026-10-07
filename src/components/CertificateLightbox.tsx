import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import type { CertificationItem } from "../types";
import Modal from "./Modal";

interface CertificateLightboxProps {
  items: CertificationItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

function CertificateLightbox({ items, index, onIndexChange, onClose }: CertificateLightboxProps) {
  const item = items[index];
  const [showExtra, setShowExtra] = useState(false);

  const go = (dir: 1 | -1) => {
    setShowExtra(false);
    onIndexChange((index + dir + items.length) % items.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length]);

  const shown = showExtra && item.extra ? item.extra : { image: item.image!, label: item.name };

  return (
    <Modal label={item.name} onClose={onClose} size="xl">
      <div className="flex flex-col">
        <div className="relative bg-black/60 flex items-center justify-center min-h-[40vh]">
          <img src={shown.image} alt={`${shown.label}, issued to S. M. Shuaib Islam Sayad`} className="max-h-[68vh] w-auto max-w-full object-contain" />
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous certificate"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-bg/80 border border-line text-text hover:border-cyan"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next certificate"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-bg/80 border border-line text-text hover:border-cyan"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <span className="font-mono text-xs text-text-faint block mb-1">
              {item.issuer}
              {item.year ? ` · ${item.year}` : ""} · {index + 1} / {items.length}
            </span>
            <h3 className="font-display text-xl font-semibold mb-1">{item.name}</h3>
            {item.note && <p className="text-sm text-text-dim max-w-2xl">{item.note}</p>}
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {item.extra && (
              <button
                type="button"
                onClick={() => setShowExtra((v) => !v)}
                className="font-mono text-xs border border-line rounded-sm px-3 py-2 text-text-dim hover:border-cyan hover:text-cyan transition-colors"
              >
                {showExtra ? "Show certificate" : `Show ${item.extra.label.toLowerCase()}`}
              </button>
            )}
            {item.verifyUrl && (
              <a
                href={item.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs border border-cyan/50 bg-cyan/5 rounded-sm px-3 py-2 text-cyan hover:bg-cyan/10 transition-colors"
              >
                Verify <FiExternalLink aria-hidden="true" size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CertificateLightbox;
