import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { press, typing } from "../../core/motion";
import { DitherField } from "../../kit/dither-field";
import { FocusCamera } from "../../kit/focus-camera";
import { Cursor } from "../../kit/cursor";
import { INTER } from "./fonts";
import { CURSOR, CUT_COMPOSER, FLIP, FLUID_GREY, FLUID_ORANGE, GREEN, GREY_AT, INK, PUSH, REVEAL, TYPE } from "./timings";

const PROMPT = "Build me an Airbnb-style car rental app users can book and pay for";
const CHIPS = ["Kanban Board", "Bill Splitter", "Explore Recipies", "More Ideas", "Import Project"];
const CARD = { x: 380, y: 300, w: 1160, h: 260 } as const;
const ARROW = { x: CARD.x + CARD.w - 60, y: CARD.y + CARD.h - 62 } as const;

export const ComposerScene: React.FC = () => {
  const frame = useCurrentFrame() + CUT_COMPOSER;
  const typed = typing(frame, PROMPT, TYPE.from, TYPE.to);
  const grey = interpolate(frame, [GREY_AT, GREY_AT + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const push = interpolate(frame, [PUSH.from, PUSH.to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const zoom = interpolate(push, [0, 1], [1, 2.5]);
  const focus = { x: interpolate(push, [0, 1], [960, ARROW.x + 40]), y: interpolate(push, [0, 1], [540, ARROW.y + 70]) };
  const glow = interpolate(frame, [TYPE.from, TYPE.to], [0.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chipOpacity = interpolate(frame, [CUT_COMPOSER + 6, CUT_COMPOSER + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pressed = press(frame, CURSOR.at, 0.8);
  const ring = interpolate(frame, [CURSOR.at, CURSOR.at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flip = interpolate(frame, [FLIP.at, FLIP.at + FLIP.len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const flipPrev = interpolate(frame - 1, [FLIP.at, FLIP.at + FLIP.len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const spinBlur = Math.min(14, (flip - flipPrev) * 360 * 0.22);
  const reveal = interpolate(frame, [REVEAL.from, REVEAL.to], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const bloom = interpolate(frame, [REVEAL.from + 2, REVEAL.to + 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gridGhost = interpolate(frame, [CUT_COMPOSER, CUT_COMPOSER + 8], [0.07, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#fff", fontFamily: INTER }}>
      <DitherField mode="posterize" palette={FLUID_ORANGE} bands={5} scale={0.9} warp={0.7} grain={0.03} seed={2} reveal={reveal} revealOrigin={{ x: 0.25, y: 0.2 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, height: 1, background: `rgba(0,0,0,${gridGhost})` }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 560, width: 1, background: `rgba(0,0,0,${gridGhost})` }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 1360, width: 1, background: `rgba(0,0,0,${gridGhost})` }} />
      <DitherField mode="posterize" palette={FLUID_GREY} bands={5} scale={0.9} warp={0.7} grain={0.03} seed={2} opacity={grey} />
      <DitherField mode="dots" palette={["#3a2a1a", "#3a2a1a", "#3a2a1a", "#3a2a1a"]} cell={10} scale={0.9} warp={0.7} seed={2} opacity={0.42} />
      <FocusCamera zoom={zoom} focus={focus}>
        <div style={{ position: "absolute", left: CARD.x - 60, top: CARD.y - 60, width: CARD.w + 120, height: CARD.h + 120, borderRadius: 60, background: "#fff", filter: `blur(${40 + bloom * 40}px)`, opacity: bloom * 1.2 }} />
        <div
          style={{
            position: "absolute",
            left: CARD.x,
            top: CARD.y,
            width: CARD.w,
            height: CARD.h,
            background: "#fff",
            borderRadius: 22,
            boxShadow: `0 0 ${90 * glow}px ${28 * glow}px rgba(140,240,150,${0.75 * glow}), 0 0 ${30 * glow}px ${6 * glow}px rgba(255,255,255,0.9), 0 10px 40px rgba(0,0,0,0.12)`,
            padding: "30px 34px",
            boxSizing: "border-box",
            color: INK,
            transformOrigin: `${ARROW.x - CARD.x}px ${ARROW.y - CARD.y}px`,
            transform: `perspective(1400px) rotateZ(${flip * -360}deg) rotateX(${Math.sin(flip * Math.PI) * 28}deg) rotateY(${Math.sin(flip * Math.PI * 2) * 14}deg) scale(${1 + Math.sin(flip * Math.PI) * 0.3 + bloom * 0.08})`,
            filter: flip > 0 ? `blur(${spinBlur.toFixed(1)}px)` : bloom > 0 ? `blur(${bloom * 5}px) brightness(${1 + bloom * 0.6})` : undefined,
            opacity: interpolate(bloom, [0, 0.6, 1], [1, 0.9, 0]),
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 400, lineHeight: 1.35, minHeight: 90 }}>
            {typed}
            <span style={{ opacity: frame % 16 < 8 ? 1 : 0 }}>|</span>
          </div>
          <div style={{ position: "absolute", left: 34, bottom: 28, display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#333" }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, border: "1.5px solid #d8e8dd", display: "flex", alignItems: "center", justifyContent: "center", color: GREEN, fontSize: 22 }}>◎</div>
            <span>+ Add Files</span>
          </div>
          <div
            data-click="send"
            style={{
              position: "absolute",
              right: 30,
              bottom: 28,
              width: 64,
              height: 64,
              borderRadius: 32,
              background: GREEN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${pressed})`,
            }}
          >
            <div style={{ position: "absolute", inset: -6 - ring * 26, borderRadius: 999, border: `${3 - ring * 2}px solid rgba(31,169,113,${0.8 * (1 - ring)})` }} />
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 25V5M15 5L6 14M15 5l9 9" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <div style={{ position: "absolute", left: CARD.x, top: CARD.y + CARD.h + 30, display: "flex", gap: 18, opacity: chipOpacity }}>
          {CHIPS.map((c) => (
            <div key={c} style={{ padding: "12px 24px", borderRadius: 30, background: "rgba(255,255,255,0.92)", border: c === "Import Project" ? `2px solid ${GREEN}` : "1.5px solid rgba(0,0,0,0.08)", fontSize: 24, color: INK, whiteSpace: "nowrap" }}>
              {c}
            </div>
          ))}
        </div>
        <Cursor stops={[{ x: 1180, y: 470, at: CURSOR.from - CUT_COMPOSER }, { x: 1230, y: 520, at: CURSOR.park - CUT_COMPOSER }, { x: ARROW.x + 10, y: ARROW.y + 10, at: CURSOR.at - CUT_COMPOSER, click: true }]} appearAt={CURSOR.from - CUT_COMPOSER} scale={3.2} fill="#141413" stroke="#FFFFFF" />
      </FocusCamera>
    </AbsoluteFill>
  );
};
