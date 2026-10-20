"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? 0 : scaleX }}
    />
  );
}
