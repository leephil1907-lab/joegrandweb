"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowRight, Cpu, CircuitBoard, GraduationCap, Mic2, Play, ShieldCheck, Wrench, Menu, X, ExternalLink, Radio, ScanSearch } from "lucide-react";

const expertise = [
  { icon: Cpu, title: "Hardware hacking", text: "Digging into the devices and systems around us to understand what makes them tick — and where they break.", tag: "REVERSE ENGINEERING" },
  { icon: CircuitBoard, title: "Electronics & engineering", text: "From circuit-level curiosity to practical engineering, turning complex hardware into something understandable.", tag: "HANDS-ON EXPERIMENTS" },
  { icon: GraduationCap, title: "Teaching & training", text: "Sharing hard-won lessons through talks, workshops, and approachable technical education.", tag: "KNOWLEDGE SHARED" },
];
const projects = [
  { n: "01 / RESEARCH", title: "Hardware security", text: "Exploring the boundaries between physical devices, embedded systems, and security research.", tag: "HARDWARE HACKING" },
  { n: "02 / ENGINEERING", title: "Built from curiosity", text: "Experiments, prototypes, and technical investigations driven by one question: how does it really work?", tag: "ELECTRONICS" },
  { n: "03 / COMMUNITY", title: "Hacker pLANeT", text: "Making space for hands-on learning, technical curiosity, and a wider community of makers.", tag: "EDUCATION" },
];
const videos = [
  { title: "Inside the world of hardware hacking", category: "HARDWARE HACKING", type: "FEATURED VIDEO" },
  { title: "Reverse engineering: follow the signals", category: "ENGINEERING", type: "FROM THE LAB" },
  { title: "Learning by taking things apart", category: "EDUCATION", type: "FIELD NOTES" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Joe Grand home"><span className="brand-mark">JG_</span><span>JOE GRAND<small>HARDWARE · CURIOSITY · SECURITY</small></span></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#videos" onClick={closeMenu}>Videos</a><a href="#services" onClick={closeMenu}>Work with me</a><a href="#press" onClick={closeMenu}>Press</a>
          </nav>
          <a className="nav-cta" href="#contact">Get in touch <ArrowRight size={14}/></a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-inner">
          <div>
            <div className="eyebrow mono">HARDWARE HACKER · ENGINEER · EDUCATOR</div>
            <h1>Curiosity is a tool.<br/>Break things.<br/><span>Learn everything.</span></h1>
            <p className="hero-copy">I’m Joe Grand — hardware hacker, electrical engineer, and educator. I explore the hidden layers inside technology and share what I discover along the way.</p>
            <div className="hero-actions"><a className="button" href="#projects">Explore the work <ArrowDownRight size={16}/></a><a className="button secondary" href="#videos"><Play size={15}/> Watch videos</a></div>
            <div className="hero-meta mono"><span><i/> HARDWARE RESEARCH</span><span><i/> ENGINEERING</span><span><i/> KNOWLEDGE SHARING</span></div>
          </div>
          <div className="terminal" aria-label="Decorative hardware lab terminal">
            <div className="terminal-top"><span className="mono">JG_LAB / SESSION_001</span><span className="terminal-dots"><i/><i/><i/></span><span className="mono">CONNECTED</span></div>
            <div className="terminal-body">
              <div><span className="prompt">root@lab:~$</span> initialize curiosity</div>
              <div className="term-cyan">[OK] signal path discovered</div>
              <div className="term-cyan">[OK] assumptions challenged</div>
              <div className="term-cyan">[OK] learning mode enabled</div>
              <div className="term-amber">[NOTE] unexpected behavior is a clue</div>
              <div className="term-output"><div className="prompt">MISSION STATUS: ACTIVE</div><div>Observe carefully. Test everything.</div><div>Document what you learn.</div></div>
              <div><span className="prompt">root@lab:~$</span> <span className="term-cyan">_</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">01 / THE APPROACH</div><h2>Understand the machine.<br/>Question the obvious.</h2></div><p className="section-intro">Technology gets more interesting when you look beneath the surface. My work lives where hardware, security, engineering, and education meet.</p></div>
          <div className="grid-3">{expertise.map(({icon:Icon,title,text,tag})=><article className="card" key={title}><div className="card-icon"><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><span className="card-tag mono">{tag} ↗</span></article>)}</div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">02 / SELECTED WORK</div><h2>Curiosity, put to work.</h2></div><p className="section-intro">A look at the themes and explorations that shape my work — from physical hardware to sharing knowledge with the next wave of builders.</p></div>
          <div className="grid-3">{projects.map(p=><article className="card project-card" key={p.n}><div className="project-number mono">{p.n}</div><h3>{p.title}</h3><p>{p.text}</p><span className="card-tag mono">{p.tag} ↗</span></article>)}</div>
        </div>
      </section>

      <section className="section" id="videos">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">03 / WATCH & LEARN</div><h2>Ideas are better shared.</h2></div><p className="section-intro">Videos, demonstrations, and technical stories for people who want to understand what’s happening under the hood.</p></div>
          <div className="featured-video">
            <a className="video-placeholder" href="https://www.youtube.com/results?search_query=Joe+Grand+hardware+hacking" target="_blank" rel="noreferrer" aria-label="Find Joe Grand videos on YouTube"><span className="play-button"><Play size={24} fill="currentColor"/></span><span className="video-label mono">JG_MEDIA / FEATURED</span></a>
            <div className="video-copy"><div className="eyebrow mono">FEATURED FROM THE LAB</div><h3>There’s always more beneath the surface.</h3><p>Explore hardware investigations, talks, and practical demonstrations. Browse the video collection to find a new rabbit hole.</p><div style={{marginTop:18}}><a className="button secondary" href="https://www.youtube.com/results?search_query=Joe+Grand" target="_blank" rel="noreferrer">Explore on YouTube <ExternalLink size={14}/></a></div></div>
          </div>
          <div style={{height:18}}/>
          <div className="video-grid">{videos.map((v,i)=><a className="video-card" key={v.title} href="https://www.youtube.com/results?search_query=Joe+Grand+hardware" target="_blank" rel="noreferrer"><div className="video-thumb"><Radio size={27}/><span>{v.type} / 0{i+1}</span></div><div className="video-info"><h3>{v.title}</h3><p className="mono">{v.category}</p></div></a>)}</div>
          <p style={{color:"var(--muted)",fontSize:".75rem",marginTop:18}}>Video cards are discovery links; connect verified video IDs to embed specific videos here.</p>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow mono">04 / COLLABORATE</div><h2>Good work starts<br/>with a conversation.</h2></div><p className="section-intro">Have a challenging technical question, an audience to inspire, or an idea that needs a curious mind? Let’s talk about what we can build or learn together.</p></div>
          <div className="grid-3">
            <article className="card"><div className="card-icon"><Wrench size={21}/></div><h3>Consulting & collaboration</h3><p>Technical insight and practical problem-solving for projects that benefit from a hardware-first perspective.</p><span className="card-tag mono">LET’S SOLVE IT ↗</span></article>
            <article className="card"><div className="card-icon"><Mic2 size={21}/></div><h3>Speaking & events</h3><p>Engaging talks that bring hardware, security, engineering, and real-world experimentation to life.</p><span className="card-tag mono">BRING THE STORY ↗</span></article>
            <article className="card"><div className="card-icon"><GraduationCap size={21}/></div><h3>Training & workshops</h3><p>Hands-on learning experiences built around asking better questions and understanding systems deeply.</p><span className="card-tag mono">LEARN BY DOING ↗</span></article>
          </div>
        </div>
      </section>

      <section className="section" id="press">
        <div className="container">
          <div className="quote-panel"><div><div className="eyebrow mono">05 / PRESS & MEDIA</div><div className="quote-mark">“</div></div><div><blockquote>Complex technology doesn’t have to be a black box. With the right questions and a willingness to investigate, there’s always something to learn.</blockquote><p className="mono">MEDIA, INTERVIEWS & COLLABORATIONS</p><a className="button secondary" href="#contact">Media enquiries <ArrowRight size={14}/></a></div></div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <div className="cta-panel"><div className="eyebrow mono">06 / OPEN CHANNEL</div><h2>Have a good question?<br/>Let’s get into it.</h2><p>For speaking, consulting, media, training, or a genuinely interesting collaboration, reach out and tell me what you’re working on.</p><a className="button" href="mailto:hello@joegrand.com">Start a conversation <ArrowRight size={15}/></a><p style={{fontSize:".72rem",marginTop:18,marginBottom:0}}>Replace this placeholder contact address with Joe Grand’s verified preferred contact before launch.</p></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main"><a href="#home" className="brand"><span className="brand-mark">JG_</span><span>JOE GRAND<small>HARDWARE · CURIOSITY · SECURITY</small></span></a><div className="footer-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#videos">Videos</a><a href="#services">Work with me</a><a href="#contact">Contact</a></div></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Joe Grand. Built for the curious.</span><span className="mono">STAY CURIOUS <ScanSearch size={12} style={{display:"inline",verticalAlign:"middle"}}/></span></div>
        </div>
      </footer>
    </main>
  );
}
