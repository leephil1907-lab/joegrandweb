import Link from "next/link";
import { ArrowRight, CircuitBoard, MessageCircle, Play, Radio, Sparkles, Wrench, Youtube } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";

const routes = [
  { number: "01", title: "About Joe", text: "The person behind the bench, the badges, and the habit of asking better questions.", href: "/about", label: "Read the story", icon: Radio, tone: "is-pink" },
  { number: "02", title: "Projects", text: "A field guide to hardware research, tools, security work, and badgelife.", href: "/projects", label: "Open the field guide", icon: CircuitBoard, tone: "is-yellow" },
  { number: "03", title: "Videos", text: "Hardware deep dives, experiments, and public investigations from the channel.", href: "/videos", label: "Watch the archive", icon: Play, tone: "is-lime" },
  { number: "04", title: "Training", text: "Hands-on routes into inspecting, testing, and understanding electronic systems.", href: "/training", label: "Explore training", icon: Wrench, tone: "is-purple" },
  { number: "05", title: "Community", text: "Follow the public channels, trade notes, and keep the curiosity moving.", href: "/community", label: "Join the conversation", icon: MessageCircle, tone: "is-cream" },
  { number: "06", title: "Badge Lab", text: "Build a Kingpin badge, tune the signal, and download your creation locally.", href: "/badge-lab", label: "Enter the lab", icon: Sparkles, tone: "is-black" },
];

export default function HomePage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="home" />

      <section className="punk-masthead" aria-labelledby="masthead-title">
        <div className="punk-masthead-paper" aria-hidden="true" />
        <div className="container punk-masthead-inner">
          <div>
            <p className="punk-overline">Hardware hacker • engineer • educator</p>
            <h1 id="masthead-title">JOE GRAND</h1>
            <p className="punk-masthead-sub">KNOWN AS <strong>KINGPIN</strong> IN THE LAB</p>
          </div>
          <div className="punk-masthead-stickers" aria-label="Joe Grand areas of work">
            <span className="sticker">HARDWARE</span><span className="sticker is-pink">SECURITY</span><span className="sticker is-black">BADGELIFE</span>
          </div>
        </div>
      </section>

      <section className="punk-signal-bar" aria-label="Site introduction">
        <span>HARDWARE HACKING</span><i /> <span>ELECTRONICS</span><i /> <span>SECURITY RESEARCH</span><i /> <span>CREATIVE ENGINEERING</span>
      </section>

      <section className="punk-hero punk-home-hero" aria-label="Introduction">
        <div className="container punk-hero-grid">
          <div className="punk-hero-copy">
            <p className="punk-kicker">FIELD GUIDE / MULTI-PAGE ARCHIVE</p>
            <h2>Curiosity is a <em>superpower.</em></h2>
            <p>Follow a route into Joe Grand&apos;s projects, video archive, training, community, and the Kingpin Badge Lab. Every part of the work has its own page.</p>
            <div className="punk-actions">
              <Link className="punk-button is-yellow" href="/projects"><CircuitBoard size={15} /> Open the field guide</Link>
              <Link className="punk-text-link" href="/badge-lab">Enter Badge Lab <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="punk-photo-frame">
            <div className="punk-photo-label">HACKER pLANeT <span>• FIELD NOTES</span></div>
            <img src="/youtube-assets/joe-grand-youtube-avatar.jpg" alt="Joe Grand with an electronic boombox, from the official YouTube channel" className="punk-hero-photo" />
            <p className="punk-photo-caption">A life spent opening things up, understanding the details, and inviting more people into the process.</p>
            <img className="punk-scribble" src="/punk-assets/scribble-x.png" alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="punk-route-index" aria-labelledby="route-index-title">
        <div className="container">
          <div className="punk-section-head compact">
            <div><p className="punk-kicker">SITE INDEX / SIX ROUTES</p><h2 id="route-index-title">Choose a page,<br /><em>not a scroll.</em></h2></div>
            <p>This is a field guide rather than a single long landing page. Pick a route; the next page loads with a signal transition.</p>
          </div>
          <div className="punk-route-grid">
            {routes.map(({ number, title, text, href, label, icon: Icon, tone }) => (
              <Link key={href} href={href} className={`punk-route-card ${tone}`}>
                <span className="punk-route-number">{number}</span>
                <span className="punk-route-icon"><Icon size={25} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="punk-route-action">{label} <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="punk-home-dispatch" aria-labelledby="dispatch-title">
        <div className="container punk-home-dispatch-grid">
          <div>
            <p className="punk-kicker">START ANYWHERE / KEEP DIGGING</p>
            <h2 id="dispatch-title">No black boxes.<br /><em>Just better clues.</em></h2>
            <p>Each route is focused on one part of the work, so you can move from hardware research to training, community, or the video archive without losing the thread.</p>
          </div>
          <div className="punk-dispatch-stack">
            <Link href="/videos" className="punk-dispatch-card is-video"><span><Play size={18} fill="currentColor" /> VIDEO ARCHIVE</span><strong>Watch the work unfold.</strong><small>Experiments, investigations, and hardware stories <ArrowRight size={15} /></small></Link>
            <Link href="/contact" className="punk-dispatch-card is-contact"><span><MessageCircle size={18} /> OPEN CHANNEL</span><strong>Bring a good question.</strong><small>Collaborations, talks, training, and enquiries <ArrowRight size={15} /></small></Link>
          </div>
        </div>
      </section>

      <section className="punk-mini-cta">
        <div className="container"><Youtube size={25} /><div><strong>FIND THE NEXT SIGNAL</strong><p>Follow the official channel for new videos, project updates, and technical field notes.</p></div><a className="punk-button is-yellow" href="https://www.youtube.com/@JoeGrand" target="_blank" rel="noopener noreferrer">Visit YouTube <ArrowRight size={15} /></a></div>
      </section>

      <PunkFooter />
    </main>
  );
}
