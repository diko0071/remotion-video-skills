import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { phoneRect } from "./geometry";
import { spikeTip } from "./spend-card";
import { T } from "./timeline";

const RED = "#e11d48";

export const SpikeLink: React.FC = () => {
  const f = useCurrentFrame();
  const draw = ramp(f, T.link, T.link + 10, Easing.out(Easing.cubic));
  const out = ramp(f, T.s3 - 4, T.s3 + 8);
  if (f < T.link || out >= 1) return null;
  const a = spikeTip();
  const r = phoneRect(f);
  const b = { x: r.x + 6, y: r.y + 160 };
  const mid = { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) - 60 };
  const d = `M${a.x} ${a.y} Q${mid.x} ${mid.y} ${b.x} ${b.y}`;
  const hit = ramp(f, T.link + 9, T.link + 22);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", zIndex: 11, opacity: 1 - out }}>
      <defs>
        <mask id="spike-link-reveal">
          <path d={d} fill="none" stroke="#fff" strokeWidth={14} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
        </mask>
      </defs>
      <path d={d} fill="none" stroke={RED} strokeWidth={5} strokeLinecap="round" strokeDasharray="1 13" strokeDashoffset={-f * 1.6} mask="url(#spike-link-reveal)" />
      {hit > 0 && hit < 1 ? <circle cx={b.x} cy={b.y} r={8 + 30 * hit} fill="none" stroke={RED} strokeWidth={3} opacity={1 - hit} /> : null}
    </svg>
  );
};
