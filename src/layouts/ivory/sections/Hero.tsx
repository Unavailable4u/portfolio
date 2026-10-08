import { profile } from "../../../data/profile";
import { photos } from "../content";

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <span className="label">AI Systems Builder</span>
        <p className="full">{profile.name}</p>
        <h1>
          <span>Shuaib</span>
          <span>{profile.shortName}</span>
        </h1>
        <p className="sub">
          Building AI systems that <em>hold up</em> — from multi-agent software to signal research.
        </p>
        <p className="lead">
          I'm an ETE student at RUET who builds end to end: a 70+ agent workspace, a governed code-evolution framework,
          and a lightweight radio-signal classifier now under peer review.
        </p>
        <div className="actions">
          <a className="btn" href="#work">
            View my work{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a className="tlink" href="#research">
            Read the research
          </a>
        </div>
        <div className="sig" aria-hidden="true">
          Shuaib {profile.shortName}
        </div>
      </div>
      <div className="hero-media">
        <img src={photos.portrait} alt={photos.portraitAlt} width={825} height={1100} fetchPriority="high" />
        <div className="hero-frame" aria-hidden="true" />
        <div className="hero-tag">
          <b>{profile.shortName}</b>
          ETE · RUET
          <br />
          {profile.location}
        </div>
      </div>
    </section>
  );
}

export default Hero;
