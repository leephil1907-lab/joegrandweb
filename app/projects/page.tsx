import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, ShieldCheck } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { projectCatalog, socialLinks } from "@/content/site-content";

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
          <div className="punk-detail-intro"><span>06 SIGNALS</span><p>Explore the project field guide without leaving the site. Use the built-in contact route when you want to discuss a project, a collaboration, or a technical question.</p></div>
          <div className="punk-detail-card-grid">
            {projectCatalog.map((project, index) => (
              <article id={project.id} className={`punk-detail-card is-${project.accent}`} key={project.id}>
                <span className="punk-detail-index">0{index + 1}</span>
                <div><p>{project.type}</p><h2>{project.title}</h2><p className="punk-detail-copy">{project.text}</p></div>
                <div className="punk-detail-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link href={`/contact?topic=Project%20enquiry&project=${encodeURIComponent(project.title)}`}>Discuss this project <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="punk-mini-cta">
        <div className="container"><Github size={25} /><div><strong>KEEP EXPLORING</strong><p>For public code and repositories, follow Joe&apos;s GitHub profile. For a direct project conversation, stay here and use the Contact page.</p></div><a className="punk-button is-yellow" href={socialLinks.github} target="_blank" rel="noopener noreferrer">Joe on GitHub <ArrowRight size={15} /></a></div>
      </section>
      <PunkFooter />
    </main>
  );
}
