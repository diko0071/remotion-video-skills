import React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";

export const MarkReveal: React.FC<{
  mask: string;
  at?: number;
  len?: number;
  fromSize?: number;
  toSize?: number;
  to?: { x: number; y: number };
  ground?: string;
  fill: React.ReactNode;
  wordmark?: React.ReactNode;
  wordAt?: number;
}> = ({ mask, at = 0, len = 40, fromSize = 2400, toSize = 120, to = { x: 960, y: 540 }, ground = "#FFFFFF", fill, wordmark, wordAt }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const size = interpolate(p, [0, 1], [fromSize, toSize]);
  const cx = interpolate(p, [0, 1], [960, to.x]);
  const cy = interpolate(p, [0, 1], [540, to.y]);
  const white = interpolate(p, [0, 0.35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const word = interpolate(frame, [wordAt ?? at + len, (wordAt ?? at + len) + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const url = `url(${staticFile(mask)})`;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ background: ground, opacity: white }} />
      <div
        style={{
          position: "absolute",
          left: cx - size / 2,
          top: cy - size / 2,
          width: size,
          height: size,
          maskImage: url,
          WebkitMaskImage: url,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: -(cx - size / 2), top: -(cy - size / 2), width: 1920, height: 1080 }}>{fill}</div>
      </div>
      {wordmark ? (
        <div style={{ position: "absolute", left: to.x + toSize / 2 + 18, top: to.y, transform: "translateY(-50%)", opacity: word, filter: word < 1 ? `blur(${(1 - word) * 6}px)` : undefined }}>{wordmark}</div>
      ) : null}
    </AbsoluteFill>
  );
};
