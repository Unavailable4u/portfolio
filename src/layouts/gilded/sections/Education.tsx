import { education } from "../../../data/education";
import { honors } from "../../../data/honors";
import Icon from "../Icon";
import { linkProps } from "../content";

function Education() {
  return (
    <section className="sec" id="education" aria-labelledby="ed-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <h2 id="ed-h">
            Education &amp; Honors <Icon name="spark" className="spark" />
          </h2>
          <span className="rule" />
        </div>
        <div className="eh">
          <div className="rv">
            <h3 className="s">Education</h3>
            {education.map((item) => (
              <div key={item.degree} className="row">
                <div>
                  <h4>{item.degree}</h4>
                  <p>{item.institution}</p>
                </div>
                <time>{item.dateRange}</time>
              </div>
            ))}
          </div>
          <div className="rv">
            <h3 className="s">Honors</h3>
            {honors.map((honor) => (
              <div key={honor.name} className="row">
                <div>
                  <h4>
                    {honor.url ? (
                      <a href={honor.url} {...linkProps(honor.url)}>
                        {honor.name}
                      </a>
                    ) : (
                      honor.name
                    )}
                  </h4>
                </div>
                <time>{honor.year}</time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
