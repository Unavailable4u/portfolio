import { profile } from "../../../data/profile";
import { cvStyles } from "../../../lib/cv";
import Icon from "../Icon";
import { linkProps } from "../content";

function Cta() {
  const site = profile.siteUrl.replace(/^https?:\/\//, "");

  return (
    <section className="sec" id="contact" aria-labelledby="cta-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta rv">
          <svg className="streak" viewBox="0 0 700 300" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="g-st" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9a063" stopOpacity="0"/><stop offset=".55" stopColor="#e8d3b0" stopOpacity=".9"/><stop offset="1" stopColor="#c9a063" stopOpacity="0"/></linearGradient>
          <radialGradient id="g-glow"><stop offset="0" stopColor="#f0dfc0" stopOpacity=".9"/><stop offset=".25" stopColor="#c9a063" stopOpacity=".35"/><stop offset="1" stopColor="#c9a063" stopOpacity="0"/></radialGradient>
        </defs>
        <g fill="none" stroke="url(#g-st)" strokeLinecap="round">
          <path d="M-10 290 C150 270 330 230 520 130 C560 108 590 100 640 40" strokeWidth="1.6"/>
          <path d="M-10 270 C170 262 340 215 500 140 C545 118 585 98 650 60" strokeWidth=".8"/>
          <path d="M-10 296 C190 285 360 250 540 150 C580 125 610 110 660 80" strokeWidth=".6"/>
          <path d="M0 250 C140 255 330 200 470 150 C520 128 560 118 620 110" strokeWidth=".5"/>
        </g>
        <circle cx="395" cy="112" r="34" fill="url(#g-glow)"/>
        <path d="M395 90c1 12 8 20 20 21-12 1-19 8-20 20-1-12-8-19-20-20 12-1 19-9 20-21z" fill="#f4e6cb" opacity=".95"/>
      </svg>
          <h2 id="cta-h">
            Let's create <span>something exceptional</span>
          </h2>
          <div className="clist">
            <a href={`mailto:${profile.email}`}>
              <Icon name="mail" />
              {profile.email}
            </a>
            <span className="i">
              <Icon name="pin" className="" />
              {profile.location}
            </span>
            <a href={profile.siteUrl} {...linkProps(profile.siteUrl)}>
              <Icon name="globe" />
              {site}
            </a>
          </div>
          <div className="soc">
            <span className="label">Let's connect</span>
            <div>
              <a href={profile.github} {...linkProps(profile.github)} aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.500 11.500 0 0 0-3.640 22.420c.580.100.790-.250.790-.560v-2c-3.200.700-3.880-1.400-3.880-1.400-.520-1.340-1.280-1.700-1.280-1.700-1.040-.710.080-.700.080-.700 1.150.080 1.760 1.180 1.760 1.180 1.030 1.760 2.700 1.250 3.360.960.100-.750.400-1.250.730-1.540-2.550-.290-5.240-1.280-5.240-5.680 0-1.260.450-2.280 1.180-3.090-.120-.290-.510-1.460.110-3.040 0 0 .960-.310 3.150 1.180a10.900 10.900 0 0 1 5.740 0c2.190-1.490 3.150-1.180 3.150-1.180.620 1.580.230 2.750.110 3.040.740.810 1.180 1.830 1.180 3.090 0 4.410-2.690 5.380-5.250 5.660.410.360.780 1.050.780 2.130v3.160c0 .310.210.670.800.560A11.500 11.500 0 0 0 12 .5z"/></svg>
              </a>
              <a href={profile.linkedin} {...linkProps(profile.linkedin)} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.980 3.500a2.500 2.500 0 1 1 0 5 2.500 2.500 0 0 1 0-5zM3 9.500h4V21H3zM9.500 9.500h3.800v1.600h.1c.530-1 1.830-2 3.800-2 4 0 4.800 2.600 4.800 6V21h-4v-5.200c0-1.300 0-2.900-1.800-2.900s-2.100 1.400-2.100 2.800V21h-4z"/></svg>
              </a>
            </div>
          </div>
          <div className="cta-cv">
            <span className="label">Download my CV</span>
            {cvStyles.map((style) => (
              <a key={style.id} href={style.file} download>
                <div>
                  <b>{style.label}</b>
                  <span className="d">{style.description}</span>
                </div>
                <Icon name="download" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
