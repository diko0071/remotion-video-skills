import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Starburst } from "../../kit/claude-ui";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { DitherField } from "../../kit/dither-field";
import { Blobs } from "./blobs";
import { INTER } from "./fonts";
import { Scramble } from "./scramble";
import { BLOCKS, BLOCK_GREYS, CHIP, CHIP_AT, FLASH, FOR_AT, INK, ORANGE, ROLLER, SCRAMBLE, TINT } from "./timings";

const SIZE = 120;
const SIZE_BIG = 176;
const ROW_SHIFT = 420;

const Chip: React.FC = () => {
  const frame = useCurrentFrame();
  const fly = interpolate(frame, [CHIP_AT, CHIP_AT + CHIP.fly], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.exp) });
  const settle = interpolate(frame, [CHIP_AT + CHIP.fly, CHIP_AT + CHIP.fly + CHIP.settle], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const pose = (f: number, st: number) => ({
    x: interpolate(f, [0, 1], [1400, -680]) * (1 - st),
    y: interpolate(f, [0, 1], [320, 60]) * (1 - st),
    s: interpolate(st, [0, 1], [interpolate(f, [0, 1], [0.9, 3.3]), 1]),
    r: interpolate(st, [0, 1], [interpolate(f, [0, 1], [-22, -12]), 0]),
  });
  const now = pose(fly, settle);
  const prevFly = interpolate(frame - 1, [CHIP_AT, CHIP_AT + CHIP.fly], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.exp) });
  const prevSettle = interpolate(frame - 1, [CHIP_AT + CHIP.fly, CHIP_AT + CHIP.fly + CHIP.settle], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const prev = pose(prevFly, prevSettle);
  const vx = Math.abs(now.x - prev.x);
  const blur = Math.min(26, vx * 0.09);
  const visible = frame >= CHIP_AT;
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 34px 12px 26px",
        background: "#fff",
        borderRadius: 34,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        opacity: visible ? 1 : 0,
        transformOrigin: "center",
        transform: `translate(${now.x}px, ${now.y}px) scale(${now.s}) rotate(${now.r}deg)`,
        filter: blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : undefined,
        zIndex: 5,
      }}
    >
      <Starburst size={70} color="#C9A96E" />
      <span style={{ fontSize: SIZE, fontWeight: 500, color: INK }}>Claude</span>
      <div style={{ position: "absolute", right: 18, bottom: -12, width: 0, height: 0, borderLeft: "14px solid transparent", borderTop: "16px solid #fff" }} />
    </div>
  );
};

const Roller: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.max(0, Math.min(ROLLER.words.length - 1, Math.floor((frame - ROLLER.from) / ROLLER.step)));
  const local = ((frame - ROLLER.from) % ROLLER.step) / ROLLER.step;
  const shift = idx + Math.min(1, local * 1.6);
  const lineH = SIZE * 1.25;
  const o = interpolate(frame, [ROLLER.from - 3, ROLLER.from + 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "relative",
        height: lineH * 5,
        width: 1000,
        overflow: "hidden",
        marginTop: -lineH * 0.5,
        opacity: o,
        maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 28%, #000 72%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 28%, #000 72%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${-shift * lineH + lineH * 0.5}px)` }}>
        {ROLLER.words.map((w, i) => (
          <div key={w} style={{ height: lineH, lineHeight: `${lineH}px`, fontSize: SIZE, fontWeight: 500, color: ORANGE, opacity: i === idx ? 1 : 0.35 }}>
            {w}
          </div>
        ))}
      </div>
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tint = interpolate(frame, [TINT.from, TINT.from + 4, TINT.to - 3, TINT.to], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pale = interpolate(frame, [SCRAMBLE.from, SCRAMBLE.to], [0.25, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const forIn = useSpringAt(FOR_AT, SPRINGS.smooth, 12);
  const flash = frame >= FLASH.at && frame < FLASH.at + FLASH.len;
  const wipe = interpolate(frame, [BLOCKS.from, BLOCKS.to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const centre = interpolate(frame, [CHIP_AT - 2, ROLLER.from + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wordSize = interpolate(frame, [CHIP_AT, CHIP_AT + 14], [SIZE_BIG, SIZE], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#fff", fontFamily: INTER }}>
      <Blobs from={TINT.from} dim={0.55} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 90,
          gap: 30,
          transform: `translateX(${interpolate(centre, [0, 1], [ROW_SHIFT, 0])}px)`,
        }}
      >
        <span
          style={{
            fontSize: wordSize,
            fontWeight: 500,
            color: tint > 0 ? `rgb(${Math.round(20 + 60 * tint)}, ${Math.round(20 + 190 * tint)}, ${Math.round(20 + 80 * tint)})` : INK,
            opacity: pale * interpolate(frame, [CHIP_AT + 3, CHIP_AT + 7, CHIP_AT + CHIP.fly + 6, CHIP_AT + CHIP.fly + 12], [1, 0, 0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            textShadow: tint > 0 ? `${-3 * tint}px 0 rgba(255,60,60,0.6), ${3 * tint}px 0 rgba(60,120,255,0.6)` : undefined,
          }}
        >
          <Scramble text="Introducing" from={SCRAMBLE.from} to={SCRAMBLE.to} />
        </span>
        <Chip />
        <span style={{ fontSize: SIZE, fontWeight: 500, color: INK, opacity: forIn, transform: `translateY(${(1 - forIn) * 14}px)` }}>for</span>
        <div style={{ opacity: frame >= ROLLER.from - 3 ? 1 : 0, alignSelf: "center" }}>
          <Roller />
        </div>
      </div>
      {frame >= BLOCKS.from ? <DitherField mode="blocks" palette={BLOCK_GREYS} cell={30} wipe={wipe} seed={7} /> : null}
      {flash ? <AbsoluteFill style={{ background: "#050505" }} /> : null}
    </AbsoluteFill>
  );
};
