import Icon from "../Icon";
import { recognition } from "../content";

function Recognition() {
  return (
    <section id="recognition" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <h2>
            Recognition &amp; <em>credentials</em>
          </h2>
        </div>
        <div className="rec">
          {recognition.map((item) => (
            <article key={item.title} className="card hover rv">
              <Icon name="quote" className="q fill" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="meta">{item.meta}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recognition;
