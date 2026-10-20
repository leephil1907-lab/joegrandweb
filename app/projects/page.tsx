import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Github, ShieldCheck } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { officialLinks, projectCatalog } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Projects & Research",
  description: "A field guide to Joe Grand's hardware hacking projects, security research, electronic badges, and engineering work.",
};


export default function ProjectsPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="projects" />
      <section className="punk-detail-hero">
        <div className="container punk-detail-hero-grid">
          <div>
            <p className="punk-kicker">FIELD GUIDE / PROJECTS + ENGINEERING</p>
            <h1>Open it up.<br /><em>Follow the clues.</em></h1>
            <p>A curated starting point for hardware hacking, security research, tools, badges, and the kind of engineering work that rewards close attention.</p>
          </div>
          <div className="punk-detail-stamp"><ShieldCheck size={39} /><strong>NOT A<br />BLACK BOX</strong><span>RESEARCH / TOOLS / BADGES</span></div>
        </div>
      </section>

      <section className="punk-detail-section">
        <div className="container">
          <div className="punk-detail-intro"><span>06 SIGNALS</span><p>Each card points to the authoritative external project, studio, or media destination—so the work stays connected to its original home.</p></div>
          <div className="punk-detail-card-grid">
            {projectCatalog.map((project, index) => (
              <article id={project.id} className={`punk-detail-card is-${project.accent}`} key={project.id}>
                <span className="punk-detail-index">0{index + 1}</span>
                <div><p>{project.type}</p><h2>{project.title}</h2><p className="punk-detail-copy">{project.text}</p></div>
                <div className="punk-detail-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a href={project.href} target="_blank" rel="noopener noreferrer">{project.action} <ExternalLink size={15} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="punk-mini-cta">
        <div className="container"><Github size={25} /><div><strong>KEEP EXPLORING</strong><p>Code, videos, talks, and external research links make better companions than a static portfolio.</p></div><a className="punk-button is-yellow" href={officialLinks.github} target="_blank" rel="noopener noreferrer">Joe on GitHub <ArrowRight size={15} /></a></div>
      </section>
      <PunkFooter />
    </main>
  );
}
