"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  delay?: number;
};

export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  autoComplete,
  delay = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.label
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="block"
    >
      <motion.span
        whileHover={reduceMotion ? undefined : { x: 3 }}
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
      >
        {label}
      </motion.span>
      <motion.input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        whileFocus={reduceMotion ? undefined : { scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-body outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/25"
      />
    </motion.label>
  );
}
