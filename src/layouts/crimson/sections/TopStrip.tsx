import { profile } from "../../../data/profile";

function TopStrip() {
  return (
    <div className="wrap">
      <div className="strip">
        <span className="lab">Creative Portfolio</span>
        <span className="rule" aria-hidden="true" />
        <span className="lab">
          <span>{profile.availability}</span>
          <i className="dot" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default TopStrip;
