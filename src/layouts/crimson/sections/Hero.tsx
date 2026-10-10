import { profile } from "../../../data/profile";
import Icon from "../Icon";
import { heroIntro, heroQuote, heroStack, heroSubs, photos } from "../content";

function Hero() {
  // "S. M. Shuaib Islam Sayad" is set on two lines: "S. M. Shuaib" / "Islam Sayad".
  const words = profile.name.split(" ");
  const first = words.slice(0, 3).join(" ");
  const second = words.slice(3).join(" ");

  return (
    <section className="hero" aria-label="Introduction">
      <div className="stage">
        <div className="circle" aria-hidden="true" />
        <div className="word" aria-hidden="true">
          {profile.shortName.toUpperCase()}
        </div>
        <div className="cut">
          <img src={photos.cutout} alt={photos.cutoutAlt} width={471} height={829} fetchPriority="high" />
        </div>
        <div className="badge" aria-hidden="true">
          <svg className="badge-ring" viewBox="0 0 120 120">
            <defs>
              <path id="c-circ" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
            </defs>
            <text>
              <textPath href="#c-circ" startOffset="0">
                AI SYSTEMS BUILDER • RESEARCH •
              </textPath>
            </text>
          </svg>
          <Icon name="star" className="star" />
        </div>
        <div className="cut-fade" />
      </div>

      <div className="hinfo">
        <div className="hl">
          <div>
            <div className="stack" aria-label="AI, Systems, Research">
              {heroStack.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <p className="hsub">
              {heroSubs.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div>
            <div className="hrule" aria-hidden="true" />
            <blockquote className="quote">
              <Icon name="quote" />
              <p>{heroQuote}</p>
            </blockquote>
          </div>
        </div>
        <div className="cspace" aria-hidden="true" />
        <div className="hr">
          <h1 className="name">
            {first}
            <br />
            {second}
          </h1>
          <p className="role">{profile.title}</p>
          <p className="intro">{heroIntro(profile.location)}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
