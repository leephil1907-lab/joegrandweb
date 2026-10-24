import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Joe Grand — Hardware Hacker, Engineer & Educator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#101012", color: "#f7f1e6", fontFamily: "Arial, sans-serif" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: .2, backgroundImage: "linear-gradient(rgba(247,211,48,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(247,211,48,.45) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <div style={{ position: "absolute", width: 720, height: 720, top: -390, right: -110, display: "flex", borderRadius: 999, border: "76px solid #f7d330", opacity: .95 }} />
        <div style={{ position: "absolute", width: 470, height: 18, top: 80, right: 110, display: "flex", background: "#ff3eb8", transform: "rotate(-5deg)" }} />
        <div style={{ position: "absolute", width: 280, height: 12, bottom: 35, left: 70, display: "flex", background: "#a4ff23", transform: "rotate(2deg)" }} />
        <div style={{ zIndex: "1", display: "flex", width: "100%", flexDirection: "column", justifyContent: "space-between", padding: "64px 74px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 74, height: 74, display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid #ff3eb8", color: "#ff3eb8", fontSize: 35, fontWeight: 900, transform: "rotate(-5deg)" }}>JG</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 800, letterSpacing: 5 }}>JOE GRAND <span style={{ color: "#f7d330", marginLeft: 16 }}>• KINGPIN</span></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <div style={{ display: "flex", color: "#ff3eb8", fontSize: 17, fontWeight: 800, letterSpacing: 4 }}>HARDWARE HACKER • ENGINEER • EDUCATOR</div>
            <div style={{ display: "flex", marginTop: 16, fontSize: 82, fontWeight: 900, letterSpacing: -3, lineHeight: .9 }}>CURIOSITY IS A <span style={{ color: "#f7d330", marginLeft: 12, fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>superpower.</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#d7d0c7", fontSize: 20 }}><span style={{ color: "#a4ff23", fontWeight: 800 }}>HARDWARE HACKING</span><span> / </span><span>SECURITY RESEARCH</span><span> / </span><span>CREATIVE ENGINEERING</span></div>
        </div>
      </div>
    ),
    size,
  );
}
