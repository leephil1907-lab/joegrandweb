import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Play, Youtube } from "lucide-react";
import PunkFooter from "@/components/PunkFooter";
import PunkHeader from "@/components/PunkHeader";
import { featuredVideos, socialLinks } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch Joe Grand's public videos on hardware hacking, cryptocurrency wallets, reverse engineering, and engineering research.",
};


export default function VideosPage() {
  return (
    <main id="main-content" className="site-shell punk-site">
      <PunkHeader active="videos" />
      <section className="punk-detail-hero is-video">
        <div className="container punk-detail-hero-grid">
          <div>
            <p className="punk-kicker">WATCH + LEARN / PUBLIC ARCHIVE</p>
            <h1>Take the<br /><em>long way in.</em></h1>
            <p>Videos are where hardware research becomes a shared investigation: careful observation, experiments, failures, and the story behind a device.</p>
          </div>
          <a className="punk-video-hero-card" href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={48} /><strong>JOE GRAND<br />ON YOUTUBE</strong><span>Videos, talks, projects <ExternalLink size={14} /></span></a>
        </div>
      </section>

      <section className="punk-detail-section is-paper">
        <div className="container">
          <div className="punk-detail-intro"><span>FEATURED FEED</span><p>Five selected public videos from the channel. Use the official YouTube channel for the full and current catalog.</p></div>
          <div className="punk-library-grid">
            {featuredVideos.map((video, index) => (
              <a className="punk-library-card" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" key={video.id}>
                <span className="punk-library-thumb" style={{ backgroundImage: `linear-gradient(180deg, rgba(12,12,12,.04), rgba(12,12,12,.72)), url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }}>
                  <small>0{index + 1} / {video.category}</small><b><Play size={22} fill="currentColor" /></b>
                </span>
                <span className="punk-library-info"><small>{video.category}</small><strong>{video.title}</strong><p>{video.description}</p><em>Watch on YouTube <ArrowRight size={14} /></em></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="punk-mini-cta is-purple">
        <div className="container"><Play size={25} fill="currentColor" /><div><strong>DON’T MISS A SIGNAL</strong><p>The official channel is the best place to find new uploads, playlists, talks, and field notes.</p></div><a className="punk-button is-yellow" href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">Visit YouTube <ArrowRight size={15} /></a></div>
      </section>
      <PunkFooter />
    </main>
  );
}
