"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

export default function MotionField() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    const update = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--motion-x", `${Math.round((event.clientX / window.innerWidth) * 100)}%`);
        document.documentElement.style.setProperty("--motion-y", `${Math.round((event.clientY / window.innerHeight) * 100)}%`);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", update, { passive: true });
    return () => {
      window.removeEventListener("pointermove", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return <div className="motion-field" aria-hidden="true" />;
}
