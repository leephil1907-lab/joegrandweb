"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import AuthCard from "@/components/AuthCard";
import AuthInput from "@/components/AuthInput";
import PrimaryButton from "@/components/PrimaryButton";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("password") !== data.get("confirmPassword")) {
      window.alert("Your passwords do not match.");
      return;
    }
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
    <AuthCard title="Create your account" subtitle="Join for updates, resources, and member content.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput label="Full name" name="fullName" placeholder="Your full name" autoComplete="name" delay={0.45} />
        <AuthInput label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" delay={0.52} />
        <AuthInput label="Password" name="password" type="password" placeholder="Create a strong password" autoComplete="new-password" delay={0.59} />
        <AuthInput label="Confirm password" name="confirmPassword" type="password" placeholder="Re-enter your password" autoComplete="new-password" delay={0.66} />

        <motion.label {...reveal(0.73)} className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="terms" required className="mt-1 h-4 w-4 rounded border-line bg-ink accent-[#00E676]" />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-accent hover:text-accent-alt">Terms of Use</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent hover:text-accent-alt">Privacy Policy</Link>.
          </span>
        </motion.label>

        <motion.div {...reveal(0.8)}>
          <PrimaryButton fullWidth loading={loading}>Create Account</PrimaryButton>
        </motion.div>
      </form>

      <motion.p {...reveal(0.88)} className="mt-7 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent transition hover:text-accent-alt">Sign in</Link>
      </motion.p>
    </AuthCard>
  );
}
