import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import CertificateLightbox from "../components/CertificateLightbox";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { certifications } from "../data/certifications";
import type { CertificationCategory } from "../types";

const tabs: { id: CertificationCategory; label: string }[] = [
  { id: "credential", label: "Credentials" },
  { id: "competition", label: "Competitions" },
];

function Certificates() {
  const [tab, setTab] = useState<CertificationCategory>("credential");
  const [open, setOpen] = useState<number | null>(null);

  const inTab = useMemo(() => certifications.filter((c) => c.category === tab), [tab]);
  const withImage = useMemo(() => inTab.filter((c) => c.image), [inTab]);
  const textOnly = useMemo(() => inTab.filter((c) => !c.image), [inTab]);
  const counts = useMemo(
    () => Object.fromEntries(tabs.map((t) => [t.id, certifications.filter((c) => c.category === t.id).length])),
    [],
  );

  return (
    <section id="certificates" className="px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeading
            tag="05 · CERTIFICATES"
            title="Proof, not just claims."
            description="Select a certificate to enlarge it. Where the issuer offers verification, there is a link to check it yourself."
          />
        </Reveal>

        <div role="tablist" aria-label="Certificate type" className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`font-mono text-xs px-4 py-2.5 rounded-sm border transition-colors ${
                tab === t.id ? "border-cyan text-cyan bg-cyan/5" : "border-line text-text-dim hover:text-text hover:border-text-dim"
              }`}
            >
              {t.label} <span className="text-text-faint">({counts[t.id]})</span>
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {withImage.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="group w-full text-left bg-bg-card border border-line rounded-md overflow-hidden hover:border-cyan/60 transition-colors"
              >
                <div className="aspect-[4/3] bg-bg flex items-center justify-center overflow-hidden">
                  <img
                    src={c.thumb}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[11px] text-text-faint flex items-center justify-between gap-2 mb-1.5">
                    <span className="truncate">
                      {c.issuer}
                      {c.year ? ` · ${c.year}` : ""}
                    </span>
                    {c.verifyUrl && (
                      <span className="inline-flex items-center gap-1 text-cyan shrink-0">
                        <FiCheckCircle aria-hidden="true" size={12} /> Verifiable
                      </span>
                    )}
                  </span>
                  <span className="block text-sm text-text leading-snug">{c.name}</span>
                  {c.note && <span className="block text-xs text-text-dim mt-1.5 leading-relaxed">{c.note}</span>}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {textOnly.length > 0 && (
          <div className="mt-8 border-t border-line-soft pt-6">
            <span className="font-mono text-[11px] text-text-faint uppercase tracking-wide block mb-3">Also completed</span>
            <ul className="divide-y divide-line-soft">
              {textOnly.map((c) => (
                <li key={c.id} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-text">{c.name}</span>
                  <span className="font-mono text-xs text-text-faint whitespace-nowrap">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && withImage[open] && (
          <CertificateLightbox key={tab} items={withImage} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Certificates;
