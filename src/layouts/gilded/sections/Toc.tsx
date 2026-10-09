import { tocLinks, pad2 } from "../content";
import Icon from "../Icon";

function Toc() {
  return (
    <section className="wrap" aria-labelledby="toc-h" style={{ paddingTop: "clamp(8px,2vw,24px)" }}>
      <div className="toc rv">
        <div className="intro">
          <h2 id="toc-h">
            Table of
            <br />
            Contents
          </h2>
          <p>
            <Icon name="spark" className="spark" />
            <span>Projects, research, skills and the story behind them, in six short stops.</span>
          </p>
        </div>
        <nav aria-label="Table of contents">
          <ul style={{ display: "contents" }}>
            {tocLinks.map((link, i) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>
                  <b>{pad2(i + 1)}</b>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <svg className="leaf" viewBox="0 0 330 170" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="g-lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9a7840" stopOpacity=".95"/><stop offset=".5" stopColor="#4a3b24"/><stop offset="1" stopColor="#14110c"/></linearGradient>
        <linearGradient id="g-lf2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9a063" stopOpacity=".9"/><stop offset="1" stopColor="#1a150d"/></linearGradient>
        <linearGradient id="g-fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0c0b09"/><stop offset=".4" stopColor="#0c0b09" stopOpacity="0"/></linearGradient>
      </defs>
      <path d="M330 -10 C250 20 170 70 150 190 C240 170 320 110 330 -10Z" fill="url(#g-lf)"/>
      <path d="M330 -10 C270 40 215 90 180 190" fill="none" stroke="#c9a063" strokeWidth=".8" opacity=".8"/>
      <path d="M330 30 C290 70 270 130 255 190 C310 160 335 110 330 30Z" fill="url(#g-lf2)" opacity=".85"/>
      <path d="M330 30 C305 80 285 130 270 190" fill="none" stroke="#e8d3b0" strokeWidth=".7" opacity=".7"/>
      <path d="M232 -10 C200 40 160 60 118 70 C130 30 170 0 232 -10Z" fill="url(#g-lf)" opacity=".7"/>
      <path d="M232 -10 C195 25 160 50 120 68" fill="none" stroke="#c9a063" strokeWidth=".7" opacity=".7"/>
      <rect width="330" height="170" fill="url(#g-fade)"/>
    </svg>
      </div>
    </section>
  );
}

export default Toc;
