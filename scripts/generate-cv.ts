/**
 * Build-time CV generator. Reads the site's data files (src/data/*.ts) and
 * writes three PDFs into public/cv/. Run via `npm run cv`; it also runs before
 * `dev` and `build`, so the CVs can never drift from the website.
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { buildClassic } from "./cv/classic.ts";
import { buildModern } from "./cv/modern.ts";
import { buildAcademic } from "./cv/academic.ts";
import { cv } from "./cv/data.ts";
import { sanitizeWarnings } from "./cv/text.ts";
import type { Built } from "./cv/kit.ts";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "cv");

const MAX_PAGES = 2;

const outputs: Array<{ file: string; build: () => Built }> = [
  { file: "Sayad_CV_Classic.pdf", build: () => buildClassic(cv) },
  { file: "Sayad_CV_Modern.pdf", build: () => buildModern(cv) },
  { file: "Sayad_CV_Academic.pdf", build: () => buildAcademic(cv) },
];

async function main(): Promise<void> {
  await mkdir(outDir, { recursive: true });
  for (const { file, build } of outputs) {
    const built = build();
    const buffer = await built.done;
    const pages = built.pager.count;
    if (pages > MAX_PAGES) throw new Error(`${file} is ${pages} pages (max ${MAX_PAGES})`);
    if (buffer.length < 2000) throw new Error(`${file} is suspiciously small (${buffer.length} bytes)`);
    const target = path.join(outDir, file);
    await writeFile(target, buffer);
    const { size } = await stat(target);
    console.log(`public/cv/${file}  ${pages} page${pages === 1 ? "" : "s"}  ${(size / 1024).toFixed(1)} KB`);
  }
  const bad = sanitizeWarnings();
  if (bad.length > 0) console.warn(`warning: replaced unsupported characters with "?": ${bad.join(", ")}`);
}

main().catch((err: unknown) => {
  console.error("CV generation failed:", err instanceof Error ? (err.stack ?? err.message) : err);
  process.exitCode = 1;
});
