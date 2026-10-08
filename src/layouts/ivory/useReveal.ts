import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Fades `.rv` elements in as they scroll into view. The hidden state only applies once the `js`
 * class is added here, so without JavaScript or IntersectionObserver everything stays visible.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;

    el.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    el.querySelectorAll(".rv").forEach((node) => io.observe(node));

    return () => {
      io.disconnect();
      el.classList.remove("js");
    };
  }, [root]);
}
