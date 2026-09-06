import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";

const SLACK_AT = 12;
const GMAIL_AT = 74;
export const ARRIVES_TOTAL = 156;

const LINES = [
  "Move $40/day into Retargeting · Broad",
  "Pause ad set — CPA 2.4× average",
  "Refresh 3 fatigued creatives",
  "+ 24 more waiting",
];

const Line: React.FC<{ text: string; at: number; small?: boolean }> = ({ text, at, small }) => {
  const inn = useSpringAt(at, SPRINGS.pop, 14);
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        fontSize: small ? 19 : 21,
        fontWeight: 500,
        color: "rgba(23,19,16,0.6)",
        opacity: inn,
        transform: `translateX(${interpolate(inn, [0, 1], [-10, 0])}px)`,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 3, background: "#C19767", flexShrink: 0 }} />
      {text}
    </span>
  );
};

const Notice: React.FC<{
  at: number;
  icon: string;
  channel: string;
  meta: string;
  x: number;
  width: number;
  tilt: number;
}> = ({ at, icon, channel, meta, x, width, tilt }) => {
  const frame = useCurrentFrame();
  const inn = useSpringAt(at, SPRINGS.card, 26);
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 268,
        width,
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid rgba(23,19,16,0.08)",
        boxShadow: "0 30px 80px rgba(74,53,29,0.16)",
        padding: "36px 42px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: "'Plus Jakarta Sans'",
        opacity: inn,
        transform: `translateY(${interpolate(inn, [0, 1], [34, 0])}px) rotate(${tilt}deg) scale(${interpolate(
          inn,
          [0, 1],
          [0.94, 1],
        )})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Img src={staticFile(icon)} style={{ width: 30, height: 30, borderRadius: 7 }} />
        <span style={{ fontSize: 17, fontWeight: 600, color: "rgba(23,19,16,0.5)" }}>{channel}</span>
        <span
          style={{ marginLeft: "auto", fontSize: 16, fontWeight: 500, color: "rgba(23,19,16,0.3)" }}
        >
          {meta}
        </span>
      </div>
      <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", color: "#171310" }}>
        27 approvals are waiting
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {LINES.map((line, i) => (
          <Line key={line} text={line} at={at + 12 + i * 6} small />
        ))}
      </div>
      <span
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          height: 46,
          padding: "0 22px",
          borderRadius: 10,
          background: "#171310",
          color: "#FFFFFF",
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        Review
      </span>
    </div>
  );
};

export const ArrivesScene: React.FC = () => {
  const shift = useSpringAt(GMAIL_AT, SPRINGS.smooth, 26);
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${interpolate(shift, [0, 1], [420, 0])}px)`,
        }}
      >
        <Notice
          at={SLACK_AT}
          icon="integrations/slack.svg"
          channel="Slack · #marketing"
          meta="9:41 AM"
          x={116}
          width={840}
          tilt={-1.2}
        />
        <Notice
          at={GMAIL_AT}
          icon="integrations/gmail.png"
          channel="you@dusk.app"
          meta="Ryze · 9:41"
          x={974}
          width={840}
          tilt={1.2}
        />
      </div>
    </AbsoluteFill>
  );
};
