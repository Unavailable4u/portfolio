import { upNext } from "../../../data/now";
import { profile } from "../../../data/profile";
import { photos } from "../content";

function About() {
  const [city, ...rest] = profile.location.split(",").map((part) => part.trim());

  return (
    <section className="sec" id="about" aria-labelledby="about-h">
      <div className="wrap">
        <div className="about">
          <div className="duo rv">
            <div>
              <img src={photos.portrait} alt={photos.portraitAlt} width={825} height={1100} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="rv">
            <span className="label">01 · About me</span>
            <h2 className="big" id="about-h">
              Building AI systems, <em>end to end.</em>
            </h2>
            <p>{profile.summary}</p>
            <div className="langs">
              {profile.languages.map((language) => (
                <div key={language.name}>
                  <b>{language.name}</b>
                  <span>{language.level}</span>
                </div>
              ))}
              <div>
                <b>{city}</b>
                <span>{rest.join(", ")}</span>
              </div>
            </div>
            <div className="nowup">
              <div>
                <h3>Now</h3>
                <p>{profile.now}</p>
              </div>
              <div>
                <h3>Up next</h3>
                <ul>
                  {upNext.map((item) => (
                    <li key={item.title}>{item.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
