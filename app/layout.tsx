import type { Metadata } from "next";
import "./globals.css";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollProgress from "@/components/ScrollProgress";
import LiveChat from "@/components/LiveChat";
import KingpinProtocol from "@/components/KingpinProtocol";
import RouteTransition from "@/components/RouteTransition";
import MotionField from "@/components/MotionField";

export const metadata: Metadata = {
  metadataBase: new URL("https://joegrandweb.vercel.app"),
  title: {
    default: "Joe Grand | Hardware Hacker, Engineer & Educator",
    template: "%s | Joe Grand",
  },
  description: "Joe Grand, also known as Kingpin, is a computer engineer, hardware hacker, inventor, and educator. Explore hardware hacking projects, electronics research, security investigations, videos, training, and the Kingpin Badge Lab.",
  applicationName: "Joe Grand — Kingpin Field Guide",
  keywords: ["Joe Grand", "Kingpin", "hardware hacker", "hardware hacking", "computer engineer", "electronics", "hardware security", "reverse engineering", "Grand Idea Studio", "L0pht Heavy Industries", "DEF CON badges", "Prototype This", "cryptocurrency wallet security", "STM32 fault injection"],
  authors: [{ name: "Joe Grand" }],
  creator: "Joe Grand",
  publisher: "Joe Grand",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: "https://joegrandweb.vercel.app",
    siteName: "Joe Grand — Kingpin Field Guide",
    title: "Joe Grand | Hardware Hacker, Engineer & Educator",
    description: "Explore hardware hacking projects, electronics research, security investigations, videos, training, and the Kingpin Badge Lab.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Grand | Hardware Hacker, Engineer & Educator",
    description: "Explore hardware hacking projects, electronics research, security investigations, videos, training, and the Kingpin Badge Lab.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim().toUpperCase();
  const analyticsEnabled = Boolean(measurementId && /^G-[A-Z0-9]+$/.test(measurementId));
  return <html lang="en"><body><GoogleAnalytics measurementId={measurementId} /><MotionField /><RouteTransition /><ScrollProgress />{children}<LiveChat /><KingpinProtocol /><AnalyticsConsent enabled={analyticsEnabled} /></body></html>;
}
