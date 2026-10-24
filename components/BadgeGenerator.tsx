"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck, CircuitBoard, Download, Fingerprint, Link2, RefreshCw, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const badgeStyles = [
  { id: "circuit", label: "Circuit" },
  { id: "terminal", label: "Terminal" },
  { id: "signal", label: "Signal" },
  { id: "chip", label: "Chip" },
] as const;

const finishes = [
  { id: "onyx", label: "Onyx alloy" },
  { id: "signal", label: "Signal yellow" },
  { id: "holo", label: "Holographic" },
  { id: "field", label: "Field note" },
] as const;

const accentColors = [
  { id: "#F7D330", label: "Signal Yellow" },
  { id: "#FF3EB8", label: "Poster Pink" },
  { id: "#A4FF23", label: "Workshop Lime" },
  { id: "#B866D1", label: "Pinboard Purple" },
] as const;

const levels = ["Maker", "Explorer", "Reverse Engineer", "Kingpin"] as const;
type BadgeStyle = (typeof badgeStyles)[number]["id"];
type BadgeFinish = (typeof finishes)[number]["id"];

const finishPalette: Record<BadgeFinish, { background: string; surface: string; text: string; muted: string; watermark: string }> = {
  onyx: { background: "#0B0E12", surface: "#171C23", text: "#F5F1E8", muted: "rgba(245,241,232,.58)", watermark: "rgba(245,241,232,.06)" },
  signal: { background: "#D6AD13", surface: "#F7D330", text: "#111111", muted: "rgba(17,17,17,.58)", watermark: "rgba(17,17,17,.09)" },
  holo: { background: "#211143", surface: "#3A1768", text: "#F9F5FF", muted: "rgba(249,245,255,.62)", watermark: "rgba(249,245,255,.08)" },
  field: { background: "#E4DED0", surface: "#F7F2E7", text: "#171717", muted: "rgba(23,23,23,.58)", watermark: "rgba(23,23,23,.08)" },
};

function generateBadgeId() {
  return `JG-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function drawDataMatrix(context: CanvasRenderingContext2D, x: number, y: number, size: number, seed: string, color: string) {
  const cells = 9;
  const cell = size / cells;
  const seedValue = Array.from(seed).reduce((value, char) => value + char.charCodeAt(0), 0);
  context.fillStyle = color;
  for (let row = 0; row < cells; row += 1) {
    for (let column = 0; column < cells; column += 1) {
      const finder = (row < 2 && column < 2) || (row < 2 && column > cells - 3) || (row > cells - 3 && column < 2);
      const fill = finder || ((seedValue + row * 13 + column * 7 + row * column) % 5 < 2);
      if (fill) context.fillRect(x + column * cell, y + row * cell, cell - 1, cell - 1);
    }
  }
}

export default function BadgeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitRef = useRef<HTMLImageElement | null>(null);
  const [portraitReady, setPortraitReady] = useState(false);
  const [handle, setHandle] = useState("");
  const [style, setStyle] = useState<BadgeStyle>("circuit");
  const [finish, setFinish] = useState<BadgeFinish>("onyx");
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
    const sharedFinish = params.get("badgeFinish") as BadgeFinish | null;
    const sharedAccent = params.get("badgeAccent");
    const sharedLevel = params.get("badgeLevel") as (typeof levels)[number] | null;
    const sharedId = params.get("badgeId");

    setBadgeId(sharedId || generateBadgeId());
    if (sharedHandle) setHandle(sharedHandle.slice(0, 14));
    if (sharedStyle && badgeStyles.some((item) => item.id === sharedStyle)) setStyle(sharedStyle);
    if (sharedFinish && finishes.some((item) => item.id === sharedFinish)) setFinish(sharedFinish);
    if (sharedAccent && accentColors.some((color) => color.id === sharedAccent)) setAccent(sharedAccent);

    try {
      const kingpinUnlocked = localStorage.getItem("joegrand-kingpin-protocol-complete") === "true";
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
    const inset = 18;
    const cardWidth = width - inset * 2;
    const cardHeight = height - inset * 2;
    const displayName = (handle.trim() || "HACKER").toUpperCase().replace(/[^A-Z0-9_ .-]/g, "").slice(0, 14) || "HACKER";
    const palette = finishPalette[finish];
    const portrait = portraitRef.current;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#080909";
    context.fillRect(0, 0, width, height);
    context.save();
    context.beginPath();
    context.roundRect(inset, inset, cardWidth, cardHeight, 34);
    context.clip();

    context.fillStyle = palette.background;
    context.fillRect(inset, inset, cardWidth, cardHeight);
    const glow = context.createRadialGradient(width * .83, height * .12, 8, width * .83, height * .12, width * .72);
    glow.addColorStop(0, accent + (finish === "signal" || finish === "field" ? "38" : "66"));
    glow.addColorStop(.48, accent + "15");
    glow.addColorStop(1, accent + "00");
    context.fillStyle = glow;
    context.fillRect(inset, inset, cardWidth, cardHeight);

    if (finish === "holo") {
      const holo = context.createLinearGradient(inset, inset, width - inset, height - inset);
      holo.addColorStop(0, "rgba(247,211,48,.16)");
      holo.addColorStop(.35, "rgba(255,62,184,.15)");
      holo.addColorStop(.7, "rgba(164,255,35,.13)");
      holo.addColorStop(1, "rgba(184,102,209,.16)");
      context.fillStyle = holo;
      context.fillRect(inset, inset, cardWidth, cardHeight);
    }

    context.fillStyle = palette.watermark;
    context.font = "900 205px Impact, sans-serif";
    context.fillText("JG", 40, 305);

    context.strokeStyle = finish === "field" || finish === "signal" ? "rgba(17,17,17,.10)" : "rgba(255,255,255,.08)";
    context.lineWidth = 1;
    for (let x = 32; x < width; x += 28) { context.beginPath(); context.moveTo(x, inset); context.lineTo(x, height - inset); context.stroke(); }
    for (let y = 36; y < height; y += 28) { context.beginPath(); context.moveTo(inset, y); context.lineTo(width - inset, y); context.stroke(); }

    context.fillStyle = accent;
    context.fillRect(inset, inset, 10, cardHeight);
    context.fillRect(56, 62, 160, 5);
    context.fillStyle = palette.text;
    context.font = "800 19px monospace";
    context.fillText("JOE GRAND // KINGPIN", 56, 95);
    context.fillStyle = palette.muted;
    context.font = "600 11px monospace";
    context.fillText("CREATOR SERIES / BADGELIFE FIELD CARD", 57, 117);

    context.save();
    context.fillStyle = finish === "signal" || finish === "field" ? "rgba(255,255,255,.72)" : "rgba(246,241,232,.95)";
    context.beginPath();
    context.roundRect(56, 154, 360, 88, 13);
    context.fill();
    context.fillStyle = "#111";
    let fontSize = 53;
    context.font = `900 ${fontSize}px Impact, sans-serif`;
    while (context.measureText(displayName).width > 330 && fontSize > 24) {
      fontSize -= 2;
      context.font = `900 ${fontSize}px Impact, sans-serif`;
    }
    context.fillText(displayName, 71, 215);
    context.restore();

    context.fillStyle = accent;
    context.font = "800 15px monospace";
    context.fillText(`LEVEL / ${level.toUpperCase()}`, 57, 279);
    context.fillStyle = palette.muted;
    context.font = "600 12px monospace";
    context.fillText(`ISSUE / ${badgeId || "JG-XXXX-0000"}`, 57, 306);
    context.fillText(`FINISH / ${finishes.find((item) => item.id === finish)?.label.toUpperCase()}`, 57, 330);

    const portraitX = 528;
    const portraitY = 84;
    const portraitSize = 120;
    context.save();
    context.fillStyle = accent;
    context.globalAlpha = .2;
    context.beginPath();
    context.roundRect(portraitX - 12, portraitY - 12, portraitSize + 24, portraitSize + 24, 25);
    context.fill();
    context.globalAlpha = 1;
    context.beginPath();
    context.roundRect(portraitX, portraitY, portraitSize, portraitSize, 20);
    context.clip();
    if (portrait && portraitReady) {
      const sourceSize = Math.min(portrait.naturalWidth, portrait.naturalHeight);
      const sourceX = (portrait.naturalWidth - sourceSize) / 2;
      const sourceY = (portrait.naturalHeight - sourceSize) / 2;
      context.drawImage(portrait, sourceX, sourceY, sourceSize, sourceSize, portraitX, portraitY, portraitSize, portraitSize);
    } else {
      context.fillStyle = "#F6F1E5";
      context.fillRect(portraitX, portraitY, portraitSize, portraitSize);
      context.fillStyle = "#111";
      context.font = "900 40px Impact, sans-serif";
      context.fillText("JG", portraitX + 34, portraitY + 76);
    }
    context.restore();
    context.strokeStyle = accent;
    context.lineWidth = 4;
    context.beginPath();
    context.roundRect(portraitX, portraitY, portraitSize, portraitSize, 20);
    context.stroke();
    context.fillStyle = accent;
    context.font = "800 10px monospace";
    context.fillText("JOE GRAND / KINGPIN", portraitX - 2, portraitY + portraitSize + 22);

    context.strokeStyle = accent;
    context.fillStyle = accent;
    if (style === "circuit") {
      context.lineWidth = 2.5;
      for (let row = 0; row < 5; row += 1) {
        const y = 272 + row * 17;
        context.beginPath(); context.moveTo(458, y); context.lineTo(505, y); context.lineTo(520, y + 10); context.lineTo(545, y + 10); context.stroke();
        context.beginPath(); context.arc(545, y + 10, 3.5, 0, Math.PI * 2); context.fill();
      }
    } else if (style === "terminal") {
      context.font = "600 11px monospace";
      ["$ boot kingpin.card", "> identity: verified", "> field mode: active", "> signal: open"].forEach((line, index) => context.fillText(line, 454, 283 + index * 18));
    } else if (style === "signal") {
      context.lineWidth = 3;
      context.beginPath();
      for (let x = 450; x < 662; x += 3) {
        const y = 314 + Math.sin((x - 450) / 10) * 19 + Math.sin((x - 450) / 27) * 7;
        if (x === 450) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.stroke();
    } else {
      context.lineWidth = 2.5;
      context.strokeRect(505, 268, 108, 76);
      for (let index = 0; index < 4; index += 1) {
        const y = 280 + index * 18;
        context.beginPath(); context.moveTo(480, y); context.lineTo(505, y); context.stroke();
        context.beginPath(); context.moveTo(613, y); context.lineTo(638, y); context.stroke();
      }
      context.font = "800 14px monospace";
      context.fillText("JG-01", 526, 313);
    }

    drawDataMatrix(context, 602, 336, 66, badgeId || "KINGPIN", finish === "signal" || finish === "field" ? "#111" : palette.text);
    context.fillStyle = palette.muted;
    context.font = "600 9px monospace";
    context.fillText("GENERATED LOCALLY / KINGPIN BADGE LAB", 57, height - 43);
    context.textAlign = "right";
    context.fillStyle = accent;
    context.fillText("SIGNAL / ACTIVE", width - 57, height - 43);
    context.textAlign = "left";

    context.strokeStyle = accent;
    context.lineWidth = 3;
    context.beginPath();
    context.roundRect(inset, inset, cardWidth, cardHeight, 34);
    context.stroke();
    context.restore();
  }, [accent, badgeId, finish, handle, level, portraitReady, style]);

  useEffect(() => { drawBadge(); }, [drawBadge]);

  function downloadBadge() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const fileName = (handle.trim() || "hacker").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "").slice(0, 32) || "hacker";
    link.download = `joegrand-kingpin-card-${fileName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloaded(true);
  }

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.hash = "badge-generator";
    url.searchParams.set("badgeHandle", handle.trim().slice(0, 14));
    url.searchParams.set("badgeStyle", style);
    url.searchParams.set("badgeFinish", finish);
    url.searchParams.set("badgeAccent", accent);
    url.searchParams.set("badgeLevel", level);
    url.searchParams.set("badgeId", badgeId || generateBadgeId());

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus(true);
      window.setTimeout(() => setShareStatus(false), 2600);
    } catch {
      window.prompt("Copy this link to share your card:", url.toString());
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
    <section id="badge-generator" className="badge-generator-section badge-generator-premium border-t border-line py-16 sm:py-20 lg:py-24">
      <div className="container">
        <Reveal>
          <div className="badge-generator-intro"><div><p className="eyebrow mono">INTERACTIVE / KINGPIN CARD LAB</p><h2 className="section-title">Build a <span className="text-accent">field credential.</span></h2></div><span className="badge-intro-seal"><BadgeCheck size={19} /> LOCAL CREATION</span></div>
          <p className="section-lede">Create a collectible Joe Grand field card with a portrait mark, card finish, signal architecture, and a unique local issue ID. Nothing is uploaded from this studio.</p>
        </Reveal>
        <div className="badge-generator-grid">
          <Reveal>
            <div className="badge-panel badge-control-deck">
              <div className="badge-panel-heading"><span className="badge-panel-icon"><Fingerprint size={19}/></span><div><span className="badge-panel-overline">CARD STUDIO / 01</span><h3>Identity configuration</h3></div></div>
              <label className="badge-field"><span>Hacker handle</span><input value={handle} onChange={(event) => { setHandle(event.target.value.slice(0, 14)); setDownloaded(false); }} maxLength={14} autoComplete="off" placeholder="Enter your handle" /></label>
              <fieldset className="badge-fieldset"><legend>Card finish</legend><div className="badge-finish-options">{finishes.map((item) => <button type="button" key={item.id} aria-pressed={finish === item.id} onClick={() => { setFinish(item.id); setDownloaded(false); }} className={finish === item.id ? "is-active" : ""}>{item.label}</button>)}</div></fieldset>
              <fieldset className="badge-fieldset"><legend>Signal architecture</legend><div className="badge-style-options">{badgeStyles.map((item) => <button type="button" key={item.id} aria-pressed={style === item.id} onClick={() => { setStyle(item.id); setDownloaded(false); }} className={style === item.id ? "is-active" : ""}>{item.label}</button>)}</div></fieldset>
              <fieldset className="badge-fieldset"><legend>Accent signal</legend><div className="badge-color-options">{accentColors.map((color) => <button type="button" key={color.id} aria-label={color.label} title={color.label} aria-pressed={accent === color.id} onClick={() => { setAccent(color.id); setDownloaded(false); }} className={accent === color.id ? "is-active" : ""} style={{ backgroundColor: color.id }}><span className="sr-only">{color.label}</span></button>)}</div><p className="badge-selected-color">{accentColors.find((color) => color.id === accent)?.label}</p></fieldset>
              <fieldset className="badge-fieldset"><legend>Field level</legend><div className="badge-level-options">{levels.map((item) => { const locked = item === "Kingpin" && level !== "Kingpin"; return <button type="button" key={item} aria-pressed={level === item} aria-disabled={locked} title={locked ? "Complete the Kingpin Protocol to unlock this level" : undefined} onClick={() => chooseLevel(item)} className={level === item ? "is-active" : locked ? "is-locked" : ""}>{item}{locked ? <span aria-hidden="true"> · LOCKED</span> : null}</button>; })}</div></fieldset>
              <div className="badge-actions">
                <motion.button type="button" onClick={downloadBadge} whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><Download size={17}/> Download card</motion.button>
                <motion.button type="button" className="badge-secondary-action" onClick={() => { setBadgeId(generateBadgeId()); setDownloaded(false); setShareStatus(false); }} whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><RefreshCw size={16}/> New issue ID</motion.button>
                <button type="button" className="badge-share-action" onClick={copyShareLink}><Link2 size={16}/> Copy share link</button>
              </div>
              {(downloaded || shareStatus) && <p className="badge-download-status" role="status">{shareStatus ? "Share link copied — your full card configuration is included." : "PNG card download requested — ready to collect or share."}</p>}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="badge-preview-panel badge-preview-deck"><div className="badge-panel-heading"><span className="badge-panel-icon"><Sparkles size={19}/></span><div><span className="badge-panel-overline">LIVE PROOF / 02</span><h3>Premium card preview</h3></div></div><div className="badge-canvas-frame"><canvas ref={canvasRef} width={720} height={454} role="img" aria-label={`Kingpin field card for ${handle || "HACKER"}, ${level} level, ${finishes.find((item) => item.id === finish)?.label} finish, and ${style} signal architecture`} /></div><div className="badge-preview-meta"><span>PORTRAIT MARK / JOE GRAND</span><span>ISSUE / {badgeId || "GENERATING"}</span></div><p className="badge-privacy-note">Created locally in your browser. Your handle, card design, and generated PNG stay on your device.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
