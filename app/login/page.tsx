"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import AuthCard from "@/components/AuthCard";
import AuthInput from "@/components/AuthInput";
import PrimaryButton from "@/components/PrimaryButton";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    // UI-only placeholder: connect this handler to the site's auth provider before launch.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
  }

  const reveal = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0.2 : 0.55 },
  });

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to access your account.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" delay={0.45} />
        <AuthInput label="Password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" delay={0.53} />

        <motion.div {...reveal(0.61)} className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" name="remember" className="h-4 w-4 rounded border-line bg-ink accent-[#00E676]" />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium text-accent transition hover:text-accent-alt">
            Forgot password?
          </Link>
        </motion.div>

        <motion.div {...reveal(0.69)}>
          <PrimaryButton fullWidth loading={loading}>Sign In</PrimaryButton>
        </motion.div>
      </form>

      <motion.div {...reveal(0.78)} className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-line" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted">or</span>
        <div className="h-px flex-1 bg-line" />
      </motion.div>

      <motion.button
        type="button"
        {...reveal(0.84)}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        onClick={() => window.alert("Google sign-in is not connected yet.")}
        className="w-full rounded-full border border-line bg-ink px-6 py-3 text-sm font-semibold text-body transition hover:border-accent hover:text-accent"
      >
        Continue with Google
      </motion.button>

      <motion.p {...reveal(0.9)} className="mt-7 text-center text-sm text-muted">
        Don’t have an account?{" "}
        <Link href="/signup" className="font-semibold text-accent transition hover:text-accent-alt">Create one</Link>
      </motion.p>
    </AuthCard>
  );
}
