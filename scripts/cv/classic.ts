/**
 * Classic: single-column, black and white, ATS-friendly. Mirrors a traditional
 * resume with a centered Times name, one contact line, ruled section headings
 * and right-aligned dates.
 */
import { A4, Flow, createDocument, link, sectionHeading, type Block, type Built, type HeadingStyle, type Run, type TextStyle } from "./kit.ts";
import { contactDetails, displayUrl, githubLinks, metaKeywords, project, type CvData } from "./data.ts";

const BLACK = "#000000";
const GREY = "#333333";
const MARGIN_X = 46;
const MARGIN_TOP = 40;
const MARGIN_BOTTOM = 38;

const body: TextStyle = { font: "Times-Roman", size: 10, color: BLACK, lineHeight: 1.22 };
const bold: TextStyle = { ...body, font: "Times-Bold" };
const italic: TextStyle = { ...body, font: "Times-Italic", color: GREY };
const bulletStyle: TextStyle = { ...body, lineHeight: 1.2 };

const heading: HeadingStyle = {
  font: "Times-Bold",
  size: 10.5,
  color: BLACK,
  spacing: 1.1,
  uppercase: true,
  before: 8,
  gap: 1.5,
  after: 3.5,
  rule: { color: BLACK, thickness: 0.6 },
};

/** Roles may show fewer bullets; this picks which ones (data order otherwise). */
const EXPERIENCE_BULLETS: Record<string, number[]> = {
  // Skip the "not diagnosis" caveat line to make room for the hardware work.
  "MedSophia Maa42": [0, 2],
};
const MAX_EXPERIENCE_BULLETS = 2;

const PROJECT_IDS = ["minime", "fbebc", "medsophia", "focusos"];
const PROJECT_BULLETS: Record<string, number> = { minime: 2, fbebc: 2, medsophia: 2, focusos: 1 };

export function buildClassic(data: CvData): Built {
  const { profile } = data;
  const built = createDocument({
    title: `${profile.name} - Curriculum Vitae`,
    author: profile.name,
    subject: `${profile.title}. Curriculum vitae (classic).`,
    keywords: metaKeywords,
  });
  built.pager.add();

  const flow = new Flow({
    doc: built.doc,
    pager: built.pager,
    x: MARGIN_X,
    width: A4.width - 2 * MARGIN_X,
    top: MARGIN_TOP,
    bottom: A4.height - MARGIN_BOTTOM,
  });

  // ---- Header ----
  const c = contactDetails(profile);
  const contact: Run[][] = [
    [{ text: c.location }],
    ...(c.phone ? [[{ text: c.phone }]] : []),
    [link(c.email.text, c.email.url)],
    [link(c.linkedin.text, c.linkedin.url)],
    [link(c.github.text, c.github.url)],
    [link(c.site.text, c.site.url)],
  ];
  flow.place(
    flow.text(profile.name, { font: "Times-Bold", size: 22, color: BLACK, align: "center", lineHeight: 1.15 }),
    flow.spacer(2),
    flow.text(profile.title, { font: "Times-Italic", size: 10.5, color: GREY, align: "center", lineHeight: 1.2 }),
    flow.spacer(3),
    flow.items(contact, { text: " | ", color: GREY }, { ...body, size: 9, align: "center" }),
  );

  // ---- Education ----
  flow.hold(...sectionHeading(flow, "Education", heading));
  data.education.forEach((e, i) => {
    flow.place(
      ...(i > 0 ? [flow.spacer(3)] : []),
      flow.dateLine([{ text: e.institution }], [{ text: e.dateRange }], bold, bold),
      flow.dateLine([{ text: e.degree }], [{ text: e.location }], italic, italic),
    );
  });

  // ---- Experience ----
  flow.hold(...sectionHeading(flow, "Experience", heading));
  data.experience.forEach((e, i) => {
    const picks = EXPERIENCE_BULLETS[e.org] ?? e.bullets.slice(0, MAX_EXPERIENCE_BULLETS).map((_, k) => k);
    const bullets: Block[] = picks.map((k) => flow.bullet(e.bullets[k], bulletStyle));
    flow.placeKeep(
      [
        ...(i > 0 ? [flow.spacer(4)] : []),
        flow.dateLine([{ text: e.role }], [{ text: e.dateRange }], bold, bold),
        flow.dateLine([{ text: e.org }], [{ text: e.location }], italic, italic),
        ...bullets.slice(0, 1),
      ],
      bullets.slice(1),
    );
  });

  // ---- Projects ----
  flow.hold(...sectionHeading(flow, "Projects", heading));
  PROJECT_IDS.forEach((id, i) => {
    const p = project(id);
    const gh = githubLinks(p)[0];
    const n = PROJECT_BULLETS[id] ?? 1;
    const bullets = p.bullets.slice(0, n).map((b) => flow.bullet(b, bulletStyle));
    flow.placeKeep(
      [
        ...(i > 0 ? [flow.spacer(4)] : []),
        flow.dateLine(
          [{ text: p.title }],
          gh ? [link(displayUrl(gh.url), gh.url, { font: "Times-Roman", size: 9.5 })] : [],
          bold,
          { ...body, size: 9.5 },
        ),
        flow.text(p.stack, italic),
        ...bullets.slice(0, 1),
      ],
      [...bullets.slice(1), ...(p.note ? [flow.text(p.note, { ...italic, size: 9.5 })] : [])],
    );
  });

  // ---- Honors & Certifications ----
  flow.hold(...sectionHeading(flow, "Honors & Certifications", heading));
  const honorBlocks = data.honors.map((h) => flow.dateLine([{ text: h.name }], [{ text: h.year }], body, body));
  const creds = data.certifications.filter((x) => x.category === "credential");
  const credRuns: Run[] = [{ text: "Certifications: ", font: "Times-Bold" }];
  creds.forEach((x, i) => {
    const bits = [x.issuer, x.year].filter(Boolean).join(", ");
    credRuns.push({ text: `${x.name} (${bits})${i < creds.length - 1 ? "; " : "."}` });
  });
  flow.placeKeep([honorBlocks[0]], honorBlocks.slice(1));
  flow.place(flow.spacer(2), flow.text(credRuns, { ...body, lineHeight: 1.2 }));

  // ---- Technical Skills ----
  flow.place(...sectionHeading(flow, "Technical Skills", heading), ...skillLines(flow, data));
  flow.place(
    flow.spacer(2),
    flow.text(
      [
        { text: "Spoken Languages: ", font: "Times-Bold" },
        { text: profile.languages.map((l) => `${l.name} (${l.level})`).join(", ") },
      ],
      body,
    ),
  );

  built.doc.end();
  return built;
}

function skillLines(flow: Flow, data: CvData): Block[] {
  return data.skills.map((tier) =>
    flow.text(
      [
        { text: `${tier.label}: `, font: "Times-Bold" },
        { text: tier.items.join(", ") },
      ],
      { ...body, lineHeight: 1.22 },
    ),
  );
}
