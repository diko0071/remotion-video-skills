import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";

const RAIN_AT = 2;
const STAGGER = 5;
const CLICK_A = 118;
const CLICK_B = 146;
const CLICK_C = 172;
export const APPROVE_TOTAL = 212;

type Item = { title: string; meta: string; channel: "meta" | "google" };

const ITEMS: Item[] = [
  { title: "Move $40/day into Retargeting · Installers", meta: "3.1× return · 7 days", channel: "meta" },
  { title: "Pause ad set — CPI 2.4× average", meta: "Frequency 4.2 · CTR halved", channel: "meta" },
  { title: "Raise bid cap on Search · Brand", meta: "Lost impression share 31%", channel: "google" },
  { title: "Exclude installers from Prospecting", meta: "18% overlap with retargeting", channel: "meta" },
  { title: "Shift $260 into App campaign · iOS", meta: "ROAS 1.4× vs 3.2×", channel: "google" },
  { title: "Refresh 3 fatigued creatives", meta: "CTR down 46% in 9 days", channel: "meta" },
  { title: "Add 12 negative keywords", meta: "$412 wasted last month", channel: "google" },
  { title: "Widen LAL 1% to 3%", meta: "Audience 82% saturated", channel: "meta" },
  { title: "Turn off Display placement", meta: "0 installs · $318 spent", channel: "google" },
  { title: "Cap frequency at 2.5 / week", meta: "Repeat impressions 6.1", channel: "meta" },
  { title: "Move budget to Reels placement", meta: "CPI 41% lower than Feed", channel: "meta" },
  { title: "Split Search into brand / non-brand", meta: "Mixed CPI hides winners", channel: "google" },
];

const COLS = 3;
const CARD_W = 536;
const CARD_H = 168;
const GAP_X = 32;
const GAP_Y = 26;
const LEFT = (1920 - (COLS * CARD_W + (COLS - 1) * GAP_X)) / 2;
const TOP = 268;

const cardX = (i: number) => LEFT + (i % COLS) * (CARD_W + GAP_X);
const cardY = (i: number) => TOP + Math.floor(i / COLS) * (CARD_H + GAP_Y);

const CLICKS = [
  { index: 4, at: CLICK_A },
  { index: 6, at: CLICK_B },
  { index: 9, at: CLICK_C },
];

const approveFrame = (index: number) => CLICKS.find((c) => c.index === index)?.at;

const Card: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const item = ITEMS[index];
  const at = RAIN_AT + index * STAGGER;
  const pop = useSpringAt(at, SPRINGS.card, 20);
  const clickAt = approveFrame(index);
  const press = useSpringAt(clickAt ?? 1e6, SPRINGS.pop, 12);
  const approved = clickAt != null && frame >= clickAt + 2;
  return (
    <div
      data-click={`card.${index}`}
      style={{
        position: "absolute",
        left: cardX(index),
        top: cardY(index),
        width: CARD_W,
        height: CARD_H,
        background: "#FFFFFF",
        borderRadius: 12,
        border: `1px solid rgba(23,19,16,${approved ? 0.05 : 0.09})`,
        boxShadow: "0 10px 30px rgba(74,53,29,0.09)",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontFamily: "'Plus Jakarta Sans'",
        opacity: pop,
        pointerEvents: "none",
        transform: `translateY(${interpolate(pop, [0, 1], [26, 0])}px) scale(${1 - press * 0.014})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <Img
          src={staticFile(item.channel === "meta" ? "meta-ads.svg" : "integrations/google-ads.webp")}
          style={{ width: 16, height: 16 }}
        />
        <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(23,19,16,0.42)" }}>
          {item.meta}
        </span>
      </div>
      <span
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          color: "#171310",
        }}
      >
        {item.title}
      </span>
      <span
        data-click={`ap.${index}`}
        style={{
          marginTop: "auto",
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 38,
          padding: "0 18px",
          borderRadius: 9,
          background: approved ? "#F1EFE9" : "#171310",
          color: approved ? "rgba(23,19,16,0.5)" : "#FFFFFF",
          fontSize: 15,
          fontWeight: 700,
          transform: `scale(${1 - press * 0.07})`,
        }}
      >
        {approved ? (
          <>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#12A150" }} />
            Approved
          </>
        ) : (
          "Approve"
        )}
      </span>
    </div>
  );
};

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const inn = useReveal(-8, 18, 16);
  const n = interpolate(frame, [4, 96], [0, 27], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        ...inn,
        position: "absolute",
        left: LEFT,
        top: 118,
        display: "flex",
        alignItems: "baseline",
        gap: 16,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <span style={{ fontSize: 62, fontWeight: 800, letterSpacing: "-0.03em", color: "#171310" }}>
        {Math.round(n)} approvals
      </span>
      <span style={{ fontSize: 24, fontWeight: 500, color: "rgba(23,19,16,0.45)" }}>
        waiting on you
      </span>
    </div>
  );
};

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1 },
  { at: CLICK_A - 22, target: `card.${CLICKS[0].index}`, zoom: 1.22 },
  { at: CLICK_B - 18, target: `card.${CLICKS[1].index}`, zoom: 1.24 },
  { at: CLICK_C - 16, target: `card.${CLICKS[2].index}`, zoom: 1.26 },
];

export const ApproveScene: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <CameraRig shots={SHOTS} drift={0}>
      <Header />
      {ITEMS.map((_, i) => (
        <Card key={i} index={i} />
      ))}
      <SceneCursor
        from={{ x: 1620, y: 1010 }}
        appearAt={CLICK_A - 40}
        moves={CLICKS.map((c) => ({ target: `ap.${c.index}`, at: c.at, travel: 26 }))}
      />
    </CameraRig>
    <SfxTrack hits={CLICKS.map((c) => ({ name: "mouse-click" as const, at: c.at }))} />
  </AbsoluteFill>
);
