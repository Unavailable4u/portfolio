import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01{}[]<>/_=+";

/** Resolves `text` character by character from random glyphs. Runs once on mount. */
export function useScramble(text: string, durationMs = 1100, startDelayMs = 250): string {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduce) return;

    let frame = 0;
    let started = false;
    const t0 = performance.now() + startDelayMs;

    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - t0) / durationMs));
      if (now >= t0 || started) {
        started = true;
        const settled = Math.floor(progress * text.length);
        let next = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < settled || ch === " " || ch === ".") next += ch;
          else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOutput(progress >= 1 ? text : next);
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, durationMs, startDelayMs, reduce]);

  return output;
}
