import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { HEADLINE_FONT } from "../../kit/headline";
import { RiseLetters } from "../../kit/rise-letters";
import { AGENTS, CORAL, GROUND, INK, SHARE } from "./timings";

const SIZE = 118;

const Roll: React.FC<{ a: React.ReactNode; b: React.ReactNode; at: number; len: number; color?: string }> = ({ a, b, at, len, color }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, at, at + len, Easing.inOut(Easing.cubic));
  const prev = ramp(frame - 1, at, at + len, Easing.inOut(Easing.cubic));
  const blur = Math.abs(p - prev) * 50;
  return (
    <span style={{ display: "inline-grid", justifyItems: "center", verticalAlign: "top", overflow: "hidden", height: "1.12em", color }}>
      <span style={{ gridArea: "1 / 1", transform: `translateY(${-p * 1.12}em)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, opacity: 1 - p }}>{a}</span>
      <span style={{ gridArea: "1 / 1", transform: `translateY(${(1 - p) * 1.12}em)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, opacity: p }}>{b}</span>
    </span>
  );
};

const AgentTile: React.FC<{ file: string; at: number; i: number }> = ({ file, at, i }) => {
  const pop = useSpringAt(at, SPRINGS.pop, 14);
  return (
    <span style={{ display: "inline-flex", width: 84, height: 84, marginLeft: i === 0 ? 0 : -18, borderRadius: 22, background: "#FFFFFF", boxShadow: "0 10px 24px rgba(15,23,42,0.16), 0 0 0 1px rgba(15,23,42,0.06)", alignItems: "center", justifyContent: "center", transform: `scale(${pop}) rotate(${(i % 2 === 0 ? -6 : 6) * pop}deg)`, opacity: Math.min(1, pop * 1.6), zIndex: 10 - i }}>
      <Img src={staticFile(file)} style={{ width: 52, height: 52, objectFit: "contain" }} />
    </span>
  );
};

export const ShareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.round(interpolate(frame, [SHARE.count[0], SHARE.count[1]], [9, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const push = interpolate(frame, [0, SHARE.len], [1, 1.05]);
  return (
    <AbsoluteFill style={{ background: GROUND, fontFamily: HEADLINE_FONT, color: INK, transform: `scale(${push})` }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 420, transform: "translateY(-50%)", display: "flex", justifyContent: "center", fontSize: SIZE * 1.18, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.12, whiteSpace: "pre" }}>
        <Roll at={SHARE.roll} len={SHARE.rollLen} color={CORAL} a={<span style={{ fontVariantNumeric: "tabular-nums" }}>{count}%</span>} b={<span>90%+</span>} />
        <RiseLetters text={[" of", " your", " traffic"]} from={[-6, -4, -2]} len={7} rise={0.35} blur={12} style={{ fontWeight: 500 }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 620, transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: SIZE, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.12, whiteSpace: "pre" }}>
        <Roll
          at={SHARE.roll + 2}
          len={SHARE.rollLen}
          a={
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <RiseLetters text={["is", " already", " "]} from={[2, 4, 6]} len={7} rise={0.35} blur={12} />
              {AGENTS.map((f, i) => (
                <AgentTile key={f} file={f} at={10 + i * 3} i={i} />
              ))}
              <RiseLetters text={["  AI", " agents."]} from={[22, 25]} len={7} rise={0.35} blur={12} />
            </span>
          }
          b={<span>in a few months.</span>}
        />
      </div>
    </AbsoluteFill>
  );
};
