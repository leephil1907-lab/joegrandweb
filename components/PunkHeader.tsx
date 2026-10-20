"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Menu, X, Youtube } from "lucide-react";

const youtube = "https://www.youtube.com/@JoeGrand";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/videos", label: "Videos" },
  { href: "/training", label: "Training" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
  { href: "/badge-lab", label: "Badge Lab" },
];

type PunkHeaderProps = { active?: string };

export default function PunkHeader({ active }: PunkHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="punk-header">
      <a className="punk-skip-link" href="#main-content">Skip to main content</a>
      <div className="punk-nav container">
        <Link className="punk-brand" href="/" aria-label="Joe Grand home" onClick={closeMenu}>
          <span className="punk-brand-mark">JG</span>
          <span>JOE GRAND <b>• KINGPIN</b></span>
        </Link>
        <button className="punk-menu-button" onClick={() => setMenuOpen((isOpen) => !isOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`punk-nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href} onClick={closeMenu} aria-current={active === link.label.toLowerCase() ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <a className="punk-nav-cta" href={youtube} target="_blank" rel="noopener noreferrer"><Youtube size={15} /> YouTube <ExternalLink size={13} /></a>
      </div>
    </header>
  );
}
