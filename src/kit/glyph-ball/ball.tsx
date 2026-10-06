import React from "react";
import { Easing, Img, staticFile } from "remotion";
import { blinkAmount, EyeKey, eyesState, Gaze } from "./eyes";
import { Eyes, Glyph } from "./glyph";

export type GlyphBallName = "o" | "blue" | "green" | "purple" | "orange" | "dark" | "sky" | "lime";

export const glyphBallSrc = (name: GlyphBallName) => staticFile(`glyph-balls/ball-${name}.png`);

const back = Easing.out(Easing.back(2.2));
const EYE_L = { x: 34, y: 45 };
const EYE_R = { x: 66, y: 45 };

export type EyeAt = { lx: number; rx: number; y: number; scale?: number };
export type BallSkin = { src: string; eyeAt?: EyeAt };

export const GlyphBall: React.FC<{
  f: number;
  size: number;
  ball?: GlyphBallName;
  src?: string;
  eyeAt?: EyeAt;
  track: readonly EyeKey[];
  eyeColor?: string;
  gaze?: Gaze;
  blinks?: readonly number[];
  squash?: number;
  tilt?: number;
  shadow?: number;
  badge?: React.ReactNode;
}> = ({ f, size, ball = "o", src, eyeAt, track, eyeColor = "#111316", gaze = { x: 0, y: 0 }, blinks = [], squash = 0, tilt = 0, shadow = 1, badge }) => {
  const eyes = eyesState(track, f);
  const blink = blinkAmount(blinks, f);
  const gx = gaze.x * 6.5;
  const gy = gaze.y * 4.5;
  const sy = 1 - 0.88 * blink;
  const spots = eyeAt ? [{ x: eyeAt.lx, y: eyeAt.y }, { x: eyeAt.rx, y: eyeAt.y }] : [EYE_L, EYE_R];
  const es = eyeAt?.scale ?? 1;
  const renderEyes = (kind: Eyes, opacity: number, scale: number) => (
    <g opacity={opacity}>
      {spots.map((e, k) => (
        <g key={k} transform={`translate(${e.x + gx} ${e.y + gy}) scale(${scale * es} ${scale * es * sy})`}>
          <Glyph kind={kind} side={k === 0 ? -1 : 1} color={eyeColor} />
        </g>
      ))}
    </g>
  );
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {shadow > 0 ? (
        <div
          style={{
            position: "absolute",
            left: size * 0.16,
            right: size * 0.16,
            bottom: -size * 0.07,
            height: size * 0.13,
            borderRadius: "50%",
            background: `rgba(40,30,20,${0.22 * shadow})`,
            filter: `blur(${size * 0.05}px)`,
            transform: `scaleX(${1 + squash * 1.4})`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `rotate(${tilt}deg) scale(${1 + squash}, ${1 - squash})`,
          transformOrigin: "50% 100%",
        }}
      >
        <Img src={src ?? glyphBallSrc(ball)} style={{ position: "absolute", inset: 0, width: size, height: size }} />
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
          {eyes.prev ? renderEyes(eyes.prev, 1 - eyes.p, 1) : null}
          {renderEyes(eyes.cur, eyes.prev ? eyes.p : 1, eyes.prev ? 0.45 + 0.55 * back(eyes.p) : 1)}
        </svg>
        {badge ? <div style={{ position: "absolute", right: size * 0.02, bottom: size * 0.05 }}>{badge}</div> : null}
      </div>
    </div>
  );
};
