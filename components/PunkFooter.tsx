import Link from "next/link";

export default function PunkFooter() {
  return (
    <footer className="punk-footer">
      <div className="container punk-footer-inner">
        <div><span className="punk-brand-mark">JG</span><strong>JOE GRAND <b>• KINGPIN</b></strong><p>Hardware hacking, electronics, security research, and creative engineering.</p></div>
        <div className="punk-footer-links"><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/videos">Videos</Link><Link href="/training">Training</Link><Link href="/community">Community</Link><Link href="/contact">Contact</Link><Link href="/badge-lab">Badge Lab</Link><Link href="/privacy">Privacy</Link></div>
        <p className="punk-footer-note">© {new Date().getFullYear()} Joe Grand. All rights reserved.<br />Independent reference-inspired interface rebuild.</p>
      </div>
    </footer>
  );
}
