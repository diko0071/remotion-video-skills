import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { HEADLINE_FONT } from "../../kit/headline";
import { RiseLetters } from "../../kit/rise-letters";
import { CONNECT, CORAL, GROUND, INK } from "./timings";

export const ConnectScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sun = useSpringAt(4, SPRINGS.pop, 16);
  const push = interpolate(frame, [0, CONNECT.len], [1, 1.05]);
  const L = CONNECT.line2;
  return (
    <AbsoluteFill style={{ background: GROUND, fontFamily: HEADLINE_FONT, color: INK, transform: `scale(${push})` }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 440, transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 118, fontWeight: 500, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
        <RiseLetters text={["Connect", " your", " site", " to "]} from={[-6, -4, -2, 0]} len={7} rise={0.35} blur={12} />
        <Img src={staticFile("ryze-sun.png")} style={{ width: 96, height: 96, marginRight: 18, transform: `scale(${sun}) rotate(${(1 - sun) * -120 + frame * 1.2}deg)`, opacity: Math.min(1, sun * 1.5) }} />
        <RiseLetters text="Ryze." from={2} step={1} len={7} rise={0.35} blur={12} color={CORAL} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 630, transform: "translateY(-50%)", textAlign: "center", fontSize: 118, fontWeight: 500, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
        <RiseLetters text={["It", " does", " all", " of", " it."]} from={[L, L + 2, L + 4, L + 6, L + 8]} len={7} rise={0.35} blur={12} letterStyle={(_, i) => (i === 2 ? { color: CORAL } : {})} />
      </div>
    </AbsoluteFill>
  );
};
