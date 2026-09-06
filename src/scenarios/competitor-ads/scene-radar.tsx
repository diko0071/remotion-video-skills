import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { useReveal } from "../../core/motion";
import { Radar, radarConfig, type RadarConfig, type RadarNode } from "../../kit/radar";

const CFG = radarConfig();

export const RADAR_NODES: RadarNode[] = [
  { id: "granola.ai", label: "granola.ai", favicon: "appicons/granola.ai.png", ring: 0, angle: -38, badge: "12 ads" },
  { id: "cluely.com", label: "cluely.com", favicon: "appicons/cluely.com.png", ring: 0, angle: 118, badge: "9 ads" },
  { id: "wisprflow.ai", label: "wisprflow.ai", favicon: "appicons/wisprflow.ai.png", ring: 0, angle: 226, badge: "15 ads" },
  { id: "rocketmoney.com", label: "rocketmoney.com", favicon: "appicons/rocketmoney.com.png", ring: 1, angle: 22, badge: "7 ads" },
  { id: "whoop.com", label: "whoop.com", favicon: "appicons/whoop.com.png", ring: 1, angle: 96, badge: "21 ads" },
  { id: "perplexity.ai", label: "perplexity.ai", favicon: "appicons/perplexity.ai.png", ring: 1, angle: 172, badge: "11 ads" },
  { id: "todoist.com", label: "todoist.com", favicon: "appicons/todoist.com.png", ring: 1, angle: 268, badge: "18 ads" },
  { id: "chime.com", label: "chime.com", favicon: "appicons/chime.com.png", ring: 1, angle: 322, badge: "8 ads" },
  { id: "lovable.dev", label: "lovable.dev", favicon: "appicons/lovable.dev.png", ring: 2, angle: 10, badge: "14 ads" },
  { id: "suno.com", label: "suno.com", favicon: "appicons/suno.com.png", ring: 2, angle: 74, badge: "6 ads" },
  { id: "eightsleep.com", label: "eightsleep.com", favicon: "appicons/eightsleep.com.png", ring: 2, angle: 138, badge: "10 ads" },
  { id: "meetcleo.com", label: "meetcleo.com", favicon: "appicons/meetcleo.com.png", ring: 2, angle: 208, badge: "9 ads" },
  { id: "capcut.com", label: "capcut.com", favicon: "appicons/capcut.com.png", ring: 2, angle: 288, badge: "13 ads" },
  { id: "heygen.com", label: "heygen.com", favicon: "appicons/heygen.com.png", ring: 3, angle: 48, badge: "16 ads" },
  { id: "hatch.co", label: "hatch.co", favicon: "appicons/hatch.co.png", ring: 3, angle: 150, badge: "7 ads" },
  { id: "replit.com", label: "replit.com", favicon: "appicons/replit.com.png", ring: 3, angle: 252, badge: "12 ads" },
];

export const YouCard: React.FC = () => {
  const inn = useReveal(2, 26, 22);
  return (
    <div
      style={{
        ...inn,
        position: "absolute",
        left: CFG.cx - 165,
        top: CFG.cy - 64,
        width: 330,
        background: "#FFFFFF",
        borderRadius: 14,
        boxShadow: "0 26px 70px rgba(74,53,29,0.28)",
        border: "1px solid rgba(23,19,16,0.07)",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "10px 15px",
          borderBottom: "1px solid rgba(23,19,16,0.08)",
        }}
      >
        {["#F87171", "#FBBF24", "#34D399"].map((c) => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
        ))}
        <span
          style={{
            marginLeft: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(23,19,16,0.55)",
            background: "rgba(23,19,16,0.05)",
            borderRadius: 6,
            padding: "3px 12px",
          }}
        >
          dusk.app
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 18px" }}>
        <Img
          src={staticFile("appicons/dusk.app.png")}
          style={{ width: 60, height: 60, borderRadius: 14 }}
        />
        <span style={{ fontSize: 22, fontWeight: 800, color: "#171310" }}>Dusk</span>
      </div>
    </div>
  );
};

export const RadarField: React.FC<{
  dim?: number;
  highlight?: string;
  nodes?: RadarNode[];
  cfg?: RadarConfig;
}> = ({ dim, highlight, nodes = RADAR_NODES, cfg = CFG }) => (
  <Radar
    nodes={nodes}
    center={<YouCard />}
    cfg={cfg}
    dim={dim}
    highlight={highlight}
    appearAt={-8}
    stagger={2}
  />
);

const FADE_IN = 18;
const ZOOM_FROM = 30;
const ZOOM_END = 200;
export const RADAR_TOTAL = 212;

export const RadarScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom =
    frame < ZOOM_FROM
      ? 1.65
      : 1.65 * Math.pow(0.44, Math.min((frame - ZOOM_FROM) / (ZOOM_END - ZOOM_FROM), 1));
  const fade = interpolate(frame, [0, FADE_IN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: "var(--background)", opacity: fade }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: `${CFG.cx}px ${CFG.cy}px`,
        }}
      >
        <RadarField />
      </div>
    </AbsoluteFill>
  );
};
