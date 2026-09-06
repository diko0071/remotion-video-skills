import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { DitherField } from "../../kit/dither-field";
import { FocusCamera } from "../../kit/focus-camera";
import { CARD_BY_LABEL } from "./cards";
import { INTER } from "./fonts";
import { ASCII_INK, CUT_CHAIN, GREEN, INK, NODES, NODE_GAP, STROBE } from "./timings";

const LINE_Y = 420;
const X0 = 700;
const STAGE_W = X0 + NODE_GAP * NODES.length + 400;

const Node: React.FC<{ i: number }> = ({ i }) => {
  const n = NODES[i];
  const frame = useCurrentFrame() + CUT_CHAIN;
  const p = useSpringAt(n.at - CUT_CHAIN, SPRINGS.card, 10);
  const x = X0 + i * NODE_GAP;
  const Card = CARD_BY_LABEL[n.label];
  const lit = frame >= n.at;
  const tilt = interpolate(p, [0, 1], [6, 0]);
  const fresh = interpolate(frame, [n.at, n.at + 14], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelColor = fresh > 0.5 ? "#E255E2" : GREEN;
  return (
    <div style={{ position: "absolute", left: x, top: 0, width: 0, height: 1080, opacity: Math.min(1, p * 2) }}>
      <div style={{ position: "absolute", left: -260, width: 520, top: LINE_Y - 90, textAlign: "center", fontSize: 40, fontWeight: 500, color: lit ? labelColor : INK, textShadow: fresh > 0 ? `0 0 ${18 * fresh}px rgba(226,85,226,${0.9 * fresh}), 0 0 ${40 * fresh}px rgba(180,255,120,${0.6 * fresh})` : undefined, transform: `translateY(${(1 - p) * 20}px) rotate(${-6 * fresh}deg)` }}>
        {n.label}
      </div>
      <div style={{ position: "absolute", left: -22, top: LINE_Y - 22, width: 44, height: 44, borderRadius: 22, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(p, [0, 1], [0.4, 1])})` }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11.5l4 4 8-9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ position: "absolute", left: -n.w / 2, top: LINE_Y + 50, transform: `perspective(1400px) translateY(${(1 - p) * 60}px) rotateX(${-tilt}deg) rotateZ(${-tilt * 0.4}deg)`, transformOrigin: "top center" }}>
        <Card />
      </div>
    </div>
  );
};

const Glow: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, background: "radial-gradient(circle, rgba(120,235,140,0.75) 0%, rgba(255,255,255,0) 70%)", filter: "blur(24px)" }} />
);

export const ChainScene: React.FC = () => {
  const frame = useCurrentFrame() + CUT_CHAIN;
  const ats = NODES.map((n) => n.at);
  const xs = NODES.map((_, i) => X0 + i * NODE_GAP);
  const fx = interpolate(frame, ats, xs, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const lineTo = interpolate(frame, ats, xs, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const zoom = 1.3 + Math.sin((frame - CUT_CHAIN) / 40) * 0.03;
  const local = frame - CUT_CHAIN;
  const flash = STROBE.some(([a, b]) => local >= a && local < b) ? 1 : 0;
  return (
    <AbsoluteFill style={{ background: "#FBF6EE", fontFamily: INTER }}>
      <DitherField mode="ascii" palette={ASCII_INK} scale={0.6} cell={15} seed={5} speed={0.08} />
      {flash > 0 ? (
        <AbsoluteFill style={{ background: "#0B1B3A", opacity: flash }}>
          <DitherField mode="dots" palette={["#1E3A8A", "#3B82F6", "#93C5FD", "#DBEAFE"]} cell={14} scale={0.8} seed={9} />
        </AbsoluteFill>
      ) : null}
      <FocusCamera zoom={zoom} focus={{ x: fx, y: 620 }} width={STAGE_W}>
        {NODES.map((n, i) => (
          <Glow key={n.label} x={X0 + i * NODE_GAP + 260} y={760} r={340} />
        ))}
        <div style={{ position: "absolute", left: X0 - 400, top: LINE_Y - 3, height: 6, width: Math.max(0, lineTo - X0 + 400), background: GREEN, borderRadius: 3 }} />
        {NODES.map((n, i) => (
          <Node key={n.label} i={i} />
        ))}
      </FocusCamera>
    </AbsoluteFill>
  );
};
