import { research } from "../../../data/research";
import { profile } from "../../../data/profile";
import {
  linkProps,
  ongoingBlurb,
  ongoingResearch,
  ongoingTitle,
  photos,
  researchStatusLabel,
  shortLabel,
  tools,
  traits,
} from "../content";

/** The first sentence on its own, everything after it as a second paragraph. */
function aboutParagraphs(text: string): string[] {
  const match = /^(.+?[.!?])\s+(.+)$/s.exec(text.trim());
  return match ? [match[1], match[2]] : [text];
}

function About() {
  const paragraphs = aboutParagraphs(profile.summary);

  return (
    <div className="row r-at">
      <section className="cell rv" id="about" aria-labelledby="h-about">
        <h2 className="h2" id="h-about">
          About me
        </h2>
        <div className="about">
          <div className="port">
            <img src={photos.portrait} alt={photos.portraitAlt} width={825} height={1100} loading="lazy" decoding="async" />
          </div>
          <div>
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <ul className="traits">
              {traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cell rv" aria-labelledby="h-tools">
        <h2 className="h2" id="h-tools">
          Tools I use
        </h2>
        <ul className="tools">
          {tools.map((tool) => (
            <li key={tool.name} className="tool">
              <b>{tool.mark}</b>
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>

        {research.map((paper) => {
          const mail = paper.links?.find((l) => l.kind === "mail");
          const coAuthors = paper.authors.filter((author) => author !== paper.highlightAuthor);
          return (
            <div key={paper.id} className="paper">
              <span className="st">
                <i className="dot" aria-hidden="true" />
                {researchStatusLabel[paper.status]}
              </span>
              <h3>{paper.title}</h3>
              <div className="pm">
                {paper.stats.map((stat) => (
                  <span key={stat.label}>
                    <b>{stat.value}</b> {shortLabel(stat.label)}
                  </span>
                ))}
              </div>
              <p>Co-authored with {coAuthors.join(" and ")}, Dept. of ETE, RUET.</p>
              {mail && (
                <div className="links">
                  <a href={mail.url} {...linkProps(mail.url)}>
                    Request manuscript
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {ongoingResearch.map((item) => {
          const repo = item.links?.[0];
          return (
            <div key={item.id} className="paper">
              <span className="st">
                <i className="dot" aria-hidden="true" />
                Ongoing research · {researchStatusLabel["preprint-draft"]}
              </span>
              <h3>{ongoingTitle(item)}</h3>
              <p>{ongoingBlurb(item)}</p>
              {repo && (
                <div className="links">
                  <a href={repo.url} {...linkProps(repo.url)}>
                    View repository
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default About;
