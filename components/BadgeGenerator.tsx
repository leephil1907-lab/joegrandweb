"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CircuitBoard, Download, RefreshCw, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const badgeStyles = [
  { id: "circuit", label: "Circuit" },
  { id: "terminal", label: "Terminal" },
  { id: "signal", label: "Signal" },
  { id: "chip", label: "Chip" },
] as const;

const accentColors = [
  { id: "#00E676", label: "Circuit Green" },
  { id: "#22D3EE", label: "Signal Cyan" },
  { id: "#FFB300", label: "Warning Amber" },
  { id: "#FF4D6D", label: "Alert Red" },
] as const;

const levels = ["Maker", "Explorer", "Reverse Engineer", "Kingpin"] as const;
type BadgeStyle = (typeof badgeStyles)[number]["id"];

function generateBadgeId() {
  return `JG-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

export default function BadgeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [handle, setHandle] = useState("");
  const [style, setStyle] = useState<BadgeStyle>("circuit");
  const [accent, setAccent] = useState<string>(accentColors[0].id);
  const [level, setLevel] = useState<(typeof levels)[number]>("Maker");
  const [badgeId, setBadgeId] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setBadgeId(generateBadgeId());
    try {
      if (localStorage.getItem("joegrand-kingpin-unlocked") === "true") {
        localStorage.setItem("joegrand-badge-level", "Kingpin");
        setLevel("Kingpin");
      } else {
        const savedLevel = localStorage.getItem("joegrand-badge-level");
        if (savedLevel && levels.includes(savedLevel as (typeof levels)[number])) setLevel(savedLevel as (typeof levels)[number]);
      }
    } catch { /* Local storage may be unavailable. */ }

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
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#0B0F0C";
    context.fillRect(0, 0, width, height);

    const glow = context.createRadialGradient(width * .78, height * .3, 2, width * .78, height * .3, 260);
    glow.addColorStop(0, accent + "26");
    glow.addColorStop(1, "#0B0F0C00");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(255,255,255,0.065)";
    context.lineWidth = 1;
    for (let x = 20; x < width; x += 32) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let y = 20; y < height; y += 32) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }

    context.strokeStyle = accent;
    context.lineWidth = 3;
    if (style === "chip") {
      context.beginPath();
      context.roundRect(18, 18, width - 36, height - 36, 22);
      context.stroke();
    } else if (style === "signal") {
      context.beginPath();
      context.moveTo(18, 18); context.lineTo(width - 18, 18); context.lineTo(width - 18, height - 18); context.lineTo(18, height - 18); context.closePath(); context.stroke();
      context.beginPath();
      for (let x = 330; x < 560; x += 3) {
        const y = 130 + Math.sin((x - 330) / 12) * 24 + Math.sin((x - 330) / 31) * 9;
        if (x === 330) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.stroke();
    } else {
      context.strokeRect(18, 18, width - 36, height - 36);
    }

    context.fillStyle = accent;
    context.font = "700 18px monospace";
    context.fillText("JOE GRAND // KINGPIN PROTOCOL", 38, 57);
    context.fillStyle = "rgba(232,245,233,.66)";
    context.font = "400 13px monospace";
    context.fillText("HARDWARE HACKING BADGE", 40, 80);

    context.save();
    context.beginPath(); context.rect(38, 102, 265, 75); context.clip();
    context.fillStyle = "#E8F5E9";
    let fontSize = 48;
    context.font = `800 ${fontSize}px monospace`;
    while (context.measureText(displayName).width > 260 && fontSize > 20) {
      fontSize -= 2; context.font = `800 ${fontSize}px monospace`;
    }
    context.fillText(displayName, 40, 158);
    context.restore();

    context.fillStyle = accent;
    context.font = "700 16px monospace";
    context.fillText(`LEVEL: ${level.toUpperCase()}`, 40, 204);
    context.fillStyle = "rgba(232,245,233,.6)";
    context.font = "400 13px monospace";
    context.fillText(`ID: ${badgeId || "JG-XXXX-0000"}`, 40, 230);

    context.strokeStyle = accent;
    context.fillStyle = accent;
    if (style === "circuit") {
      context.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const startX = 330 + i * 14;
        const startY = 116 + i * 23;
        context.beginPath(); context.moveTo(startX, startY); context.lineTo(startX + 48, startY); context.lineTo(startX + 70, startY + 20); context.stroke();
        context.beginPath(); context.arc(startX + 70, startY + 20, 3.5, 0, Math.PI * 2); context.fill();
      }
    } else if (style === "terminal") {
      context.font = "400 13px monospace";
      ["$ init badge --secure", "> loading firmware", "> signal acquired", "> access: granted"].forEach((line, i) => context.fillText(line, 320, 122 + i * 27));
      context.fillRect(320, 226, 8, 13);
    } else if (style === "signal") {
      context.lineWidth = 2.5;
      context.beginPath();
      for (let x = 320; x < 565; x += 3) {
        const y = 155 + Math.sin((x - 320) / 13) * 28;
        if (x === 320) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.stroke();
      context.globalAlpha = .45;
      context.beginPath(); context.moveTo(320, 155); context.lineTo(565, 155); context.stroke();
      context.globalAlpha = 1;
    } else {
      context.lineWidth = 2.5;
      context.strokeRect(385, 112, 128, 105);
      for (let i = 0; i < 5; i++) {
        const y = 123 + i * 20;
        context.beginPath(); context.moveTo(355, y); context.lineTo(385, y); context.stroke();
        context.beginPath(); context.moveTo(513, y); context.lineTo(543, y); context.stroke();
      }
      context.font = "700 17px monospace";
      context.fillText("JG-01", 414, 169);
      context.font = "10px monospace";
      context.fillText("MCU", 430, 190);
    }

    context.fillStyle = "rgba(232,245,233,.48)";
    context.font = "400 11px monospace";
    context.fillText("GENERATED LOCALLY / JOEGRAND.COM", 40, height - 34);
    context.textAlign = "right";
    context.fillStyle = accent;
    context.fillText("SIGNAL: ACTIVE", width - 40, height - 34);
    context.textAlign = "left";
  }, [handle, style, accent, level, badgeId]);

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

  function chooseLevel(nextLevel: (typeof levels)[number]) {
    if (nextLevel === "Kingpin") {
      let isUnlocked = false;
      try { isUnlocked = localStorage.getItem("joegrand-kingpin-unlocked") === "true"; } catch { /* Local storage may be unavailable. */ }
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
              <div className="badge-actions"><motion.button type="button" onClick={downloadBadge} whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><Download size={17}/> Download PNG</motion.button><motion.button type="button" className="badge-secondary-action" onClick={() => { setBadgeId(generateBadgeId()); setDownloaded(false); }} whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: .98 }}><RefreshCw size={16}/> New badge ID</motion.button></div>
              {downloaded && <p className="badge-download-status" role="status">PNG download requested — your badge is ready to share.</p>}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="badge-preview-panel"><div className="badge-panel-heading"><span className="badge-panel-icon"><Sparkles size={19}/></span><h3>Live badge preview</h3></div><div className="badge-canvas-frame"><canvas ref={canvasRef} width={600} height={340} role="img" aria-label={`Badge preview for ${handle || "HACKER"}, level ${level}, ${style} style`} /></div><p className="badge-privacy-note">Your badge is drawn locally in your browser. Your handle is not uploaded to a server.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
