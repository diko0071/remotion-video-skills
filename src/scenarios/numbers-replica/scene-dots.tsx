import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt, SPRINGS } from "../../core/motion";
import { CARD, DOTS, INK, LIGHT } from "./timings";

const GRID = [0, 1, 2, 3].flatMap((r) => (r === 3 ? [{ r, c: 1 }] : [0, 1, 2].map((c) => ({ r, c }))));

const GREY = "#BDBDBD";

export const DotsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const m = ramp(frame, DOTS.morph[0], DOTS.morph[1], Easing.inOut(Easing.cubic));
  const g = ramp(frame, DOTS.grow[0], DOTS.grow[1], Easing.inOut(Easing.cubic));
  const R = CARD.rect;
  return (
    <AbsoluteFill style={{ background: LIGHT }}>
      {GRID.map(({ r, c }, i) => {
        const s = springAt(frame, fps, DOTS.popFrom + i * DOTS.popStep, SPRINGS.pop, 20);
        const x0 = DOTS.cx + (c - 1) * DOTS.pitchX;
        const y0 = DOTS.top + r * DOTS.pitchY;
        const size = DOTS.size * s;
        if (r === 1) {
          if (c === 1) {
            const w = interpolate(m, [0, 1], [size, 210]) * (1 - g) + R.w * g;
            const h = interpolate(m, [0, 1], [size, 54]) * (1 - g) + R.h * g;
            const cy = interpolate(m, [0, 1], [y0, 540]);
            const bg = g > 0 ? `rgba(255,255,255,${g})` : undefined;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: DOTS.cx - w / 2,
                  top: cy - h / 2,
                  width: w,
                  height: h,
                  borderRadius: interpolate(g, [0, 1], [Math.min(w, h) / 2, 18]),
                  background: g > 0 ? bg : m > 0 ? mix(m) : INK,
                  boxShadow: g > 0 ? `0 14px 40px rgba(0,0,0,${0.07 * g})` : undefined,
                  border: g > 0.02 ? `1px solid rgba(0,0,0,${0.04 * g})` : undefined,
                }}
              >
                {g < 1 ? <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: GREY, opacity: m * (1 - g) }} /> : null}
              </div>
            );
          }
          const side = c === 0 ? -1 : 1;
          const d = interpolate(m, [0, 1], [size, 118]) + g * 220;
          const x = interpolate(m, [0, 1], [x0, DOTS.cx + side * 290]) + side * g * 560;
          const y = interpolate(m, [0, 1], [y0, 540]);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x - d / 2,
                top: y - d / 2,
                width: d,
                height: d,
                borderRadius: "50%",
                background: m > 0 ? mix(m) : INK,
                opacity: 1 - g * 0.85,
              }}
            />
          );
        }
        const away = r === 0 ? -1 : 1;
        const y = y0 + away * m * 90;
        const o = 1 - ramp(frame, DOTS.morph[1] - 2, DOTS.grow[0] + 4);
        const sz = size * (1 - m * 0.2);
        return <div key={i} style={{ position: "absolute", left: x0 - sz / 2, top: y - sz / 2, width: sz, height: sz, borderRadius: "50%", background: INK, opacity: o }} />;
      })}
    </AbsoluteFill>
  );
};

const mix = (t: number) => {
  const a = 17;
  const b = 189;
  const v = Math.round(a + (b - a) * t);
  return `rgb(${v},${v},${v})`;
};
