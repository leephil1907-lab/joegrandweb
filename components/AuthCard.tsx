"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import Logo from "./Logo";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 40, scale: 0.97 };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,230,118,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,230,118,0.10) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div
          className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
          animate={reduceMotion ? { opacity: 0.25 } : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-100px] h-[350px] w-[350px] rounded-full bg-accent-alt/15 blur-[120px]"
          animate={reduceMotion ? { opacity: 0.2 } : { opacity: [0.2, 0.45, 0.2], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={enter}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.section
          whileHover={reduceMotion ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          className="rounded-3xl border border-line bg-panel/90 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8"
        >
          <motion.h1
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.25, duration: reduceMotion ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl font-black sm:text-3xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.32, duration: reduceMotion ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-sm text-muted"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7"
          >
            {children}
          </motion.div>
        </motion.section>
      </motion.div>
    </main>
  );
}
