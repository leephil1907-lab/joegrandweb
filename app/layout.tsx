import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import LiveChat from "@/components/LiveChat";

export const metadata: Metadata = {
  title: "Joe Grand — Hardware Hacker, Engineer & Educator",
  description: "The work, experiments, talks, and videos of Joe Grand — hardware hacker, electrical engineer, and educator.",
  metadataBase: new URL("https://joegrand.com"),
  openGraph: {
    title: "Joe Grand — Hardware Hacker, Engineer & Educator",
    description: "Hardware, curiosity, and the art of figuring out how things work.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><ScrollProgress />{children}<LiveChat /></body></html>;
}
