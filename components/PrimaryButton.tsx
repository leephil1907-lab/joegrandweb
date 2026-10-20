"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
};

export default function PrimaryButton({
  children,
  fullWidth = false,
  loading = false,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={loading || reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={loading || reduceMotion ? undefined : { scale: 0.97 }}
      animate={loading ? { opacity: 0.8 } : { opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`relative flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-3 font-bold text-[#04120a] transition hover:bg-accent-alt disabled:cursor-not-allowed ${fullWidth ? "w-full" : ""}`}
    >
      {loading && (
        <motion.span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-[#04120a]/30 border-t-[#04120a]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span>{loading ? "Please wait..." : children}</span>
    </motion.button>
  );
}
