import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { ramp } from "../../core/motion";
import { glowShadow, RiseLetters } from "../../kit/rise-letters";
import { CORAL } from "./timings";

const { fontFamily: SANS } = loadFont();

export const TAIL = { dark: [0, 4] as const, line1At: 4, line2At: 18, pillAt: 36, urlType: [40, 62] as const, url: "get-ryze.ai", end: 76 } as const;
export const TAIL_TOTAL = TAIL.end;

export const TailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const dark = ramp(frame, TAIL.dark[0], TAIL.dark[1]);
  const level = Math.round(253 - 242 * dark);
  const ink = dark > 0.5 ? "#FFFFFF" : "#141413";
  const pillIn = 1 - Math.pow(1 - ramp(frame, TAIL.pillAt, TAIL.pillAt + 8), 3);
  const per = (TAIL.urlType[1] - TAIL.urlType[0]) / TAIL.url.length;
  const typedLen = Math.min(TAIL.url.length, Math.max(0, Math.floor((frame - TAIL.urlType[0]) / per)));
  const pillGlow = frame >= TAIL.pillAt ? 1 - ramp(frame, TAIL.urlType[1], TAIL.end) : 0;
  const lift = ramp(frame, TAIL.pillAt, TAIL.pillAt + 10);
  return (
    <AbsoluteFill style={{ background: `rgb(${level},${level},${level})`, fontFamily: SANS, fontWeight: 700, letterSpacing: "-0.02em" }}>
      {dark > 0.5 && (
        <>
          <div style={{ position: "absolute", left: -250, top: 520, width: 1000, height: 900, borderRadius: 500, background: "radial-gradient(circle, rgba(200,80,45,0.32) 0%, rgba(200,80,45,0) 70%)" }} />
          <div style={{ position: "absolute", left: 1200, top: -350, width: 1000, height: 1000, borderRadius: 500, background: "radial-gradient(circle, rgba(60,80,170,0.32) 0%, rgba(60,80,170,0) 70%)" }} />
        </>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 460 - lift * 110, transform: "translateY(-50%)", textAlign: "center", fontSize: 128, lineHeight: 1, whiteSpace: "pre" }}>
        <RiseLetters text={["No", " more", " engineers."]} from={[TAIL.line1At, TAIL.line1At + 3, TAIL.line1At + 6]} len={8} color={ink} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 600 - lift * 110, transform: "translateY(-50%)", textAlign: "center", fontSize: 128, lineHeight: 1, whiteSpace: "pre" }}>
        <RiseLetters text={["No", " more", " freelancers."]} from={[TAIL.line2At, TAIL.line2At + 3, TAIL.line2At + 6]} len={8} color={CORAL} glow={1 - ramp(frame, TAIL.line2At + 22, TAIL.line2At + 44)} />
      </div>
      {frame >= TAIL.pillAt && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center", transform: "translateY(-50%)" }}>
          <div style={{ height: 150, minWidth: 90, borderRadius: 75, border: `2.5px solid rgba(255,${Math.round(255 - 110 * pillGlow)},${Math.round(255 - 140 * pillGlow)},${0.6 + 0.4 * pillGlow})`, padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "center", opacity: pillIn, transform: `scale(${0.5 + 0.5 * pillIn})`, boxShadow: `0 0 ${16 * pillGlow}px rgba(255,200,180,${0.9 * pillGlow}), 0 0 ${46 * pillGlow}px rgba(240,100,74,${0.85 * pillGlow}), 0 0 ${120 * pillGlow}px rgba(240,100,74,${0.45 * pillGlow})`, fontSize: 58, fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "pre" }}>
            {TAIL.url.split("").map((ch, i) => {
              const at = TAIL.urlType[0] + i * per;
              const cool = ramp(frame, at + 6, at + 22);
              return (
                <span key={i} style={{ display: i < typedLen ? "inline-block" : "none", color: `rgb(${240 + 15 * cool},${100 + 155 * cool},${74 + 181 * cool})`, textShadow: glowShadow(1 - cool) }}>
                  {ch}
                </span>
              );
            })}
            <span style={{ display: "inline-block", width: 3, height: 58, background: "#FFFFFF", marginLeft: 8, opacity: Math.floor(frame / 9) % 2 === 0 ? 1 : 0 }} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
