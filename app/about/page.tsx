import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";

export const metadata: Metadata = {
  title: "About Joe Grand",
  description: "Learn about Joe Grand, also known as Kingpin: computer engineer, hardware hacker, inventor, educator, and founder of Grand Idea Studio.",
};

const milestones = [
  ["01", "L0pht Heavy Industries", "Independent security research and hacker culture."],
  ["02", "DEF CON Badges", "Interactive electronic badges that helped inspire badgelife."],
  ["03", "Prototype This!", "Engineering ideas brought to life for Discovery Channel."],
  ["04", "Grand Idea Studio", "Technology development, licensing, consulting, and training."],
  ["05", "YouTube & Training", "Sharing hardware research with a global audience."],
];

export default function AboutPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="about" />
      <section className="punk-detail-hero is-about">
        <div className="container punk-detail-hero-grid">
          <div>
            <p className="punk-kicker">ABOUT / THE PERSON BEHIND THE BENCH</p>
            <h1>Joe <em>Grand.</em></h1>
            <p>Computer engineer, hardware hacker, inventor, educator—and known in the lab as Kingpin. Joe&apos;s work starts with the same instinct: open it up, see what&apos;s really there, and share what you learn.</p>
          </div>
          <div className="punk-about-photo"><img src="/youtube-assets/joe-grand-youtube-avatar.jpg" alt="Joe Grand with an electronic boombox, from the official YouTube channel" /><span>FIELD NOTES / KINGPIN</span></div>
        </div>
      </section>

      <section className="punk-bio-long">
        <div className="container punk-bio-long-grid">
          <div className="punk-bio-quote"><span>“</span><p>Make the system legible. Make the process shareable. Keep asking the next question.</p></div>
          <div>
            <p className="punk-kicker">A CAREER IN HARDWARE</p>
            <h2>Curious enough to look <em>closer.</em></h2>
            <p>Joe Grand is the founder of Grand Idea Studio and specializes in creating, exploring, manipulating, and teaching about electronic devices. His work sits at the intersection of product design, hardware security, education, and hacker culture.</p>
            <p>He is known for his work with L0pht Heavy Industries, for creating the first electronic badges for DEF CON, and for co-hosting Discovery Channel&apos;s <i>Prototype This!</i>. Across talks, videos, projects, and training, the recurring theme is a practical one: technical curiosity becomes more powerful when it is shared.</p>
            <Link className="punk-button is-outline" href="/projects">Explore the project field guide <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="punk-timeline-section">
        <div className="container">
          <div className="punk-detail-intro"><span>SIGNAL PATH</span><p>A few of the threads that connect a career across hacking, engineering, badges, media, and teaching.</p></div>
          <ol className="punk-timeline">
            {milestones.map(([number, title, text]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="punk-mini-cta">
        <div className="container"><Radio size={25} /><div><strong>KEEP THE SIGNAL OPEN</strong><p>Explore Joe&apos;s work in this field guide, watch the public video archive, or send a direct enquiry through the site.</p></div><Link className="punk-button is-yellow" href="/contact">Contact us <ArrowRight size={15} /></Link></div>
      </section>
      <PunkFooter />
    </main>
  );
}
