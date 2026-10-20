"use client";

import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Handshake, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";

const options = [
  { title: "General Support", text: "Questions about Joe’s website, videos, projects, or technical content.", action: "Start chat", icon: MessageCircle, kind: "chat" },
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
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.article key={option.title} className="support-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -5 }}>
                <div className="support-icon"><Icon size={21} /></div>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
                <button type="button" className="support-action" onClick={() => activate(option.kind)}>{option.action}<ArrowRight size={15} /></button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
