import Icon from "../Icon";

const services = [
  {
    icon: "agents",
    title: "Multi-agent systems",
    text: "Tiered orchestration, shared memory and multi-provider LLM fallback, shipped as real products rather than demos.",
    to: "#work",
  },
  {
    icon: "api",
    title: "Backend & APIs",
    text: "FastAPI services, PostgreSQL, Redis and vector stores, with Next.js front ends and sandboxed test runs.",
    to: "#work",
  },
  {
    icon: "wave",
    title: "ML & signal research",
    text: "Lightweight complex-domain networks, careful multi-seed evaluation, and honest reporting of where a model falls short.",
    to: "#research",
  },
  {
    icon: "chip",
    title: "Embedded & healthcare AI",
    text: "ESP32 voice-and-vision devices and safe-fallback assistants for maternal care, built for continuity, not diagnosis.",
    to: "#work",
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="shead rv">
          <span className="label center">How I can help</span>
          <h2>
            What I <em>do</em>
          </h2>
        </div>
        <div className="cards4">
          {services.map((s, i) => (
            <article key={s.title} className={`card rv${i > 0 ? ` d${i}` : ""}`}>
              <Icon name={s.icon} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="more" href={s.to}>
                Learn more{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
