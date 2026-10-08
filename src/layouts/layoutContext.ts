import { createContext, useContext } from "react";
import type { LayoutDef } from "./registry";

export interface LayoutState {
  /** The style currently on screen. */
  current: LayoutDef;
  /** The style the switcher will show next. */
  upcoming: LayoutDef;
  /** Position of `current` in the registry, starting at 0. */
  index: number;
  count: number;
  /** Moves to the next style, wrapping around at the end. */
  next: () => void;
}

export const LayoutContext = createContext<LayoutState | null>(null);

export function useLayout(): LayoutState {
  const value = useContext(LayoutContext);
  if (!value) throw new Error("useLayout must be used inside <LayoutProvider>.");
  return value;
}
