"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      className="route-page-frame"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: .992 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? .16 : .52, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
