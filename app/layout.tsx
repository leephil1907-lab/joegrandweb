import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import LiveChat from "@/components/LiveChat";
import KingpinProtocol from "@/components/KingpinProtocol";

export const metadata: Metadata = {
  metadataBase: new URL("https://joegrand.com"),
  title: {
    default: "Joe Grand | Hardware Hacker, Engineer & Educator",
    template: "%s | Joe Grand",
  },
  description: "Joe Grand, also known as Kingpin, is a computer engineer, hardware hacker, inventor, and educator. Explore his hardware hacking projects, electronics work, security research, videos, talks, and training.",
  keywords: ["Joe Grand", "Kingpin", "hardware hacker", "hardware hacking", "computer engineer", "electronics", "hardware security", "reverse engineering", "Grand Idea Studio", "L0pht Heavy Industries", "DEF CON badges", "Prototype This", "cryptocurrency wallet security", "STM32 fault injection"],
  authors: [{ name: "Joe Grand" }],
  creator: "Joe Grand",
  openGraph: {
    type: "website",
    url: "https://joegrand.com",
    siteName: "Joe Grand",
    title: "Joe Grand | Hardware Hacker, Engineer & Educator",
    description: "Explore hardware hacking, electronics, security research, videos, projects, and training by Joe Grand, also known as Kingpin.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Joe Grand — Hardware Hacker, Engineer & Educator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Grand | Hardware Hacker, Engineer & Educator",
    description: "Explore hardware hacking, electronics, security research, videos, projects, and training by Joe Grand.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><ScrollProgress />{children}<LiveChat /><KingpinProtocol /></body></html>;
}
