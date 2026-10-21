import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import SupportSection from "@/components/SupportSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Joe Grand for collaborations, talks, training, hardware-security projects, and website feedback.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="contact" />
      <section className="punk-detail-hero is-about">
        <div className="container punk-detail-hero-grid">
          <div><p className="punk-kicker">OPEN CHANNEL / COLLABORATE + CONNECT</p><h1>Start with a<br /><em>good question.</em></h1><p>For collaborations, talks, training, or an unusual technical challenge, send a concise brief through the in-site contact route below.</p></div>
          <div className="punk-detail-stamp"><Mail size={39} /><strong>OPEN<br />CHANNEL</strong><span>COLLABORATE / LEARN / BUILD</span></div>
        </div>
      </section>
      <section className="punk-contact-page-section">
        <div className="container punk-contact-page-grid">
          <div className="punk-contact-aside"><p className="punk-kicker">CONTACT ROUTE</p><h2>Send a signal.</h2><p>Include the goal, timing, and relevant technical context so the enquiry can reach the right place.</p><div className="punk-contact-aside-card"><ShieldCheck size={20} /><div><strong>DIRECTLY IN THIS SITE</strong><span>Training, project, collaboration, and website enquiries all start here without redirecting to another website.</span></div></div><Link className="punk-text-link" href="/pricing">Plan training dates &amp; pricing</Link></div>
          <div><p className="punk-kicker">WRITE THE BRIEF</p><h2>What are you <em>working on?</em></h2><ContactForm /></div>
        </div>
      </section>
      <SupportSection />
      <PunkFooter />
    </main>
  );
}
