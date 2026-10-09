import { lazy } from "react";
import type { ComponentType } from "react";
import MidnightLayout from "./midnight/MidnightLayout";

export interface LayoutDef {
  /** Used in the `?style=` URL parameter and for persistence. Keep it short and lowercase. */
  id: string;
  /** Shown in the switcher tooltip and the toast. */
  name: string;
  /** Page background. Also used for the mobile browser bar and while the layout loads. */
  themeColor: string;
  /** Tells the browser how to draw scrollbars and form controls. */
  colorScheme: "dark" | "light";
  Component: ComponentType;
}

/**
 * Every portfolio style lives here. The switcher cycles through this list in order.
 *
 * To add a style:
 *   1. Create src/layouts/<name>/<Name>Layout.tsx with a default-exported component.
 *      Render <LayoutSwitcher /> somewhere in its header so visitors can move on.
 *   2. Add an entry below. Use `lazy(() => import(...))` so its code and CSS only load when it is shown.
 *
 * All styles read the same content from src/data/, so they never drift apart.
 */
export const layouts: LayoutDef[] = [
  {
    id: "midnight",
    name: "Midnight",
    themeColor: "#0A0D12",
    colorScheme: "dark",
    Component: MidnightLayout,
  },
  {
    id: "ivory",
    name: "Ivory",
    themeColor: "#f5f0e6",
    colorScheme: "light",
    Component: lazy(() => import("./ivory/IvoryLayout")),
  },
  {
    id: "gilded",
    name: "Gilded",
    themeColor: "#0a0908",
    colorScheme: "dark",
    Component: lazy(() => import("./gilded/GildedLayout")),
  },
];

export const defaultLayout = layouts[0];

export function findLayout(id: string | null | undefined): LayoutDef | undefined {
  return layouts.find((l) => l.id === id);
}
