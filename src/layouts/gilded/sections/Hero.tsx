import { profile } from "../../../data/profile";
import Icon from "../Icon";
import { monogram, photos, year } from "../content";

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="topbar">
          <div className="mono-wrap">
            <div className="mono" aria-hidden="true">
              {monogram}
            </div>
            <div className="t">
              AI Systems Builder
              <br />
              &amp; Researcher
            </div>
          </div>
          <div className="yr">
            <i />
            <b>{year}</b>
          </div>
        </div>

        <div className="stage">
          <h1 aria-label={`Portfolio of ${profile.shortName}`}>
            <svg viewBox="0 0 1000 240" aria-hidden="true">
          <defs><linearGradient id="g-cream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0dfc0"/><stop offset=".6" stopColor="#e8d3b0"/><stop offset="1" stopColor="#cdb088"/></linearGradient></defs>
          <text x={0} y={236} fontSize={330} textLength={1000} lengthAdjust="spacingAndGlyphs">PORTFOLIO</text>
        </svg>
          </h1>
          <div className="cut">
            <img src={photos.cutout} alt={photos.cutoutAlt} width={442} height={813} fetchPriority="high" />
          </div>
          <div className="info">
            <div className="l">
              <div className="role">
                Creative
                <br />
                AI Engineer
              </div>
              <p className="bio">{profile.headline}</p>
              <span className="sig" aria-hidden="true">
                {profile.shortName}
              </span>
              <span className="signame">{profile.name}</span>
            </div>
            <div className="r">
              <p className="tag">
                Systems that think.
                <br />
                Code that holds.
              </p>
              <div className="based">
                <Icon name="pin" className="" />
                <span>
                  Based in {profile.location}
                  <br />
                  {profile.availability}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
