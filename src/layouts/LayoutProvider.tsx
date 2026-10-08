import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LayoutContext } from "./layoutContext";
import type { LayoutState } from "./layoutContext";
import { defaultLayout, findLayout, layouts } from "./registry";
import type { LayoutDef } from "./registry";

const STORAGE_KEY = "portfolio:layout";
const URL_PARAM = "style";
const TOAST_MS = 1800;

/** URL first (so a shared link wins), then the visitor's last choice, then the default. */
function initialLayout(): LayoutDef {
  try {
    const fromUrl = findLayout(new URLSearchParams(window.location.search).get(URL_PARAM));
    if (fromUrl) return fromUrl;
    const stored = findLayout(window.localStorage.getItem(STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // Storage can be blocked (private mode, strict settings). Fall through to the default.
  }
  return defaultLayout;
}

/** Keeps the address bar shareable: `?style=ivory`, with no parameter for the default style. */
function syncUrl(layout: LayoutDef) {
  try {
    const url = new URL(window.location.href);
    if (layout.id === defaultLayout.id) url.searchParams.delete(URL_PARAM);
    else url.searchParams.set(URL_PARAM, layout.id);
    // Section ids differ between styles, so an old #hash would point nowhere.
    url.hash = "";
    window.history.replaceState(null, "", url);
    window.localStorage.setItem(STORAGE_KEY, layout.id);
  } catch {
    // Not critical. The switch still works for this visit.
  }
}

function setMeta(name: string, content: string) {
  document.querySelector(`meta[name="${name}"]`)?.setAttribute("content", content);
}

/** Holds the active portfolio style and exposes it through `useLayout()`. */
function LayoutProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<LayoutDef>(initialLayout);
  const [toast, setToast] = useState({ text: "", show: false });
  const timer = useRef<number | undefined>(undefined);

  const index = layouts.indexOf(current);
  const upcoming = layouts[(index + 1) % layouts.length];

  // Page-level styling that has to live outside the layout's own tree.
  useEffect(() => {
    document.documentElement.dataset.layout = current.id;
    setMeta("theme-color", current.themeColor);
    setMeta("color-scheme", current.colorScheme);
  }, [current]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const next = useCallback(() => {
    setCurrent(upcoming);
    syncUrl(upcoming);
    window.scrollTo({ top: 0, behavior: "instant" });
    setToast({ text: `${upcoming.name} · style ${layouts.indexOf(upcoming) + 1} of ${layouts.length}`, show: true });
    window.clearTimeout(timer.current);
    // Keep the text while it fades out, so the pill never shows empty.
    timer.current = window.setTimeout(() => setToast((t) => ({ ...t, show: false })), TOAST_MS);
  }, [upcoming]);

  const value = useMemo<LayoutState>(
    () => ({ current, upcoming, index, count: layouts.length, next }),
    [current, upcoming, index, next],
  );

  return (
    <LayoutContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-white/15 bg-neutral-900/90 px-4 py-2 text-xs text-white shadow-lg backdrop-blur transition-opacity duration-300 ${
          toast.show ? "opacity-100" : "opacity-0"
        }`}
      >
        {toast.text}
      </div>
    </LayoutContext.Provider>
  );
}

export default LayoutProvider;
