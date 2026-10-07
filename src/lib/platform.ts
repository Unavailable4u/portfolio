/** True on Apple platforms, used to show the right shortcut hint. */
export const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.userAgent);

export const shortcutLabel = isMac ? "⌘K" : "Ctrl K";
