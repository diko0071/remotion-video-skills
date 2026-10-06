import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { OrbitRing, type OrbitConfig } from "../../kit/orbit-ring";
import { MUSE_HEAD, MUSE_WORKING } from "../../kit/muse-ui";
import { museFont } from "../../kit/muse-ui";
import {
  COLLAPSE_FROM,
  COLLAPSE_TO,
  HEADPHONES_AT,
  HERO_SIZE,
  HERO_X,
  HERO_Y,
  RING_R,
  SQUASH_AT,
  STAGE_FULL,
  STAGE_IN,
  STAGE_OUT,
  SUN_GAP,
  SUN_IN,
  SUN_SIZE,
  TILE,
  TOOL_MARKS,
  TOOLS,
  TOOLS_FROM,
  YES_AT,
} from "./timings";

const FLOAT_RECT = { x: 1010 - 33, y: 40, size: 66 };

const PAIR_SHIFT = -(SUN_SIZE + SUN_GAP) / 2;

const ORBIT: OrbitConfig = {
  center: { x: HERO_X + HERO_SIZE / 2 + PAIR_SHIFT, y: HERO_Y + HERO_SIZE / 2 },
  radius: RING_R,
  tile: TILE,
  from: TOOLS_FROM,
  collapseFrom: COLLAPSE_FROM,
  collapseTo: COLLAPSE_TO,
  squash: 0.7,
};

const heroRect = (frame: number) => {
  const p = interpolate(frame, [STAGE_IN, STAGE_FULL + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 0.15, 1),
  });
  return {
    x: interpolate(p, [0, 1], [FLOAT_RECT.x, HERO_X]),
    y: interpolate(p, [0, 1], [FLOAT_RECT.y, HERO_Y]),
    size: interpolate(p, [0, 1], [FLOAT_RECT.size, HERO_SIZE]),
  };
};

const Label: React.FC<{ text: string; status?: string; at: number; x: number; y: number }> = ({ text, status, at, x, y }) => {
  const s = useSpringAt(at, SPRINGS.pop, 22);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translateX(-50%) translateY(${(1 - s) * 16}px)`,
        opacity: s,
        background: "#fff",
        borderRadius: 999,
        padding: "12px 26px 12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        fontFamily: museFont,
        fontSize: 30,
        fontWeight: 600,
        textAlign: "center",
        lineHeight: 1.15,
        whiteSpace: "nowrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {text}
      {status ? <span style={{ fontSize: 22, fontWeight: 400, color: "#6B6B70" }}>{status}</span> : null}
    </div>
  );
};

export const StageLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const rect = heroRect(frame);
  const sunIn = useSpringAt(SUN_IN, SPRINGS.card, 30);
  const squash = useSpringAt(SQUASH_AT, SPRINGS.pop, 22);
  const phones = interpolate(frame, [HEADPHONES_AT, HEADPHONES_AT + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const yes = useSpringAt(YES_AT, SPRINGS.card, 22);
  const out = interpolate(frame, [STAGE_OUT - 10, STAGE_OUT], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sunSwallow = interpolate(frame, [COLLAPSE_FROM + 12, COLLAPSE_TO], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.9, 0.4) });
  const bump = Math.sin(Math.min(1, squash) * Math.PI);
  const pairShift = interpolate(sunIn, [0, 1], [0, PAIR_SHIFT]);
  const sunX = interpolate(sunSwallow, [0, 1], [HERO_X + HERO_SIZE / 2 + PAIR_SHIFT - SUN_SIZE / 2, HERO_X + HERO_SIZE + SUN_GAP + pairShift]) + interpolate(sunIn, [0, 1], [900, 0]);
  const heroX = rect.x + (frame >= STAGE_FULL ? pairShift : 0);
  if (frame < STAGE_IN || frame >= STAGE_OUT) return null;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <OrbitRing files={TOOLS} marks={TOOL_MARKS} cfg={ORBIT} />
      <div
        style={{
          position: "absolute",
          left: sunX,
          top: HERO_Y + HERO_SIZE / 2 - SUN_SIZE / 2,
          width: SUN_SIZE,
          height: SUN_SIZE,
          opacity: sunIn * interpolate(sunSwallow, [0, 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(sunIn, [0, 1], [0.4, 1]) * (0.3 + 0.7 * sunSwallow)}) rotate(${interpolate(sunIn, [0, 1], [180, 0])}deg)`,
        }}
      >
        <Img src={staticFile("ryze-sun.png")} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: heroX,
          top: rect.y,
          width: rect.size,
          height: rect.size,
          borderRadius: 999,
          overflow: "hidden",
          background: "#F4F2F1",
          boxShadow: "0 6px 30px rgba(0,0,0,0.12)",
          transform: `scale(${1 + bump * 0.14}, ${1 - bump * 0.12})`,
          transformOrigin: "50% 100%",
        }}
      >
        <Img src={staticFile(MUSE_HEAD)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <Img src={staticFile(MUSE_WORKING)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: phones }} />
      </div>
      <Label text="Muse" status={frame >= HEADPHONES_AT ? "Working with Ryze" : undefined} at={STAGE_FULL} x={heroX + rect.size / 2} y={rect.y + rect.size - 16} />
      <div
        style={{
          position: "absolute",
          left: heroX + rect.size / 2,
          top: rect.y + rect.size + 110,
          transform: `translateX(-50%) translateY(${(1 - yes) * 24}px)`,
          opacity: yes,
          background: "#E9E8EB",
          borderRadius: 34,
          padding: "20px 34px",
          fontFamily: museFont,
          fontSize: 40,
          fontWeight: 500,
          visibility: frame >= YES_AT ? "visible" : "hidden",
        }}
      >
        Yes.
      </div>
    </AbsoluteFill>
  );
};
