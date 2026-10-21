import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Wrench } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { trainingCatalog } from "@/content/site-content";

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
            <p>Joe Grand&apos;s hardware-hacking training explores the concepts and techniques used to understand, manipulate, and assess electronic systems. No prior hardware, electronics, or security experience is required.</p>
          </div>
          <div className="punk-detail-stamp is-lime"><GraduationCap size={42} /><strong>LEARN<br />BY DOING</strong><span>OBSERVE / TEST / UNDERSTAND</span></div>
        </div>
      </section>

      <section className="punk-detail-section">
        <div className="container">
          <div className="punk-detail-intro"><span>IN-PROJECT COURSE CATALOG</span><p>Course summaries and training enquiries live here in the site. Choose a course to start a direct training request without leaving the project.</p></div>
          <div className="punk-course-grid">
            {trainingCatalog.map((course) => <article className="punk-course-card" id={course.slug} key={course.code}><span>{course.code}</span><h2>{course.title}</h2><p>{course.text}</p><Link href={`/pricing?course=${course.slug}`}>Plan dates &amp; pricing <ArrowRight size={15} /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="punk-how-section">
        <div className="container"><p className="punk-kicker">WHAT TO EXPECT</p><h2>Tools out. Questions <em>on.</em></h2><div className="punk-how-grid"><div><span>01</span><strong>OBSERVE</strong><p>Read the board, follow signals, and make the system less mysterious.</p></div><div><span>02</span><strong>TEST</strong><p>Use focused experiments to validate assumptions and find the real behavior.</p></div><div><span>03</span><strong>SHARE</strong><p>Document what worked, what failed, and what someone else can build on.</p></div></div></div>
      </section>

      <section className="punk-mini-cta is-purple">
        <div className="container"><Wrench size={25} /><div><strong>READY FOR THE LAB?</strong><p>For course dates, private sessions, corporate training, or workshop enquiries, send a training request directly through this site.</p></div><Link className="punk-button is-yellow" href="/pricing">Plan dates &amp; pricing <ArrowRight size={15} /></Link></div>
      </section>
      <PunkFooter />
    </main>
  );
}
