import type { Metadata } from "next";
import { ArrowRight, CircuitBoard, Sparkles } from "lucide-react";
import BadgeGenerator from "@/components/BadgeGenerator";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";

export const metadata: Metadata = {
  title: "Kingpin Badge Lab",
  description: "Create, preview, share, and download a custom Joe Grand Kingpin Badge locally in your browser.",
};

export default function BadgeLabPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="badge lab" />
      <section className="punk-detail-hero is-training">
        <div className="container punk-detail-hero-grid">
          <div>
            <p className="punk-kicker">INTERACTIVE / BADGELIFE</p>
            <h1>Build your<br /><em>signal.</em></h1>
            <p>Set a handle, tune the accent signal, select a badge style, and generate a shareable Kingpin Badge—drawn locally in your own browser.</p>
          </div>
          <div className="punk-detail-stamp is-lime"><CircuitBoard size={41} /><strong>BADGE<br />LAB</strong><span>CREATE / EXPORT / SHARE</span></div>
        </div>
      </section>
      <BadgeGenerator />
      <section className="punk-mini-cta is-purple">
        <div className="container"><Sparkles size={25} /><div><strong>UNLOCK THE KINGPIN LEVEL</strong><p>Complete the secret hardware challenge to unlock the Kingpin level, then return to this lab to build the badge.</p></div><a className="punk-button is-yellow" href="#badge-generator">Back to generator <ArrowRight size={15} /></a></div>
      </section>
      <PunkFooter />
    </main>
  );
}
