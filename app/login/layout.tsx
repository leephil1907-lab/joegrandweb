import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Joe Grand",
  description: "Sign in to your Joe Grand account to access member content, updates, and resources.",
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
