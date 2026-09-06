import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";

export const DATA_TOTAL = 186;

const COLS = 9;
const TILES_PER_COL = 9;
const COL_W = 268;
const TILE_H = 268;
const GAP = 18;

const CREATIVES = [
  "wispr-flow_top-s1-23d", "granola_top-2-30d", "cluely_top-4-11d", "rocket-money_top-s3",
  "perplexity_top-4-75d", "suno_top-2-61d", "heygen_top-1-42d", "whoop_top-1-53d",
  "eight-sleep_top-7-29d", "chime_top-s9", "cleo_top-2-45d", "todoist_top-1-6d",
  "akiflow_top-1-73d", "lovable_top-4-23d", "base44_top-1-131d", "replit_top-8-5d",
  "cursor_top-3-2d", "elevenlabs_top-2-154d", "synthesia_top-1-18d", "capcut_top-6-114d",
  "nanit_top-2-23d", "owlet_top-2-6d", "hatch_top-1-39d", "artistly-ai_top-1-446d",
  "starface_top-8-30d", "wispr-flow_top-s5-24d", "wispr-flow_top-s3-18d", "rocket-money_top-s4",
  "chime_top-s10", "cleo_top-s4", "base44_top-2-43d", "heygen_top-2-42d",
  "wispr-flow_top-s6-23d", "capcut_top-10-89d", "nanit_top-3-4d", "owlet_top-8-6d",
];

const CAMPAIGNS = [
  { name: "Trial · Sleep score", meta: "Meta · 4 ad sets · $2,140" },
  { name: "Prospecting LAL 1%", meta: "Meta · 9 ads · $6,980" },
  { name: "Always-On Search", meta: "Google · 12 groups · $4,320" },
  { name: "App campaign · iOS", meta: "Google · 3 assets · $8,110" },
  { name: "Retargeting · Installers", meta: "Meta · 6 ads · $3,265" },
  { name: "UGC Hooks v3", meta: "Meta · 7 ads · $1,905" },
  { name: "Day-3 onboarding", meta: "Lifecycle · 5 flows" },
  { name: "Creators · Reels", meta: "Meta · 11 ads · $5,540" },
  { name: "Brand Defense", meta: "Google · 4 groups · $980" },
  { name: "Annual plan push", meta: "Meta · 8 ads · $2,760" },
];

const CampaignCard: React.FC<{ index: number }> = ({ index }) => {
  const { name, meta } = CAMPAIGNS[index % CAMPAIGNS.length];
  return (
    <div
      style={{
        width: "100%",
        height: TILE_H,
        background: "#FFFFFF",
        borderRadius: 10,
        border: "1px solid rgba(23,19,16,0.07)",
        boxShadow: "0 1px 2px rgba(74,53,29,0.05)",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em", color: "#171310" }}>
        {name}
      </span>
      <span style={{ fontSize: 18, fontWeight: 500, color: "rgba(23,19,16,0.45)" }}>{meta}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
        {[0.82, 0.6, 0.44].map((w, i) => (
          <span
            key={i}
            style={{
              height: 8,
              width: `${w * 100}%`,
              borderRadius: 4,
              background: "rgba(23,19,16,0.07)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Column: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const speed = 3.4 + (index % 4) * 0.9;
  const dir = index % 2 === 0 ? 1 : -1;
  const span = (TILE_H + GAP) * TILES_PER_COL;
  const offset = (((frame * speed * dir) % span) + span) % span;
  const x = 960 + (index - (COLS - 1) / 2) * COL_W;
  return (
    <div
      style={{
        position: "absolute",
        left: x - COL_W / 2,
        top: -span + offset,
        width: COL_W - GAP,
        display: "flex",
        flexDirection: "column",
        gap: GAP,
      }}
    >
      {Array.from({ length: TILES_PER_COL * 2 }, (_, k) => {
        const i = index * 17 + k * 5;
        const isCampaign = (i + index) % 5 === 3;
        return isCampaign ? (
          <CampaignCard key={k} index={i} />
        ) : (
          <Img
            key={k}
            src={staticFile(`apps/${CREATIVES[i % CREATIVES.length]}.jpg`)}
            style={{
              width: "100%",
              height: TILE_H,
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: 10,
              display: "block",
            }}
          />
        );
      })}
    </div>
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const inn = useReveal(24, 20, 18);
  const n = interpolate(frame, [30, 150], [0, 204318], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        ...inn,
        position: "absolute",
        left: 0,
        right: 0,
        top: 404,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 960 - 700,
          top: -110,
          width: 1400,
          height: 460,
          background:
            "radial-gradient(closest-side, rgba(253,250,243,0.97) 0%, rgba(253,250,243,0.9) 55%, rgba(253,250,243,0) 100%)",
        }}
      />
      <span
        style={{
          position: "relative",
          fontSize: 148,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          color: "#171310",
          textShadow: "0 8px 60px rgba(253,250,243,0.95)",
        }}
      >
        {Math.round(n).toLocaleString("en-US")}
      </span>
      <span
        style={{
          position: "relative",
          fontSize: 28,
          fontWeight: 600,
          color: "rgba(23,19,16,0.6)",
        }}
      >
        data points read today
      </span>
    </div>
  );
};

export const DataScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = Math.max(1.55 * Math.pow(0.62, frame / 96), 0.72);
  return (
    <AbsoluteFill style={{ background: "var(--background)", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: "960px 520px",
        }}
      >
        {Array.from({ length: COLS }, (_, i) => (
          <Column key={i} index={i} />
        ))}
      </div>
      <Counter />
    </AbsoluteFill>
  );
};
