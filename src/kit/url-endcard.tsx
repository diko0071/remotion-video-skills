import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "../core/motion";
import { glowShadow, RiseLetters } from "./rise-letters";

export type UrlEndcardTimings = { dark: readonly [number, number]; lineAt: number; line2At: number; pillAt: number; urlType: readonly [number, number]; end: number };

export const UrlEndcard: React.FC<{ t: UrlEndcardTimings; title: string; line: readonly string[]; url: string; fontFamily: string; accent: string }> = ({ t, title, line, url, fontFamily, accent }) => {
  const frame = useCurrentFrame();
  const dark = ramp(frame, t.dark[0], t.dark[1]);
  const level = Math.round(253 - 242 * dark);
  const ink = dark > 0.5 ? "#FFFFFF" : "#141413";
  const pillIn = 1 - Math.pow(1 - ramp(frame, t.pillAt, t.pillAt + 8), 3);
  const per = (t.urlType[1] - t.urlType[0]) / url.length;
  const typedLen = Math.min(url.length, Math.max(0, Math.floor((frame - t.urlType[0]) / per)));
  const pillGlow = frame >= t.pillAt ? 1 - ramp(frame, t.urlType[1], t.end) : 0;
  const lift = ramp(frame, t.pillAt, t.pillAt + 10);
  return (
    <AbsoluteFill style={{ background: `rgb(${level},${level},${level})`, fontFamily, fontWeight: 600, letterSpacing: "-0.02em" }}>
      {dark > 0.5 && (
        <>
          <div style={{ position: "absolute", left: -250, top: 520, width: 1000, height: 900, borderRadius: 500, background: "radial-gradient(circle, rgba(200,80,45,0.32) 0%, rgba(200,80,45,0) 70%)" }} />
          <div style={{ position: "absolute", left: 1200, top: -350, width: 1000, height: 1000, borderRadius: 500, background: "radial-gradient(circle, rgba(60,80,170,0.32) 0%, rgba(60,80,170,0) 70%)" }} />
        </>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470 - lift * 110, transform: "translateY(-50%)", textAlign: "center", fontSize: 150, lineHeight: 1, whiteSpace: "pre" }}>
        <RiseLetters text={title} from={t.lineAt} step={3} color={accent} glow={1 - ramp(frame, t.lineAt + 20, t.lineAt + 40)} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 590 - lift * 110, transform: "translateY(-50%)", textAlign: "center", fontSize: 86, lineHeight: 1, whiteSpace: "pre" }}>
        <RiseLetters text={line} from={line.map((_, i) => t.line2At + i * 3)} len={8} color={ink} />
      </div>
      {frame >= t.pillAt && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", transform: "translateY(-50%)" }}>
          <div style={{ height: 150, minWidth: 90, borderRadius: 75, border: `2.5px solid rgba(255,${Math.round(255 - 110 * pillGlow)},${Math.round(255 - 140 * pillGlow)},${0.6 + 0.4 * pillGlow})`, padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "center", opacity: pillIn, transform: `scale(${0.5 + 0.5 * pillIn})`, boxShadow: `0 0 ${16 * pillGlow}px rgba(255,200,180,${0.9 * pillGlow}), 0 0 ${46 * pillGlow}px rgba(240,100,74,${0.85 * pillGlow}), 0 0 ${120 * pillGlow}px rgba(240,100,74,${0.45 * pillGlow})`, fontSize: 58, fontWeight: 500, letterSpacing: "-0.01em", whiteSpace: "pre" }}>
            {url.split("").map((ch, i) => {
              const at = t.urlType[0] + i * per;
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
