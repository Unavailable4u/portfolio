import { useState } from "react";
import { certifications } from "../../../data/certifications";
import type { CertificationCategory } from "../../../types";

const tabs: { id: CertificationCategory; label: string }[] = [
  { id: "credential", label: "Credentials" },
  { id: "competition", label: "Competitions" },
];

/** How many certificates show before "Show all". */
const PREVIEW = 8;

const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

function Certificates() {
  const [tab, setTab] = useState<CertificationCategory>("credential");
  const [expanded, setExpanded] = useState(false);

  const inTab = certifications.filter((c) => c.category === tab);
  const withImage = inTab.filter((c) => c.image);
  const textOnly = inTab.filter((c) => !c.image);
  const shown = expanded ? withImage : withImage.slice(0, PREVIEW);

  return (
    <section id="certificates" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Certificates</span>
          <h2>
            Proof, <em>not just claims</em>
          </h2>
          <p>
            Open any certificate in full size. Where the issuer offers verification, there is a link to check it
            yourself.
          </p>
        </div>

        <div className="ctabs" role="group" aria-label="Certificate type">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className="ctab"
              aria-pressed={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setExpanded(false);
              }}
            >
              {t.label} ({certifications.filter((c) => c.category === t.id).length})
            </button>
          ))}
        </div>

        <div className="cgrid">
          {shown.map((c) => (
            <article key={c.id} className="card hover cert">
              <a className="cthumb" href={c.image} {...newTab} aria-label={`Open certificate: ${c.name}`}>
                <img src={c.thumb} alt="" loading="lazy" decoding="async" />
              </a>
              <div className="cmeta">
                {c.year && <small>{c.year}</small>}
                <b>{c.name}</b>
                <p>
                  {c.issuer}
                  {c.note ? `. ${c.note}` : ""}
                </p>
                <div className="clinks">
                  <a href={c.image} {...newTab}>
                    View
                  </a>
                  {c.extra && (
                    <a href={c.extra.image} {...newTab}>
                      {c.extra.label}
                    </a>
                  )}
                  {c.verifyUrl && (
                    <a href={c.verifyUrl} {...newTab}>
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {withImage.length > PREVIEW && (
          <div className="cmore">
            <button type="button" className="btn ghost sm" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Show fewer" : `Show all ${withImage.length}`}
            </button>
          </div>
        )}

        {textOnly.length > 0 && (
          <div className="also">
            <h3>Also completed</h3>
            <ul>
              {textOnly.map((c) => (
                <li key={c.id}>
                  {c.name}
                  <span>{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Certificates;
