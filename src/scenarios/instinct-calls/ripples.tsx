import React from "react";
import { useCurrentFrame } from "remotion";
import { C } from "../../kit/launch";
import { PHONE, phoneRect } from "./geometry";
import { T } from "./timeline";

const EVERY = 15;
const LIFE = 70;

export const Ripples: React.FC = () => {
  const f = useCurrentFrame();
  const r = phoneRect(f);
  const cx = r.x + PHONE.w / 2;
  const cy = r.y + PHONE.h * 0.42;
  const starts: number[] = [];
  for (let s = -LIFE; s < T.tap; s += EVERY) starts.push(s);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {starts.map((s) => {
        const t = (f - s) / LIFE;
        if (t < 0 || t > 1) return null;
        const radius = 250 + 820 * (1 - Math.pow(1 - t, 2));
        return <circle key={s} cx={cx} cy={cy} r={radius} fill="none" stroke={C.brand} strokeWidth={3.5} opacity={0.72 * (1 - t)} />;
      })}
    </svg>
  );
};
