import { profile } from "../../../data/profile";
import Icon from "../Icon";
import { aboutParagraphs, facts, photos } from "../content";

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <figure className="frame rv" style={{ margin: 0 }}>
          <div className="ph">
            <img src={photos.bus} alt={photos.busAlt} width={1200} height={900} loading="lazy" decoding="async" />
          </div>
          <figcaption>{profile.location}</figcaption>
        </figure>
        <div className="rv d1">
          <span className="label">About me</span>
          <h2>
            Engineering is more than code, it's <em>rigour.</em>
          </h2>
          {aboutParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <a className="btn" href="#experience">
            More about me{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <ul className="facts rv d2">
          {facts.map((fact) => (
            <li key={fact.label}>
              <Icon name={fact.icon} />
              <div>
                <small>{fact.label}</small>
                <span>{fact.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;
