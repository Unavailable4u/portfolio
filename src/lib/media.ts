export type VideoSource = { kind: "youtube"; src: string } | { kind: "file"; src: string };

/** Turns a YouTube link or a file path into something the modal can embed. */
export function parseVideo(url: string): VideoSource {
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname === "youtu.be") id = u.pathname.slice(1);
    else if (u.hostname.endsWith("youtube.com")) {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2] ?? null;
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] ?? null;
    }
    if (id) return { kind: "youtube", src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` };
  } catch {
    // Not an absolute URL, so treat it as a local file path.
  }
  return { kind: "file", src: url };
}
