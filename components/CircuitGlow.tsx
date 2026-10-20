"use client";

import { motion, useReducedMotion } from "motion/react";

export default function CircuitGlow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="circuit-glow" aria-hidden="true">
      <motion.span
        className="circuit-glow-orb circuit-glow-orb-green"
        animate={reduceMotion ? undefined : { opacity: [0.22, 0.48, 0.22], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="circuit-glow-orb circuit-glow-orb-cyan"
        animate={reduceMotion ? undefined : { opacity: [0.12, 0.3, 0.12], scale: [1.06, 1, 1.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
