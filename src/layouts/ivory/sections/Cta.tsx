import { Fragment } from "react";
import { profile } from "../../../data/profile";
import { cvStyles } from "../../../lib/cv";

function Cta() {
  return (
    <section className="cta-band" id="contact">
      <svg
        className="vein"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M1440 20 C1330 70 1290 150 1210 190 S1050 240 1010 320 S900 420 780 520" stroke="#e0a07a" strokeWidth="1.4" />
        <path d="M1210 190 C1250 230 1230 300 1290 350 S1390 400 1440 380" stroke="#e0a07a" strokeWidth=".8" />
        <path d="M1010 320 C960 300 930 330 880 310" stroke="#f5f0e6" strokeWidth=".6" />
        <path d="M1440 120 C1380 160 1350 200 1300 210" stroke="#f5f0e6" strokeWidth=".6" />
        <path d="M0 440 C90 400 150 430 230 380 S340 300 420 330" stroke="#f5f0e6" strokeWidth=".7" />
        <path d="M230 380 C260 430 230 480 280 520" stroke="#e0a07a" strokeWidth=".7" />
      </svg>
      <div className="wrap">
        <div className="cta-in">
          <div className="rv">
            <h2>
              Let's build something <em>exceptional</em> together.
            </h2>
            <p>{profile.availability}.</p>
          </div>
          <div className="cta-act rv d1">
            <a className="btn solid" href={`mailto:${profile.email}`}>
              Say hello{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <small>{profile.email}</small>
            <small>
              Download CV:{" "}
              {cvStyles.map((style, i) => (
                <Fragment key={style.id}>
                  {i > 0 && " · "}
                  <a href={style.file} download>
                    {style.label}
                  </a>
                </Fragment>
              ))}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
