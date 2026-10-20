"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowRight, Cpu, CircuitBoard, GraduationCap, Mic2, Play, Wrench, Menu, X, ExternalLink, ShieldCheck, Youtube, Mail, Code2, Radio } from "lucide-react";

const expertise = [
  { icon: Cpu, n: "01", title: "Hardware Hacking", text: "Research, teardowns, reverse engineering, and security analysis of electronic devices.", tag: "HARDWARE / REVERSE ENGINEERING" },
  { icon: CircuitBoard, n: "02", title: "Electronics & Engineering", text: "Product design, prototyping, embedded systems, and creative technical projects.", tag: "DESIGN / ENGINEERING" },
  { icon: ShieldCheck, n: "03", title: "Security Research", text: "Investigating vulnerabilities, device security, and real-world technical challenges.", tag: "RESEARCH / SECURITY" },
  { icon: GraduationCap, n: "04", title: "Videos & Training", text: "Educational videos, conference talks, workshops, and hands-on learning.", tag: "EDUCATION / MEDIA" },
];

const projects = [
  { n: "01 / HARDWARE", title: "Hardware hacking experiments", text: "Explorations into the inner workings of electronic devices, from teardown to reverse engineering.", tag: "HARDWARE HACKING" },
  { n: "02 / ENGINEERING", title: "Product design & electronics", text: "Practical engineering, prototyping, and creative technical projects built around real-world challenges.", tag: "PRODUCT DESIGN" },
  { n: "03 / SECURITY", title: "Security research & demos", text: "Investigating device security and showing the process, tools, and lessons behind the findings.", tag: "SECURITY RESEARCH" },
];

const videos = [
  { title: "Hardware hacking & device teardowns", category: "HARDWARE HACKING", type: "EXPLORE THE CHANNEL" },
  { title: "Electronics, tools & engineering", category: "ELECTRONICS", type: "FROM THE WORKBENCH" },
  { title: "Security research in practice", category: "SECURITY RESEARCH", type: "RESEARCH & DEMOS" },
];

const youtube = "https://www.youtube.com/@JoeGrand";
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
            <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#videos" onClick={closeMenu}>Videos</a><a href="#services" onClick={closeMenu}>Services</a><a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="nav-cta" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={15}/> Watch on YouTube <ExternalLink size={13}/></a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-inner">
          <div>
            <div className="eyebrow mono">HARDWARE HACKING. ELECTRONICS. SECURITY RESEARCH.</div>
            <h1>Exploring how electronic devices <span>really work.</span></h1>
            <p className="hero-copy">Joe Grand is a computer engineer and hardware hacker exploring how electronic devices really work — through projects, videos, research, talks, and hands-on training.</p>
            <div className="hero-actions"><a className="button" href="#featured-video">Watch Latest Video <Play size={15} fill="currentColor"/></a><a className="button secondary" href="#services">Work With Me <ArrowRight size={15}/></a></div>
            <div className="hero-meta mono"><span><i/> HARDWARE HACKING</span><span><i/> ELECTRONICS</span><span><i/> SECURITY RESEARCH</span><span><i/> PRODUCT DESIGN</span><span><i/> TRAINING</span></div>
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

      <section className="section featured-section" id="featured-video">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">00 / FEATURED VIDEO</div><h2>Real projects. <span>Clear explanations.</span></h2></div><p className="section-intro">Real-world hardware hacking, electronics, and security projects — explained clearly and step by step.</p></div>
          <div className="featured-video">
            <a className="video-placeholder" href={youtube} target="_blank" rel="noopener noreferrer" aria-label="Watch Joe Grand on YouTube">
              <span className="video-scan mono">SIGNAL DETECTED // MEDIA FEED</span><span className="play-button"><Play size={24} fill="currentColor"/></span><span className="video-label mono">JOE GRAND · YOUTUBE</span>
            </a>
            <div className="video-copy"><div className="eyebrow mono">WATCH / LEARN / REPEAT</div><h3>Step inside the hardware.</h3><p>Explore Joe’s YouTube channel for hardware hacking, electronics, security research, tools, and engineering projects.</p><div style={{marginTop:18}}><a className="button" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> Watch on YouTube <ExternalLink size={14}/></a></div><p className="video-note">Featured video preview links to the official channel. Connect a verified video ID to embed a specific video here.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">01 / ABOUT JOE</div><h2>Who Is <span>Joe Grand?</span></h2></div><p className="section-intro">An engineer’s mindset, a hacker’s curiosity, and a teacher’s instinct to share what works.</p></div>
          <div className="about-layout"><div className="about-index mono"><span>JG_001</span><div className="about-symbol"><Code2 size={48}/></div><span>COMPUTER ENGINEER<br/>HARDWARE HACKER</span></div><div className="about-copy"><p>Joe Grand, also known as Kingpin, is a computer engineer, hardware hacker, inventor, and educator. He has spent decades exploring, designing, and manipulating electronic systems, sharing his work through videos, talks, training, and engineering projects.</p><p>From hardware security research to product design and public education, Joe makes complex technology understandable, practical, and engaging.</p><a className="text-link" href={officialSite} target="_blank" rel="noopener noreferrer">Learn More About Joe <ArrowRight size={15}/></a></div></div>
        </div>
      </section>

      <section className="section" id="expertise">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">02 / EXPERTISE</div><h2>What Joe <span>Does</span></h2></div><p className="section-intro">Hardware hacking, electronics, security research, product design, and hands-on education.</p></div>
          <div className="grid-4">{expertise.map(({icon:Icon,n,title,text,tag})=><article className="card expertise-card" key={n}><div className="card-topline"><span className="card-number mono">[{n}]</span><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><span className="card-tag mono">{tag}</span></article>)}</div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">03 / SELECTED WORK</div><h2>Selected <span>Projects</span></h2></div><p className="section-intro">Explore a selection of Joe’s hardware hacking experiments, engineering projects, security research, and public demonstrations.</p></div>
          <div className="grid-3">{projects.map(p=><article className="card project-card" key={p.n}><div className="project-number mono">{p.n}</div><h3>{p.title}</h3><p>{p.text}</p><span className="card-tag mono">{p.tag} ↗</span></article>)}</div>
          <div className="section-action"><a className="button secondary" href={youtube} target="_blank" rel="noopener noreferrer">View Projects on YouTube <ArrowRight size={15}/></a></div>
        </div>
      </section>

      <section className="section" id="videos">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">04 / WATCH & LEARN</div><h2>Latest <span>Videos</span></h2></div><p className="section-intro">Watch the newest videos from Joe’s YouTube channel — covering hardware hacking, electronics, security research, tools, and engineering projects.</p></div>
          <div className="video-grid">{videos.map((v,i)=><a className="video-card" key={v.title} href={youtube} target="_blank" rel="noopener noreferrer"><div className="video-thumb"><span className="thumb-index mono">0{i+1} / MEDIA</span><span className="thumb-icon"><Play size={22} fill="currentColor"/></span><span className="thumb-bottom mono">{v.category}</span></div><div className="video-info"><span className="video-category mono">{v.type}</span><h3>{v.title}</h3><span className="text-link">Watch on YouTube <ArrowRight size={14}/></span></div></a>)}</div>
          <div className="section-action"><a className="button secondary" href={youtube} target="_blank" rel="noopener noreferrer">View All Videos <ArrowRight size={15}/></a><a className="text-link" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> Subscribe on YouTube</a></div>
          <p className="content-note mono">CHANNEL LINK ACTIVE / INDIVIDUAL VIDEO EMBEDS REQUIRE VERIFIED VIDEO IDS</p>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">05 / WORK TOGETHER</div><h2>Work With <span>Joe</span></h2></div><p className="section-intro">Joe works with organizations, creators, educators, and technical teams on hardware security, product development, training, speaking, and creative engineering projects.</p></div>
          <div className="grid-4 services-grid">
            <article className="card"><div className="card-icon"><Wrench size={21}/></div><h3>Consulting</h3><p>Practical guidance on hardware security, product design, and technical problem-solving.</p><span className="card-tag mono">TECHNICAL GUIDANCE ↗</span></article>
            <article className="card"><div className="card-icon"><Mic2 size={21}/></div><h3>Speaking</h3><p>Conference talks, interviews, panels, and public presentations.</p><span className="card-tag mono">TALKS & EVENTS ↗</span></article>
            <article className="card"><div className="card-icon"><GraduationCap size={21}/></div><h3>Training</h3><p>Hands-on workshops and educational sessions on hardware hacking and security thinking.</p><span className="card-tag mono">LEARN BY DOING ↗</span></article>
            <article className="card"><div className="card-icon"><Radio size={21}/></div><h3>Collaborations</h3><p>Projects, content, research, and product collaborations.</p><span className="card-tag mono">MAKE SOMETHING ↗</span></article>
          </div>
          <div className="section-action"><a className="button" href="#contact">Contact Joe <ArrowRight size={15}/></a></div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <div className="cta-panel"><div className="cta-circuit mono">OPEN CHANNEL / 06</div><div className="eyebrow mono">GET IN TOUCH</div><h2>Let’s build something <span>interesting.</span></h2><p>Interested in collaborating, inviting Joe to speak, booking training, or discussing a hardware or electronics project?</p><div className="hero-actions cta-actions"><a className="button" href={officialSite} target="_blank" rel="noopener noreferrer">Contact Joe <ArrowRight size={15}/></a><a className="button secondary" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> Watch on YouTube</a></div><p className="contact-note">Use Joe’s official website for contact details and current enquiry routes.</p></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main"><a href="#home" className="brand"><span className="brand-mark">JG</span><span>JOE<span className="brand-accent">GRAND</span><small>HARDWARE · CURIOSITY · SECURITY</small></span></a><p className="footer-summary">Hardware hacking, electronics, security research, videos, and engineering projects.</p><div className="footer-column"><span className="footer-heading mono">EXPLORE</span><div className="footer-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#videos">Videos</a><a href="#services">Services</a><a href="#contact">Contact</a></div></div><div className="footer-column"><span className="footer-heading mono">CONNECT</span><div className="footer-links"><a href={youtube} target="_blank" rel="noopener noreferrer">YouTube <ExternalLink size={12}/></a><a href={facebook} target="_blank" rel="noopener noreferrer">Facebook <ExternalLink size={12}/></a><a href={officialSite} target="_blank" rel="noopener noreferrer">Official Website <ExternalLink size={12}/></a></div></div></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Joe Grand. All rights reserved.</span><a href="#home" className="mono back-top">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
