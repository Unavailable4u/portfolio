import { building, upNext } from "../../../data/now";
import { profile } from "../../../data/profile";
import { linkProps } from "../content";

function Now() {
  return (
    <section className="now" id="now">
      <div className="wrap now-grid">
        <div className="rv">
          <span className="label">Currently</span>
          <h3>
            Still <em>building</em>
          </h3>
          <ul>
            {building.map((item) => (
              <li key={item.title}>
                <b>{item.title}</b>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rv d1">
          <span className="label">Coming up</span>
          <h3>
            Up <em>next</em>
          </h3>
          <ul>
            {upNext.map((item) => (
              <li key={item.title}>
                <b>{item.title}</b>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
          <p className="certs">
            <a className="tlink" href={profile.github} {...linkProps(profile.github)}>
              Follow the commits on GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Now;
