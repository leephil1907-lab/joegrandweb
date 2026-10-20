import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Github, MessageCircle, Radio } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { officialLinks } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Community",
  description: "Find Joe Grand's public community, social channels, technical conversations, and learning resources.",
};

const channels = [
  { title: "Official Discord", text: "A place for hardware hackers, makers, students, and the curious to trade notes and learn in public.", href: officialLinks.discord, label: "Open Discord", icon: MessageCircle },
  { title: "YouTube", text: "The public archive for hardware research, videos, projects, talks, and technical deep dives.", href: officialLinks.youtube, label: "Watch the channel", icon: Radio },
  { title: "GitHub", text: "Find public code, project repositories, and technical material shared through Joe’s GitHub presence.", href: officialLinks.github, label: "Explore GitHub", icon: Github },
];

export default function CommunityPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader />
      <section className="punk-detail-hero is-video">
        <div className="container punk-detail-hero-grid">
          <div><p className="punk-kicker">COMMUNITY / SHARED CURIOSITY</p><h1>Bring a<br /><em>question.</em></h1><p>Good technical communities turn curiosity into a habit: show the evidence, ask better questions, share the result, and leave a trail for the next person.</p></div>
          <div className="punk-detail-stamp is-lime"><MessageCircle size={40} /><strong>TEACH<br />ONE</strong><span>LEARN ONE / SHARE WHAT WORKED</span></div>
        </div>
      </section>
      <section className="punk-detail-section">
        <div className="container"><div className="punk-detail-intro"><span>PUBLIC CHANNELS</span><p>Follow the official destinations for conversation, videos, and public project material.</p></div><div className="punk-course-grid">{channels.map(({ title, text, href, label, icon: Icon }) => <article className="punk-course-card" key={title}><Icon size={25} color="#f7d330" /><h2>{title}</h2><p>{text}</p><a href={href} target="_blank" rel="noopener noreferrer">{label} <ExternalLink size={15} /></a></article>)}</div></div>
      </section>
      <section className="punk-newsletter-section"><div className="container punk-newsletter-grid"><div><p className="punk-kicker">STAY IN THE LOOP</p><h2>Field notes, not <em>noise.</em></h2><p>Opt in to occasional updates about new videos, projects, and training.</p></div><NewsletterSignup /></div></section>
      <section className="punk-mini-cta"><div className="container"><MessageCircle size={25} /><div><strong>START WITH CURIOSITY</strong><p>Need a structured way into the work? Start with a video, browse a project, or look for a hands-on course.</p></div><a className="punk-button is-yellow" href="/training">Explore training <ArrowRight size={15} /></a></div></section>
      <PunkFooter />
    </main>
  );
}
