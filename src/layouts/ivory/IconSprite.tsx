/** One hidden SVG holding every icon the layout uses. Render it once, near the top. */
function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </symbol>
        <symbol id="i-cap" viewBox="0 0 24 24">
          <path d="M2 9l10-5 10 5-10 5z" />
          <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
          <path d="M22 9v6" />
        </symbol>
        <symbol id="i-team" viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="9" r="2.3" />
          <path d="M16.5 14.2c2.7.2 4.5 2.4 4.5 5.3" />
        </symbol>
        <symbol id="i-send" viewBox="0 0 24 24">
          <path d="M21 3L3 10.5l7 3 3 7z" />
          <path d="M10 13.5L21 3" />
        </symbol>
        <symbol id="i-agents" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2.6" />
          <circle cx="4.5" cy="5.5" r="1.8" />
          <circle cx="19.5" cy="5.5" r="1.8" />
          <circle cx="4.5" cy="18.5" r="1.8" />
          <circle cx="19.5" cy="18.5" r="1.8" />
          <path d="M5.8 6.8l4.4 3.6M18.2 6.8l-4.4 3.6M5.8 17.2l4.4-3.6M18.2 17.2l-4.4-3.6" />
        </symbol>
        <symbol id="i-api" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="6" rx="1" />
          <rect x="3" y="14" width="18" height="6" rx="1" />
          <path d="M7 7h.01M7 17h.01M12 10v4" />
        </symbol>
        <symbol id="i-wave" viewBox="0 0 24 24">
          <path d="M2 12c2-6 3.5-6 5 0s3 6 5 0 3.5-6 5 0 2 4 3 3" />
          <path d="M2 20h20M2 4v16" />
        </symbol>
        <symbol id="i-chip" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <rect x="9.5" y="9.5" width="5" height="5" />
          <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
        </symbol>
        <symbol id="i-layers" viewBox="0 0 24 24">
          <path d="M12 3l9 5-9 5-9-5z" />
          <path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
          <path d="M8 12.5l3 3 5-6" />
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </symbol>
        <symbol id="i-download" viewBox="0 0 24 24">
          <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M4.5 19.5h15" />
        </symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3.5 7l8.5 6 8.5-6" />
        </symbol>
      </defs>
    </svg>
  );
}

export default IconSprite;
