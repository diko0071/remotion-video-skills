import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt, useVelocityBlur } from "../../core/motion";
import { Heading } from "../../kit/promo-blocks";
import { CheckIcon } from "../../kit/ryze-ui/icons";
import { V } from "./timings";

const ROWS = [
  "PMax paused until the tag is fixed",
  "14 negative keywords added to 'Brand + Generic'",
  "$80/day moved to Retargeting (ROAS 6.2)",
  "3 fresh creatives rotated into Lookalike 5%",
  "12 search terms added as exact match",
  "3 ads to the dead /pricing page paused",
  "Overlapping ad sets merged — winner kept",
  "Bids trimmed on 6 low-QS keywords",
  "Sitelinks refreshed on Search-Core",
  "Weekly research re-scheduled",
];

const Row: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const at = V.rowStarts[index];
  const p = useSpringAt(at, SPRINGS.card, 10);
  const blur = useVelocityBlur(at, SPRINGS.card, 10);
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#ffffff",
        borderRadius: 14,
        padding: "16px 24px",
        boxShadow: "0 10px 30px rgba(20,15,10,0.09)",
        fontSize: 23,
        fontWeight: 600,
        color: "#171310",
        opacity: Math.min(1, p * 1.4),
        transform: `translateY(${interpolate(p, [0, 1], [56, 0])}px)`,
        filter: blur,
      }}
    >
      <CheckIcon size={24} strokeWidth={3} style={{ color: "#059669" }} />
      {text}
    </div>
  );
};

export const AvalancheScene: React.FC = () => {
  const frame = useCurrentFrame();
  const landed = V.rowStarts.filter((s) => frame >= s).length;
  const pull = interpolate(landed, [3, ROWS.length], [1, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = interpolate(landed, [3, ROWS.length], [0, -140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stat = useSpringAt(V.statAt, SPRINGS.pop, 16);
  const statBlur = useVelocityBlur(V.statAt, SPRINGS.pop, 16);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 90 }}>
      <Heading text="Applied while you slept." start={V.heading} ink="#171310" />
      <div
        style={{
          marginTop: 44,
          width: 760,
          height: 700,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 48px, black 82%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transform: `translateY(${drift}px) scale(${pull})`,
            transformOrigin: "top center",
          }}
        >
          {ROWS.map((text, i) => (
            <Row key={text} text={text} index={i} />
          ))}
        </div>
      </div>
      {frame >= V.statAt ? (
        <div
          style={{
            position: "absolute",
            bottom: 86,
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            background: "#171310",
            borderRadius: 12,
            padding: "20px 36px",
            opacity: Math.min(1, stat * 1.3),
            transform: `scale(${interpolate(stat, [0, 1], [0.7, 1])})`,
            filter: statBlur,
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 800, color: "#4ade80" }}>$1,412/mo</span>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#F5EFE4" }}>recovered</span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
