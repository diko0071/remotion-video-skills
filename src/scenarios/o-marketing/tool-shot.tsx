import React from "react";
import { Easing, random, spring, useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { C, LaunchCard, polyline, SANS } from "../../kit/launch";
import { clamp01 } from "../../core/motion";
import { EyeKey, GlyphBall, LogoBadge } from "../../kit/glyph-ball";
import { CastTool } from "./cast";
import { CONFETTI, GREEN, logo, PLATE, RED } from "./theme";
import { FPS } from "./timings";

const BALL = { x: 560, y: 700, size: 440 };
const CARD = { x: 930, y: 520, w: 720, h: 300 };
const SPARK = { left: 40, right: 680, top: 170, bottom: 262 };
const BAD = [0.3, 0.34, 0.28, 0.32, 0.3, 0.36, 0.42, 0.7, 0.98];
const GOOD = [0.3, 0.34, 0.28, 0.32, 0.3, 0.26, 0.2, 0.14, 0.1];
const eo = Easing.out(Easing.cubic);
const eio = Easing.inOut(Easing.cubic);
const WHIP = 1600;

const sparkPts = (p: number) =>
  BAD.map((b, i) => {
    const v = b + (GOOD[i] - b) * p;
    return { x: SPARK.left + (i * (SPARK.right - SPARK.left)) / (BAD.length - 1), y: SPARK.bottom - v * (SPARK.bottom - SPARK.top) };
  });

const offsetAt = (f: number, len: number, enter: boolean) => {
  const inX = enter ? (1 - eo(clamp01((f + 1) / 7))) * WHIP : 0;
  const outX = -eio(clamp01((f - (len - 6)) / 6)) * WHIP;
  return inX + outX;
};

const ToolCard: React.FC<{ t: CastTool; f: number; fixAt: number | null; x: number }> = ({ t, f, fixAt, x }) => {
  const p = fixAt === null ? 0 : eo(clamp01((f - fixAt) / 10));
  const good = p >= 0.5;
  const value = t.metric.tween ? t.metric.tween.fmt(t.metric.tween.from + (t.metric.tween.to - t.metric.tween.from) * p) : good ? t.metric.good : t.metric.bad;
  const draw = fixAt === null ? eio(clamp01((f - 2) / 14)) : 1;
  const pts = sparkPts(p);
  const chip = spring({ frame: f - (fixAt === null ? 6 : fixAt + 4), fps: FPS, config: { damping: 12, stiffness: 200, mass: 0.6 } });
  const flash = fixAt === null ? 0 : Math.sin(Math.PI * clamp01((f - fixAt) / 10));
  return (
    <LaunchCard logo={logo(t.k)} title={t.title} sub={t.sub} value={value} x={x} y={CARD.y} w={CARD.w} h={CARD.h} opacity={1} valueColor={good ? C.ink : RED}>
      <div
        style={{
          position: "absolute",
          right: 36,
          top: 98,
          padding: "5px 14px 7px",
          borderRadius: 10,
          background: good ? PLATE : RED,
          color: good ? C.ink : C.white,
          fontFamily: SANS,
          fontSize: 22,
          fontWeight: 700,
          whiteSpace: "nowrap",
          transform: `scale(${Math.max(0, Math.min(1.1, chip))})`,
          transformOrigin: "100% 50%",
        }}
      >
        {good ? t.goodNote : t.badNote}
      </div>
      <svg width={CARD.w} height={CARD.h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <line x1={SPARK.left} x2={SPARK.right} y1={SPARK.bottom} y2={SPARK.bottom} stroke={C.border} strokeWidth={2} />
        <path d={polyline(pts)} fill="none" stroke={good ? GREEN : RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
        {draw > 0.98 ? <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={11 + 14 * flash} fill={good ? GREEN : RED} stroke={C.white} strokeWidth={4} /> : null}
      </svg>
    </LaunchCard>
  );
};

const Burst: React.FC<{ f: number; at: number; x: number; y: number; seed: string }> = ({ f, at, x, y, seed }) => {
  const t = f - at;
  if (t < 0 || t > 26) return null;
  return (
    <>
      {Array.from({ length: 22 }, (_, k) => {
        const a = ((-90 + (random(`${seed}a${k}`) - 0.5) * 200) * Math.PI) / 180;
        const sp = 14 + random(`${seed}s${k}`) * 16;
        const w = 14 + random(`${seed}w${k}`) * 10;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x + Math.cos(a) * sp * t - w / 2,
              top: y + Math.sin(a) * sp * t + 1.1 * t * t,
              width: w,
              height: w * 1.4,
              borderRadius: 4,
              background: CONFETTI[k % CONFETTI.length],
              opacity: 1 - clamp01((t - 16) / 10),
              transform: `rotate(${t * (random(`${seed}r${k}`) - 0.5) * 60}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

export const ToolShot: React.FC<{ t: CastTool; len: number; mode: "panic" | "fix"; fixLocal?: number; enter?: boolean }> = ({ t, len, mode, fixLocal = 0, enter = true }) => {
  const f = useCurrentFrame();
  const x = offsetAt(f, len, enter);
  const v = Math.abs(x - offsetAt(f - 1, len, enter));
  const panic = mode === "panic" ? 1 : 1 - clamp01((f - fixLocal) / 3);
  const shakeX = Math.sin(f * 1.9) * 7 * panic;
  const shakeY = Math.cos(f * 2.4) * 5 * panic;
  const j = f - fixLocal - 1;
  const jump = mode === "fix" && j >= 0 && j <= 16 ? -120 * Math.sin((Math.PI * j) / 16) : 0;
  const land = (d: number) => (d >= 0 && d < 30 ? 0.18 * Math.exp(-d / 5) * Math.cos(d * 0.8) : 0);
  const squash = mode === "fix" ? land(j - 16) + (j < 0 && j > -4 ? 0.08 : 0) : Math.sin(f * 0.9) * 0.05;
  const track: readonly EyeKey[] = mode === "panic" ? [{ at: -99, eyes: t.stress }] : [{ at: -99, eyes: t.stress }, { at: fixLocal + 1, eyes: "happy" }];
  const gaze = mode === "panic" ? { x: Math.sin(f * 0.45) * 0.9, y: Math.cos(f * 0.37) * 0.5 } : f < fixLocal ? { x: -0.9, y: 0 } : { x: 0.2, y: -0.3 };
  const pulse = mode === "fix" ? clamp01((f - fixLocal + 9) / 9) : 0;
  return (
    <DirectionalBlur id={`shot-${t.k}-${mode}`} x={Math.min(40, v * 0.22)} y={0} style={{ position: "absolute", inset: 0 }}>
      {mode === "fix" ? (
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
          <line x1={-60} y1={BALL.y} x2={BALL.x + x} y2={BALL.y} stroke="rgba(15,23,42,0.16)" strokeWidth={10} strokeLinecap="round" />
          {pulse > 0 && pulse < 1 ? (
            <g>
              <circle cx={-60 + (BALL.x + x + 60) * pulse} cy={BALL.y} r={34} fill={PLATE} opacity={0.35} />
              <circle cx={-60 + (BALL.x + x + 60) * pulse} cy={BALL.y} r={17} fill={PLATE} stroke={C.ink} strokeWidth={3} />
            </g>
          ) : null}
        </svg>
      ) : null}
      <div style={{ position: "absolute", left: BALL.x - BALL.size / 2 + x + shakeX, top: BALL.y - BALL.size / 2 + shakeY + jump }}>
        <GlyphBall
          f={f}
          size={BALL.size}
          ball={t.ball}
          track={track}
          eyeColor={t.eyeColor}
          gaze={gaze}
          squash={squash}
          tilt={Math.sin(f * 1.3) * 5 * panic}
          blinks={mode === "fix" ? [fixLocal + 18] : []}
          badge={<LogoBadge src={logo(t.k)} size={BALL.size * 0.3} />}
        />
      </div>
      <ToolCard t={t} f={f} fixAt={mode === "fix" ? fixLocal : null} x={CARD.x + x + shakeX * 0.4} />
      {mode === "fix" ? <Burst f={f} at={fixLocal + 1} x={BALL.x + x} y={BALL.y - BALL.size / 2 + jump} seed={t.k} /> : null}
    </DirectionalBlur>
  );
};
