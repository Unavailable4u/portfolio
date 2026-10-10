import { profile } from "../../../data/profile";
import { cvStyles } from "../../../lib/cv";
import Icon from "../Icon";

function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="cta-bar rv">
          <span className="ico" aria-hidden="true">
            <Icon name="mail" />
          </span>
          <div className="txt">
            <h2>Open to internships &amp; entry-level roles</h2>
            <p>AI, machine learning and software engineering. Based in {profile.location}.</p>
            <div className="cvrow">
              <span className="lab">Download my CV</span>
              {cvStyles.map((style) => (
                <a key={style.id} className="btn ghost sm" href={style.file} download>
                  <Icon name="download" />
                  {style.label}
                </a>
              ))}
            </div>
          </div>
          <div className="act">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              <Icon name="mail" />
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
