"use client";

import {
  ArrowRight,
  ExternalLink,
  Play,
  ShieldCheck,
  Wrench,
  Youtube,
} from "lucide-react";
import BadgeGenerator from "@/components/BadgeGenerator";
import SupportSection from "@/components/SupportSection";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { featuredVideos, projectCatalog } from "@/content/site-content";

const youtube = "https://www.youtube.com/@JoeGrand";
const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const posters = [
  {
    kicker: "Projects + Engineering",
    title: "Grand Idea Studio",
    image: "/punk-assets/gis.webp",
    alt: "Electronics and engineering workbench",
    href: "/projects",
    cta: "Explore the work",
    tape: "/punk-assets/tape-three.png",
    tone: "cream",
  },
  {
    kicker: "Watch + Learn",
    title: "YouTube",
    image: "/punk-assets/youtube.webp",
    alt: "Joe Grand YouTube video collage",
    href: "/videos",
    cta: "Watch & learn",
    tape: "/punk-assets/tape-two.png",
    tone: "pink",
  },
  {
    kicker: "Make + Share",
    title: "Community",
    image: "/punk-assets/discord.webp",
    alt: "Community conversation graphics",
    href: "/community",
    cta: "Join the conversation",
    tape: "/punk-assets/tape-one.png",
    tone: "lime",
  },
];

const links = [
  { tag: "Hardware hacking", title: "STM32 Fault Injection", meta: "Read the research", href: "https://grandideastudio.com/portfolio/library/intro-to-fault-injection/" },
  { tag: "Training course", title: "Hands-on Hardware Hacking", meta: "Learn by doing", href: "https://grandideastudio.com/training/" },
  { tag: "Information", title: "Joe Grand / Kingpin", meta: "Biography & history", href: "https://grandideastudio.com/about/" },
  { tag: "Watch", title: "Prototype This!", meta: "Discovery Channel", href: "https://www.imdb.com/title/tt1285035/" },
  { tag: "Listen", title: "Darknet Diaries", meta: "Episode 155: Kingpin", href: "https://darknetdiaries.com/episode/155/" },
  { tag: "Badgelife", title: "DEF CON Badges", meta: "Where it began", href: "https://defcon.org/" },
];


function Sticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`sticker ${className}`}>{children}</span>;
}

export default function HomePage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="home" />

      <section id="home" className="punk-masthead" aria-labelledby="masthead-title">
        <div className="punk-masthead-paper" aria-hidden="true" />
        <div className="container punk-masthead-inner">
          <div>
            <p className="punk-overline">Hardware hacker • engineer • educator</p>
            <h1 id="masthead-title">JOE GRAND</h1>
            <p className="punk-masthead-sub">KNOWN AS <strong>KINGPIN</strong> IN THE LAB</p>
          </div>
          <div className="punk-masthead-stickers" aria-label="Joe Grand areas of work">
            <Sticker>HARDWARE</Sticker><Sticker className="is-pink">SECURITY</Sticker><Sticker className="is-black">BADGELIFE</Sticker>
          </div>
        </div>
      </section>

      <section className="punk-signal-bar" aria-label="Site introduction">
        <span>HARDWARE HACKING</span><i /> <span>ELECTRONICS</span><i /> <span>SECURITY RESEARCH</span><i /> <span>CREATIVE ENGINEERING</span>
      </section>

      <section className="punk-hero" aria-label="Introduction">
        <div className="container punk-hero-grid">
          <div className="punk-hero-copy">
            <p className="punk-kicker">NEW SIGNAL / OPEN CHANNEL</p>
            <h2>Curiosity is a <em>superpower.</em></h2>
            <p>Joe Grand explores how electronic devices really work — then shares the clues through projects, tools, talks, training, and videos.</p>
            <div className="punk-actions">
              <a className="punk-button is-yellow" href="/videos"><Play size={15} fill="currentColor" /> Watch the work</a>
              <a className="punk-text-link" href="#badge-generator">Make a Kingpin badge <ArrowRight size={16} /></a>
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

      <section className="punk-posters" aria-label="Explore Joe Grand's work">
        <div className="container">
          <div className="punk-section-head compact">
            <div><p className="punk-kicker">THREE WAYS IN</p><h2>Pick a <em>rabbit hole.</em></h2></div>
            <p>Projects to inspect, videos to watch, and a community that keeps asking what else is possible.</p>
          </div>
          <div className="punk-poster-grid">
            {posters.map((poster) => (
              <div className={`punk-poster-column ${poster.tone}`} key={poster.title}>
                <img src={poster.tape} className="punk-tape" alt="" aria-hidden="true" />
                <a className="punk-poster" href={poster.href}>
                  <span className="punk-poster-kicker">{poster.kicker}</span>
                  <strong>{poster.title}</strong>
                  <span className="punk-poster-image"><img src={poster.image} alt={poster.alt} /></span>
                  <span className="punk-poster-cta">{poster.cta} <ArrowRight size={16} /></span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="punk-link-board" aria-label="Research, training and media links">
        <div className="container">
          <div className="punk-link-board-title"><span>PINBOARD / 01</span><strong>Stuff worth following</strong></div>
          <div className="punk-link-grid">
            {links.map((link, index) => (
              <a className={`punk-link-card card-${(index % 3) + 1}`} href={link.href} target="_blank" rel="noopener noreferrer" key={link.title}>
                <span>{link.tag}</span><strong>{link.title}</strong><small>{link.meta} <ExternalLink size={12} /></small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="punk-bio-section">
        <div className="container punk-bio-grid">
          <div className="punk-bio-copy">
            <p className="punk-kicker">THE PERSON BEHIND THE BENCH</p>
            <h2>Joe <em>Grand.</em></h2>
            <p>Computer engineer. Hardware hacker. Inventor. Educator. Joe is known for creating the first electronic badges for DEF CON, working with L0pht Heavy Industries, and helping make the inner workings of technology more approachable.</p>
            <p>His work moves between meticulous hardware research and a wonderfully human instinct to teach, tinker, and share.</p>
            <a className="punk-button is-outline" href="/about">Read the full biography <ArrowRight size={15} /></a>
          </div>
          <div className="punk-tv-wrap">
            <Sticker className="is-pink punk-tv-sticker">NO BLACK BOXES</Sticker>
            <img src="/youtube-assets/joe-grand-youtube-avatar.jpg" className="punk-tv-screen" alt="Joe Grand with an electronic boombox, from the official YouTube channel" />
            <img src="/punk-assets/television.png" className="punk-tv" alt="" aria-hidden="true" />
            <img src="/punk-assets/scribble-resistor.png" className="punk-resistor" alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="projects" className="punk-work-section">
        <div className="container">
          <div className="punk-section-head">
            <div><p className="punk-kicker">SELECTED WORK / 02</p><h2>Projects with <em>teeth.</em></h2></div>
            <p>Hardware security, playful inventions, media experiments, and practical research built for people who want to look closer.</p>
          </div>
          <div className="punk-project-grid">
            {projectCatalog.slice(0, 4).map((project, index) => (
              <a className="punk-project" href={`/projects#${project.id}`} key={project.id}>
                <span className="punk-project-number">0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <span className="punk-project-label">{project.tags[0]} <ArrowRight size={15} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="videos" className="punk-video-section">
        <div className="container">
          <div className="punk-section-head">
            <div><p className="punk-kicker">WATCH + LEARN / 03</p><h2>Pull up a <em>chair.</em></h2></div>
            <a className="punk-text-link" href="/videos">Browse the video library <ArrowRight size={17} /></a>
          </div>
          <div className="punk-video-grid">
            {featuredVideos.slice(0, 3).map((video, index) => (
              <a className="punk-video-card" href={videoUrl(video.id)} target="_blank" rel="noopener noreferrer" key={video.id}>
                <span className="punk-video-thumb" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.04), rgba(10,10,10,.64)), url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }}>
                  <span>0{index + 1} / {video.category}</span><b><Play size={24} fill="currentColor" /></b>
                </span>
                <span className="punk-video-info"><small>{video.category}</small><strong>{video.title}</strong><em>Watch video <ArrowRight size={14} /></em></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="punk-principles" aria-label="Joe Grand approach">
        <div className="container punk-principle-grid">
          <div><span>01</span><strong>Observe the system.</strong><p>Every detail is a clue.</p></div>
          <div><span>02</span><strong>Test the assumptions.</strong><p>Black boxes are invitations.</p></div>
          <div><span>03</span><strong>Share the method.</strong><p>Curiosity grows in public.</p></div>
        </div>
      </section>

      <BadgeGenerator />
      <SupportSection />

      <section id="contact" className="punk-contact-section">
        <div className="container punk-contact-card">
          <div className="punk-contact-art" aria-hidden="true"><span>JG</span><i /><i /><i /></div>
          <div>
            <p className="punk-kicker">OPEN CHANNEL / 04</p>
            <h2>Let’s make something <em>interesting.</em></h2>
            <p>For collaboration, talks, training, or a hard technical problem, use Joe’s official site to find the right route.</p>
            <div className="punk-actions"><a className="punk-button is-yellow" href="/contact">Contact Joe <ArrowRight size={15} /></a><a className="punk-text-link" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={17} /> Subscribe on YouTube</a></div>
          </div>
        </div>
      </section>

      <PunkFooter />
    </main>
  );
}
