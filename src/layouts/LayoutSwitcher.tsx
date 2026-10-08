import { FiShuffle } from "react-icons/fi";
import { useLayout } from "./layoutContext";

interface LayoutSwitcherProps {
  /** Each style passes its own classes so the button matches its header. */
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/** Icon button that moves to the next portfolio style. Add it to the header of every layout. */
function LayoutSwitcher({ className, size = 17, strokeWidth }: LayoutSwitcherProps) {
  const { current, upcoming, index, count, next } = useLayout();

  return (
    <button
      type="button"
      onClick={next}
      className={className}
      aria-label={`Switch portfolio style. Now showing ${current.name}, style ${index + 1} of ${count}. Next: ${upcoming.name}.`}
      title={`Style: ${current.name} (${index + 1}/${count}). Click for ${upcoming.name}`}
    >
      <FiShuffle aria-hidden="true" size={size} strokeWidth={strokeWidth} />
    </button>
  );
}

export default LayoutSwitcher;
