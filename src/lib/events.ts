/** Dispatched on `window` with a project id as `detail` to open that project's modal. */
export const OPEN_PROJECT_EVENT = "portfolio:open-project";

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: id }));
}
