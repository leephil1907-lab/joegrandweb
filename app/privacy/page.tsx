import type { Metadata } from "next";
import Link from "next/link";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Joe Grand website.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader />
      <section className="punk-detail-hero is-training"><div className="container punk-detail-hero-grid"><div><p className="punk-kicker">PRIVACY / PLAIN LANGUAGE</p><h1>Keep the signal<br /><em>yours.</em></h1><p>This build is designed to minimize collection: advertising and personalization storage stay denied, Google Analytics is opt-in, and contact delivery stays server-side.</p></div><div className="punk-detail-stamp is-lime"><strong>NO<br />TRACKERS</strong><span>LESS DATA / MORE CLARITY</span></div></div></section>
      <section className="punk-privacy-section"><div className="container punk-privacy-grid"><article><h2>What this website stores</h2><p>The Kingpin Badge Generator may store its selected level and Kingpin Protocol completion status in your browser&apos;s local storage. Those values stay on your device and can be cleared through your browser settings.</p></article><article><h2>Contact and updates</h2><p>When configured, contact and update forms are delivered through server-side provider webhooks. The public interface does not expose a contact email address. Provider and retention details should be added here before launch.</p></article><article><h2>Analytics choice</h2><p>Google Analytics is configured for opt-in use only. It remains off until a visitor allows analytics through the consent prompt; advertising and personalization storage stay denied.</p></article><article><h2>External destinations</h2><p>Links to YouTube, GitHub, Discord, Grand Idea Studio, and other external resources are governed by their respective privacy policies once you leave this site.</p></article><article><h2>Future services</h2><p>Before adding a CMS, newsletter provider, or additional analytics, update this page with the provider, purpose, retention terms, and available controls.</p></article></div><div className="container"><p className="punk-privacy-contact">Questions about privacy? <Link href="/contact">Use the contact route.</Link></p></div></section>
      <PunkFooter />
    </main>
  );
}
