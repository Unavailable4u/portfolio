import { Fragment } from "react";
import { research } from "../../../data/research";
import { blurbOf, linkProps, ongoingResearch, researchStatusLabel, sentences, titleOf } from "../content";

function Research() {
  return (
    <section className="research" id="research">
      <div className="wrap">
        <div className="shead rv">
          <span className="label center">Research</span>
          <h2>
            Papers and <em>ongoing</em> research
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

        {ongoingResearch.map((item) => {
          const repo = item.links?.[0];
          return (
            <article key={item.id} className="ongoing rv">
              <div>
                <span className="og-label">Ongoing research · {researchStatusLabel["preprint-draft"]}</span>
                <h4>{titleOf(item)}</h4>
                <p>{blurbOf(item)}</p>
              </div>
              {repo && (
                <a className="btn sm" href={repo.url} {...linkProps(repo.url)}>
                  View repository{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Research;
