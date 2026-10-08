import { Fragment } from "react";
import { research } from "../../../data/research";
import { linkProps, researchStatusLabel, sentences } from "../content";

const findingLabels = ["Limitation.", "Limitation.", "Scope."];

function Research() {
  return (
    <section className="research" id="research">
      <div className="wrap">
        <div className="shead rv">
          <span className="label center">Research</span>
          <h2>
            Published thinking, <em>honestly</em> reported
          </h2>
        </div>

        {research.map((paper) => {
          const mail = paper.links?.find((l) => l.kind === "mail");
          return (
            <article key={paper.id} className="paper rv">
              <div className="paper-meta">
                <span>Dept. of ETE, RUET</span>
                <span className="st">Status: {researchStatusLabel[paper.status]}</span>
              </div>
              <h3>{paper.title}</h3>
              <p className="authors">
                {paper.authors.map((author, i) => (
                  <Fragment key={author}>
                    {i > 0 && ", "}
                    {author === paper.highlightAuthor ? <strong>{author}</strong> : author}
                  </Fragment>
                ))}
              </p>
              <p className="aff">{paper.affiliation}</p>

              <div className="rgrid">
                <div className="abstract">
                  <h4>Abstract</h4>
                  {sentences(paper.summary).map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                  <div className="kw">
                    {paper.keywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </div>
                  <h4 style={{ marginTop: 30 }}>Contributions</h4>
                  <ul className="lim" style={{ marginTop: 0 }}>
                    {paper.contributions.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Key results</h4>
                  <ul className="res">
                    {paper.stats.map((stat) => (
                      <li key={stat.label}>
                        <b>{stat.value}</b>
                        {stat.label}
                      </li>
                    ))}
                  </ul>
                  <ul className="lim" aria-label="Limitations">
                    {paper.honestFindings.map((text, i) => (
                      <li key={text}>
                        <strong>{findingLabels[i] ?? "Limitation."}</strong> {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {mail && (
                <div className="paper-foot">
                  <p>Manuscript available on request while under review.</p>
                  <a className="btn sm" href={mail.url} {...linkProps(mail.url)}>
                    Request manuscript{" "}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Research;
