import { motion, useScroll, useSpring } from "framer-motion";

/** A thin cyan bar across the top of the viewport that fills as the page scrolls. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-cyan z-[60] shadow-[0_0_10px_var(--color-cyan)]"
    />
  );
}

export default ScrollProgress;
