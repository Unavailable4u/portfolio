/**
 * Academic: research-CV ordering in a single Times column. Education, honors
 * and research come first; experience is condensed.
 */
import { A4, Flow, createDocument, link, sectionHeading, type Block, type Built, type HeadingStyle, type Run, type TextStyle } from "./kit.ts";
import { contactDetails, displayUrl, githubLinks, metaKeywords, project, statusLabel, type CvData } from "./data.ts";

const BLACK = "#000000";
const GREY = "#3A3A3A";
const RULE = "#777777";
const MARGIN_X = 48;
const MARGIN_TOP = 42;
const MARGIN_BOTTOM = 40;

const body: TextStyle = { font: "Times-Roman", size: 10, color: BLACK, lineHeight: 1.22 };
const bold: TextStyle = { ...body, font: "Times-Bold" };
const italic: TextStyle = { ...body, font: "Times-Italic", color: GREY };

const heading: HeadingStyle = {
  font: "Times-Bold",
  size: 11.5,
  color: BLACK,
  before: 9,
  gap: 1.5,
  after: 4,
  rule: { color: RULE, thickness: 0.5 },
};

/** Research projects in display order, with how many bullets to show. */
const RESEARCH: Array<{ id: string; bullets: number; summary?: boolean }> = [
  { id: "fbebc", bullets: 3, summary: true },
  { id: "minime", bullets: 2 },
  { id: "medsophia", bullets: 2 },
];
const MAX_EXPERIENCE_BULLETS = 2;
const EXPERIENCE_BULLETS: Record<string, number[]> = {
  "MedSophia Maa42": [0, 2],
  // Condensed: one line each for the two non-technical internships.
  "International MUN": [0],
  "Pledge A Smile Foundation": [0],
};

export function buildAcademic(data: CvData): Built {
  const { profile } = data;
  const built = createDocument({
    title: `${profile.name} - Curriculum Vitae`,
    author: profile.name,
    subject: `${profile.title}. Curriculum vitae (academic).`,
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
  const bullet = (t: string): Block => flow.bullet(t, { ...body, lineHeight: 1.2 });

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
    flow.text(profile.name, { font: "Times-Bold", size: 21, color: BLACK, align: "center", lineHeight: 1.15 }),
    flow.spacer(2),
    flow.text("Curriculum Vitae", { font: "Times-Italic", size: 10.5, color: GREY, align: "center", lineHeight: 1.2 }),
    flow.spacer(3),
    flow.items(contact, { text: " | ", color: GREY }, { ...body, size: 9, align: "center" }),
  );

  // ---- Summary ----
  flow.place(...sectionHeading(flow, "Summary", heading), flow.text(profile.summary, { ...body, align: "left" }));

  // ---- Education ----
  flow.hold(...sectionHeading(flow, "Education", heading));
  data.education.forEach((e, i) => {
    flow.place(
      ...(i > 0 ? [flow.spacer(3)] : []),
      flow.dateLine([{ text: e.institution }], [{ text: e.dateRange }], bold, body),
      flow.dateLine([{ text: e.degree }], [{ text: e.location }], italic, italic),
    );
  });

  // ---- Honors & Awards ----
  flow.hold(...sectionHeading(flow, "Honors & Awards", heading));
  const honorBlocks = data.honors.map((h) =>
    flow.dateLine(
      [h.url ? link(h.name, h.url) : { text: h.name }],
      [{ text: h.year }],
      body,
      body,
    ),
  );
  flow.placeKeep([honorBlocks[0]], honorBlocks.slice(1));

  // ---- Publications ----
  flow.hold(...sectionHeading(flow, "Publications & Manuscripts", heading));
  data.research.forEach((r, i) => {
    const authorRuns: Run[] = [];
    r.authors.forEach((a, k) => {
      authorRuns.push(a === r.highlightAuthor ? { text: a, font: "Times-Bold" } : { text: a });
      if (k < r.authors.length - 1) authorRuns.push({ text: ", " });
    });
    flow.placeKeep(
      [
        ...(i > 0 ? [flow.spacer(4)] : []),
        flow.text([...authorRuns, { text: ". " }, { text: `${r.title}. `, font: "Times-Italic", color: BLACK }], { ...body, align: "left" }),
      ],
      [
        flow.text(`${r.affiliation}. ${r.statusNote}`, { ...body, size: 9.5, color: GREY }),
        flow.text([{ text: "Keywords: ", font: "Times-Bold", size: 9.5 }, { text: r.keywords.join(", "), size: 9.5 }], { ...body, size: 9.5 }),
      ],
    );
  });

  // ---- Research & Selected Projects ----
  flow.hold(...sectionHeading(flow, "Research & Selected Projects", heading));
  RESEARCH.forEach(({ id, bullets: n, summary }, i) => {
    const p = project(id);
    const status = statusLabel(p.status);
    const gh = githubLinks(p);
    const bullets = p.bullets.slice(0, n).map(bullet);
    const linkItems: Run[][] = gh.map((l) => [
      link(gh.length > 1 ? `${l.label}: ${displayUrl(l.url)}` : displayUrl(l.url), l.url, { size: 9 }),
    ]);
    flow.placeKeep(
      [
        ...(i > 0 ? [flow.spacer(4.5)] : []),
        flow.dateLine(
          [{ text: p.title, font: "Times-Bold" }, ...(status ? [{ text: ` (${status})`, font: "Times-Italic", color: GREY }] : [])],
          [],
          body,
        ),
        ...(summary ? [flow.text(p.summary, italic)] : []),
        bullets[0],
      ],
      [
        ...bullets.slice(1),
        ...(p.note ? [flow.text([{ text: "Note: ", font: "Times-Bold" }, { text: p.note }], { ...body, size: 9.5 })] : []),
        ...(linkItems.length
          ? [flow.items([[{ text: "Code: ", font: "Times-Bold", size: 9 }, ...linkItems[0]], ...linkItems.slice(1)], { text: "  |  ", color: GREY, size: 9 }, { ...body, size: 9 })]
          : []),
      ],
    );
  });

  // ---- Experience ----
  flow.hold(...sectionHeading(flow, "Experience", heading));
  data.experience.forEach((e, i) => {
    const picks = EXPERIENCE_BULLETS[e.org] ?? e.bullets.slice(0, MAX_EXPERIENCE_BULLETS).map((_, k) => k);
    const bullets = picks.map((k) => bullet(e.bullets[k]));
    flow.placeKeep(
      [
        ...(i > 0 ? [flow.spacer(3.5)] : []),
        flow.dateLine([{ text: e.role }], [{ text: e.dateRange }], bold, body),
        flow.dateLine([{ text: `${e.org}` }], [{ text: e.location }], italic, italic),
        ...bullets.slice(0, 1),
      ],
      bullets.slice(1),
    );
  });

  // ---- Certifications & Training ----
  const creds = data.certifications.filter((x) => x.category === "credential");
  const credBlocks = creds.map((x) =>
    flow.dateLine(
      [{ text: x.name, font: "Times-Roman" }, { text: `, ${x.issuer}`, font: "Times-Italic", color: GREY }],
      x.year ? [{ text: x.year }] : [],
      body,
      body,
    ),
  );
  flow.place(...sectionHeading(flow, "Certifications & Training", heading), credBlocks[0]);
  credBlocks.slice(1).forEach((b) => flow.place(b));

  // ---- Competitions ----
  const comps = data.certifications.filter((x) => x.category === "competition");
  const compRuns: Run[] = [];
  comps.forEach((x, i) => {
    const bits = [x.year, x.note ? x.note.replace(/\.$/, "") : undefined].filter(Boolean).join(", ");
    compRuns.push({ text: `${x.name}${bits ? ` (${bits})` : ""}${i < comps.length - 1 ? "; " : "."}` });
  });
  flow.place(...sectionHeading(flow, "Competitions", heading), flow.text(compRuns, { ...body, size: 9.5, lineHeight: 1.22 }));

  // ---- Skills ----
  const skillLines = data.skills.map((tier) =>
    flow.text([{ text: `${tier.label}: `, font: "Times-Bold" }, { text: tier.items.join(", ") }], body),
  );
  flow.place(...sectionHeading(flow, "Skills", heading), ...skillLines);

  // ---- Languages ----
  flow.place(
    ...sectionHeading(flow, "Languages", heading),
    flow.text(profile.languages.map((l) => `${l.name} (${l.level})`).join(", "), body),
  );

  built.doc.end();
  return built;
}
