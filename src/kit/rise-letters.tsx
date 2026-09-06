import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../core/motion";

export const glowShadow = (g: number, rgb = "240,100,74", hi = "255,235,225", mid = "255,160,130") =>
  g > 0.01 ? `0 0 ${12 * g}px rgba(${hi},${0.95 * g}), 0 0 ${34 * g}px rgba(${mid},${0.9 * g}), 0 0 ${90 * g}px rgba(${rgb},${0.85 * g})` : undefined;

export const riseP = (frame: number, at: number, len: number) => 1 - Math.pow(1 - ramp(frame, at, at + len), 3);

export const RiseLetters: React.FC<{
  text: string | readonly string[];
  from: number | readonly number[];
  step?: number;
  color?: string;
  glow?: number;
  rise?: number;
  blur?: number;
  len?: number;
  style?: React.CSSProperties;
  scale?: (p: number, index: number) => number;
  letterStyle?: (p: number, index: number) => React.CSSProperties;
  letter?: (ch: string, p: number, index: number) => React.ReactNode;
}> = ({ text, from, step = 0, color, glow = 0, rise = 0.35, blur = 16, len = 7, style, scale, letterStyle, letter }) => {
  const frame = useCurrentFrame();
  const units = typeof text === "string" ? text.split("") : text;
  return (
    <span style={{ whiteSpace: "pre", color, textShadow: glowShadow(glow), ...style }}>
      {units.map((ch, i) => {
        const at = typeof from === "number" ? from + i * step : from[i];
        const p = riseP(frame, at, len);
        if (ch === "\n") return <br key={i} />;
        return (
          <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: p, transform: `translateY(${(1 - p) * rise}em)${scale ? ` scale(${scale(p, i)})` : ""}`, filter: p < 0.98 ? `blur(${(1 - p) * blur}px)` : undefined, ...letterStyle?.(p, i) }}>
            {letter ? letter(ch, p, i) : ch}
          </span>
        );
      })}
    </span>
  );
};
