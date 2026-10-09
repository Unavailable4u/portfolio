import { research } from "../../../data/research";
import Icon from "../Icon";
import { linkProps, ongoingBlurb, ongoingResearch, ongoingTitle, researchStatusLabel, splitTitle } from "../content";

function Research() {
  return (
    <section className="sec" id="research" aria-labelledby="res-h" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <h2 id="res-h">
            Research <Icon name="spark" className="spark" />
          </h2>
          <span className="rule" />
        </div>

        {research.map((paper) => {
          const title = splitTitle(paper.title);
          const mail = paper.links?.find((l) => l.kind === "mail");
          const coAuthors = paper.authors.filter((author) => author !== paper.highlightAuthor);
          return (
            <article key={paper.id} className="rc rv">
              <div className="main">
                <span className="status">{researchStatusLabel[paper.status]}</span>
                <h3>
                  {title.lead}
                  {title.em && <em>{title.em}</em>}
                  {title.tail}
                </h3>
                <p className="muted" style={{ fontSize: 12, letterSpacing: ".06em" }}>
                  With {coAuthors.join(" and ")} · Dept. of ETE, RUET
                </p>
                <p style={{ marginTop: 14 }}>{paper.summary}</p>
                <div className="kw">
                  {paper.keywords.map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
                {mail && (
                  <div className="links" style={{ border: 0, padding: 0 }}>
                    <a href={mail.url} {...linkProps(mail.url)}>
                      Request manuscript
                    </a>
                  </div>
                )}
              </div>
              <div className="side">
                {paper.stats.map((stat) => (
                  <div key={stat.label}>
                    <b>{stat.value}</b>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}

        {ongoingResearch.map((item) => {
          const repo = item.links?.[0];
          return (
            <article key={item.id} className="ongoing rv">
              <div>
                <span className="status">Ongoing research · {researchStatusLabel["preprint-draft"]}</span>
                <h3>{ongoingTitle(item)}</h3>
                <p>{ongoingBlurb(item)}</p>
              </div>
              {repo && (
                <div className="links">
                  <a href={repo.url} {...linkProps(repo.url)}>
                    View repository
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
