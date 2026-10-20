"use client";

import { ArrowRight, Handshake, GraduationCap, Mail } from "lucide-react";
import Reveal from "./Reveal";

const supportEmailHref = "mailto:jg8347331@gmail.com?subject=Joe%20Grand%20website%20support";

const options = [
  { title: "General Support", text: "Questions about Joe’s website, videos, projects, or technical content.", action: "Email support", icon: Mail, href: supportEmailHref },
  { title: "Collaborations", text: "Project ideas, partnerships, interviews, and creative engineering work.", action: "Contact Joe", icon: Handshake, kind: "contact" },
  { title: "Speaking & Training", text: "Conference talks, workshops, training sessions, and event enquiries.", action: "Request information", icon: GraduationCap, kind: "contact" },
];

export default function SupportSection() {
  function activate(kind: string) {
    if (kind === "chat" && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("joegrand:open-chat"));
      return;
    }
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="support-section" aria-labelledby="support-title">
      <div className="container">
        <Reveal>
          <div className="eyebrow mono">SUPPORT / OPEN CHANNEL</div>
          <h2 id="support-title">Have a question? <span>Let’s connect.</span></h2>
          <p className="support-intro">Start a quick conversation with the site assistant or explore the right route for a collaboration, talk, or training enquiry.</p>
        </Reveal>
        <div className="support-grid">
          {options.map((option) => {
            const Icon = option.icon;
            if ("href" in option) {
              return (
                <article key={option.title} className="support-card">
                  <a className="support-icon" href={option.href} aria-label="Email support"><Icon size={21} /></a>
                  <h3>{option.title}</h3>
                <p>{option.text}</p>
              </article>
              );
            }
            return (
              <article key={option.title} className="support-card">
                <div className="support-icon"><Icon size={21} /></div>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
                <button type="button" className="support-action" onClick={() => activate(option.kind)}>{option.action}<ArrowRight size={15} /></button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
