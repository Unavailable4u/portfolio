import Icon from "../Icon";
import { doCards } from "../content";

function WhatIDo() {
  return (
    <section className="row r-do rv" aria-labelledby="h-do">
      <div className="cell">
        <h2 className="h2" id="h-do">
          What I do
        </h2>
      </div>
      <div className="cell">
        <ul className="do">
          {doCards.map((card) => (
            <li key={card.title} className="card">
              <Icon name={card.icon} className="ic" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WhatIDo;
