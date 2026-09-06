import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt, useVelocityBlur } from "../../core/motion";
import { Heading } from "../../kit/promo-blocks";
import { CARD_STYLE } from "../../kit/promo-blocks";
import { ToolFlow } from "../../kit/tool-flow";
import { R } from "./timings";

const TOOLS = [
  { label: "Scanning Meta campaigns", detail: "38 ad sets · 14 days of spend" },
  { label: "Reading GA4 revenue", detail: "conversions matched to campaigns" },
  { label: "Checking Google Ads bids", detail: "search terms · quality scores" },
  { label: "Auditing landing pages", detail: "every ad destination, live" },
].map((t, i) => ({ ...t, ...R.tools[i] }));

const NIGHTS = ["MON 02:14", "TUE 03:41", "WED 01:58", "THU 02:26"];

const NightClock: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(NIGHTS.length - 1, Math.floor((frame - R.card) / 44));
  const local = (frame - R.card) % 44;
  const fade = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 19,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "rgba(23,19,16,0.45)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: 99,
          background: "#059669",
          opacity: 0.5 + 0.5 * Math.abs(Math.sin(frame / 9)),
        }}
      />
      <span style={{ opacity: idx >= 0 ? fade : 0 }}>{NIGHTS[Math.max(0, idx)]}</span>
    </div>
  );
};

const FindingsCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const found = TOOLS.filter((t) => frame >= t.done).length;
  const count = Math.min(7, found * 2 - (frame < R.tools[3].done ? 1 : 0));
  if (count < 1) return null;
  return (
    <span
      style={{
        fontSize: 19,
        fontWeight: 700,
        color: "#9a6e38",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {count} findings
    </span>
  );
};

export const ResearchScene: React.FC = () => {
  const card = useSpringAt(R.card, SPRINGS.card);
  const pill = useSpringAt(R.pill, SPRINGS.pop, 18);
  const pillBlur = useVelocityBlur(R.pill, SPRINGS.pop, 18);
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40 }}>
      <Heading text="While you sleep, it digs." start={R.heading} ink="#171310" />
      <div
        style={{
          ...CARD_STYLE,
          width: 720,
          padding: "30px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: Math.min(1, card * 1.3),
          transform: `translateY(${interpolate(card, [0, 1], [46, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <NightClock />
          <FindingsCounter />
        </div>
        <ToolFlow tools={TOOLS} size={22} />
      </div>
      {frame >= R.pill ? (
        <div
          style={{
            position: "absolute",
            bottom: 96,
            background: "#171310",
            color: "#F5EFE4",
            borderRadius: 12,
            padding: "16px 30px",
            fontSize: 26,
            fontWeight: 700,
            opacity: Math.min(1, pill * 1.3),
            transform: `scale(${interpolate(pill, [0, 1], [0.6, 1])})`,
            filter: pillBlur,
          }}
        >
          7 approvals ready
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
