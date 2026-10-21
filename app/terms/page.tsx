import type { Metadata } from "next";
import Link from "next/link";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";

export const metadata: Metadata = {
  title: "Site & Booking Terms",
  description: "Site, enquiry, training-request, and booking information for the Joe Grand website.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader />
      <section className="punk-detail-hero is-training"><div className="container punk-detail-hero-grid"><div><p className="punk-kicker">TERMS / CLEAR SIGNALS</p><h1>Ask first.<br /><em>Confirm clearly.</em></h1><p>This site is a place to explore public work and start a training, speaking, collaboration, or project enquiry. A request is the beginning of a conversation, not a confirmed booking.</p></div><div className="punk-detail-stamp is-lime"><strong>QUOTE<br />FIRST</strong><span>REQUEST / AGREE / CONFIRM</span></div></div></section>
      <section className="punk-privacy-section"><div className="container punk-privacy-grid"><article><h2>Using this site</h2><p>Content is provided for general information about Joe Grand&apos;s public work, projects, videos, training, and community. Use the site responsibly and do not rely on it as a substitute for professional advice tailored to your situation.</p></article><article><h2>Enquiries are not bookings</h2><p>Submitting a contact or training request does not create a contract, reserve a date, confirm availability, or guarantee a response. Scope, availability, pricing, and deliverables are confirmed separately in writing.</p></article><article><h2>Training, pricing, and quotes</h2><p>Training format, class size, location, equipment, timing, customization, and other requirements can affect a quote. The Pricing &amp; Booking planner helps structure a request; final terms are agreed for each engagement.</p></article><article><h2>Payments and billing</h2><p>This site does not collect card or bank-payment details. If an engagement proceeds, payment instructions, invoices, deposits, cancellations, and refunds are arranged through the agreed booking process.</p></article><article><h2>Social platforms</h2><p>YouTube, GitHub, and Discord are optional public social destinations. They open separately only when selected and are governed by their own terms and privacy practices.</p></article><article><h2>Privacy</h2><p>Read the <Link href="/privacy">Privacy page</Link> for information about local storage, analytics preferences, forms, and future provider disclosures.</p></article></div><div className="container"><p className="punk-privacy-contact">Ready to discuss a session? <Link href="/pricing">Plan dates and pricing</Link> or <Link href="/contact?topic=Training">contact us directly.</Link></p></div></section>
      <PunkFooter />
    </main>
  );
}
