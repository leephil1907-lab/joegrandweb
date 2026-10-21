"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CircuitBoard, Download, Link2, RefreshCw, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const badgeStyles = [
  { id: "circuit", label: "Circuit" },
  { id: "terminal", label: "Terminal" },
  { id: "signal", label: "Signal" },
  { id: "chip", label: "Chip" },
] as const;

const accentColors = [
  { id: "#F7D330", label: "Signal Yellow" },
  { id: "#FF3EB8", label: "Poster Pink" },
  { id: "#A4FF23", label: "Workshop Lime" },
  { id: "#B866D1", label: "Pinboard Purple" },
] as const;

const levels = ["Maker", "Explorer", "Reverse Engineer", "Kingpin"] as const;
type BadgeStyle = (typeof badgeStyles)[number]["id"];

function generateBadgeId() {
  return `JG-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

export default function BadgeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitRef = useRef<HTMLImageElement | null>(null);
  const [portraitReady, setPortraitReady] = useState(false);
  const [handle, setHandle] = useState("");
  const [style, setStyle] = useState<BadgeStyle>("circuit");
  const [accent, setAccent] = useState<string>(accentColors[0].id);
  const [level, setLevel] = useState<(typeof levels)[number]>("Maker");
  const [badgeId, setBadgeId] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const portrait = new Image();
    portrait.onload = () => {
      portraitRef.current = portrait;
      setPortraitReady(true);
    };
    portrait.src = "/youtube-assets/joe-grand-youtube-avatar.jpg";
    return () => { portrait.onload = null; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedHandle = params.get("badgeHandle");
    const sharedStyle = params.get("badgeStyle") as BadgeStyle | null;
    const sharedAccent = params.get("badgeAccent");
    const sharedLevel = params.get("badgeLevel") as (typeof levels)[number] | null;
    const sharedId = params.get("badgeId");

    setBadgeId(sharedId || generateBadgeId());
    if (sharedHandle) setHandle(sharedHandle.slice(0, 14));
    if (sharedStyle && badgeStyles.some((item) => item.id === sharedStyle)) setStyle(sharedStyle);
    if (sharedAccent && accentColors.some((color) => color.id === sharedAccent)) setAccent(sharedAccent);

    let kingpinUnlocked = false;
    try {
      kingpinUnlocked = localStorage.getItem("joegrand-kingpin-protocol-complete") === "true";
      if (kingpinUnlocked) {
        localStorage.setItem("joegrand-badge-level", "Kingpin");
        setLevel("Kingpin");
      } else if (sharedLevel && levels.includes(sharedLevel) && sharedLevel !== "Kingpin") {
        setLevel(sharedLevel);
      } else {
        const savedLevel = localStorage.getItem("joegrand-badge-level");
        if (savedLevel && levels.includes(savedLevel as (typeof levels)[number])) setLevel(savedLevel as (typeof levels)[number]);
      }
    } catch {
      if (sharedLevel && levels.includes(sharedLevel) && sharedLevel !== "Kingpin") setLevel(sharedLevel);
    }

    const handleProtocolComplete = () => {
      setLevel("Kingpin");
      try { localStorage.setItem("joegrand-badge-level", "Kingpin"); } catch { /* Local storage may be unavailable. */ }
    };
    window.addEventListener("kingpin-protocol-complete", handleProtocolComplete);
    return () => window.removeEventListener("kingpin-protocol-complete", handleProtocolComplete);
  }, []);

  const drawBadge = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const width = canvas.width;
    const height = canvas.height;
    const displayName = (handle.trim() || "HACKER").toUpperCase().replace(/[^A-Z0-9_ .-]/g, "").slice(0, 14) || "HACKER";
    const portrait = portraitRef.current;

    context.clearRect(0, 0, width, height);
    context.save();
    context.beginPath();
    context.roundRect(10, 10, width - 20, height - 20, 24);
    context.clip();

    context.fillStyle = "#101010";
    context.fillRect(0, 0, width, height);

    const glow = context.createRadialGradient(width * .82, height * .18, 3, width * .82, height * .18, 280);
    glow.addColorStop(0, accent + "4D");
    glow.addColorStop(.5, accent + "14");
    glow.addColorStop(1, "#10101000");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    context.fillStyle = accent;
    context.fillRect(0, 0, 12, height);
    context.fillStyle = "rgba(255,255,255,.06)";
    context.fillRect(24, 0, 1, height);

    context.strokeStyle = "rgba(255,255,255,.075)";
    context.lineWidth = 1;
    for (let x = 32; x < width; x += 30) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let y = 24; y < height; y += 30) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }

    context.fillStyle = accent;
    context.fillRect(38, 34, 150, 4);
    context.fillStyle = "#F6F1E5";
    context.font = "700 17px monospace";
    context.fillText("JOE GRAND // KINGPIN", 38, 59);
    context.fillStyle = "rgba(246,241,229,.62)";
    context.font = "400 11px monospace";
    context.fillText("FIELD AUTHORIZATION BADGE", 40, 79);

    context.save();
    context.fillStyle = accent;
    context.globalAlpha = .16;
    context.beginPath();
    context.arc(504, 94, 62, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;
    context.beginPath();
    context.arc(504, 94, 47, 0, Math.PI * 2);
    context.clip();
    if (portrait && portraitReady) {
      const sourceSize = Math.min(portrait.naturalWidth, portrait.naturalHeight);
      const sourceX = (portrait.naturalWidth - sourceSize) / 2;
      const sourceY = (portrait.naturalHeight - sourceSize) / 2;
      context.drawImage(portrait, sourceX, sourceY, sourceSize, sourceSize, 457, 47, 94, 94);
    } else {
      context.fillStyle = "#F6F1E5";
      context.fillRect(457, 47, 94, 94);
      context.fillStyle = "#111";
      context.font = "800 31px monospace";
      context.fillText("JG", 477, 105);
    }
    context.restore();
    context.strokeStyle = accent;
    context.lineWidth = 3;
    context.beginPath();
    context.arc(504, 94, 49, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = accent;
    context.font = "700 9px monospace";
    context.fillText("JOE GRAND / KINGPIN", 447, 157);

    context.save();
    context.fillStyle = "#F6F1E5";
    context.fillRect(38, 105, 312, 77);
    context.fillStyle = "#111";
    let fontSize = 47;
    context.font = `800 ${fontSize}px monospace`;
    while (context.measureText(displayName).width > 292 && fontSize > 19) {
      fontSize -= 2;
      context.font = `800 ${fontSize}px monospace`;
    }
    context.fillText(displayName, 48, 157);
    context.restore();

    context.fillStyle = accent;
    context.font = "700 15px monospace";
    context.fillText(`LEVEL: ${level.toUpperCase()}`, 40, 211);
    context.fillStyle = "rgba(246,241,229,.65)";
    context.font = "400 12px monospace";
    context.fillText(`BADGE ID: ${badgeId || "JG-XXXX-0000"}`, 40, 234);
    context.fillText("STATUS: SIGNAL VERIFIED", 40, 256);

    context.strokeStyle = accent;
    context.fillStyle = accent;
    if (style === "circuit") {
      context.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const startX = 370 + i * 11;
        const startY = 177 + i * 20;
        context.beginPath(); context.moveTo(startX, startY); context.lineTo(startX + 42, startY); context.lineTo(startX + 58, startY + 14); context.stroke();
        context.beginPath(); context.arc(startX + 58, startY + 14, 3, 0, Math.PI * 2); context.fill();
      }
    } else if (style === "terminal") {
      context.font = "400 11px monospace";
      ["$ badge init --secure", "> checking signal", "> kingpin verified", "> access granted"].forEach((line, i) => context.fillText(line, 370, 183 + i * 20));
      context.fillRect(370, 263, 7, 11);
    } else if (style === "signal") {
      context.lineWidth = 2.5;
      context.beginPath();
      for (let x = 365; x < 558; x += 3) {
        const y = 218 + Math.sin((x - 365) / 11) * 25 + Math.sin((x - 365) / 31) * 7;
        if (x === 365) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.stroke();
      context.globalAlpha = .4;
      context.beginPath(); context.moveTo(365, 218); context.lineTo(558, 218); context.stroke();
      context.globalAlpha = 1;
    } else {
      context.lineWidth = 2.5;
      context.strokeRect(425, 177, 98, 82);
      for (let i = 0; i < 4; i++) {
        const y = 188 + i * 20;
        context.beginPath(); context.moveTo(398, y); context.lineTo(425, y); context.stroke();
        context.beginPath(); context.moveTo(523, y); context.lineTo(550, y); context.stroke();
      }
      context.font = "700 15px monospace";
      context.fillText("JG-01", 444, 221);
      context.font = "10px monospace";
      context.fillText("MCU", 456, 241);
    }

    context.strokeStyle = accent;
    context.lineWidth = 3;
    context.beginPath();
    context.roundRect(10, 10, width - 20, height - 20, 24);
    context.stroke();
    context.restore();

    context.fillStyle = "rgba(246,241,229,.52)";
    context.font = "400 10px monospace";
    context.fillText("GENERATED LOCALLY / KINGPIN BADGE LAB", 40, height - 28);
    context.textAlign = "right";
    context.fillStyle = accent;
    context.fillText("SIGNAL: ACTIVE", width - 40, height - 28);
    context.textAlign = "left";
  }, [handle, style, accent, level, badgeId, portraitReady]);

  useEffect(() => { drawBadge(); }, [drawBadge]);

  function downloadBadge() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const fileName = (handle.trim() || "hacker").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "").slice(0, 32) || "hacker";
    link.download = `joegrand-kingpin-badge-${fileName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloaded(true);
  }

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.hash = "badge-generator";
    url.searchParams.set("badgeHandle", handle.trim().slice(0, 14));
    url.searchParams.set("badgeStyle", style);
    url.searchParams.set("badgeAccent", accent);
    url.searchParams.set("badgeLevel", level);
    url.searchParams.set("badgeId", badgeId || generateBadgeId());

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus(true);
      window.setTimeout(() => setShareStatus(false), 2600);
    } catch {
      window.prompt("Copy this link to share your badge:", url.toString());
    }
  }

  function chooseLevel(nextLevel: (typeof levels)[number]) {
    if (nextLevel === "Kingpin") {
      let isUnlocked = false;
      try { isUnlocked = localStorage.getItem("joegrand-kingpin-protocol-complete") === "true"; } catch { /* Local storage may be unavailable. */ }
      if (!isUnlocked) return;
    }
    setLevel(nextLevel);
    try { localStorage.setItem("joegrand-badge-level", nextLevel); } catch { /* Local storage may be unavailable. */ }
  }

  return (
    <section id="badge-generator" className="badge-generator-section border-t border-line py-16 sm:py-20 lg:py-24">
      <div className="container">
        <Reveal>
          <p className="eyebrow mono">INTERACTIVE / BADGELIFE</p>
          <h2 className="section-title">Create Your <span className="text-accent">Kingpin Badge</span></h2>
          <p className="section-lede">Choose a handle, select your badge style, pick an accent signal, and generate your own hardware-hacking badge. Complete the Kingpin Protocol to unlock the Kingpin badge level.</p>
        </Reveal>
        <div className="badge-generator-grid">
          <Reveal>
            <div className="badge-panel">
              <div className="badge-panel-heading"><span className="badge-panel-icon"><CircuitBoard size={19}/></span><h3>Badge configuration</h3></div>
              <label className="badge-field"><span>Hacker handle</span><input value={handle} onChange={(event) => { setHandle(event.target.value.slice(0, 14)); setDownloaded(false); }} maxLength={14} autoComplete="off" placeholder="Enter your handle" /></label>
              <fieldset className="badge-fieldset"><legend>Badge style</legend><div className="badge-style-options">{badgeStyles.map((item) => <button type="button" key={item.id} aria-pressed={style === item.id} onClick={() => { setStyle(item.id); setDownloaded(false); }} className={style === item.id ? "is-active" : ""}>{item.label}</button>)}</div></fieldset>
              <fieldset className="badge-fieldset"><legend>Accent signal</legend><div className="badge-color-options">{accentColors.map((color) => <button type="button" key={color.id} aria-label={color.label} title={color.label} aria-pressed={accent === color.id} onClick={() => { setAccent(color.id); setDownloaded(false); }} className={accent === color.id ? "is-active" : ""} style={{ backgroundColor: color.id }}><span className="sr-only">{color.label}</span></button>)}</div><p className="badge-selected-color">{accentColors.find((color) => color.id === accent)?.label}</p></fieldset>
              <fieldset className="badge-fieldset"><legend>Hacker level</legend><div className="badge-level-options">{levels.map((item) => { const locked = item === "Kingpin" && level !== "Kingpin"; return <button type="button" key={item} aria-pressed={level === item} aria-disabled={locked} title={locked ? "Complete the Kingpin Protocol to unlock this level" : undefined} onClick={() => chooseLevel(item)} className={level === item ? "is-active" : locked ? "is-locked" : ""}>{item}{locked ? <span aria-hidden="true"> · LOCKED</span> : null}</button>; })}</div></fieldset>
              <div className="badge-actions">
                <motion.button type="button" onClick={downloadBadge} whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><Download size={17}/> Download PNG</motion.button>
                <motion.button type="button" className="badge-secondary-action" onClick={() => { setBadgeId(generateBadgeId()); setDownloaded(false); setShareStatus(false); }} whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><RefreshCw size={16}/> New badge ID</motion.button>
                <button type="button" className="badge-share-action" onClick={copyShareLink}><Link2 size={16}/> Copy share link</button>
              </div>
              {(downloaded || shareStatus) && <p className="badge-download-status" role="status">{shareStatus ? "Share link copied — send your badge configuration to a friend." : "PNG download requested — your badge is ready to share."}</p>}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="badge-preview-panel"><div className="badge-panel-heading"><span className="badge-panel-icon"><Sparkles size={19}/></span><h3>Live badge preview</h3></div><div className="badge-canvas-frame"><canvas ref={canvasRef} width={600} height={340} role="img" aria-label={`Kingpin badge preview for ${handle || "HACKER"}, level ${level}, ${style} style, with Joe Grand portrait mark`} /></div><p className="badge-privacy-note">Your badge is drawn locally in your browser. Your handle is not uploaded to a server.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
