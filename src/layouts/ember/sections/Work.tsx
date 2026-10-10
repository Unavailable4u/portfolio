import { experience } from "../../../data/experience";
import Icon from "../Icon";
import { buildCount } from "../content";

/** Three cards that jump to the main sections. */
function Work() {
  const cards = [
    {
      href: "#projects",
      icon: "layers",
      title: "Projects",
      text: `MiniMe, MedSophia, FocusOS and more: ${buildCount} builds from agents to ESP32 hardware.`,
      more: "Explore projects",
    },
    {
      href: "#research",
      icon: "flask",
      title: "Research",
      text: "RoLA-Net signal classification (under review) and the FBEBC code-evolution preprint.",
      more: "Read research",
    },
    {
      href: "#experience",
      icon: "brief",
      title: "Experience",
      text: `Three teams co-founded, an ML internship and community roles across ${experience.length} listed positions.`,
      more: "See experience",
    },
  ];

  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>
            Everything I <em>work on</em>
          </h2>
          <p>Agents, research and early-stage teams, built end to end.</p>
        </div>
        <div className="feat">
          {cards.map((card) => (
            <a key={card.title} className="card hover rv" href={card.href} style={{ display: "block" }}>
              <div style={{ padding: "30px 28px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
                <span className="ico">
                  <Icon name={card.icon} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className="more">
                  {card.more} <Icon name="arrow" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
