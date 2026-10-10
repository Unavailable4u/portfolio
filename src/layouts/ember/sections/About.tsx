import { building, upNext } from "../../../data/now";
import { education } from "../../../data/education";
import { honors } from "../../../data/honors";
import { profile } from "../../../data/profile";
import Icon from "../Icon";
import { linkProps } from "../content";

function About() {
  return (
    <section id="about" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="two">
          <div className="card rv">
            <h3>
              <Icon name="cap" />
              Education
            </h3>
            <ul className="edu">
              {education.map((item) => (
                <li key={item.degree}>
                  <b>{item.degree}</b>
                  <span>{item.institution}</span>
                  <span className="yr">{item.dateRange.toUpperCase()}</span>
                </li>
              ))}
            </ul>
            <p className="lang">
              <b>Languages:</b> {profile.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}
            </p>
          </div>
          <div className="card rv">
            <h3>
              <Icon name="trophy" />
              Honors
            </h3>
            <ul className="hon">
              {honors.map((honor) => (
                <li key={honor.name}>
                  <b>
                    {honor.url ? (
                      <a href={honor.url} {...linkProps(honor.url)}>
                        {honor.name}
                      </a>
                    ) : (
                      honor.name
                    )}
                  </b>
                  <span className="yr">{honor.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="nownext">
          <div className="card rv">
            <h3>
              <span className="d" />
              Now
            </h3>
            <ul>
              {building.map((item) => (
                <li key={item.title}>
                  {item.title}: {item.detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="card rv">
            <h3>Up next</h3>
            <ul>
              {upNext.map((item) => (
                <li key={item.title}>
                  {item.title}: {item.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
