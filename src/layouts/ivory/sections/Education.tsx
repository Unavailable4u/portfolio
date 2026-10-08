import { education } from "../../../data/education";
import { honors } from "../../../data/honors";
import { languagesLine, linkProps } from "../content";

function Education() {
  return (
    <section className="edu" id="education">
      <div className="wrap edu-grid">
        <div className="rv">
          <span className="label">Education</span>
          <h3>
            Where I <em>study</em>
          </h3>
          <ul>
            {education.map((item) => (
              <li key={item.degree}>
                <b>{item.degree}</b>
                <span>
                  {item.institution} · {item.location}
                </span>
                <small>{item.dateRange}</small>
              </li>
            ))}
          </ul>
          <p className="certs">
            <b>Languages</b>
            {languagesLine}
          </p>
        </div>
        <div className="rv d1">
          <span className="label">Honors</span>
          <h3>
            Recognised <em>for</em>
          </h3>
          <ul>
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
                <small>{honor.year}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Education;
