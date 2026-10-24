"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play, Radio } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/youtube-assets/carousel/wallet-bulk-hack.jpg",
    category: "Hardware security / field log 01",
    title: "$75,000,000 Crypto Wallet Bulk Hack",
    description: "Follow the public investigation from the official Joe Grand YouTube archive.",
  },
  {
    image: "/youtube-assets/carousel/hardware-wallet.jpg",
    category: "Device research / field log 02",
    title: "How I Hacked a Hardware Crypto Wallet",
    description: "A practical question, a physical target, and the details that tell the story.",
  },
  {
    image: "/youtube-assets/carousel/hardware-hacking-workshop.jpg",
    category: "Workshop / field log 03",
    title: "Hardware Hacking with Joe Grand",
    description: "Tools, mindset, and technical curiosity brought into the open.",
  },
  {
    image: "/youtube-assets/carousel/ledger-implant.jpg",
    category: "Reverse engineering / field log 04",
    title: "Reverse Engineering a Ledger Nano X Hardware Implant",
    description: "Work from observable details toward a clearer picture of the system.",
  },
  {
    image: "/youtube-assets/carousel/fault-injection.jpg",
    category: "Fault injection / field log 05",
    title: "Failure Is Not an Option",
    description: "A process-minded exploration of repeatable hardware research.",
  },
] as const;

const swipeThreshold = 48;

export default function SignalCarousel() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const slide = slides[active];
  const autoPlaying = !manuallyPaused && !isInteracting && !reduceMotion;

  function move(next: number, nextDirection = 1) {
    setDirection(nextDirection);
    setActive((next + slides.length) % slides.length);
  }

  function next() {
    setDirection(1);
    setActive((current) => (current + 1) % slides.length);
  }

  function previous() {
    setDirection(-1);
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    if (!autoPlaying) return;
    const timer = window.setInterval(next, 5200);
    return () => window.clearInterval(timer);
  }, [autoPlaying]);

  return (
    <section className="signal-carousel-section" aria-labelledby="signal-carousel-title">
      <div className="container">
        <div className="punk-section-head compact signal-carousel-heading">
          <div>
            <p className="punk-kicker">SIGNAL REEL / OFFICIAL VIDEO ARCHIVE</p>
            <h2 id="signal-carousel-title">A moving <em>field note.</em></h2>
          </div>
          <p>Swipe through a small selection from the official channel. The full archive stays local to this field guide, with every detail one internal route away.</p>
        </div>

        <div
          className="signal-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured Joe Grand video images"
          tabIndex={0}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); next(); }
            if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
          }}
        >
          <div className="signal-carousel-stage">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.figure
                key={slide.image}
                className="signal-carousel-slide"
                custom={direction}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 42, rotate: direction * 1.25, scale: 1.015 }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -32, rotate: direction * -1, scale: .985 }}
                transition={{ duration: reduceMotion ? .12 : .48, ease: [0.22, 1, 0.36, 1] }}
                drag={reduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x <= -swipeThreshold) next();
                  if (info.offset.x >= swipeThreshold) previous();
                }}
              >
                <img src={slide.image} alt={`Official Joe Grand YouTube video image for ${slide.title}`} />
                <div className="signal-carousel-scan" aria-hidden="true" />
              </motion.figure>
            </AnimatePresence>
            <div className="signal-carousel-frame" aria-hidden="true"><i /><i /><i /></div>
            <span className="signal-carousel-count" aria-hidden="true">0{active + 1} / 0{slides.length}</span>
            <div className="signal-carousel-progress" aria-hidden="true"><span key={`${active}-${autoPlaying ? "running" : "paused"}`} className={autoPlaying ? "is-running" : ""} /></div>
          </div>

          <div className="signal-carousel-copy">
            <p className="signal-carousel-category"><Radio size={14} aria-hidden="true" /> {slide.category}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={slide.title} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .25 }}>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </motion.div>
            </AnimatePresence>
            <div className="signal-carousel-actions">
              <Link href="/videos" className="punk-button is-yellow">Open video archive <ArrowRight size={16} /></Link>
              <button type="button" className="signal-carousel-pause" onClick={() => setManuallyPaused((value) => !value)} aria-pressed={manuallyPaused}>
                {manuallyPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                {manuallyPaused ? "Resume reel" : "Pause reel"}
              </button>
            </div>
          </div>

          <div className="signal-carousel-controls" aria-label="Carousel controls">
            <button type="button" onClick={previous} aria-label={`Previous image: ${slides[(active - 1 + slides.length) % slides.length].title}`}><ArrowLeft size={18} /></button>
            <div className="signal-carousel-dots" role="tablist" aria-label="Choose a video image">
              {slides.map((item, index) => <button key={item.image} type="button" role="tab" aria-selected={active === index} aria-label={`Show image ${index + 1}: ${item.title}`} onClick={() => move(index, index > active ? 1 : -1)} className={active === index ? "is-active" : ""} />)}
            </div>
            <button type="button" onClick={next} aria-label={`Next image: ${slides[(active + 1) % slides.length].title}`}><ArrowRight size={18} /></button>
          </div>
          <p className="sr-only" aria-live="polite">Showing image {active + 1} of {slides.length}: {slide.title}</p>
        </div>
      </div>
    </section>
  );
}
