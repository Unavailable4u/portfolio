import { research } from "../../../data/research";
import Icon from "../Icon";
import { linkProps, ongoingBlurb, ongoingResearch, ongoingTitle, researchStatusLabel } from "../content";

function Research() {
  return (
    <section id="research" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow">Research</span>
          <h2>
            Papers and <em>ongoing research</em>
          </h2>
        </div>

        {research.map((paper) => {
          const mail = paper.links?.find((l) => l.kind === "mail");
          const coAuthors = paper.authors.filter((author) => author !== paper.highlightAuthor);
          return (
            <article key={paper.id} className="card research rv">
              <div className="l">
                <span className="status review">{researchStatusLabel[paper.status]}</span>
                <h3>{paper.title}</h3>
                <p className="authors">Co-authored with {coAuthors.join(" and ")} · Dept. of ETE, RUET</p>
                <p className="sum">{paper.summary}</p>
                <div className="tags" style={{ margin: "18px 0 26px" }}>
                  {paper.keywords.map((keyword) => (
                    <span key={keyword} className="tag">
                      {keyword}
                    </span>
                  ))}
                </div>
                {mail && (
                  <a className="btn primary" href={mail.url} {...linkProps(mail.url)}>
                    Request manuscript <Icon name="arrow" />
                  </a>
                )}
              </div>
              <div className="r">
                <div className="mstats">
                  {paper.stats.map((stat) => (
                    <div key={stat.label} className="mstat">
                      <b>{stat.value}</b>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}

        {ongoingResearch.map((item) => {
          const repo = item.links?.[0];
          return (
            <article key={item.id} className="card ongoing rv">
              <div>
                <span className="status review">Ongoing research · {researchStatusLabel["preprint-draft"]}</span>
                <h3>{ongoingTitle(item)}</h3>
                <p>{ongoingBlurb(item)}</p>
              </div>
              {repo && (
                <a className="btn ghost" href={repo.url} {...linkProps(repo.url)}>
                  <Icon name="github" />
                  View repository
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
