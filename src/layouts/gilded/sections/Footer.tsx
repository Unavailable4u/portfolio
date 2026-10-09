import { profile } from "../../../data/profile";
import { year } from "../content";

function Footer() {
  return (
    <footer>
      <div className="wrap">
        © {year} {profile.name} · All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
