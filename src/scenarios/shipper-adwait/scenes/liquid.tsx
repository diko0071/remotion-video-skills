import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const STOPS: [number, string][] = [
  [0, "#141C06"],
  [0.06, "#5C7F10"],
  [0.16, "#CBF52B"],
  [0.3, "#C6F02A"],
  [0.37, "#E9EEE0"],
  [0.44, "#B9E227"],
  [0.55, "#A9CE2C"],
  [0.63, "#2A3A0C"],
  [0.69, "#0D1204"],
  [0.78, "#7EA80F"],
  [0.9, "#CBF52B"],
  [1, "#141C06"],
];

export const LiquidLime: React.FC<{ speed?: number }> = ({ speed = 1 }) => {
  const frame = useCurrentFrame();
  const shift = frame * speed * 2.2;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#2A3A0D", filter: "saturate(1.25)" }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient
            id="lq-bands"
            x1="0"
            y1="0"
            x2="0.24"
            y2="0.19"
            spreadMethod="reflect"
          >
            {STOPS.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
          <filter id="lq-fold" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0011 0.0019"
              numOctaves={1}
              seed={11}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={720}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g filter="url(#lq-fold)">
          <rect
            x={-1200}
            y={-1200}
            width={4400}
            height={3600}
            fill="url(#lq-bands)"
            transform={`translate(${-shift} ${-shift * 0.7})`}
          />
        </g>
      </svg>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 36%, rgba(0,0,0,0.08) 64%, rgba(0,0,0,0.26) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
