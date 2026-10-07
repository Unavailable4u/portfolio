/**
 * Small layout kit on top of PDFKit shared by the three CV templates.
 *
 * Everything is built from "blocks": a block knows its height up front and how
 * to draw itself at (x, y). A Flow places blocks top to bottom inside a column
 * and starts a new page when a group of blocks would not fit, which is how
 * headings stay with their first bullet and nothing ever overflows.
 */
import PDFDocument from "pdfkit";
import { sanitize } from "./text.ts";

export type PDF = PDFKit.PDFDocument;

export interface Run {
  text: string;
  font?: string;
  size?: number;
  color?: string;
  link?: string;
  /** Extra letter spacing in points. */
  spacing?: number;
  underline?: boolean;
}

export interface TextStyle {
  font: string;
  size: number;
  color: string;
  /** Line height as a multiple of the font size. Default 1.3. */
  lineHeight?: number;
  spacing?: number;
  align?: "left" | "center" | "right";
}

interface Piece {
  text: string;
  font: string;
  size: number;
  color: string;
  link?: string;
  spacing: number;
  underline: boolean;
  width: number;
}

interface Word {
  pieces: Piece[];
  width: number;
  /** Width of the gap that follows this word when more words follow on the line. */
  gap: number;
  /** Visible separator drawn in the gap (for " | " style contact lines). */
  sep?: Piece;
}

interface Line {
  words: Word[];
  width: number;
}

export interface Block {
  h: number;
  /** Spacers are dropped at the top of a page. */
  spacer?: boolean;
  draw(x: number, y: number): void;
}

export const A4 = { width: 595.28, height: 841.89 };

// --------------------------------------------------------------------------
// Document + pages

export interface Meta {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export class Pager {
  count = 0;
  readonly doc: PDF;
  private readonly onPage: (page: number) => void;

  constructor(doc: PDF, onPage: (page: number) => void = () => {}) {
    this.doc = doc;
    this.onPage = onPage;
  }

  add(): void {
    this.doc.addPage();
    this.count += 1;
    this.onPage(this.count);
  }
}

export interface Built {
  doc: PDF;
  pager: Pager;
  done: Promise<Buffer>;
}

export function createDocument(meta: Meta, onPage?: (page: number) => void): Built {
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    autoFirstPage: false,
    lang: "en-US",
    displayTitle: true,
    info: {
      Title: sanitize(meta.title),
      Author: sanitize(meta.author),
      Subject: sanitize(meta.subject),
      Keywords: sanitize(meta.keywords),
      Creator: "portfolio generate-cv (PDFKit)",
      Producer: "PDFKit",
    },
  });
  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  return { doc, pager: new Pager(doc, onPage), done };
}

// --------------------------------------------------------------------------
// Text measurement and wrapping

function pieceFrom(doc: PDF, run: Run, text: string, base: TextStyle): Piece {
  const font = run.font ?? base.font;
  const size = run.size ?? base.size;
  const spacing = run.spacing ?? base.spacing ?? 0;
  doc.font(font).fontSize(size);
  return {
    text,
    font,
    size,
    color: run.color ?? base.color,
    link: run.link,
    spacing,
    underline: run.underline ?? false,
    width: doc.widthOfString(text, { characterSpacing: spacing }),
  };
}

/** Break runs into words. Adjacent runs with no whitespace between them stay in one word. */
function toWords(doc: PDF, runs: Run[], base: TextStyle): Word[] {
  const words: Word[] = [];
  let cur: Piece[] = [];
  let lastSpace = 0;

  const finish = (gap: number) => {
    if (cur.length === 0) return;
    words.push({ pieces: cur, width: cur.reduce((n, p) => n + p.width, 0), gap });
    cur = [];
  };

  for (const run of runs) {
    const parts = sanitize(run.text).split(/(\s+)/);
    for (const part of parts) {
      if (part === "") continue;
      if (/^\s+$/.test(part)) {
        const sp = pieceFrom(doc, run, " ", base);
        lastSpace = sp.width;
        if (cur.length > 0) finish(sp.width);
        else if (words.length > 0) words[words.length - 1].gap = sp.width;
      } else {
        cur.push(pieceFrom(doc, run, part, base));
      }
    }
  }
  finish(lastSpace);
  return words;
}

function breakLines(words: Word[], width: number): Line[] {
  const lines: Line[] = [];
  let cur: Word[] = [];
  let curW = 0;
  for (const word of words) {
    const gapBefore = cur.length > 0 ? cur[cur.length - 1].sep?.width ?? cur[cur.length - 1].gap : 0;
    if (cur.length > 0 && curW + gapBefore + word.width > width + 0.01) {
      lines.push({ words: cur, width: curW });
      cur = [word];
      curW = word.width;
    } else {
      curW += gapBefore + word.width;
      cur.push(word);
    }
  }
  if (cur.length > 0) lines.push({ words: cur, width: curW });
  return lines;
}

function drawLine(doc: PDF, line: Line, x: number, y: number, lineH: number, width: number, align: string): void {
  let cx = x;
  if (align === "center") cx = x + (width - line.width) / 2;
  else if (align === "right") cx = x + width - line.width;

  line.words.forEach((word, i) => {
    for (const p of word.pieces) {
      drawPiece(doc, p, cx, y, lineH);
      cx += p.width;
    }
    if (i < line.words.length - 1) {
      if (word.sep) {
        drawPiece(doc, word.sep, cx, y, lineH);
        cx += word.sep.width;
      } else {
        cx += word.gap;
      }
    }
  });
}

function drawPiece(doc: PDF, p: Piece, x: number, y: number, lineH: number): void {
  const dy = Math.max(0, (lineH - p.size * 1.15) / 2);
  doc.font(p.font).fontSize(p.size).fillColor(p.color);
  doc.text(p.text, x, y + dy, { lineBreak: false, characterSpacing: p.spacing });
  if (p.underline || p.link) {
    if (p.underline) {
      const uy = y + dy + p.size * 1.02;
      doc.save().lineWidth(Math.max(0.4, p.size * 0.05)).strokeColor(p.color).moveTo(x, uy).lineTo(x + p.width, uy).stroke().restore();
    }
    if (p.link) doc.link(x, y + dy, p.width, p.size * 1.15, p.link);
  }
}

// --------------------------------------------------------------------------
// Flow: a column that places blocks and paginates

export interface FlowOptions {
  doc: PDF;
  pager: Pager;
  x: number;
  width: number;
  top: number;
  bottom: number;
  /** Throw instead of adding a page (for the fixed sidebar). */
  noBreak?: string;
}

export class Flow {
  readonly doc: PDF;
  readonly pager: Pager;
  readonly x: number;
  readonly width: number;
  readonly top: number;
  readonly bottom: number;
  y: number;
  private readonly noBreak?: string;

  constructor(o: FlowOptions) {
    this.doc = o.doc;
    this.pager = o.pager;
    this.x = o.x;
    this.width = o.width;
    this.top = o.top;
    this.bottom = o.bottom;
    this.y = o.top;
    this.noBreak = o.noBreak;
  }

  newPage(): void {
    if (this.noBreak) throw new Error(`${this.noBreak} does not fit on one page`);
    this.pager.add();
    this.y = this.top;
  }

  private held: Block[] = [];

  /** Hold a heading back so it is placed together with whatever is placed next (no orphaned headings). */
  hold(...blocks: Block[]): void {
    this.held.push(...blocks);
  }

  /** Place blocks as one unit: if they do not all fit, start a new page first. */
  place(...blocks: Block[]): void {
    if (this.held.length > 0) {
      blocks = [...this.held, ...blocks];
      this.held = [];
    }
    const total = blocks.reduce((n, b) => n + b.h, 0);
    if (total > this.bottom - this.top + 0.01) {
      throw new Error(`Block group of ${total.toFixed(1)}pt is taller than a page`);
    }
    if (this.y + total > this.bottom + 0.01) this.newPage();
    for (const b of blocks) {
      if (b.spacer && this.y === this.top) continue;
      b.draw(this.x, this.y);
      this.y += b.h;
    }
  }

  /** Keep `keep` together (e.g. heading + first bullet), then place the rest one by one. */
  placeKeep(keep: Block[], rest: Block[] = []): void {
    this.place(...keep);
    for (const b of rest) this.place(b);
  }

  // ---- block builders (all sized to this flow's width) ----

  spacer(h: number): Block {
    return { h, spacer: true, draw: () => {} };
  }

  /** Wrapped paragraph. `inset` shrinks the text box from the left. */
  text(content: string | Run[], style: TextStyle, opts: { inset?: number; width?: number } = {}): Block {
    const runs = typeof content === "string" ? [{ text: content }] : content;
    const width = (opts.width ?? this.width) - (opts.inset ?? 0);
    const lines = breakLines(toWords(this.doc, runs, style), width);
    const lineH = style.size * (style.lineHeight ?? 1.3);
    const align = style.align ?? "left";
    const inset = opts.inset ?? 0;
    return {
      h: lines.length * lineH,
      draw: (x, y) => {
        lines.forEach((l, i) => drawLine(this.doc, l, x + inset, y + i * lineH, lineH, width, align));
      },
    };
  }

  /**
   * Items joined by a visible separator (e.g. " | "), wrapping only between
   * items. Used for contact lines.
   */
  items(items: Run[][], sep: Run, style: TextStyle): Block {
    const words: Word[] = items.map((runs, i) => {
      const pieces = runs.map((r) => pieceFrom(this.doc, r, sanitize(r.text), style));
      const word: Word = { pieces, width: pieces.reduce((n, p) => n + p.width, 0), gap: 0 };
      if (i < items.length - 1) word.sep = pieceFrom(this.doc, sep, sanitize(sep.text), style);
      return word;
    });
    const lines = breakLines(words, this.width);
    const lineH = style.size * (style.lineHeight ?? 1.3);
    const align = style.align ?? "left";
    return {
      h: lines.length * lineH,
      draw: (x, y) => {
        lines.forEach((l, i) => drawLine(this.doc, l, x, y + i * lineH, lineH, this.width, align));
      },
    };
  }

  /** Hanging bullet: the glyph sits in the gutter and wrapped lines align with the first. */
  bullet(content: string | Run[], style: TextStyle, opts: { indent?: number; glyph?: string; glyphColor?: string; glyphFont?: string; left?: number } = {}): Block {
    const indent = opts.indent ?? 11;
    const left = opts.left ?? 0;
    const body = this.text(content, style, { inset: indent + left });
    const glyph = opts.glyph ?? "•";
    return {
      h: body.h,
      draw: (x, y) => {
        const lineH = style.size * (style.lineHeight ?? 1.3);
        const g = pieceFrom(
          this.doc,
          { text: glyph, color: opts.glyphColor, font: opts.glyphFont },
          sanitize(glyph),
          style,
        );
        drawPiece(this.doc, g, x + left, y, lineH);
        body.draw(x, y);
      },
    };
  }

  /** Left text (wrapping) with a right-aligned run on the first line. */
  dateLine(left: Run[], right: Run[], leftStyle: TextStyle, rightStyle: TextStyle = leftStyle, gutter = 10): Block {
    const rightWords = toWords(this.doc, right, rightStyle);
    const rightW = rightWords.length ? breakLines(rightWords, 1e6)[0].width : 0;
    const l = this.text(left, leftStyle, { width: this.width - (rightW ? rightW + gutter : 0) });
    const r = rightW ? this.text(right, { ...rightStyle, align: "right" }, { width: rightW + 0.5 }) : null;
    return {
      h: Math.max(l.h, r?.h ?? 0),
      draw: (x, y) => {
        l.draw(x, y);
        // Right block is exactly as wide as its text, so it hugs the right edge.
        r?.draw(x + this.width - rightW - 0.5, y);
      },
    };
  }

  /** Horizontal rule across the column with padding above and below. */
  rule(color: string, thickness: number, before = 0, after = 0): Block {
    return {
      h: before + thickness + after,
      draw: (x, y) => {
        this.doc
          .save()
          .lineWidth(thickness)
          .strokeColor(color)
          .moveTo(x, y + before + thickness / 2)
          .lineTo(x + this.width, y + before + thickness / 2)
          .stroke()
          .restore();
      },
    };
  }
}

// --------------------------------------------------------------------------
// Helpers shared by templates

export interface HeadingStyle {
  font: string;
  size: number;
  color: string;
  spacing?: number;
  uppercase?: boolean;
  before: number;
  gap: number;
  after: number;
  rule?: { color: string; thickness: number };
}

/** Section heading as blocks: spacer, label, optional full-width rule, spacer. Keep with the next block. */
export function sectionHeading(flow: Flow, label: string, s: HeadingStyle): Block[] {
  const text = s.uppercase ? label.toUpperCase() : label;
  const blocks: Block[] = [
    flow.spacer(s.before),
    flow.text(text, { font: s.font, size: s.size, color: s.color, spacing: s.spacing, lineHeight: 1.15 }),
  ];
  if (s.rule) blocks.push(flow.rule(s.rule.color, s.rule.thickness, s.gap, s.after));
  else blocks.push(flow.spacer(s.gap + s.after));
  return blocks;
}

export function link(text: string, url: string, extra: Omit<Run, "text" | "link"> = {}): Run {
  return { text, link: url, ...extra };
}
