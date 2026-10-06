import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { RiseLetters } from "../../kit/rise-letters";
import { SANS } from "./font";
import { CREAM, DARK, REVEAL } from "./timings";

const seed = (i: number, k: number) => {
  const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

const Curtain: React.FC = () => {
  const frame = useCurrentFrame();
  const w = 1920 / REVEAL.bars;
  const glow = ramp(frame, REVEAL.titleAt, REVEAL.titleAt + 30);
  return (
    <AbsoluteFill>
      {Array.from({ length: REVEAL.bars }, (_, i) => {
        const start = REVEAL.curtainFrom + seed(i, 1) * 12;
        const h = ramp(frame, start, start + 22, Easing.out(Easing.cubic)) * (0.45 + 0.5 * seed(i, 2));
        const sway = Math.sin(frame / 18 + i * 0.7) * 0.04;
        const a = 0.55 + 0.35 * seed(i, 3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * w - 1,
              bottom: 0,
              width: w + 2,
              height: `${Math.max(0, h + sway) * 100}%`,
              background: `linear-gradient(to top, rgba(217,119,87,${a}) 0%, rgba(193,151,103,${a * 0.55}) 45%, rgba(193,151,103,0) 100%)`,
              filter: "blur(6px)",
              opacity: 0.6 + 0.4 * glow,
            }}
          />
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 420, background: `radial-gradient(60% 100% at 50% 100%, rgba(255,214,170,${0.35 * glow}) 0%, rgba(255,214,170,0) 100%)` }} />
    </AbsoluteFill>
  );
};

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const introOut = ramp(frame, REVEAL.introOut[0], REVEAL.introOut[1], Easing.in(Easing.cubic));
  const withIn = ramp(frame, REVEAL.withAt, REVEAL.withAt + 12);
  const titleGlow = 1 - ramp(frame, REVEAL.titleAt + 16, REVEAL.titleAt + 50);
  const drift = ramp(frame, REVEAL.titleAt, REVEAL.cut) * 0.04;
  return (
    <AbsoluteFill style={{ background: DARK, fontFamily: SANS }}>
      <Curtain />
      {frame < REVEAL.introOut[1] ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 540, transform: `translateY(calc(-50% - ${introOut * 160}px))`, opacity: 1 - introOut, filter: introOut > 0.02 ? `blur(${introOut * 18}px)` : undefined, textAlign: "center", fontSize: 72, fontWeight: 500, letterSpacing: "-0.02em" }}>
          <RiseLetters text="Introducing" from={REVEAL.introAt} step={2} color={CREAM} />
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, transform: `translateY(-50%) scale(${1 + drift})`, textAlign: "center", fontSize: 250, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
        <RiseLetters text="Opus 5" from={REVEAL.titleAt} step={3} len={10} rise={0.45} color={CREAM} glow={titleGlow} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 650, transform: "translateY(-50%)", textAlign: "center", fontSize: 104, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1 }}>
        <RiseLetters text={["for", " Marketing"]} from={[REVEAL.subAt, REVEAL.subAt + 4]} len={10} color={CREAM} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 780, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, fontSize: 54, fontWeight: 500, color: "#D8D4CB", textShadow: "0 2px 18px rgba(0,0,0,0.55)", opacity: withIn, transform: `translateY(${(1 - withIn) * 16}px)`, filter: withIn < 0.98 ? `blur(${(1 - withIn) * 6}px)` : undefined }}>
        with
        <Img src={staticFile("ryze-sun-white.png")} style={{ width: 56, height: 56 }} />
        <span style={{ color: CREAM }}>Ryze AI</span>
      </div>
    </AbsoluteFill>
  );
};
