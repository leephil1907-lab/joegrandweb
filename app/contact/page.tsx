import type { Metadata } from "next";
import { ExternalLink, Mail, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import SupportSection from "@/components/SupportSection";
import { officialLinks } from "@/content/site-content";

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
          <div><p className="punk-kicker">OPEN CHANNEL / COLLABORATE + CONNECT</p><h1>Start with a<br /><em>good question.</em></h1><p>For collaborations, talks, training, or an unusual technical challenge, send a concise brief through the official contact route below.</p></div>
          <div className="punk-detail-stamp"><Mail size={39} /><strong>OPEN<br />CHANNEL</strong><span>COLLABORATE / LEARN / BUILD</span></div>
        </div>
      </section>
      <section className="punk-contact-page-section">
        <div className="container punk-contact-page-grid">
          <div className="punk-contact-aside"><p className="punk-kicker">CONTACT ROUTE</p><h2>Send a signal.</h2><p>Include the goal, timing, and relevant technical context so the enquiry can reach the right place.</p><div className="punk-contact-aside-card"><ShieldCheck size={20} /><div><strong>PRIVACY FIRST</strong><span>No contact email is exposed in the public interface. Delivery is handled server-side when configured.</span></div></div><a className="punk-text-link" href={officialLinks.website} target="_blank" rel="noopener noreferrer">Official Joe Grand website <ExternalLink size={15} /></a></div>
          <div><p className="punk-kicker">WRITE THE BRIEF</p><h2>What are you <em>working on?</em></h2><ContactForm /></div>
        </div>
      </section>
      <SupportSection />
      <PunkFooter />
    </main>
  );
}
