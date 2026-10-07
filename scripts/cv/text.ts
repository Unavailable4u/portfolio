/**
 * PDFKit's built-in fonts (Times, Helvetica, Courier) only cover the WinAnsi
 * (Windows-1252) repertoire. sanitize() maps everything outside it to a safe
 * equivalent and is applied to every string that is measured or drawn.
 */

const WIN_ANSI_EXTRAS = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";

const REPLACEMENTS: Record<string, string> = {
  " ": " ", // no-break space (inside WinAnsi, but we normalise it for wrapping)
  " ": " ",
  " ": " ",
  " ": " ", // thin space
  " ": " ",
  " ": " ", // narrow no-break space
  " ": " ",
  "​": "", // zero-width space
  "‌": "",
  "‍": "",
  "﻿": "",
  "‐": "-", // hyphen
  "‑": "-", // non-breaking hyphen
  "‒": "-", // figure dash
  "−": "-", // minus sign
  "―": "—", // horizontal bar
  "→": "->",
  "←": "<-",
  "↔": "<->",
  "⇒": "=>",
  "≈": "~",
  "≠": "!=",
  "≤": "<=",
  "≥": ">=",
  "×": "x", // multiplication sign
  "∗": "*",
  "•": "•",
  "●": "•",
  "▪": "•",
  "‣": "•",
  "⁃": "-",
  "′": "'",
  "″": '"',
  "·": "·",
  "∙": "·",
  "⋅": "·",
  "✓": "v",
  "✔": "v",
};

const warnings = new Set<string>();

function isWinAnsi(ch: string): boolean {
  const c = ch.codePointAt(0) ?? 0;
  if (c === 0x0a) return true;
  if (c >= 0x20 && c <= 0x7e) return true;
  if (c >= 0xa0 && c <= 0xff) return true;
  return WIN_ANSI_EXTRAS.includes(ch);
}

export function sanitize(input: string): string {
  let out = "";
  for (const ch of input.normalize("NFC")) {
    if (ch === " ") {
      out += " ";
      continue;
    }
    const mapped = REPLACEMENTS[ch];
    if (mapped !== undefined) {
      out += mapped;
      continue;
    }
    if (isWinAnsi(ch)) {
      out += ch;
      continue;
    }
    if (ch === "\t" || ch === "\r") {
      out += " ";
      continue;
    }
    // Last resort: strip diacritics, otherwise drop to "?" and warn.
    const stripped = ch.normalize("NFKD").replace(/[̀-ͯ]/g, "");
    if (stripped && [...stripped].every(isWinAnsi)) {
      out += stripped;
    } else {
      out += "?";
      warnings.add(`U+${(ch.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")} (${ch})`);
    }
  }
  return out;
}

/** Characters that had no safe mapping and were replaced with "?". */
export function sanitizeWarnings(): string[] {
  return [...warnings];
}
