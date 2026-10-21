import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CalendarDays, ShieldCheck } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import TrainingRequestBuilder from "@/components/TrainingRequestBuilder";

export const metadata: Metadata = {
  title: "Training Pricing & Booking",
  description: "Plan a Joe Grand hardware hacking training request, choose a course format, and request dates and pricing directly through the site.",
};

const pricingPaths = [
  { label: "PUBLIC-CLASS INTEREST", title: "Individual or small group", text: "Request availability for a public session or register interest for a future class. Dates and pricing are confirmed for the specific session.", note: "SESSION DETAILS CONFIRMED BY REQUEST" },
  { label: "PRIVATE TEAM TRAINING", title: "Custom team session", text: "Build a private workshop around the selected course, team size, delivery format, equipment needs, and timing.", note: "CUSTOM QUOTE BASED ON SCOPE" },
  { label: "TALKS + CUSTOM PROGRAMS", title: "A tailored engagement", text: "For speaking, a focused technical briefing, or a custom training path, send the context and desired outcome through the direct contact route.", note: "SCOPE FIRST / PRICING SECOND" },
];

const faqs = [
  ["Do I need prior hardware experience?", "No. The training catalog includes entry points designed for people without prior hardware, electronics, or security experience, alongside more advanced material."],
  ["Why are prices requested rather than posted?", "Private training, on-site workshops, course format, class size, equipment, customization, and timing can all affect the final scope. The planner creates a clearer request before a quote is discussed."],
  ["Can I request a date, quote, or private session?", "Yes. Choose your course, preferred format, group size, and request type in the planner, then use the in-site contact route. Your selections are added to the message automatically."],
  ["Is payment taken on this site?", "No card details or payments are collected here. A training request starts a conversation; any billing process is arranged only after scope and pricing have been agreed."],
];

export default function PricingPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader />
      <section className="punk-detail-hero is-training">
        <div className="container punk-detail-hero-grid">
          <div><p className="punk-kicker">PRICING + BOOKING / TRAINING REQUESTS</p><h1>Plan it.<br /><em>Then price it.</em></h1><p>Build a useful training brief before you ask for dates, availability, or pricing. The whole request stays inside this site until you choose to send it.</p></div>
          <div className="punk-detail-stamp is-lime"><BadgeDollarSign size={41} /><strong>QUOTE<br />FIRST</strong><span>PLAN / REQUEST / CONFIRM</span></div>
        </div>
      </section>

      <TrainingRequestBuilder />

      <section className="punk-pricing-guide" aria-labelledby="pricing-paths-title">
        <div className="container">
          <div className="punk-pricing-guide-head"><div><p className="punk-kicker">THREE WAYS TO START</p><h2 id="pricing-paths-title">Clear scope.<br /><em>Better quote.</em></h2></div><p>There are no invented rate cards or surprise checkout steps. Choose the path that fits, then send a direct request with the useful details included.</p></div>
          <div className="punk-pricing-grid">{pricingPaths.map((path) => <article className="punk-pricing-card" key={path.label}><span>{path.label}</span><h3>{path.title}</h3><p>{path.text}</p><strong>{path.note}</strong></article>)}</div>
        </div>
      </section>

      <section className="punk-booking-faq">
        <div className="container punk-booking-faq-grid"><div><p className="punk-kicker">COMMON QUESTIONS</p><h2>Useful before<br /><em>you ask.</em></h2></div><div className="punk-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="punk-mini-cta is-purple">
        <div className="container"><CalendarDays size={25} /><div><strong>HAVE A DATE IN MIND?</strong><p>Open the direct contact route to request a training date, a private session, a workshop, or a tailored engagement.</p></div><Link className="punk-button is-yellow" href="/contact?topic=Training">Contact us <ArrowRight size={15} /></Link></div>
      </section>
      <section className="punk-mini-cta">
        <div className="container"><ShieldCheck size={25} /><div><strong>NO PAYMENT DATA HERE</strong><p>This site helps define the request first. Pricing and any later billing are agreed before a secure payment process is introduced.</p></div><Link className="punk-button is-yellow" href="/training">Browse courses <ArrowRight size={15} /></Link></div>
      </section>
      <PunkFooter />
    </main>
  );
}
