import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";

const SUSPICIOUS = "#b91c1c";
const LOW_RISK = "#C19767";
const HEALTHY = "#171310";
const TRACK = "#eae6dd";
const MUTED = "#64748b";

const RINGS = [
  { r: 300, stroke: 60 },
  { r: 212, stroke: 44 },
  { r: 146, stroke: 33 },
];
const ORBITS = [372, 334, 258, 182, 112];

const SEGMENTS = [
  { pct: 24, count: "191 pages", title: "SUSPICIOUS PAGES", color: SUSPICIOUS, endX: 640, labelY: -240 },
  { pct: 37, count: "294 pages", title: "LOW RISK PAGES", color: LOW_RISK, endX: 640, labelY: 130 },
  { pct: 39, count: "310 pages", title: "HEALTHY PAGES", color: HEALTHY, endX: -640, labelY: -40 },
];

const RING_AT = [4, 14, 24];
const FILL_LEN = 26;

export const RADIAL_TOTAL = 108;
export const RADIAL_EXIT_AT = RADIAL_TOTAL - 12;

const rad = (deg: number): number => ((deg - 90) * Math.PI) / 180;
const pt = (deg: number, r: number): [number, number] => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))];

const arc = (r: number, toDeg: number): string => {
  const span = Math.min(359.9, Math.max(0.1, toDeg));
  const [x1, y1] = pt(0, r);
  const [x2, y2] = pt(span, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${span > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

const Callout: React.FC<{ seg: (typeof SEGMENTS)[number]; ring: number; progress: number }> = ({
  seg,
  ring,
  progress,
}) => {
  if (progress <= 0.01) return null;
  const anchorDeg = Math.max(20, Math.min(160, (seg.pct / 100) * 360 * 0.55));
  const [ax, ay] = pt(anchorDeg, RINGS[ring].r);
  const side = seg.endX > 0 ? "end" : "start";
  const pctScale = 1;
  return (
    <g opacity={Math.min(1, progress * 1.6)}>
      <circle cx={ax} cy={ay} r={5} fill="#fff" stroke={seg.color} strokeWidth={2.5} />
      <path
        d={`M ${ax} ${ay} L ${seg.endX * 0.8} ${seg.labelY + 40} L ${seg.endX} ${seg.labelY + 40}`}
        fill="none"
        stroke="#b9c2ce"
        strokeWidth={1.5}
        strokeDasharray="3 6"
      />
      <text x={seg.endX} y={seg.labelY} textAnchor={side} fill={MUTED} fontSize={21} fontWeight={700} letterSpacing="0.09em">
        {seg.title}
      </text>
      <text x={seg.endX} y={seg.labelY + 26} textAnchor={side} fill="#94a3b8" fontSize={17}>
        {seg.count}
      </text>
      <g transform={`translate(${seg.endX} ${seg.labelY + 92}) scale(${pctScale})`}>
        <text textAnchor={side} fill={seg.color} fontSize={60} fontWeight={800} letterSpacing="-0.03em">
          {Math.round(seg.pct * Math.min(1, progress))}
          <tspan fontSize={32} fontWeight={700}>
            %
          </tspan>
        </text>
      </g>
    </g>
  );
};

export const SceneRadial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exitOut = useSpringAt(RADIAL_EXIT_AT, SPRINGS.panel, 14);
  const spin = interpolate(useSpringAt(0, SPRINGS.panel, 26), [0, 1], [-38, 0]);
  const ringsIn = RINGS.map((_, i) => spring({ frame: frame - (2 + i * 7), fps, config: SPRINGS.card }));
  const fills = RING_AT.map((at) =>
    interpolate(frame, [at, at + FILL_LEN], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  ).map((t) => 1 - Math.pow(1 - t, 3));

  return (
    <AbsoluteFill style={{ background: "var(--background)", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          scale: String(1 - exitOut * 0.96),
          opacity: 1 - exitOut * 0.5,
          filter: exitOut > 0.1 ? `blur(${exitOut * 6}px)` : undefined,
        }}
      >
        <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
          <g opacity={Math.min(1, ringsIn[0] * 1.4)} transform={`translate(0 ${(1 - Math.min(1, ringsIn[0])) * -24})`}>
            <text y={-436} textAnchor="middle" fill={HEALTHY} fontSize={64} fontWeight={800} letterSpacing="-0.03em">
              Your spam audit is ready
            </text>
          </g>
          <g strokeDashoffset={-frame * 0.45}>
            {ORBITS.map((r, i) => (
              <circle
                key={r}
                r={r * Math.min(1, ringsIn[Math.min(i, 2)] * 1.2)}
                fill="none"
                stroke="#d9d4c8"
                strokeWidth={1}
                strokeDasharray="2 8"
              />
            ))}
          </g>
          {RINGS.map((ring, i) => (
            <circle
              key={ring.r}
              r={ring.r * ringsIn[i]}
              fill="none"
              stroke={TRACK}
              strokeWidth={ring.stroke * Math.min(1, ringsIn[i] * 1.3)}
            />
          ))}
          <g transform={`rotate(${spin})`}>
            {SEGMENTS.map((seg, i) => {
              const deg = (seg.pct / 100) * 360 * fills[i];
              if (deg <= 0.5) return null;
              const [hx, hy] = pt(deg, RINGS[i].r);
              return (
                <g key={seg.title}>
                  <path d={arc(RINGS[i].r, deg)} fill="none" stroke={seg.color} strokeWidth={RINGS[i].stroke} />
                  {fills[i] < 0.995 ? (
                    <circle cx={hx} cy={hy} r={RINGS[i].stroke / 2 + 5} fill="#fff" stroke={seg.color} strokeWidth={4.5} />
                  ) : null}
                </g>
              );
            })}
          </g>
          {SEGMENTS.map((seg, i) => (
            <Callout key={seg.title} seg={seg} ring={i} progress={fills[i]} />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
