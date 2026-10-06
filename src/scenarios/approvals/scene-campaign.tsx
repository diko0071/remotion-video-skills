import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import { useFs, useSceneStyle } from "./style";

const RAIN_AT = 2;
const STAGGER = 7;
const CLICK_A = 106;
const CLICK_B = 132;
const CLICK_C = 156;
export const CAMPAIGN_TOTAL = 196;

type Proposal = {
  label: string;
  title: string;
  meta: string;
  creatives: string[];
};

const PROPOSALS: Proposal[] = [
  {
    label: "Sales · Prospecting · US",
    title: "Sleep score · trial",
    meta: "Sleep searches +46% w/w",
    creatives: [
      "dusk/approvals/c1-a.png",
      "dusk/approvals/c1-b.png",
      "dusk/approvals/c1-c.png",
    ],
  },
  {
    label: "Sales · Retargeting · Past buyers",
    title: "Annual plan · Repeat users",
    meta: "38% of revenue is renewals",
    creatives: [
      "dusk/approvals/c2-a.png",
      "dusk/approvals/c2-b.png",
      "dusk/approvals/c2-c.png",
    ],
  },
  {
    label: "Sales · Broad · Creative test",
    title: "UGC Hooks v4",
    meta: "Top hook fatigued at day 34",
    creatives: [
      "dusk/approvals/c3-a.png",
      "dusk/approvals/c3-b.png",
      "dusk/approvals/c3-c.png",
    ],
  },
  {
    label: "Sales · Interest · Travel",
    title: "Jet lag · Summer",
    meta: "Travel searches climbing 3 weeks",
    creatives: [
      "dusk/approvals/c4-a.png",
      "dusk/approvals/c4-b.png",
      "dusk/approvals/c4-c.png",
    ],
  },
  {
    label: "Leads · B2B · HR managers",
    title: "Teams · Corporate wellness",
    meta: "Team plans up 2.4× in Q4",
    creatives: [
      "dusk/approvals/c5-a.png",
      "dusk/approvals/c5-b.png",
      "dusk/approvals/c5-c.png",
    ],
  },
  {
    label: "Sales · Interest · Wearables",
    title: "Watch owners",
    meta: "61% wear a watch to bed",
    creatives: [
      "dusk/approvals/c6-a.png",
      "dusk/approvals/c6-b.png",
      "dusk/approvals/c6-c.png",
    ],
  },
];

const COLS = 3;
const CARD_W = 500;
const GAP_X = 30;
const GAP_Y = 26;
const LEFT = (1920 - (COLS * CARD_W + (COLS - 1) * GAP_X)) / 2;
const TOP = 214;
const cardH = (textScale: number) => (textScale > 1 ? 388 : 372);

const CLICKS = [
  { index: 0, at: CLICK_A },
  { index: 4, at: CLICK_B },
  { index: 2, at: CLICK_C },
];

const approveFrame = (index: number) => CLICKS.find((c) => c.index === index)?.at;

const TILE_SIDE = (CARD_W - 48 - 24) / 3;

const CreativeTile: React.FC<{ file: string; at: number }> = ({ file, at }) => {
  const pop = useSpringAt(at, SPRINGS.card, 20);
  return (
    <Img
      src={staticFile(file)}
      style={{
        width: TILE_SIDE,
        height: TILE_SIDE,
        objectFit: "contain",
        background: "#0A0E22",
        borderRadius: 9,
        display: "block",
        opacity: pop,
        pointerEvents: "none",
        transform: `translateY(${interpolate(pop, [0, 1], [14, 0])}px)`,
      }}
    />
  );
};

const Card: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const p = PROPOSALS[index];
  const at = RAIN_AT + index * STAGGER;
  const pop = useSpringAt(at, SPRINGS.card, 24);
  const clickAt = approveFrame(index);
  const press = useSpringAt(clickAt ?? 1e6, SPRINGS.pop, 12);
  const approved = clickAt != null && frame >= clickAt + 2;
  const fs = useFs();
  const { textScale } = useSceneStyle();
  const CARD_H = cardH(textScale);
  return (
    <div
      data-click={`card.${index}`}
      style={{
        position: "absolute",
        left: LEFT + (index % COLS) * (CARD_W + GAP_X),
        top: TOP + Math.floor(index / COLS) * (CARD_H + GAP_Y),
        width: CARD_W,
        height: CARD_H,
        background: "#FFFFFF",
        borderRadius: 12,
        border: `1px solid rgba(23,19,16,${approved ? 0.05 : 0.09})`,
        boxShadow: "0 14px 40px rgba(74,53,29,0.11)",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: "'Plus Jakarta Sans'",
        opacity: pop,
        pointerEvents: "none",
        transform: `translateY(${interpolate(pop, [0, 1], [30, 0])}px) scale(${1 - press * 0.012})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <Img src={staticFile("meta-ads.svg")} style={{ width: 16, height: 16 }} />
        <span style={{ fontSize: fs(14), fontWeight: 500, color: "rgba(23,19,16,0.42)" }}>
          {p.label}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <span style={{ fontSize: fs(27), fontWeight: 700, letterSpacing: "-0.015em", color: "#171310" }}>
          {p.title}
        </span>
        <span style={{ fontSize: fs(17), fontWeight: 500, color: "rgba(23,19,16,0.5)" }}>{p.meta}</span>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {p.creatives.map((file, k) => (
          <CreativeTile key={file} file={file} at={at + 16 + k * 6} />
        ))}
      </div>
      <span
        data-click={`np.${index}`}
        style={{
          marginTop: "auto",
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 42,
          padding: "0 20px",
          borderRadius: 9,
          background: approved ? "#F1EFE9" : "#171310",
          color: approved ? "rgba(23,19,16,0.5)" : "#FFFFFF",
          fontSize: fs(16),
          fontWeight: 700,
          transform: `scale(${1 - press * 0.07})`,
        }}
      >
        {approved ? (
          <>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#12A150" }} />
            Live
          </>
        ) : (
          "Approve & launch"
        )}
      </span>
    </div>
  );
};

const Header: React.FC = () => {
  const inn = useReveal(-8, 18, 16);
  return (
    <div
      style={{
        ...inn,
        position: "absolute",
        left: LEFT,
        top: 116,
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <span style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.03em", color: "#171310" }}>
        Next steps
      </span>
      <span style={{ fontSize: 24, fontWeight: 500, color: "rgba(23,19,16,0.45)" }}>
        creatives already made
      </span>
    </div>
  );
};

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1 },
  { at: CLICK_A - 24, target: "card.0", zoom: 1.2 },
  { at: CLICK_B - 16, target: "card.4", zoom: 1.22 },
  { at: CLICK_C - 14, target: "card.2", zoom: 1.24 },
];

export const CampaignScene: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <CameraRig shots={SHOTS} drift={0}>
      <Header />
      {PROPOSALS.map((_, i) => (
        <Card key={i} index={i} />
      ))}
      <SceneCursor
        from={{ x: 1660, y: 1010 }}
        appearAt={CLICK_A - 40}
        moves={CLICKS.map((c) => ({ target: `np.${c.index}`, at: c.at, travel: 26 }))}
      />
    </CameraRig>
    <SfxTrack hits={CLICKS.map((c) => ({ name: "mouse-click" as const, at: c.at }))} />
  </AbsoluteFill>
);
