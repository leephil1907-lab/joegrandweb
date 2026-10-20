import type { Metadata } from "next";
import { ArrowRight, ExternalLink, GraduationCap, Wrench } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { officialLinks, trainingCatalog } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Training & Workshops",
  description: "Explore Joe Grand's hardware hacking training, workshops, and hands-on learning resources.",
};


export default function TrainingPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="training" />
      <section className="punk-detail-hero is-training">
        <div className="container punk-detail-hero-grid">
          <div>
            <p className="punk-kicker">LEARN BY DOING / WORKSHOPS + TRAINING</p>
            <h1>Bring your<br /><em>curiosity.</em></h1>
            <p>Hands-on technical learning for people who want to better understand the electronic systems around them—by inspecting, testing, and building.</p>
          </div>
          <div className="punk-detail-stamp is-lime"><GraduationCap size={42} /><strong>LEARN<br />BY DOING</strong><span>OBSERVE / TEST / UNDERSTAND</span></div>
        </div>
      </section>

      <section className="punk-detail-section">
        <div className="container">
          <div className="punk-detail-intro"><span>COURSE CATALOG</span><p>These course summaries point to Grand Idea Studio for current availability, course details, and training enquiries.</p></div>
          <div className="punk-course-grid">
            {trainingCatalog.map((course) => <article className="punk-course-card" key={course.code}><span>{course.code}</span><h2>{course.title}</h2><p>{course.text}</p><a href={officialLinks.studioTraining} target="_blank" rel="noopener noreferrer">Course details <ExternalLink size={15} /></a></article>)}
          </div>
        </div>
      </section>

      <section className="punk-how-section">
        <div className="container"><p className="punk-kicker">WHAT TO EXPECT</p><h2>Tools out. Questions <em>on.</em></h2><div className="punk-how-grid"><div><span>01</span><strong>OBSERVE</strong><p>Read the board, follow signals, and make the system less mysterious.</p></div><div><span>02</span><strong>TEST</strong><p>Use focused experiments to validate assumptions and find the real behavior.</p></div><div><span>03</span><strong>SHARE</strong><p>Document what worked, what failed, and what someone else can build on.</p></div></div></div>
      </section>

      <section className="punk-mini-cta is-purple">
        <div className="container"><Wrench size={25} /><div><strong>READY FOR THE LAB?</strong><p>For current course dates, corporate training, and workshop enquiries, use the official training pages.</p></div><a className="punk-button is-yellow" href={officialLinks.studioTraining} target="_blank" rel="noopener noreferrer">Explore training <ArrowRight size={15} /></a></div>
      </section>
      <PunkFooter />
    </main>
  );
}
