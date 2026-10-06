import React from "react";
import { Easing, random, spring } from "remotion";
import { C, SANS } from "../../kit/launch";
import { clamp01 } from "../../core/motion";
import { EyeKey, GlyphBall, LogoBadge } from "../../kit/glyph-ball";
import { CAST, CastTool, O_CROWD, RING } from "./cast";
import { CONFETTI, logo, PLATE, RED, SUN, SUN_ASPECT } from "./theme";
import { FPS, T } from "./timings";

const eo = Easing.out(Easing.cubic);
const eio = Easing.inOut(Easing.cubic);

const panicAt = (g: number) => 1 - clamp01((g - T.oLand) / 3);
const ringP = (g: number, i: number) => eio(clamp01((g - T.ringFrom - i * 2) / (T.ringTo - T.ringFrom)));

const ringPos = (t: CastTool) => {
  const a = (t.ring * Math.PI) / 180;
  return { x: O_CROWD.x + Math.cos(a) * RING.rx, y: O_CROWD.y + Math.sin(a) * RING.ry };
};

const land = (d: number, amp = 0.2) => (d >= 0 && d < 30 ? amp * Math.exp(-d / 5) * Math.cos(d * 0.8) : 0);

export const toolAt = (t: CastTool, i: number, g: number) => {
  const pn = panicAt(g);
  const jx = (Math.sin(g * 0.41 + i * 1.7) * 0.6 + Math.sin(g * 0.67 + i * 2.9) * 0.4) * 16 * pn;
  const jy = (Math.cos(g * 0.47 + i * 2.3) * 0.6 + Math.sin(g * 0.73 + i * 0.9) * 0.4) * 12 * pn;
  const hop = -Math.abs(Math.sin(g * 0.24 + i * 1.3)) * 30 * pn;
  const shock = g >= T.oLand && g <= T.oLand + 12 ? -46 * Math.sin((Math.PI * (g - T.oLand)) / 12) : 0;
  const j = g - t.fixAt - 1;
  const joy = j >= 0 && j <= 14 ? -80 * Math.sin((Math.PI * j) / 14) : 0;
  const rp = ringP(g, i);
  const r = ringPos(t);
  const hopsY = T.hops.reduce((a, h) => a + (g >= h && g <= h + 12 ? -44 * Math.sin((Math.PI * (g - h)) / 12) : 0), 0);
  const idle = g > t.fixAt + 16 && rp <= 0 ? Math.sin(g / 8 + i) * 5 : 0;
  const x = t.crowd.x + (r.x - t.crowd.x) * rp + jx;
  const y = t.crowd.y + (r.y - t.crowd.y) * rp + jy + hop + shock + joy + hopsY + idle - Math.sin(Math.PI * rp) * 70;
  const size = t.crowd.size + (RING.size - t.crowd.size) * rp;
  const squash = land(j - 14) + land(g - T.oLand - 12, 0.14) + T.hops.reduce((a, h) => a + land(g - h - 12, 0.14), 0) + Math.sin(g * 0.6 + i) * 0.05 * pn;
  const tilt = Math.sin(g * 0.9 + i) * 8 * pn;
  return { x, y, size, squash, tilt };
};

const gazeAt = (t: CastTool, i: number, g: number, x: number, y: number) => {
  if (g < T.look) return { x: Math.sin(g * 0.3 + i * 2) * 0.9, y: Math.cos(g * 0.23 + i) * 0.6 };
  const dx = O_CROWD.x - x;
  const dy = O_CROWD.y - y;
  const len = Math.hypot(dx, dy) || 1;
  if (g >= t.fixAt && g < T.ringFrom) return { x: 0, y: -0.3 };
  return { x: dx / len, y: (dy / len) * 0.8 };
};

const Pill: React.FC<{ g: number; t: CastTool; x: number; y: number; at: number; out: number }> = ({ g, t, x, y, at, out }) => {
  const pop = spring({ frame: g - at, fps: FPS, config: { damping: 11, stiffness: 190, mass: 0.6 } });
  if (g < at || out >= 1) return null;
  const good = g >= t.fixAt;
  const flip = spring({ frame: g - t.fixAt, fps: FPS, config: { damping: 11, stiffness: 220, mass: 0.6 } });
  const s = pop * (good ? 0.8 + 0.2 * Math.min(1.15, flip) : 1) * (1 - out);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -100%) scale(${Math.max(0, s)}) rotate(${Math.sin(g * 1.6) * 3 * panicAt(g)}deg)`,
        transformOrigin: "50% 100%",
        padding: "6px 16px 8px",
        borderRadius: 12,
        background: good ? PLATE : RED,
        color: good ? C.ink : C.white,
        fontFamily: SANS,
        fontSize: 26,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
        boxShadow: "0 10px 24px rgba(40,30,20,0.14)",
        zIndex: 8,
      }}
    >
      {good ? t.goodChip : t.badChip}
    </div>
  );
};

const Confetti: React.FC<{ g: number; at: number; x: number; y: number; seed: string }> = ({ g, at, x, y, seed }) => {
  const t = g - at;
  if (t < 0 || t > 24) return null;
  return (
    <>
      {Array.from({ length: 14 }, (_, k) => {
        const a = ((-90 + (random(`${seed}a${k}`) - 0.5) * 180) * Math.PI) / 180;
        const sp = 9 + random(`${seed}s${k}`) * 11;
        const w = 10 + random(`${seed}w${k}`) * 7;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x + Math.cos(a) * sp * t - w / 2,
              top: y + Math.sin(a) * sp * t + 0.8 * t * t,
              width: w,
              height: w * 1.4,
              borderRadius: 3,
              background: CONFETTI[k % CONFETTI.length],
              opacity: 1 - clamp01((t - 14) / 10),
              transform: `rotate(${t * (random(`${seed}r${k}`) - 0.5) * 50}deg)`,
              zIndex: 9,
            }}
          />
        );
      })}
    </>
  );
};

const Lines: React.FC<{ g: number }> = ({ g }) => {
  const retract = 1 - clamp01((g - T.ringFrom) / 12);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", zIndex: 1 }}>
      {CAST.map((t, i) => {
        const s = toolAt(t, i, g);
        const p = eo(clamp01((g - T.linesFrom - i * T.linesStep) / 8)) * retract;
        if (p <= 0) return null;
        const ex = O_CROWD.x + (s.x - O_CROWD.x) * p;
        const ey = O_CROWD.y + (s.y - O_CROWD.y) * p;
        const ping = clamp01((g - T.linesFrom - i * T.linesStep - 8) / 12);
        const pulse = clamp01((g - (t.fixAt - 9)) / 9);
        const px = O_CROWD.x + (s.x - O_CROWD.x) * pulse;
        const py = O_CROWD.y + (s.y - O_CROWD.y) * pulse;
        return (
          <g key={t.k}>
            <line x1={O_CROWD.x} y1={O_CROWD.y} x2={ex} y2={ey} stroke="rgba(15,23,42,0.18)" strokeWidth={8} strokeLinecap="round" />
            {ping > 0 && ping < 1 ? <circle cx={s.x} cy={s.y} r={s.size * 0.5 + 60 * ping} fill="none" stroke={C.ink} strokeWidth={5} opacity={0.5 * (1 - ping)} /> : null}
            {pulse > 0 && pulse < 1 ? (
              <g>
                <circle cx={px} cy={py} r={28} fill={PLATE} opacity={0.4} />
                <circle cx={px} cy={py} r={14} fill={PLATE} stroke={C.ink} strokeWidth={3} />
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

export const O_TRACK: readonly EyeKey[] = [
  { at: -99, eyes: "star" },
  { at: T.slap + 3, eyes: "plus" },
  { at: T.oHappy, eyes: "happy" },
  { at: T.wink, eyes: "wink" },
  { at: T.wink + 18, eyes: "happy" },
];

const OBall: React.FC<{ g: number }> = ({ g }) => {
  if (g < T.oFall - 14) return null;
  const fall = Easing.in(Easing.quad)(clamp01((g - T.oFall) / (T.oLand - T.oFall)));
  const y = O_CROWD.y - 1100 + 1100 * fall;
  const d = g - T.oLand;
  const squash = d >= 0 ? land(d, 0.34) : -0.14 * fall;
  const shadow = clamp01((g - (T.oFall - 14)) / 26);
  const wave = clamp01(d / 18);
  const look = g >= T.look - 8 && g < T.look + 12 ? Math.sin(((g - T.look + 8) / 20) * Math.PI * 2) * 0.9 : 0;
  const hopsY = T.hops.reduce((a, h) => a + (g >= h && g <= h + 12 ? -30 * Math.sin((Math.PI * (g - h)) / 12) : 0), 0);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: O_CROWD.x - O_CROWD.size * 0.5,
          top: O_CROWD.y + O_CROWD.size * 0.42,
          width: O_CROWD.size,
          height: O_CROWD.size * 0.16,
          borderRadius: "50%",
          background: "rgba(40,30,20,0.24)",
          filter: `blur(${O_CROWD.size * 0.06}px)`,
          transform: `scale(${0.25 + 0.75 * shadow})`,
          opacity: g < T.oLand ? shadow : 0,
          zIndex: 2,
        }}
      />
      {d >= 0 && wave < 1 ? (
        <div
          style={{
            position: "absolute",
            left: O_CROWD.x - (150 + 760 * eo(wave)),
            top: O_CROWD.y + O_CROWD.size * 0.46 - (40 + 200 * eo(wave)),
            width: 2 * (150 + 760 * eo(wave)),
            height: 2 * (40 + 200 * eo(wave)),
            borderRadius: "50%",
            border: `${10 * (1 - wave)}px solid rgba(15,23,42,${0.3 * (1 - wave)})`,
            zIndex: 2,
          }}
        />
      ) : null}
      <div style={{ position: "absolute", left: O_CROWD.x - O_CROWD.size / 2, top: y - O_CROWD.size / 2 + hopsY, zIndex: 5 }}>
        <GlyphBall
          f={g}
          size={O_CROWD.size}
          ball="o"
          track={O_TRACK}
          gaze={{ x: look, y: g < T.oLand ? 0.7 : 0 }}
          blinks={[210, 300, 455, 600]}
          squash={squash}
          badge={g >= T.slap ? <LogoBadge src={SUN} size={O_CROWD.size * 0.32} tilt={-12} aspect={SUN_ASPECT} /> : null}
        />
      </div>
    </>
  );
};

export const Crowd: React.FC<{ g: number; shake?: number }> = ({ g, shake = 0 }) => {
  const d = g - T.oLand;
  const s = d >= 0 && d < 10 ? (1 - d / 10) * 16 : 0;
  const sx = Math.sin(d * 2.3) * s + Math.sin(g * 1.7) * shake;
  const sy = Math.cos(d * 2.9) * s + Math.cos(g * 2.1) * shake;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translate(${sx}px, ${sy}px)` }}>
      <Lines g={g} />
      {CAST.map((t, i) => {
        const st = toolAt(t, i, g);
        const track: readonly EyeKey[] = [
          { at: -99, eyes: t.stress },
          { at: T.linesFrom + i * T.linesStep + 8, eyes: "o" },
          { at: t.fixAt + 1, eyes: "happy" },
        ];
        return (
          <React.Fragment key={t.k}>
            <div style={{ position: "absolute", left: st.x - st.size / 2, top: st.y - st.size / 2, zIndex: 4 }}>
              <GlyphBall
                f={g}
                size={st.size}
                ball={t.ball}
                track={track}
                eyeColor={t.eyeColor}
                gaze={gazeAt(t, i, g, st.x, st.y)}
                blinks={[120 + i * 13, 250 + i * 9, 470 + i * 7, 560 + i * 5]}
                squash={st.squash}
                tilt={st.tilt}
                badge={<LogoBadge src={logo(t.k)} size={st.size * 0.32} />}
              />
            </div>
            <Pill g={g} t={t} x={st.x} y={st.y - st.size / 2 - 16} at={100 + i * 3} out={clamp01((g - T.ringFrom) / 8)} />
            <Confetti g={g} at={t.fixAt + 1} x={st.x} y={st.y - st.size / 2} seed={t.k} />
          </React.Fragment>
        );
      })}
      <OBall g={g} />
    </div>
  );
};
