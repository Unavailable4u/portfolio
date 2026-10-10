import { profile } from "../../../data/profile";

function Footer() {
  return (
    <footer className="foot lab">
      <span>© {profile.name}</span>
      <span>
        {profile.location} · {profile.languages.map((l) => l.name).join(", ")}
      </span>
    </footer>
  );
}

export default Footer;
