"use client";

import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * A lightweight structural wrapper retained for the existing component API.
 * Content remains visible before JavaScript hydrates, improving accessibility
 * and avoiding scroll-triggered blank sections on low-powered devices.
 */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
