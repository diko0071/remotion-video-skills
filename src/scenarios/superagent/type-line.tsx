import React from "react";
import { measureText } from "@remotion/layout-utils";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { RiseLetters } from "../../kit/rise-letters";
import { SANS, SERIF } from "./font";
import { CORAL, INK, LINE } from "./timings";

const typedCount = (frame: number, seg: { text: string; from: number; step: number }) =>
  frame < seg.from ? 0 : seg.step === 0 ? seg.text.length : Math.min(seg.text.length, Math.floor((frame - seg.from) / seg.step) + 1);

const measure = (text: string, size: number, serif: boolean) =>
  text.length === 0
    ? 0
    : measureText({ text, fontFamily: serif ? SERIF : SANS, fontSize: size, fontWeight: serif ? "400" : "500", letterSpacing: serif ? "-0.02em" : "-0.01em" }).width;

export const lineSizeAt = (frame: number) =>
  interpolate(frame, [LINE.whip[0], LINE.whip[1]], [LINE.size, LINE.sizeSmall], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

const measureS = (text: string, size: number, serif: boolean) => measure(text, size, serif) * LINE.stretch;

const growthX = (frame: number, width: number) => Math.min(960 - width / 2, LINE.rightPin - width);

const widthAt = (frame: number) => {
  const size = lineSizeAt(frame);
  const aiSize = LINE.aiSize * (size / LINE.size);
  return LINE.segments.reduce((acc, seg) => {
    const n = typedCount(frame, seg);
    const isAi = "ai" in seg && seg.ai;
    return acc + measureS(seg.text.slice(0, n), isAi ? aiSize : size, !!isAi);
  }, 0);
};

export const lineLayout = (frame: number) => {
  const size = lineSizeAt(frame);
  const aiSize = LINE.aiSize * (size / LINE.size);
  let width = 0;
  let aiStart = 0;
  let aiWidth = 0;
  let newStart = 0;
  LINE.segments.forEach((seg, i) => {
    const n = typedCount(frame, seg);
    const typed = seg.text.slice(0, n);
    const isAi = "ai" in seg && seg.ai;
    if (i === LINE.segments.length - 1) newStart = width;
    const w = measureS(typed, isAi ? aiSize : size, !!isAi);
    if (isAi) {
      aiStart = width;
      aiWidth = w;
    }
    width += w;
  });
  const lastSeg = LINE.segments[LINE.segments.length - 1];
  const whipping = frame >= lastSeg.from;
  const grown = growthX(frame, width);
  let drifted = grown;
  if (frame >= LINE.drift.from) {
    const startWidth = widthAt(LINE.drift.from);
    const xStart = growthX(LINE.drift.from, startWidth);
    drifted = Math.min(grown, xStart - LINE.drift.v * (frame - LINE.drift.from));
    if (aiWidth > 0) drifted = Math.max(drifted, LINE.drift.lockX - aiStart - aiWidth / 2);
  }
  const lastWidth = width - newStart;
  const settled = 960 - newStart - lastWidth / 2;
  const wp = ramp(frame, LINE.whip[0], LINE.whip[1], Easing.out(Easing.cubic));
  const x = whipping ? drifted + (settled - drifted) * wp : drifted;
  return { x, width, size, aiSize, aiCenter: x + aiStart + aiWidth / 2 };
};

const Glyph: React.FC<{ ch: string; chroma: number }> = ({ ch, chroma }) => (
  <>
    {chroma > 0.01 ? (
      <>
        <span style={{ position: "absolute", left: -14 * chroma, top: 0, color: "#FF3B3B", opacity: 0.55 * chroma, mixBlendMode: "multiply" }}>{ch}</span>
        <span style={{ position: "absolute", left: 14 * chroma, top: 0, color: "#3B6BFF", opacity: 0.55 * chroma, mixBlendMode: "multiply" }}>{ch}</span>
      </>
    ) : null}
    <span style={{ position: "relative" }}>{ch}</span>
  </>
);

export const TypeLine: React.FC<{ aiOverride?: React.ReactNode }> = ({ aiOverride }) => {
  const frame = useCurrentFrame();
  const L = lineLayout(frame);
  const prev = lineLayout(frame - 1);
  const speed = Math.abs(L.x - prev.x);
  return (
    <DirectionalBlur id={`sa-line-${aiOverride ? "lens" : "base"}`} x={speed * 0.25} style={{ position: "absolute", left: L.x, top: LINE.y, transform: `translateY(-50%) scaleX(${LINE.stretch})`, transformOrigin: "0 50%", whiteSpace: "pre", fontFamily: SANS, fontSize: L.size, fontWeight: 500, letterSpacing: "-0.01em", color: INK, lineHeight: 1 }}>
      {LINE.segments.map((seg, i) => {
        const n = typedCount(frame, seg);
        const isAi = "ai" in seg && seg.ai;
        if (isAi) {
          return (
            <span key={i} style={{ display: "inline-block", verticalAlign: "baseline", fontFamily: SERIF, fontSize: L.aiSize, fontWeight: 400, letterSpacing: "-0.02em", color: CORAL, lineHeight: 0.8, position: "relative" }}>
              {aiOverride ? (
                <span style={{ position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}>{aiOverride}</span>
              ) : null}
              <RiseLetters
                text={seg.text}
                from={seg.from}
                len={7}
                rise={0.3}
                blur={14}
                style={{ visibility: aiOverride ? "hidden" : "visible", display: "inline-block" }}
                scale={(p) => 1 + 0.35 * (1 - p)}
                letterStyle={() => ({ position: "relative" })}
                letter={(ch) => <Glyph ch={ch} chroma={1 - ramp(frame, seg.from + 2, seg.from + 14)} />}
              />
            </span>
          );
        }
        const fade = i < LINE.segments.length - 1 ? 1 - ramp(frame, LINE.whip[0] + 2, LINE.whip[1]) : 1;
        return (
          <RiseLetters
            key={i}
            text={seg.text.slice(0, n)}
            from={seg.from}
            step={seg.step}
            len={7}
            rise={0.3}
            blur={14}
            style={{ opacity: fade }}
            scale={() => 1}
            letterStyle={() => ({ position: "relative" })}
            letter={(ch) => <Glyph ch={ch} chroma={0} />}
          />
        );
      })}
    </DirectionalBlur>
  );
};
