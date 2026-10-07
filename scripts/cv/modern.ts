/**
 * Modern: two columns echoing the website. A dark sidebar carries identity,
 * contact, languages, skills and honors; the main column carries the summary,
 * experience, projects and education. Accent #4CC9C0 on rules and labels.
 */
import { A4, Flow, createDocument, link, sectionHeading, type Block, type Built, type HeadingStyle, type Run, type TextStyle } from "./kit.ts";
import { sanitize } from "./text.ts";
import { contactDetails, githubLinks, metaKeywords, project, statusLabel, displayUrl, type CvData } from "./data.ts";

const ACCENT = "#4CC9C0";
/** Accent darkened for text on white so labels stay legible in print. */
const ACCENT_INK = "#0F7F79";
const SIDEBAR_BG = "#0A0D12";
const SIDEBAR_TEXT = "#E6EDF3";
const SIDEBAR_MUTED = "#9AA7B4";
const INK = "#1B2027";
const BODY = "#2E343C";
const MUTED = "#4A545E";

const SIDEBAR_W = 178;
const SIDEBAR_PAD = 18;
const MAIN_X = SIDEBAR_W + 26;
const MAIN_RIGHT = 34;
const TOP = 36;
const BOTTOM = 34;

const PROJECT_IDS = ["minime", "fbebc", "medsophia", "focusos", "spherex-blink"];
const PROJECT_BULLETS: Record<string, number> = { minime: 3, fbebc: 3, medsophia: 2, focusos: 1, "spherex-blink": 1 };
const MAX_EXPERIENCE_BULLETS = 3;

const sans = (size: number, color = BODY): TextStyle => ({ font: "Helvetica", size, color, lineHeight: 1.38 });

const mainHeading: HeadingStyle = {
  font: "Courier-Bold",
  size: 8.5,
  color: ACCENT_INK,
  spacing: 1.6,
  uppercase: true,
  before: 12,
  gap: 3,
  after: 6,
  rule: { color: ACCENT, thickness: 1 },
};

export function buildModern(data: CvData): Built {
  const { profile } = data;
  const built = createDocument(
    {
      title: `${profile.name} - Curriculum Vitae`,
      author: profile.name,
      subject: `${profile.title}. Curriculum vitae (modern).`,
      keywords: metaKeywords,
    },
    (page) => {
      // Every page gets the dark sidebar band so continuation pages stay consistent.
      const { doc } = built;
      doc.save().rect(0, 0, SIDEBAR_W, A4.height).fill(SIDEBAR_BG).restore();
      if (page > 1) {
        // Running header on continuation pages.
        doc.font("Helvetica-Bold").fontSize(11).fillColor("#FFFFFF");
        doc.text(sanitize(profile.name), SIDEBAR_PAD, TOP, { lineBreak: false });
        doc.font("Courier-Bold").fontSize(7).fillColor(ACCENT);
        doc.text("CURRICULUM VITAE", SIDEBAR_PAD, TOP + 16, { lineBreak: false, characterSpacing: 1.2 });
      }
    },
  );
  built.pager.add();

  // ---------------- Sidebar ----------------
  const side = new Flow({
    doc: built.doc,
    pager: built.pager,
    x: SIDEBAR_PAD,
    width: SIDEBAR_W - 2 * SIDEBAR_PAD,
    top: TOP,
    bottom: A4.height - BOTTOM,
    noBreak: "Sidebar",
  });
  const label = (t: string): Block[] => [
    side.spacer(13),
    side.text(t.toUpperCase(), { font: "Courier-Bold", size: 7.5, color: ACCENT, spacing: 1.4, lineHeight: 1.2 }),
    side.rule(ACCENT, 0.6, 2, 5),
  ];
  const sideText = sans(8.4, SIDEBAR_TEXT);
  const c = contactDetails(profile);

  const contactRow = (name: string, value: Run): Block[] => [
    side.text(name.toUpperCase(), { font: "Courier-Bold", size: 6.6, color: SIDEBAR_MUTED, spacing: 1.2, lineHeight: 1.2 }),
    side.text([value], { ...sideText, lineHeight: 1.3 }),
    side.spacer(4.5),
  ];

  side.place(
    side.text(profile.name, { font: "Helvetica-Bold", size: 18, color: "#FFFFFF", lineHeight: 1.18 }),
    side.spacer(7),
    side.text(profile.headline, { ...sans(8.6, SIDEBAR_TEXT), lineHeight: 1.4 }),
    side.spacer(5),
    side.text(profile.availability, { font: "Courier-Bold", size: 7, color: ACCENT, lineHeight: 1.35 }),
  );
  side.place(
    ...label("Contact"),
    ...contactRow("Location", { text: c.location }),
    ...(c.phone ? contactRow("Phone", { text: c.phone }) : []),
    ...contactRow("Email", link(c.email.text, c.email.url)),
    ...contactRow("LinkedIn", link(c.linkedin.text, c.linkedin.url)),
    ...contactRow("GitHub", link(c.github.text, c.github.url)),
    ...contactRow("Web", link(c.site.text, c.site.url)),
  );
  side.place(
    ...label("Languages"),
    ...profile.languages.flatMap((l) => [
      side.text([{ text: l.name, font: "Helvetica-Bold" }, { text: `  ${l.level}`, color: SIDEBAR_MUTED }], sideText),
    ]),
  );
  for (const tier of data.skills) {
    side.place(
      ...label(tier.label),
      side.items(
        tier.items.map((it) => [{ text: it }]),
        { text: "  ·  ", color: ACCENT, font: "Helvetica-Bold" },
        { ...sideText, lineHeight: 1.5 },
      ),
    );
  }
  side.place(
    ...label("Honors"),
    ...data.honors.flatMap((h) => [
      side.text(h.name, { ...sideText, lineHeight: 1.32 }),
      side.text(h.year, { font: "Courier-Bold", size: 7, color: ACCENT, lineHeight: 1.4 }),
      side.spacer(5),
    ]),
  );

  // ---------------- Main column ----------------
  const main = new Flow({
    doc: built.doc,
    pager: built.pager,
    x: MAIN_X,
    width: A4.width - MAIN_X - MAIN_RIGHT,
    top: TOP,
    bottom: A4.height - BOTTOM,
  });
  const body = sans(8.8);
  const meta: TextStyle = { font: "Helvetica", size: 8, color: MUTED, lineHeight: 1.35 };
  const mono: TextStyle = { font: "Courier", size: 7.6, color: MUTED, lineHeight: 1.35 };
  const itemTitle: TextStyle = { font: "Helvetica-Bold", size: 10, color: INK, lineHeight: 1.3 };

  main.place(
    main.text("Summary".toUpperCase(), { font: "Courier-Bold", size: 8.5, color: ACCENT_INK, spacing: 1.6, lineHeight: 1.15 }),
    main.rule(ACCENT, 1, 3, 6),
    main.text(profile.summary, { ...body, size: 9.2, lineHeight: 1.45 }),
  );

  // Experience
  main.hold(...sectionHeading(main, "Experience", mainHeading));
  data.experience.forEach((e, i) => {
    const n = Math.min(MAX_EXPERIENCE_BULLETS, e.bullets.length);
    const bullets = e.bullets.slice(0, n).map((b) => main.bullet(b, body, { glyph: "–", glyphColor: ACCENT_INK, glyphFont: "Helvetica-Bold" }));
    const org: Run[] = [
      e.orgUrl ? link(e.org, e.orgUrl, { font: "Helvetica-Bold", color: BODY }) : { text: e.org, font: "Helvetica-Bold", color: BODY },
      { text: `  ·  ${e.location}` },
    ];
    main.placeKeep(
      [
        ...(i > 0 ? [main.spacer(8)] : []),
        main.text(e.role, itemTitle),
        main.dateLine(org, [{ text: e.dateRange }], meta, mono),
        main.spacer(2.5),
        bullets[0],
      ],
      bullets.slice(1),
    );
  });

  // Projects
  main.hold(...sectionHeading(main, "Projects", mainHeading));
  PROJECT_IDS.forEach((id, i) => {
    const p = project(id);
    const n = PROJECT_BULLETS[id] ?? 1;
    const bullets = p.bullets.slice(0, n).map((b) => main.bullet(b, body, { glyph: "–", glyphColor: ACCENT_INK, glyphFont: "Helvetica-Bold" }));
    const status = statusLabel(p.status);
    const gh = githubLinks(p);
    const linkItems: Run[][] = gh.map((l) => [link(displayUrl(l.url), l.url, { font: "Courier", size: 7.6, color: ACCENT_INK })]);
    const stats = p.stats?.length
      ? [
          main.spacer(1),
          main.text(
            p.stats.map((s) => `${s.value} ${s.label}`).join("  /  ").toUpperCase(),
            { font: "Courier-Bold", size: 6.8, color: ACCENT_INK, spacing: 0.4, lineHeight: 1.4 },
          ),
        ]
      : [];
    main.placeKeep(
      [
        ...(i > 0 ? [main.spacer(8)] : []),
        main.dateLine(
          [{ text: p.title, font: "Helvetica-Bold", color: INK }],
          status ? [{ text: status.toUpperCase(), spacing: 0.8 }] : [],
          itemTitle,
          { ...mono, size: 6.8, font: "Courier-Bold" },
        ),
        main.text(p.stack, meta),
        ...stats,
        main.spacer(2.5),
        bullets[0],
      ],
      [
        ...bullets.slice(1),
        ...(p.note ? [main.spacer(1), main.text(p.note, { ...meta, font: "Helvetica-Oblique" })] : []),
        ...(linkItems.length ? [main.spacer(2), main.items(linkItems, { text: "   ", font: "Courier", size: 7.6 }, mono)] : []),
      ],
    );
  });

  // Education
  main.hold(...sectionHeading(main, "Education", mainHeading));
  data.education.forEach((e, i) => {
    main.place(
      ...(i > 0 ? [main.spacer(7)] : []),
      main.text(e.degree, itemTitle),
      main.dateLine([{ text: `${e.institution}  ·  ${e.location}` }], [{ text: e.dateRange }], meta, mono),
    );
  });

  built.doc.end();
  return built;
}
