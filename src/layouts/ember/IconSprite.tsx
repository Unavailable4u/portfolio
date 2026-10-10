/** One hidden SVG holding every icon the layout uses. Render it once, near the top. */
function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="e-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </symbol>
        <symbol id="e-ext" viewBox="0 0 24 24">
          <path d="M7 17 17 7M8 7h9v9"/>
        </symbol>
        <symbol id="e-check" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 9.5"/>
        </symbol>
        <symbol id="e-layers" viewBox="0 0 24 24">
          <path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>
        </symbol>
        <symbol id="e-flask" viewBox="0 0 24 24">
          <path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/>
        </symbol>
        <symbol id="e-brief" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>
        </symbol>
        <symbol id="e-github" viewBox="0 0 24 24">
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21"/>
        </symbol>
        <symbol id="e-linkedin" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
        </symbol>
        <symbol id="e-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>
        </symbol>
        <symbol id="e-pin" viewBox="0 0 24 24">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.500C19 14.800 12 21 12 21Z"/><circle cx="12" cy="9.500" r="2.500"/>
        </symbol>
        <symbol id="e-cap" viewBox="0 0 24 24">
          <path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500M22 9v6"/>
        </symbol>
        <symbol id="e-trophy" viewBox="0 0 24 24">
          <path d="M8 4h8v6a4 4 0 0 1-8 0V4ZM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4"/>
        </symbol>
        <symbol id="e-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16"/>
        </symbol>
        <symbol id="e-close" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6 6 18"/>
        </symbol>
        <symbol id="e-quote" viewBox="0 0 32 32">
          <path fill="currentColor" stroke="none" d="M6 20.500C6 14 9.200 9.800 14.500 8l1 2.200C12.700 11.400 11.200 13.400 11 16h4.500v10H6v-5.500Zm12 0C18 14 21.200 9.800 26.500 8l1 2.200c-2.800 1.200-4.300 3.200-4.500 5.800h4.500v10H18v-5.500Z"/>
        </symbol>
        <symbol id="e-download" viewBox="0 0 24 24">
          <path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>
        </symbol>
        <symbol id="e-chevron" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"/>
        </symbol>
      </defs>
    </svg>
  );
}

export default IconSprite;
