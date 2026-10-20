import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Joe Grand",
  description: "Create a Joe Grand account to follow new videos, projects, resources, and member updates.",
};

export default function SignupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
