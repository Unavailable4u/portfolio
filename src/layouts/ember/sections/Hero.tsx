import { education } from "../../../data/education";
import { experience } from "../../../data/experience";
import { profile } from "../../../data/profile";
import Icon from "../Icon";
import { linkProps, photo, shortRole } from "../content";

function Hero() {
  const current = experience[0];
  const degree = education[0];

  return (
    <section className="hero" id="home" style={{ paddingBottom: 0 }}>
      <div className="beam" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-copy">
          <span className="pill">
            <span className="d" />
            AI Systems • Research • Hardware
          </span>
          <h1>
            <span>Build Smarter.</span>
            <span>Ship Research.</span>
            <span>Launch Faster.</span>
          </h1>
          <p className="lead">
            I'm <strong>{profile.shortName}</strong>, an Electronics &amp; Telecommunication Engineering student at RUET
            who builds AI systems end to end, from <strong>MiniMe</strong>, a multi-agent workspace with 70+ specialist
            agents, to research on governing LLM-driven code evolution and a co-authored signal-classification paper
            that is under review.
          </p>
          <div className="btns">
            <a className="btn primary" href="#projects">
              View Projects <Icon name="arrow" />
            </a>
            <a className="btn ghost" href="#contact">
              Contact Me
            </a>
          </div>
        </div>

        <div className="stage">
          <div className="halo" aria-hidden="true" />
          <img
            className="cut"
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            fetchPriority="high"
          />
          <aside className="profile" aria-label="Profile">
            <div className="lab">Profile</div>
            <div className="nm">{profile.name}</div>
            <ul>
              <li>
                <Icon name="brief" />
                {shortRole(current.role)}, {current.org}
              </li>
              <li>
                <Icon name="cap" />
                ETE @ RUET, {degree.dateRange.replace(" – ", "–")}
              </li>
              <li>
                <Icon name="pin" />
                {profile.location}
              </li>
            </ul>
            <div className="soc">
              <a className="ibtn" href={profile.github} {...linkProps(profile.github)} aria-label="GitHub profile">
                <Icon name="github" />
              </a>
              <a className="ibtn" href={profile.linkedin} {...linkProps(profile.linkedin)} aria-label="LinkedIn profile">
                <Icon name="linkedin" />
              </a>
              <a className="ibtn" href={`mailto:${profile.email}`} aria-label="Email Sayad">
                <Icon name="mail" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Hero;
