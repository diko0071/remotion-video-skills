import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SPRINGS = {
  smooth: { damping: 200 },
  pop: { damping: 15, mass: 0.7 },
  card: { damping: 24, stiffness: 130, mass: 0.9 },
  panel: { damping: 26, stiffness: 120, mass: 1 },
  drift: { damping: 26, stiffness: 90 },
} as const;

export const springAt = (
  frame: number,
  fps: number,
  start: number,
  config: { damping: number; stiffness?: number; mass?: number } = SPRINGS.smooth,
  durationInFrames?: number,
) => spring({ frame: frame - start, fps, config, durationInFrames });

export const useSpringAt = (
  start: number,
  config: { damping: number; stiffness?: number; mass?: number } = SPRINGS.smooth,
  durationInFrames?: number,
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return springAt(frame, fps, start, config, durationInFrames);
};

export const useReveal = (start: number, distance = 22, durationInFrames = 24) => {
  const p = useSpringAt(start, SPRINGS.smooth, durationInFrames);
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [distance, 0])}px)`,
  };
};

export const typing = (frame: number, text: string, from: number, to: number) => {
  if (to <= from) return frame >= from ? text : "";
  return text.slice(
    0,
    Math.floor(
      interpolate(frame, [from, to], [0, text.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const ramp = (frame: number, from: number, to: number, easing?: (t: number) => number) =>
  interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export const press = (frame: number, at: number, depth = 0.82) =>
  interpolate(frame, [at - 4, at, at + 6], [1, depth, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const blink = (frame: number, period = 14) => Math.floor(frame / period) % 2 === 0;

export type Rect = { x: number; y: number; size: number };

export const lerpRect = (p: number, from: Rect, to: Rect): Rect => ({
  x: interpolate(p, [0, 1], [from.x, to.x]),
  y: interpolate(p, [0, 1], [from.y, to.y]),
  size: interpolate(p, [0, 1], [from.size, to.size]),
});

export const window01 = (frame: number, from: number, to: number, ramp = 14) =>
  Math.min(
    interpolate(frame, [from, from + ramp], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [to, to + ramp], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

export const shimmerBackground = (
  frame: number,
  { base, highlight, speed = 2.2, delay = 0 }: { base: string; highlight: string; speed?: number; delay?: number },
): React.CSSProperties => ({
  backgroundImage: `linear-gradient(90deg, ${base} 0%, ${base} 35%, ${highlight} 50%, ${base} 65%, ${base} 100%)`,
  backgroundSize: "200% 100%",
  backgroundPosition: `${100 - (((frame + delay) * speed) % 200)}% 0`,
});

export const Shimmer: React.FC<{ text: string; rgb?: string }> = ({
  text,
  rgb = "15,23,42",
}) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        ...shimmerBackground(frame, { base: `rgba(${rgb},0.38)`, highlight: `rgba(${rgb},1)` }),
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {text}
    </span>
  );
};

export const useVelocityBlur = (
  start: number,
  config: { damping: number; stiffness?: number; mass?: number } = SPRINGS.smooth,
  durationInFrames?: number,
  strength = 22,
  soft = false,
): string => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = (f: number) => spring({ frame: f - start, fps, config, durationInFrames });
  const amount = Math.min(strength, Math.abs(at(frame) - at(frame - 1)) * strength * 8);
  if (soft) return amount < 0.02 ? "none" : `blur(${amount.toFixed(2)}px)`;
  return amount < 0.4 ? "none" : `blur(${amount.toFixed(1)}px)`;
};

export const Pulse: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = 0.75 + 0.25 * Math.sin((frame / 30) * Math.PI * 2);
  return <span style={{ opacity, display: "inline-flex" }}>{children}</span>;
};

export const Ticker: React.FC<{
  items: string[];
  speed?: number;
  separator?: string;
  style?: React.CSSProperties;
}> = ({ items, speed = 1.6, separator = "   ✦   ", style }) => {
  const frame = useCurrentFrame();
  const text = items.join(separator);
  const shift = (frame * speed) % 900;
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", transform: `translateX(${-shift}px)`, ...style }}>
        {`${text}${separator}${text}${separator}${text}`}
      </div>
    </div>
  );
};
