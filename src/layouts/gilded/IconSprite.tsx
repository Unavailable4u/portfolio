/** One hidden SVG holding every icon the layout uses. Render it once, near the top. */
function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="g-spark" viewBox="0 0 24 24">
          <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11 6.4-.6 10.4-4.6 11-11z" fill="currentColor" stroke="none"/>
        </symbol>
        <symbol id="g-agents" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M12 7.4v4.2M12 11.6l-5.4 4.3M12 11.6l5.4 4.3M7.4 18h9.2"/>
        </symbol>
        <symbol id="g-api" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01M12 10v4"/>
        </symbol>
        <symbol id="g-signal" viewBox="0 0 24 24">
          <path d="M2 12h3l2.5-7 4 14 3-10 2 3h5.5"/>
        </symbol>
        <symbol id="g-chip" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>
        </symbol>
        <symbol id="g-heart" viewBox="0 0 24 24">
          <path d="M12 20.5C5 15.5 3 12 3 8.8A4.8 4.8 0 0 1 12 6.5a4.8 4.8 0 0 1 9 2.3c0 3.200-2 6.700-9 11.700z"/><path d="M7 12h3l1.500-2.500 2 4.500 1.200-2H17"/>
        </symbol>
        <symbol id="g-team" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3"/><circle cx="4.500" cy="10" r="2"/><circle cx="19.500" cy="10" r="2"/><path d="M6.500 20c0-3.300 2.500-5.500 5.500-5.500s5.500 2.200 5.500 5.500M1.500 17c.3-2 1.500-3.200 3-3.500M22.500 17c-.3-2-1.500-3.200-3-3.500"/>
        </symbol>
        <symbol id="g-laurel" viewBox="0 0 32 32">
          <path d="M16 28C8 26 4 19 5 9M16 28c8-2 12-9 11-19"/><path d="M6 21c-2-1-3-3-3-5 2 0 4 1 4 3M5 15c-2-1-2-3-2-5 2 0 3 1 3.500 3M6 9c-1.500-1-1.500-3-1-4.500 1.800.5 3 2 3 3.500M26 21c2-1 3-3 3-5-2 0-4 1-4 3M27 15c2-1 2-3 2-5-2 0-3 1-3.500 3M26 9c1.500-1 1.500-3 1-4.500-1.800.5-3 2-3 3.500"/><path d="M16 9l1.500 3.200 3.500.4-2.600 2.400.7 3.500L16 16.700 12.900 18.500l.7-3.500L11 12.600l3.500-.4z"/>
        </symbol>
        <symbol id="g-star" viewBox="0 0 32 32">
          <path d="M16 4l3.500 8 8.500.8-6.400 5.700 1.900 8.500L16 22.500 8.500 27l1.900-8.500L4 12.800 12.500 12z"/>
        </symbol>
        <symbol id="g-paper" viewBox="0 0 32 32">
          <path d="M8 3h11l6 6v20H8z"/><path d="M19 3v6h6M12 15h9M12 19h9M12 23h5"/>
        </symbol>
        <symbol id="g-pin" viewBox="0 0 24 24">
          <path d="M12 22s7-6.200 7-12a7 7 0 0 0-14 0c0 5.800 7 12 7 12z" fill="none" stroke="currentColor" strokeWidth="1.300"/><circle cx="12" cy="10" r="2.400" fill="none" stroke="currentColor" strokeWidth="1.300"/>
        </symbol>
        <symbol id="g-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.500 7l8.500 6 8.500-6"/>
        </symbol>
        <symbol id="g-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
        </symbol>
        <symbol id="g-download" viewBox="0 0 24 24">
          <path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>
        </symbol>
        <symbol id="g-chevron" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"/>
        </symbol>
      </defs>
    </svg>
  );
}

export default IconSprite;
