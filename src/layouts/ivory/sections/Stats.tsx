import Icon from "../Icon";
import { highlights } from "../content";

function Stats() {
  return (
    <section className="stats" aria-label="Highlights">
      <div className="wrap">
        <ul>
          {highlights.map((h, i) => (
            <li key={h.label} className={`rv${i > 0 ? ` d${i}` : ""}`}>
              <Icon name={h.icon} />
              <b>{h.value}</b>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Stats;
