const cards = [
  {
    title: "Aspire Leaders finalist",
    text: "Completed the Aspire Leaders Program, Cohort 4, as one of 9,362 finalists chosen from 45,228 students.",
    by: "Aspire Institute",
    sub: "Cohort 4 · 2025",
  },
  {
    title: "Olympiad regional winner",
    text: "Regional round winner in the Bangladesh Mathematical Olympiad (2021) and the Bangladesh Junior Science Olympiad (2020 and 2021).",
    by: "BdMO · BdJSO",
    sub: "2020–2021",
  },
  {
    title: "Technovation Girls mentor",
    text: "Mentored teams in Technovation Girls, contributing at least 37 hours of guidance.",
    by: "Technovation Girls",
    sub: "Mentor · 2025",
  },
];

function Recognition() {
  return (
    <section className="recog" id="recognition">
      <div className="wrap">
        <div className="shead rv">
          <span className="label center">Recognition</span>
          <h2>
            Honors &amp; <em>service</em>
          </h2>
        </div>
        <div className="cards3">
          {cards.map((card, i) => (
            <article key={card.title} className={`q rv${i > 0 ? ` d${i}` : ""}`}>
              <span className="mark" aria-hidden="true">
                “
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <div className="by">
                {card.by}
                <small>{card.sub}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recognition;
