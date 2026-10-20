"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cpu, Lock, Unlock, X, Zap } from "lucide-react";

const SECRET_SEQUENCE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "k", "g"];
const STORAGE_KEY = "joegrand-kingpin-unlocked";
const challenges = [
  { id: 1, title: "Signal Identification", prompt: "A mystery device emits a repeating square wave. Which instrument is best for observing its timing and voltage levels?", options: ["Multimeter", "Oscilloscope", "USB cable", "Screwdriver"], answer: "Oscilloscope", hint: "You need to see voltage changes over time." },
  { id: 2, title: "Firmware Discovery", prompt: "You find labeled pads on a circuit board marked SWDIO and SWCLK. What are they most likely used for?", options: ["Audio output", "Debug and programming", "Power delivery", "Wireless antenna"], answer: "Debug and programming", hint: "SWD is commonly used to access and program ARM-based microcontrollers." },
  { id: 3, title: "Logic Probe", prompt: "A trace on a PCB carries two stable voltage states. What type of signal is this most likely to be?", options: ["Analog audio", "Digital logic", "RF signal", "Thermal output"], answer: "Digital logic", hint: "Two defined states usually represent binary logic." },
];

export default function KingpinProtocol() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [hint, setHint] = useState(false);
  const keyIndex = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try { setUnlocked(localStorage.getItem(STORAGE_KEY) === "true"); } catch { /* Storage may be unavailable. */ }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      const key = event.key.toLowerCase();
      if (key === SECRET_SEQUENCE[keyIndex.current]) {
        keyIndex.current += 1;
        if (keyIndex.current === SECRET_SEQUENCE.length) {
          keyIndex.current = 0;
          setUnlocked(true);
          setOpen(true);
          try { localStorage.setItem(STORAGE_KEY, "true"); } catch { /* Storage may be unavailable. */ }
        }
      } else {
        keyIndex.current = key === SECRET_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const challenge = challenges[current];
  const isCorrect = selected === challenge.answer;
  const allSolved = solved.length === challenges.length;
  function choose(option: string) {
    setSelected(option);
    if (option === challenge.answer && !solved.includes(challenge.id)) setSolved((items) => [...items, challenge.id]);
  }
  function next() {
    setCurrent((value) => (value + 1) % challenges.length);
    setSelected(null);
    setHint(false);
  }

  return <>
    <button type="button" onClick={() => unlocked && setOpen(true)} aria-label="Open secret hardware challenge" title={unlocked ? "Open Kingpin Protocol" : undefined} className={`protocol-mobile-trigger ${unlocked ? "is-unlocked" : ""}`}><Cpu size={16}/></button>
    <AnimatePresence>
      {open && <motion.div className="protocol-backdrop" role="presentation" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.section role="dialog" aria-modal="true" aria-labelledby="protocol-title" className="protocol-modal" onClick={(event) => event.stopPropagation()} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ duration: reduceMotion ? .12 : .28 }}>
          <button type="button" className="protocol-close" onClick={() => setOpen(false)} aria-label="Close challenge"><X size={17}/></button>
          <div className="protocol-title-row"><span className="protocol-lock">{allSolved ? <Unlock size={21}/> : <Lock size={21}/>}</span><div><p className="mono">SECRET UNLOCKED</p><h2 id="protocol-title">Kingpin Protocol</h2></div></div>
          {allSolved ? <div className="protocol-complete"><Zap size={34}/><h3>Protocol complete</h3><p>You solved every challenge. Curiosity, careful observation, and a willingness to dig deeper — that’s the hardware-hacking mindset.</p><span className="mono">STATUS: KINGPIN PROTOCOL COMPLETE</span><button type="button" onClick={() => setOpen(false)}>Return to site</button><button type="button" className="protocol-unlock-badge" onClick={() => { try { localStorage.setItem("joegrand-badge-level", "Kingpin"); localStorage.setItem("joegrand-kingpin-protocol-complete", "true"); } catch { /* Local storage may be unavailable. */ } window.dispatchEvent(new Event("kingpin-protocol-complete")); setOpen(false); window.location.href = "/badge-lab#badge-generator"; }}>Unlock Kingpin badge level →</button></div> : <>
            <div className="protocol-challenge"><span className="mono">CHALLENGE {current + 1} / {challenges.length}</span><h3>{challenge.title}</h3><p>{challenge.prompt}</p></div>
            <div className="protocol-options">{challenge.options.map((option) => <button type="button" key={option} onClick={() => choose(option)} disabled={isCorrect} className={selected ? option === challenge.answer ? "is-correct" : option === selected ? "is-wrong" : "" : ""}>{option}</button>)}</div>
            {selected && <p className={isCorrect ? "protocol-feedback good" : "protocol-feedback"}>{isCorrect ? "Correct. Signal acquired." : "Not quite. Try again — observe the clues carefully."}</p>}
            <div className="protocol-controls"><button type="button" className="protocol-hint" onClick={() => setHint((value) => !value)}>{hint ? "Hide hint" : "Need a hint?"}</button>{isCorrect && <button type="button" className="protocol-next" onClick={next}>{current === challenges.length - 1 ? "Review protocol" : "Next challenge"} →</button>}</div>
            {hint && <p className="protocol-hint-box">{challenge.hint}</p>}
          </>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </>;
}
