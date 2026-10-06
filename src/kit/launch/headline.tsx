import React from "react";
import { Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt } from "../../core/motion";
import { useLaunchFrame } from "./frame";
import { C, SANS } from "./tokens";

export type LaunchLine = { words: readonly string[]; plate: readonly [number, number]; color?: string };

const WORD_STEP = 2;
const EXIT = 6;
const WORD_SPRING = { damping: 15, stiffness: 190, mass: 0.9 };
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut3 = (x: number) => 1 - Math.pow(1 - x, 3);

const Word: React.FC<{ text: string; enter: number; exit: number }> = ({ text, enter, exit }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(f, fps, enter, WORD_SPRING);
  const out = ramp(f, exit, exit + EXIT, (x) => x * x);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: clamp01(p * 2) * (1 - out),
        transform: `translateY(${(1 - p) * 0.42 + out * 0.34}em)`,
        filter: `blur(${(1 - clamp01(p)) * 8 + out * 6}px)`,
      }}
    >
      {text}
    </span>
  );
};

const Line: React.FC<{ spec: LaunchLine; start: number; end: number; plate: string }> = ({ spec, start, end, plate }) => {
  const f = useCurrentFrame();
  const [p0, p1] = spec.plate;
  const enterAt = (i: number) => start + i * WORD_STEP;
  const exitAt = (i: number) => end - 11 + Math.round(i * 0.8);
  const plateIn = ramp(f, enterAt(p1) + 5, enterAt(p1) + 13, easeOut3);
  const plateOut = ramp(f, exitAt(p0) - 1, exitAt(p0) - 1 + EXIT, Easing.inOut(Easing.cubic));
  const before = spec.words.slice(0, p0);
  const plated = spec.words.slice(p0, p1 + 1);
  const after = spec.words.slice(p1 + 1);
  const gap = "0.24em";
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: gap, rowGap: "0.02em" }}>
      {before.map((w, i) => (
        <Word key={`b${i}`} text={w} enter={enterAt(i)} exit={exitAt(i)} />
      ))}
      <span style={{ position: "relative", display: "inline-flex", columnGap: gap, flexWrap: "wrap" }}>
        <span
          style={{
            position: "absolute",
            left: "-0.1em",
            top: "0.06em",
            bottom: "-0.02em",
            width: `calc((100% + 0.2em) * ${plateIn})`,
            background: spec.color ?? plate,
            opacity: 1 - plateOut,
          }}
        />
        {plated.map((w, i) => (
          <span key={`p${i}`} style={{ position: "relative" }}>
            <Word text={w} enter={enterAt(p0 + i)} exit={exitAt(p0 + i)} />
          </span>
        ))}
      </span>
      {after.map((w, i) => (
        <Word key={`a${i}`} text={w} enter={enterAt(p1 + 1 + i)} exit={exitAt(p1 + 1 + i)} />
      ))}
    </div>
  );
};

export const LaunchHeadline: React.FC<{
  lines: readonly LaunchLine[];
  starts: readonly number[];
  ends: readonly number[];
  plate?: string;
}> = ({ lines, starts, ends, plate = C.brandLight }) => {
  const f = useCurrentFrame();
  const fr = useLaunchFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: fr.head.x,
        top: fr.head.y,
        width: fr.head.maxW,
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: fr.head.size,
        letterSpacing: "-0.035em",
        lineHeight: 1.05,
        color: C.ink,
        zIndex: 20,
      }}
    >
      {lines.map((spec, i) =>
        f >= starts[i] && f < ends[i] + 1 ? (
          <div key={i} style={{ position: "absolute", left: 0, top: 0, width: "100%" }}>
            <Line spec={spec} start={starts[i]} end={ends[i]} plate={plate} />
          </div>
        ) : null,
      )}
    </div>
  );
};
