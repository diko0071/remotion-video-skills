import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const LOOPS = 3;

const Column: React.FC<{ digit: number; rollFrom: number; settleAt: number; size: number; color: string; seed: number; placeholder?: string }> = ({ digit, rollFrom, settleAt, size, color, seed, placeholder }) => {
  const frame = useCurrentFrame();
  const h = size * 1.2;
  const total = LOOPS * 10 + digit;
  const p = interpolate(frame, [rollFrom, settleAt], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const pos = (seed % 10) * (1 - p) + total * p;
  const pPrev = interpolate(frame - 1, [rollFrom, settleAt], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const speed = Math.abs(((seed % 10) * (1 - p) + total * p) - ((seed % 10) * (1 - pPrev) + total * pPrev));
  const base = Math.floor(pos);
  const frac = pos - base;
  const visible = frame >= rollFrom;
  const blur = Math.min(size * 0.12, speed * size * 0.05);
  return (
    <span style={{ position: "relative", display: "inline-block", width: size * 0.64, height: h, overflow: "hidden", verticalAlign: "middle" }}>
      {visible
        ? [-1, 0, 1].map((k) => (
            <span
              key={k}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: (k - frac) * h,
                height: h,
                lineHeight: `${h}px`,
                textAlign: "center",
                color,
                filter: blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : undefined,
                opacity: 1 - Math.min(1, Math.abs(k - frac)) * 0.85,
              }}
            >
              {(((base + k) % 10) + 10) % 10}
            </span>
          ))
        : placeholder
          ? <span style={{ position: "absolute", inset: 0, lineHeight: `${h}px`, textAlign: "center", color: placeholder }}>0</span>
          : null}
    </span>
  );
};

export const Roller: React.FC<{ value: string; rollFrom: number; settleFrom: number; settleStep: number; size: number; color: string; gap?: number; placeholder?: string }> = ({ value, rollFrom, settleFrom, settleStep, size, color, gap = 0.34, placeholder }) => {
  let di = 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * gap, fontSize: size, fontVariantNumeric: "tabular-nums" }}>
      {value.split("").map((ch, i) => {
        if (ch === "-") return <span key={i} style={{ color, width: size * 0.4, textAlign: "center" }}>-</span>;
        const idx = di++;
        return <Column key={i} digit={Number(ch)} rollFrom={rollFrom} settleAt={settleFrom + idx * settleStep} size={size} color={color} seed={idx * 7 + 3} placeholder={placeholder} />;
      })}
    </span>
  );
};
