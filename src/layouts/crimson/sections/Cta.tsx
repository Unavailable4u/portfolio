import { profile } from "../../../data/profile";
import { cvStyles } from "../../../lib/cv";
import Icon from "../Icon";
import { displayUrl, linkProps, qrCodes } from "../content";

function Cta() {
  const contacts = [
    { icon: "mail", label: profile.email, href: `mailto:${profile.email}` },
    { icon: "pin", label: profile.location },
    { icon: "gh", label: displayUrl(profile.github), href: profile.github },
    { icon: "in", label: displayUrl(profile.linkedin), href: profile.linkedin },
    { icon: "globe", label: displayUrl(profile.siteUrl), href: profile.siteUrl },
  ];

  return (
    <section className="row r-cta" id="contact" aria-labelledby="h-cta">
      <div className="cell">
        <h2 className="cta-t" id="h-cta">
          Let's
          <br />
          <span>collaborate</span>
        </h2>
        <p className="cta-s">
          Open to internships and entry-level roles in AI, machine learning and software engineering. Have a project in
          mind? Say hello.
        </p>
        <ul className="contact">
          {contacts.map((item) => (
            <li key={item.icon}>
              <span className="ic">
                <Icon name={item.icon} />
              </span>
              {item.href ? (
                <a href={item.href} {...linkProps(item.href)}>
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="cell">
        <h3 className="lab" style={{ color: "var(--red-hi)", marginBottom: 16 }}>
          Scan to connect
        </h3>
        <div className="qrs">
          <a className="qr" href={profile.linkedin} {...linkProps(profile.linkedin)}>
            <div className="tile">
              <img src={qrCodes.linkedin.src} alt={qrCodes.linkedin.alt} width={200} height={200} loading="lazy" />
            </div>
            <span>LinkedIn</span>
          </a>
          <a className="qr" href={profile.github} {...linkProps(profile.github)}>
            <div className="tile">
              <img src={qrCodes.github.src} alt={qrCodes.github.alt} width={200} height={200} loading="lazy" />
            </div>
            <span>GitHub</span>
          </a>
        </div>
        <div className="cta-cv">
          <span className="lab">Download my CV</span>
          {cvStyles.map((style) => (
            <a key={style.id} href={style.file} download>
              <div>
                <b>{style.label}</b>
                <span className="d">{style.description}</span>
              </div>
              <Icon name="download" />
            </a>
          ))}
        </div>
      </div>

      <div className="cell slogan">
        <Icon name="star" className="star" />
        <p>
          Designing systems.
          <br />
          <em>Building intelligence.</em>
        </p>
      </div>
    </section>
  );
}

export default Cta;
