import React from "react";

export const TOGGLE = { w: 62, h: 36, knob: 28 } as const;

export const toggleKnob = (p: number, scale = 1) => ({
  x: (TOGGLE.h / 2 + (TOGGLE.w - TOGGLE.h) * (1 - p)) * scale,
  y: (TOGGLE.h / 2) * scale,
  size: TOGGLE.knob * scale,
});

export const Toggle: React.FC<{ p: number; on?: string; knob?: boolean; scale?: number }> = ({ p, on = "#0868F0", knob = true, scale = 1 }) => {
  const W = TOGGLE.w * scale;
  const H = TOGGLE.h * scale;
  const K = TOGGLE.knob * scale;
  const mix = (a: number, b: number) => Math.round(a + (b - a) * p);
  const onRgb = [parseInt(on.slice(1, 3), 16), parseInt(on.slice(3, 5), 16), parseInt(on.slice(5, 7), 16)];
  const bg = `rgb(${mix(onRgb[0], 214)},${mix(onRgb[1], 209)},${mix(onRgb[2], 200)})`;
  return (
    <div style={{ position: "relative", width: W, height: H, borderRadius: H / 2, background: bg, flex: "none" }}>
      {knob ? (
        <div
          style={{
            position: "absolute",
            top: (H - K) / 2,
            left: (H - K) / 2 + (W - H) * (1 - p),
            width: K,
            height: K,
            borderRadius: K / 2,
            background: "#FFFFFF",
            boxShadow: "0 2px 5px rgba(0,0,0,0.22)",
          }}
        />
      ) : null}
    </div>
  );
};
