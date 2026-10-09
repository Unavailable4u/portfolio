import Icon from "../Icon";
import { focusAreas, recognition, tools } from "../content";

/** Three narrow columns: what I focus on, the tools I use, and recognition. */
function Band() {
  return (
    <div className="wrap">
      <div className="band">
        <section id="focus" aria-labelledby="focus-h" className="rv">
          <h2 id="focus-h">
            Focus <Icon name="spark" className="spark" />
          </h2>
          <ul className="focus">
            {focusAreas.map((area) => (
              <li key={area.title}>
                <span className="fi">
                  <Icon name={area.icon} />
                </span>
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tools-h" className="rv">
          <h2 id="tools-h">Tools I use</h2>
          <div className="tools">
            {tools.map((tool) => (
              <div key={tool.name} className="tool">
                <i aria-hidden="true">{tool.mark}</i>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="recognition" aria-labelledby="rec-h" className="rv">
          <h2 id="rec-h">
            Recognition <Icon name="spark" className="spark" />
          </h2>
          <ul className="recog">
            {recognition.map((item) => (
              <li key={item.title}>
                <span className="rico">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Band;
