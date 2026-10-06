import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { Shimmer, typing } from "../../core/motion";
import { CANVAS, DuoScreen, DUO_TOTAL, foldAt } from "./screen";

const { fontFamily } = loadFont();
const INK = "#171310";
const GOLD = "#C19767";
const PROMPT = "Run my marketing";
const TYPE = [14, 44] as const;
const SEND = 52;

const clamp = (frame: number, a: number, b: number, easing = Easing.out(Easing.cubic)) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE[0], TYPE[1]);
  const sent = frame >= SEND;
  const bubble = clamp(frame, SEND, SEND + 8);
  return (
    <div style={{ position: "absolute", left: CANVAS.w / 2, top: 0, width: CANVAS.w / 2, height: CANVAS.h, fontFamily, color: INK, background: "#FDFAF3" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, display: "flex", alignItems: "center", gap: 18, padding: "0 48px", borderBottom: "2px solid #EFE9DC" }}>
        <Img src={staticFile("ryze-sun.png")} style={{ width: 44, height: 44 }} />
        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>Ryze AI</span>
      </div>
      <div style={{ position: "absolute", left: 48, right: 48, top: 200, fontSize: 42, lineHeight: 1.3, color: "#6B6560" }}>What should we work on today?</div>
      <div style={{ position: "absolute", right: 48, top: 330, maxWidth: 560, background: INK, color: "#FFF", borderRadius: 28, padding: "24px 34px", fontSize: 40, opacity: bubble, transform: `translateY(${(1 - bubble) * 20}px)` }}>{PROMPT}</div>
      <div style={{ position: "absolute", left: 48, top: 470, fontSize: 40, opacity: sent ? clamp(frame, SEND + 10, SEND + 18) : 0 }}>
        <Shimmer text="Assembling your team…" rgb="23,19,16" />
      </div>
      <div style={{ position: "absolute", left: 40, right: 40, bottom: 60, height: 132, borderRadius: 32, background: "#FFF", border: "2px solid #EFE9DC", boxShadow: "0 8px 30px rgba(23,19,16,0.06)", display: "flex", alignItems: "center", padding: "0 36px", fontSize: 40 }}>
        <span style={{ color: typed ? INK : "#A9A39A", flex: 1 }}>{sent ? "" : typed || "Ask Ryze…"}</span>
        <span style={{ width: 80, height: 80, borderRadius: 40, background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(frame, [SEND - 3, SEND, SEND + 5], [1, 0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})` }}>
          <svg width={36} height={36} viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="#FFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </div>
  );
};

const AGENTS = [
  { name: "SEO Optimizer", color: "#F2A008", rows: ["7 best linen sheets for hot sleepers", "Linen vs cotton: what lasts", "How to wash linen bedding"], kind: "list" as const },
  { name: "Paid Ads Optimizer", color: "#1AADF5", rows: ["Summer Sale · Prospecting", "Budget +$120/day → top ad set", "ROAS 1.8 → 3.4"], kind: "list" as const },
  { name: "GEO Optimizer", color: "#E82D99", rows: ["Cited in ChatGPT · 5 answers", "Cited in Claude · 13 answers", "Reddit thread answered"], kind: "list" as const },
  { name: "Creative Director", color: "#27C153", rows: ["away_top-5-31d.jpg", "atoms_top-8-1d.jpg", "baxter-of-california_top-1-9d.jpg"], kind: "thumbs" as const },
];

const Panel: React.FC<{ a: (typeof AGENTS)[number]; at: number; x: number; y: number }> = ({ a, at, x, y }) => {
  const frame = useCurrentFrame();
  const p = clamp(frame, at, at + 10, Easing.out(Easing.back(1.4)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: CANVAS.w / 2 - 60, height: CANVAS.h / 2 - 60, background: "#FFF", borderRadius: 28, border: "2px solid #EFE9DC", boxShadow: "0 10px 40px rgba(23,19,16,0.07)", fontFamily, color: INK, padding: "30px 34px", opacity: Math.min(1, p * 1.5), transform: `scale(${0.85 + 0.15 * p})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 22, height: 22, borderRadius: 11, background: a.color }} />
        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>{a.name}</span>
        <span style={{ marginLeft: "auto", fontSize: 22, fontWeight: 600, color: "#1FA84B", background: "#E6F7EB", borderRadius: 999, padding: "6px 16px" }}>Working</span>
      </div>
      {a.kind === "list"
        ? a.rows.map((r, i) => {
            const rp = clamp(frame, at + 12 + i * 8, at + 20 + i * 8);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: i === 0 ? 36 : 22, fontSize: 34, opacity: rp, transform: `translateX(${(1 - rp) * -12}px)` }}>
                <svg width={26} height={26} viewBox="0 0 24 24"><circle cx={12} cy={12} r={11} fill="#1FA84B" /><path d="M7 12.5l3 3 7-7" stroke="#FFF" strokeWidth={2.5} fill="none" strokeLinecap="round" /></svg>
                {r}
              </div>
            );
          })
        : (
          <div style={{ display: "flex", gap: 16, marginTop: 34 }}>
            {a.rows.map((src, i) => {
              const rp = clamp(frame, at + 12 + i * 8, at + 22 + i * 8, Easing.out(Easing.back(1.5)));
              return <Img key={i} src={staticFile(`creative-wall/${src}`)} style={{ width: 208, height: 208, objectFit: "cover", objectPosition: "top", borderRadius: 16, transform: `scale(${Math.max(0, rp)})`, opacity: rp > 0 ? 1 : 0 }} />;
            })}
          </div>
        )}
    </div>
  );
};

const Team: React.FC<{ at: number }> = ({ at }) => (
  <AbsoluteFill style={{ background: "#FDFAF3" }}>
    <Panel a={AGENTS[0]} at={at} x={40} y={40} />
    <Panel a={AGENTS[1]} at={at + 4} x={CANVAS.w / 2 + 20} y={40} />
    <Panel a={AGENTS[2]} at={at + 8} x={40} y={CANVAS.h / 2 + 20} />
    <Panel a={AGENTS[3]} at={at + 12} x={CANVAS.w / 2 + 20} y={CANVAS.h / 2 + 20} />
  </AbsoluteFill>
);

const Caption: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const frame = useCurrentFrame();
  const p = clamp(frame, at, at + 10);
  return <div style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontFamily, fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: INK, opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>{text}</div>;
};

export const DUO_TEAM_TOTAL = DUO_TOTAL;

export const DuoTeam: React.FC = () => {
  const frame = useCurrentFrame();
  const f = foldAt(frame);
  const swap = interpolate(f, [0.25, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <DuoScreen>
        <div style={{ opacity: 1 - swap }}>
          <Phone />
        </div>
        {swap > 0 ? (
          <div style={{ position: "absolute", inset: 0, opacity: swap }}>
            <Team at={84} />
          </div>
        ) : null}
      </DuoScreen>
      <Caption at={104} text="Your marketing team fits in your pocket. Unfolds when you need it." />
    </AbsoluteFill>
  );
};
