import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { clamp01, ramp } from "../../core/motion";
import { keyedCamera } from "../../core/stage";
import { buildPath, DotPath, PathBall, Stop } from "../../kit/glyph-ball";
import { CAMERA } from "./camera";
import { END_LEAD, URL_LEFT, URL_RIGHT } from "./copy";
import { backOut } from "./ease";
import { layoutLine, Line, textW } from "./measure";
import { MERGE, mergeSeat } from "./stage";
import { INK, PAPER, SKINS } from "./theme";
import { END, FS_TOTAL, kick } from "./timings";
import { WordAt } from "./word";

const LEAD = { size: 104, baseline: 452 };
const URL = { size: 232, baseline: 748, slot: 0.5, ball: 0.42 };
const DOT = 64;
const URL_BALL = URL.size * URL.ball;
const pulse = (f: number) => (f >= END.land + 10 ? 1 + 0.06 * kick(f) : 1);

const EYES = [
  { at: -99, eyes: "happy" as const },
  { at: END.dot, eyes: "dot" as const },
  { at: END.land, eyes: "happy" as const },
  { at: END.wink, eyes: "wink" as const },
  { at: END.wink + 16, eyes: "happy" as const },
];

type Plan = { lead: Line; left: number; right: number; path: DotPath };
let plan: Plan | null = null;

const heroAtCut = () => {
  const cam = keyedCamera(CAMERA, END.cut - 1);
  const seat = mergeSeat(MERGE);
  return { x: 960 + (seat.x - cam.x) * cam.zoom, y: 540 + (seat.y - cam.y) * cam.zoom, size: MERGE * cam.zoom };
};

const endPlan = (): Plan => {
  if (plan) return plan;
  const raw = layoutLine(END_LEAD, 0, LEAD.baseline, LEAD.size);
  const dx = 960 - raw.end / 2;
  const lead = { ...raw, x: raw.x + dx, end: raw.end + dx, slotX: raw.slotX + dx, words: raw.words.map((w) => ({ ...w, x: w.x + dx })) };
  const wl = textW(URL_LEFT, URL.size);
  const wr = textW(URL_RIGHT, URL.size);
  const slot = URL.slot * URL.size;
  const left = 960 - (wl + slot + wr) / 2;
  const right = left + wl + slot;
  const dot = lead.words[2];
  const arc = (a: Stop, b: Stop) => (b.at === END.land ? 150 : 60);
  const hero = heroAtCut();
  const path = buildPath(
    DOT,
    [
      { at: END.cut, x: hero.x, y: hero.y, kind: "slide", size: hero.size, until: END.cut },
      { at: END.dot, x: dot.x + dot.w / 2, y: LEAD.baseline - dot.top - DOT / 2 + 4, kind: "drop", until: END.dot + 1 },
      { at: END.land, x: left + wl + slot / 2, y: URL.baseline - URL_BALL / 2, kind: "drop", size: URL_BALL, until: Infinity },
    ],
    END.cut,
    arc,
  );
  plan = { lead, left, right, path };
  return plan;
};

const Rise: React.FC<{ text: string; x: number; baseline: number; size: number; at: number; f: number }> = ({ text, x, baseline, size, at, f }) => {
  const s = f - at;
  if (s < 0) return null;
  const p = backOut(clamp01(s / 9), 1.6);
  return <WordAt text={text} x={x} baseline={baseline} size={size} color={INK} opacity={clamp01(s / 3)} transform={`translateY(${(1 - p) * 0.38 * size}px)`} />;
};

export const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const { lead, left, right, path } = endPlan();
  const push = 1 + 0.06 * ramp(f, END.cut, FS_TOTAL, Easing.linear);
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "960px 600px" }}>
        {lead.words.map((w, k) => (
          <Rise key={k} text={w.text} x={w.x} baseline={LEAD.baseline} size={LEAD.size} at={END.lead + k * 2} f={f} />
        ))}
        <Rise text={URL_LEFT} x={left} baseline={URL.baseline} size={URL.size} at={END.dot + 2} f={f} />
        <Rise text={URL_RIGHT} x={right} baseline={URL.baseline} size={URL.size} at={END.dot + 5} f={f} />
        <PathBall id="fs-end-dot" skin={SKINS.hero} path={path} track={EYES} blinks={END.blinks} scale={pulse} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
