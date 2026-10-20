"use client";

import { useState } from "react";
import { ArrowRight, Cpu, CircuitBoard, GraduationCap, Mic2, Play, Wrench, Menu, X, ExternalLink, ShieldCheck, Youtube, Code2, Radio } from "lucide-react";
import Reveal from "@/components/Reveal";
import CircuitGlow from "@/components/CircuitGlow";
import SupportSection from "@/components/SupportSection";
import BadgeGenerator from "@/components/BadgeGenerator";

const expertise = [
  { icon: Cpu, n: "01", title: "Hardware Hacking", text: "Research, teardowns, reverse engineering, and security analysis of electronic devices.", tag: "HARDWARE / REVERSE ENGINEERING" },
  { icon: CircuitBoard, n: "02", title: "Electronics & Engineering", text: "Product design, prototyping, embedded systems, and creative technical projects.", tag: "DESIGN / ENGINEERING" },
  { icon: ShieldCheck, n: "03", title: "Security Research", text: "Investigating vulnerabilities, device security, and real-world technical challenges.", tag: "RESEARCH / SECURITY" },
  { icon: GraduationCap, n: "04", title: "Videos & Training", text: "Educational videos, conference talks, workshops, and hands-on learning.", tag: "EDUCATION / MEDIA" },
];

const projects = [
  { n: "01 / FAULT INJECTION", title: "STM32 Fault Injection", text: "Research into microcontroller protection, voltage glitching, and repeatable fault-injection techniques.", tag: "HARDWARE SECURITY", href: "https://grandideastudio.com/portfolio/library/intro-to-fault-injection/" },
  { n: "02 / WALLET SECURITY", title: "Cryptocurrency Wallet Security", text: "Hardware wallet research and demonstrations exploring device security and recovery.", tag: "DEVICE SECURITY", href: "https://grandideastudio.com/" },
  { n: "03 / DEF CON", title: "DEF CON Electronic Badges", text: "Interactive electronic badges that helped define a playful, inventive part of hacker culture.", tag: "BADGELIFE", href: "https://joegrand.com/" },
  { n: "04 / ENGINEERING", title: "Grand Idea Studio", text: "Technology development, licensing, and consulting across electronics and embedded systems.", tag: "PRODUCT DESIGN", href: "https://grandideastudio.com/" },
  { n: "05 / MEDIA", title: "Prototype This!", text: "A Discovery Channel series following the real-life design process behind ambitious prototypes.", tag: "ENGINEERING MEDIA", href: "https://www.imdb.com/title/tt1285035/" },
  { n: "06 / FIELD NOTES", title: "Hacker pLANeT", text: "A video series exploring hacker culture, local flavor, and interesting places around the world.", tag: "VIDEO SERIES", href: "https://joegrand.com/" },
];

const videos = [
  { id: "MhJoJRqJ0Wc", title: "Joe Grand Video 01", category: "YOUTUBE VIDEO", type: "WATCH VIDEO" },
  { id: "dT9y-KQbqi4", title: "Joe Grand Video 02", category: "YOUTUBE VIDEO", type: "WATCH VIDEO" },
  { id: "AQpv_6Se6VM", title: "Joe Grand Video 03", category: "YOUTUBE VIDEO", type: "WATCH VIDEO" },
  { id: "WNpW52x-EWY", title: "Joe Grand Video 04", category: "YOUTUBE VIDEO", type: "WATCH VIDEO" },
  { id: "4LahQG09NzI", title: "Joe Grand Video 05", category: "YOUTUBE VIDEO", type: "WATCH VIDEO" },
];

const youtube = "https://www.youtube.com/@JoeGrand";
const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const thumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const officialSite = "https://joegrand.com/";
const facebook = "https://www.facebook.com/joegrandofficial";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Joe Grand home">
            <span className="brand-mark">JG</span>
            <span>JOE<span className="brand-accent">GRAND</span><small>HARDWARE · CURIOSITY · SECURITY</small></span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#videos" onClick={closeMenu}>Videos</a><a href="#services" onClick={closeMenu}>Services</a><a href="#contact" onClick={closeMenu}>Contact</a><a href="/login" onClick={closeMenu}>Log in</a><a href="/signup" onClick={closeMenu}>Sign up</a>
          </nav>
          <a className="nav-cta" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={15}/> Watch on YouTube <ExternalLink size={13}/></a>
        </div>
      </header>

      <section className="hero" id="home">\n        <CircuitGlow />
        <div className="container hero-inner">
          <div>
            <div className="eyebrow mono">HARDWARE HACKING. ELECTRONICS. SECURITY RESEARCH.</div><div className="kingpin-badge mono">KNOWN IN THE LAB AS <strong>KINGPIN</strong></div>
            <h1>Exploring how electronic devices <span>really work.</span></h1>
            <p className="hero-copy">Joe Grand, also known as Kingpin, is a computer engineer, hardware hacker, inventor, and educator creating projects, videos, tools, talks, and training that explore how electronic devices really work.</p>
            <div className="hero-actions"><a className="button" href="#featured-video">Watch Latest Video <Play size={15} fill="currentColor"/></a><a className="button secondary" href="#projects">Explore Projects <ArrowRight size={15}/></a></div>
            <div className="hero-meta mono"><span><i/> DEF CON BADGE CREATOR</span><span><i/> L0PHT HEAVY INDUSTRIES</span><span><i/> GRAND IDEA STUDIO</span><span><i/> PROTOTYPE THIS</span><span><i/> 25M+ YOUTUBE VIEWS</span></div>
          </div>
          <div className="terminal" aria-label="Hardware lab terminal graphic">
            <div className="terminal-top"><span className="mono">JOE GRAND / HARDWARE LAB</span><span className="terminal-dots"><i/><i/><i/></span><span className="mono">SESSION ACTIVE</span></div>
            <div className="terminal-body">
              <div><span className="prompt">lab@joegrand:~$</span> inspect --device</div>
              <div className="term-cyan">[OK] signal path located</div>
              <div className="term-cyan">[OK] hardware under investigation</div>
              <div className="term-cyan">[OK] assumptions questioned</div>
              <div className="term-amber">[NOTE] every detail is a clue</div>
              <div className="term-output"><div className="prompt">RESEARCH STATUS: ACTIVE</div><div>Observe. Test. Understand.</div><div>Share what you discover.</div></div>
              <div><span className="prompt">lab@joegrand:~$</span> <span className="term-cyan">_</span></div>
            </div>
            <div className="lab-status"><span><i/> SYSTEM READY</span><span className="mono">HW / EE / SEC</span></div>
          </div>
        </div>
      </section>

      <section className="credibility-strip" aria-label="Career highlights">
        <div className="container">
          <p className="eyebrow mono">A CAREER BUILT AROUND HARDWARE, SECURITY, AND INVENTION</p>
          <div className="credibility-items">
            <a href="https://grandideastudio.com/about/" target="_blank" rel="noopener noreferrer"><strong>DEF CON</strong><span>Electronic badges</span></a>
            <a href="https://joegrand.com/" target="_blank" rel="noopener noreferrer"><strong>L0pht</strong><span>Heavy Industries</span></a>
            <a href="https://www.imdb.com/title/tt1285035/" target="_blank" rel="noopener noreferrer"><strong>Prototype This!</strong><span>Discovery Channel</span></a>
            <a href="https://grandideastudio.com/" target="_blank" rel="noopener noreferrer"><strong>Grand Idea Studio</strong><span>Founded 2002</span></a>
            <div><strong>25M+</strong><span>YouTube views</span></div>
            <a href="https://grandideastudio.com/about/" target="_blank" rel="noopener noreferrer"><strong>U.S. Patents</strong><span>Inventor & designer</span></a>
          </div>
        </div>
      </section>

      <section className="section featured-section" id="featured-video">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">00 / FEATURED VIDEO</div><h2>Real projects. <span>Clear explanations.</span></h2></div><p className="section-intro">Real-world hardware hacking, electronics, and security projects — explained clearly and step by step.</p></div>
          <div className="featured-video">
            <a className="video-placeholder" href={videoUrl(videos[0].id)} target="_blank" rel="noopener noreferrer" aria-label="Watch Joe Grand video 1 on YouTube" style={{ backgroundImage: `linear-gradient(rgba(8,12,9,.28), rgba(8,12,9,.68)), url(${thumbnailUrl(videos[0].id)})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <span className="video-scan mono">SIGNAL DETECTED // MEDIA FEED</span><span className="play-button"><Play size={24} fill="currentColor"/></span><span className="video-label mono">JOE GRAND · VIDEO 01</span>
            </a>
            <div className="video-copy"><div className="eyebrow mono">WATCH / LEARN / REPEAT</div><h3>Step inside the hardware.</h3><p>Explore Joe’s YouTube channel for hardware hacking, electronics, security research, tools, and engineering projects.</p><div style={{marginTop:18}}><a className="button" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> Watch on YouTube <ExternalLink size={14}/></a></div></div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">01 / ABOUT JOE</div><h2>Who Is <span>Joe Grand?</span></h2></div><p className="section-intro">An engineer’s mindset, a hacker’s curiosity, and a teacher’s instinct to share what works.</p></div>
          <div className="about-layout"><div className="about-index mono"><span>JG_001</span><div className="about-symbol"><Code2 size={48}/></div><span>COMPUTER ENGINEER<br/>HARDWARE HACKER</span></div><Reveal className="about-copy"><p>Joe Grand is a product designer, hardware hacker, and founder of Grand Idea Studio. He specializes in creating, exploring, manipulating, and teaching about electronic devices.</p><p>Sometimes known as Kingpin, Joe was a member of L0pht Heavy Industries and co-hosted Discovery Channel’s <em>Prototype This!</em>. His work has helped shape hacker culture, hardware security education, and public understanding of technology.</p><a className="text-link" href="https://grandideastudio.com/about/" target="_blank" rel="noopener noreferrer">Read Full Biography <ArrowRight size={15}/></a></Reveal></div>
        </div>
      </section>

      <section className="career-section" aria-label="Career timeline and highlights">
        <div className="container">
          <div className="career-heading"><div className="eyebrow mono">A CAREER IN HARDWARE</div><h2>From hacker culture to <span>hands-on education.</span></h2></div>
          <div className="career-timeline">
            <div><span>01</span><strong>L0pht Heavy Industries</strong><p>Independent security research and hacker culture.</p></div>
            <div><span>02</span><strong>DEF CON Badges</strong><p>Interactive electronic badges that helped inspire badgelife.</p></div>
            <div><span>03</span><strong>Prototype This!</strong><p>Engineering ideas brought to life on Discovery Channel.</p></div>
            <div><span>04</span><strong>Grand Idea Studio</strong><p>Technology development, licensing, consulting, and training.</p></div>
            <div><span>05</span><strong>YouTube & Training</strong><p>Sharing hardware research with a global audience.</p></div>
          </div>
          <div className="stats-row"><div><strong>25M+</strong><span>YouTube views</span></div><div><strong>U.S.</strong><span>Patents</span></div><div><strong>2006–10</strong><span>DEF CON badge era</span></div><div><strong>Since 2002</strong><span>Grand Idea Studio</span></div></div>
        </div>
      </section>

      <section className="section" id="expertise">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">02 / EXPERTISE</div><h2>What Joe <span>Does</span></h2></div><p className="section-intro">Hardware hacking, electronics, security research, product design, and hands-on education.</p></div>
          <Reveal className="grid-4">{expertise.map(({icon:Icon,n,title,text,tag})=><article className="card expertise-card" key={n}><div className="card-topline"><span className="card-number mono">[{n}]</span><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><span className="card-tag mono">{tag}</span></article>)}</Reveal>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">03 / SELECTED WORK</div><h2>Selected <span>Projects</span></h2></div><p className="section-intro">Explore a selection of Joe’s hardware hacking experiments, engineering projects, security research, and public demonstrations.</p></div>
          <Reveal className="grid-3">{projects.map(p=><a className="card project-card" key={p.n} href={p.href} target="_blank" rel="noopener noreferrer"><div className="project-number mono">{p.n}</div><h3>{p.title}</h3><p>{p.text}</p><span className="card-tag mono">{p.tag} ↗</span></a>)}</Reveal>
          <div className="section-action"><a className="button secondary" href={youtube} target="_blank" rel="noopener noreferrer">View Projects on YouTube <ArrowRight size={15}/></a></div>
        </div>
      </section>

      <section className="section" id="videos">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">04 / WATCH & LEARN</div><h2>Latest <span>Videos</span></h2></div><p className="section-intro">Watch the newest videos from Joe’s YouTube channel — covering hardware hacking, electronics, security research, tools, and engineering projects.</p></div>
          <Reveal className="video-grid">{videos.map((v,i)=><a className="video-card" key={v.id} href={videoUrl(v.id)} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${v.title} on YouTube`}><div className="video-thumb" style={{ backgroundImage: `linear-gradient(rgba(8,12,9,.12), rgba(8,12,9,.68)), url(${thumbnailUrl(v.id)})`, backgroundSize: "cover", backgroundPosition: "center" }}><span className="thumb-index mono">0{i+1} / MEDIA</span><span className="thumb-icon"><Play size={22} fill="currentColor"/></span><span className="thumb-bottom mono">{v.category}</span></div><div className="video-info"><span className="video-category mono">{v.type}</span><h3>{v.title}</h3><span className="text-link">Watch on YouTube <ArrowRight size={14}/></span></div></a>)}</Reveal>
          <div className="section-action"><a className="button secondary" href={youtube} target="_blank" rel="noopener noreferrer">View All Videos <ArrowRight size={15}/></a><a className="text-link" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> Subscribe on YouTube</a></div>
          <p className="content-note mono">OFFICIAL CHANNEL / HARDWARE RESEARCH / ENGINEERING PROJECTS</p>
        </div>
      </section>

      <section className="section training-section" id="training">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">06 / LEARN BY DOING</div><h2>Learn <span>Hardware Hacking</span></h2></div><p className="section-intro">Hands-on courses teach the concepts and techniques used to explore, manipulate, and assess electronic systems. No prior hardware, electronics, or security experience is required for the introductory course.</p></div>
          <div className="course-catalog">
            <a href="https://grandideastudio.com/training/hardware-hacking-basics/" target="_blank" rel="noopener noreferrer"><span className="course-code mono">COURSE_01 · 2 DAYS</span><h3>Hardware Hacking Basics</h3><p>Reverse engineering, product teardown, circuit-board analysis, signal monitoring, and common hardware attack vectors.</p><span className="course-link">Course details <ArrowRight size={14}/></span></a>
            <a href="https://grandideastudio.com/training/" target="_blank" rel="noopener noreferrer"><span className="course-code mono">COURSE_02 · WORKSHOP</span><h3>Firmware Extraction & Manipulation</h3><p>Hands-on firmware extraction and system manipulation through on-chip debug interfaces.</p><span className="course-link">Course details <ArrowRight size={14}/></span></a>
            <a href="https://grandideastudio.com/training/" target="_blank" rel="noopener noreferrer"><span className="course-code mono">COURSE_03 · ADVANCED</span><h3>Defeating Microcontroller Code Protection</h3><p>Advanced techniques for assessing security features designed to prevent unauthorized access.</p><span className="course-link">Course details <ArrowRight size={14}/></span></a>
            <a href="https://grandideastudio.com/training/" target="_blank" rel="noopener noreferrer"><span className="course-code mono">COURSE_04 · WORKSHOP</span><h3>Hardware Implants & Espionage</h3><p>Explore hardware espionage, supply-chain compromise, and detection of surreptitious hardware.</p><span className="course-link">Course details <ArrowRight size={14}/></span></a>
            <a href="https://grandideastudio.com/training/" target="_blank" rel="noopener noreferrer"><span className="course-code mono">COURSE_05 · 2 DAYS</span><h3>Cryptocurrency Wallet Exploitation</h3><p>Advanced hardware-security methods for assessing common cryptocurrency hardware wallets.</p><span className="course-link">Course details <ArrowRight size={14}/></span></a>
          </div>
          <div className="section-action"><a className="button" href="https://grandideastudio.com/training/" target="_blank" rel="noopener noreferrer">View Training Courses <ArrowRight size={15}/></a><a className="button secondary" href="https://grandideastudio.com/about/" target="_blank" rel="noopener noreferrer">Request Corporate Training <ArrowRight size={15}/></a></div>
        </div>
      </section>
      <section className="community-section">
        <div className="container community-layout"><div><div className="eyebrow mono">COMMUNITY / SHARED CURIOSITY</div><h2>Join the <span>Community.</span></h2><p>Connect with makers, hackers, engineers, and hardware-security enthusiasts through Joe’s official community and public work.</p></div><div className="community-links"><a href="https://joegrand.com/" target="_blank" rel="noopener noreferrer"><span className="mono">01 / COMMUNITY</span><strong>Official Discord <ExternalLink size={15}/></strong></a><a href="https://www.youtube.com/@JoeGrand" target="_blank" rel="noopener noreferrer"><span className="mono">02 / VIDEO</span><strong>Watch on YouTube <ExternalLink size={15}/></strong></a><a href="https://grandideastudio.com/" target="_blank" rel="noopener noreferrer"><span className="mono">03 / ENGINEERING</span><strong>Grand Idea Studio <ExternalLink size={15}/></strong></a></div></div>
      </section>
      <section className="press-section"><div className="container"><div className="eyebrow mono">PRESS / TALKS / INTERVIEWS</div><div className="press-links"><a href="https://darknetdiaries.com/episode/155/" target="_blank" rel="noopener noreferrer">Darknet Diaries · Kingpin <ExternalLink size={13}/></a><a href="https://grandideastudio.com/portfolio/library/intro-to-fault-injection/" target="_blank" rel="noopener noreferrer">Teardown · Fault Injection <ExternalLink size={13}/></a><a href="https://grandideastudio.com/about/" target="_blank" rel="noopener noreferrer">Biography & U.S. Patents <ExternalLink size={13}/></a><a href="https://grandideastudio.com/" target="_blank" rel="noopener noreferrer">Grand Idea Studio <ExternalLink size={13}/></a></div></div></section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">05 / WORK TOGETHER</div><h2>Work With <span>Joe</span></h2></div><p className="section-intro">Joe works with organizations, creators, educators, and technical teams on hardware security, product development, training, speaking, and creative engineering projects.</p></div>
          <Reveal className="grid-4 services-grid">
            <article className="card"><div className="card-icon"><Wrench size={21}/></div><h3>Consulting</h3><p>Practical guidance on hardware security, product design, and technical problem-solving.</p><span className="card-tag mono">TECHNICAL GUIDANCE ↗</span></article>
            <article className="card"><div className="card-icon"><Mic2 size={21}/></div><h3>Speaking</h3><p>Conference talks, interviews, panels, and public presentations.</p><span className="card-tag mono">TALKS & EVENTS ↗</span></article>
            <article className="card"><div className="card-icon"><GraduationCap size={21}/></div><h3>Training</h3><p>Hands-on workshops and educational sessions on hardware hacking and security thinking.</p><span className="card-tag mono">LEARN BY DOING ↗</span></article>
            <article className="card"><div className="card-icon"><Radio size={21}/></div><h3>Collaborations</h3><p>Projects, content, research, and product collaborations.</p><span className="card-tag mono">MAKE SOMETHING ↗</span></article>
          </Reveal>
          <div className="section-action"><a className="button" href="#contact">Contact Joe <ArrowRight size={15}/></a></div>
        </div>
      </section>

      <BadgeGenerator />
      <SupportSection />

      <section className="section" id="contact">
        <div className="container">
          <Reveal className="cta-panel"><div className="cta-circuit mono">OPEN CHANNEL / 06</div><div className="eyebrow mono">GET IN TOUCH</div><h2>Let’s build something <span>interesting.</span></h2><p>Interested in collaborating, inviting Joe to speak, booking training, or discussing a hardware or electronics project?</p><div className="hero-actions cta-actions"><a className="button" href={officialSite} target="_blank" rel="noopener noreferrer">Contact Joe <ArrowRight size={15}/></a><a className="button secondary" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> Watch on YouTube</a></div><p className="contact-note">Use Joe’s official website for contact details and current enquiry routes.</p></Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main"><a href="#home" className="brand"><span className="brand-mark">JG</span><span>JOE<span className="brand-accent">GRAND</span><small>HARDWARE · CURIOSITY · SECURITY</small></span></a><p className="footer-summary">Hardware hacking, electronics, security research, videos, and engineering projects.</p><div className="footer-column"><span className="footer-heading mono">EXPLORE</span><div className="footer-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#videos">Videos</a><a href="#services">Services</a><a href="#contact">Contact</a></div></div><div className="footer-column"><span className="footer-heading mono">CONNECT</span><div className="footer-links"><a href={youtube} target="_blank" rel="noopener noreferrer">YouTube <ExternalLink size={12}/></a><a href={facebook} target="_blank" rel="noopener noreferrer">Facebook <ExternalLink size={12}/></a><a href={officialSite} target="_blank" rel="noopener noreferrer">Official Website <ExternalLink size={12}/></a></div></div></div>
          <div className="footer-bottom"><div><span>© {new Date().getFullYear()} Joe Grand. All rights reserved.</span><p className="protocol-clue mono">SIGNAL ACQUIRED: 25 25 8 8 12 14 12 14 11 7</p></div><a href="#home" className="mono back-top">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
