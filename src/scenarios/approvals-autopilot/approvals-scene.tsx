import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt, useVelocityBlur } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { CARD_STYLE } from "../../kit/promo-blocks";
import { SfxTrack } from "../../kit/sfx";
import { A } from "./timings";

type Finding = {
  severity: string;
  platform: { logo: string; name: string };
  title: string;
  detail: string;
  impact: string;
};

const GOOGLE = { logo: "integrations/google-ads.webp", name: "Google Ads" };
const META = { logo: "integrations/meta-ads.svg", name: "Meta Ads" };

const FINDINGS: Finding[] = [
  {
    severity: "P0",
    platform: GOOGLE,
    title: "PMax spends $101/day with a broken tag",
    detail: "Conversion tag never fired once. Pause until it's fixed.",
    impact: "Save $101/day",
  },
  {
    severity: "P1",
    platform: GOOGLE,
    title: "$412/mo on keywords with zero conversions",
    detail: "Add 14 negative keywords to 'Brand + Generic'.",
    impact: "Save $412/mo",
  },
  {
    severity: "P1",
    platform: META,
    title: "Retargeting capped at $40/day at ROAS 6.2",
    detail: "Move $80/day from Prospecting (ROAS 0.9).",
    impact: "+$2.1k rev/mo",
  },
  {
    severity: "P2",
    platform: META,
    title: "Lookalike 5% fatigued — CPA up 68%",
    detail: "Rotate in 3 fresh creatives.",
    impact: "CPA −22%",
  },
  {
    severity: "P2",
    platform: GOOGLE,
    title: "12 high-intent search terms unmapped",
    detail: "Add as exact match to Search-Core.",
    impact: "+9% CTR",
  },
  {
    severity: "P2",
    platform: GOOGLE,
    title: "/pricing returns 404 since Tuesday",
    detail: "3 ads still send traffic there. Pause them.",
    impact: "Save $38/day",
  },
  {
    severity: "P2",
    platform: META,
    title: "Two ad sets overlap 71% of audience",
    detail: "Merge them, keep the winning creative.",
    impact: "CPM −14%",
  },
];

const CARD_W = 980;
const CARD_H = 380;

const PlatformBadge: React.FC<{ platform: Finding["platform"] }> = ({ platform }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <Img src={staticFile(platform.logo)} style={{ width: 34, height: 34, objectFit: "contain" }} />
    <span style={{ fontSize: 22, fontWeight: 700, color: "rgba(23,19,16,0.65)" }}>
      {platform.name}
    </span>
  </span>
);

const SeverityChip: React.FC<{ severity: string }> = ({ severity }) => (
  <span
    style={{
      fontSize: 19,
      fontWeight: 800,
      letterSpacing: "0.06em",
      color: severity === "P0" ? "#b42318" : severity === "P1" ? "#9a6e38" : "rgba(23,19,16,0.5)",
      background:
        severity === "P0"
          ? "rgba(180,35,24,0.1)"
          : severity === "P1"
            ? "rgba(193,151,103,0.16)"
            : "rgba(23,19,16,0.06)",
      borderRadius: 8,
      padding: "5px 12px",
    }}
  >
    {severity}
  </span>
);

const CardBody: React.FC<{ finding: Finding; approved: number }> = ({ finding, approved }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 20,
      padding: "36px 44px",
      height: "100%",
      boxSizing: "border-box",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <PlatformBadge platform={finding.platform} />
        <SeverityChip severity={finding.severity} />
      </span>
      <span style={{ fontSize: 27, fontWeight: 800, color: "#059669" }}>{finding.impact}</span>
    </div>
    <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", color: "#171310" }}>
      {finding.title}
    </div>
    <div style={{ fontSize: 27, fontWeight: 500, color: "rgba(23,19,16,0.55)" }}>
      {finding.detail}
    </div>
    <div style={{ display: "flex", gap: 16, marginTop: "auto", justifyContent: "flex-end" }}>
      <span
        style={{
          fontSize: 25,
          fontWeight: 700,
          color: "rgba(23,19,16,0.45)",
          padding: "15px 32px",
          borderRadius: 10,
          border: "1.5px solid rgba(23,19,16,0.14)",
        }}
      >
        Reject
      </span>
      <span
        style={{
          fontSize: 25,
          fontWeight: 700,
          color: "#F5EFE4",
          background: "#171310",
          padding: "15px 36px",
          borderRadius: 10,
          transform: `scale(${1 - approved * 0.06})`,
        }}
      >
        Approve
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: approved,
        transform: `rotate(-8deg) scale(${interpolate(approved, [0, 1], [1.7, 1])})`,
      }}
    >
      <span
        style={{
          fontSize: 66,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: "#059669",
          border: "6px solid #059669",
          borderRadius: 14,
          padding: "10px 32px",
          background: "rgba(255,255,255,0.82)",
        }}
      >
        APPROVED
      </span>
    </div>
  </div>
);

const CardSlot: React.FC<{ finding: Finding; index: number }> = ({ finding, index }) => {
  const frame = useCurrentFrame();
  const clickAt = A.clicks[index];
  const inAt = index === 0 ? A.cardIn : A.clicks[index - 1] + 2;
  const outAt = clickAt + A.flyAfter;

  const inP = useSpringAt(inAt, SPRINGS.card, 12);
  const inBlur = useVelocityBlur(inAt, SPRINGS.card, 12);
  const stamp = useSpringAt(clickAt, SPRINGS.pop, 12);
  const outP = useSpringAt(outAt, SPRINGS.card, 12);
  const outBlur = useVelocityBlur(outAt, SPRINGS.card, 12);

  if (frame < (index === 0 ? A.cardIn - 2 : inAt - 2) || frame >= outAt + 16) return null;
  const entering = index === 0 ? 1 : inP;
  return (
    <div
      style={{
        ...CARD_STYLE,
        position: "absolute",
        width: CARD_W,
        height: CARD_H,
        opacity: index === 0 ? 1 - outP : Math.min(1, entering * 1.4) * (1 - outP),
        transform: [
          `translateX(${interpolate(entering, [0, 1], [900, 0]) + interpolate(outP, [0, 1], [0, -1500])}px)`,
          `rotate(${interpolate(outP, [0, 1], [0, -6])}deg)`,
        ].join(" "),
        filter: frame < clickAt ? (index === 0 ? "none" : inBlur) : outBlur,
      }}
    >
      <CardBody finding={finding} approved={Math.min(1, stamp * 1.2)} />
    </div>
  );
};

const PillMorph: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useSpringAt(A.morph, SPRINGS.card, A.morphDur);
  if (frame >= A.cardIn + 4) return null;
  const w = interpolate(p, [0, 1], [280, CARD_W]);
  const h = interpolate(p, [0, 1], [58, CARD_H]);
  return (
    <div
      style={{
        position: "absolute",
        width: w,
        height: h,
        borderRadius: interpolate(p, [0, 1], [12, 22]),
        background: p < 0.5 ? "#171310" : "#ffffff",
        boxShadow: "0 24px 70px rgba(20,15,10,0.13)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${interpolate(p, [0, 1], [415, 0])}px)`,
        filter: `blur(${(1 - Math.abs(p - 0.5) * 2) * 3}px)`,
      }}
    >
      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#F5EFE4",
          opacity: Math.max(0, 1 - p * 2.2),
          whiteSpace: "nowrap",
        }}
      >
        7 approvals ready
      </span>
            <span
        style={{
          position: "absolute",
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "#171310",
          whiteSpace: "nowrap",
          opacity: interpolate(p, [0.55, 0.92], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {FINDINGS[0].title}
      </span>
    </div>
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const approved = A.clicks.filter((c) => frame >= c).length;
  const bump = useSpringAt(A.clicks[approved - 1] ?? -99, SPRINGS.pop, 10);
  if (frame < A.cardIn) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 78,
        fontSize: 30,
        fontWeight: 800,
        color: approved === 7 ? "#059669" : "rgba(23,19,16,0.5)",
        fontVariantNumeric: "tabular-nums",
        transform: `scale(${1 + (1 - bump) * 0.25})`,
      }}
    >
      Approved {approved}/7
    </div>
  );
};

export const ApprovalsScene: React.FC = () => {
  const btn = { x: 1920 / 2 + CARD_W / 2 - 96, y: 1080 / 2 + CARD_H / 2 - 52 };
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <PillMorph />
      {FINDINGS.map((f, i) => (
        <CardSlot key={f.title} finding={f} index={i} />
      ))}
      <Counter />
      <SfxTrack hits={A.clicks.map((at) => ({ name: "mouse-click" as const, at }))} />
      <Cursor
        appearAt={A.cursorIn}
        stops={[
          { x: 1560, y: 980, at: A.cursorIn },
          { x: btn.x, y: btn.y, at: A.cursorIn + 4 },
          ...A.clicks.map((at) => ({ x: btn.x, y: btn.y, at, click: true })),
        ]}
      />
    </AbsoluteFill>
  );
};
