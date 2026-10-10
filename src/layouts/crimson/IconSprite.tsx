/** One hidden SVG holding every icon the layout uses. Render it once, near the top. */
function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="c-agents" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2.6"/><circle cx="4.5" cy="5" r="1.8"/><circle cx="19.5" cy="5" r="1.8"/><circle cx="4.5" cy="19" r="1.8"/><circle cx="19.5" cy="19" r="1.8"/><path d="M6 6.2l4.2 4M18 6.2l-4.2 4M6 17.8l4.2-4M18 17.8l-4.2-4"/>
        </symbol>
        <symbol id="c-api" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 7h.01M7 17h.01M12 7h6M12 17h6"/>
        </symbol>
        <symbol id="c-ml" viewBox="0 0 24 24">
          <path d="M3 12h3l2-6 4 12 3-9 2 3h4"/><path d="M3 21h18"/>
        </symbol>
        <symbol id="c-chip" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="1"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>
        </symbol>
        <symbol id="c-team" viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.3"/><path d="M16.5 14.2c2.8 0 5 2.1 5 4.8"/>
        </symbol>
        <symbol id="c-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6.5L12 13l8.5-6.5"/>
        </symbol>
        <symbol id="c-pin" viewBox="0 0 24 24">
          <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>
        </symbol>
        <symbol id="c-gh" viewBox="0 0 24 24">
          <path d="M9 19c-4 1.200-4-2-6-2.500M15 21v-3.200c0-1 .1-1.500-.5-2.300 2.800-.3 5.500-1.400 5.500-6a4.700 4.700 0 0 0-1.300-3.300 4.400 4.400 0 0 0-.1-3.300s-1-.3-3.400 1.300a11.600 11.600 0 0 0-6.200 0C6.600 2.800 5.600 3.100 5.600 3.100a4.400 4.400 0 0 0-.1 3.300A4.700 4.700 0 0 0 4.200 9.700c0 4.600 2.700 5.700 5.500 6-.6.700-.6 1.400-.5 2.300V21"/>
        </symbol>
        <symbol id="c-in" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4.500a2.500 2.500 0 0 1 5 0V17M12 10v7"/>
        </symbol>
        <symbol id="c-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
        </symbol>
        <symbol id="c-paper" viewBox="0 0 24 24">
          <path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>
        </symbol>
        <symbol id="c-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </symbol>
        <symbol id="c-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16"/>
        </symbol>
        <symbol id="c-x" viewBox="0 0 24 24">
          <path d="M5 5l14 14M19 5L5 19"/>
        </symbol>
        <symbol id="c-star" viewBox="0 0 24 24">
          <path d="M12 0c.8 6.800 5.200 11.200 12 12-6.800.8-11.200 5.200-12 12-.8-6.800-5.200-11.200-12-12C6.800 11.200 11.200 6.800 12 0z" fill="currentColor" stroke="none"/>
        </symbol>
        <symbol id="c-quote" viewBox="0 0 24 24">
          <path d="M3 21v-7.500C3 8 6 4.500 10.500 3.800l.5 2C8.600 6.800 7.400 8.300 7.200 10.500H11V21zM13 21v-7.500C13 8 16 4.500 20.500 3.800l.5 2c-2.400 1-3.600 2.500-3.800 4.700H21V21z" fill="currentColor" stroke="none"/>
        </symbol>
        <symbol id="c-download" viewBox="0 0 24 24">
          <path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>
        </symbol>
        <symbol id="c-chevron" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"/>
        </symbol>
      </defs>
    </svg>
  );
}

export default IconSprite;
