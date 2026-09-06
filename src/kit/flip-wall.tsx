import React from "react";
import { TileImg } from "./tile-img";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export type FlipBack = { kind: string; title: string; meta: string };

export type FlipWallConfig = {
  size: number;
  gap: number;
  cols: number;
  rows: number;
  left: number;
  top: number;
};

export const flipConfig = (partial: Partial<FlipWallConfig> = {}): FlipWallConfig => ({
  size: 268,
  gap: 14,
  cols: 7,
  rows: 4,
  left: 30,
  top: -40,
  ...partial,
});

export const flipX = (cfg: FlipWallConfig, i: number) =>
  cfg.left + (i % cfg.cols) * (cfg.size + cfg.gap);
export const flipY = (cfg: FlipWallConfig, i: number) =>
  cfg.top + Math.floor(i / cfg.cols) * (cfg.size + cfg.gap);

const centerDistance = (cfg: FlipWallConfig, i: number) => {
  const col = i % cfg.cols;
  const row = Math.floor(i / cfg.cols);
  const dx = col - (cfg.cols - 1) / 2;
  const dy = (row - (cfg.rows - 1) / 2) * 1.35;
  return Math.sqrt(dx * dx + dy * dy);
};

const FlipFace: React.FC<{ deg: number; visible: boolean; children: React.ReactNode }> = ({
  deg,
  visible,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      transform: `rotateY(${deg}deg)`,
      backfaceVisibility: "hidden",
      opacity: visible ? 1 : 0,
    }}
  >
    {children}
  </div>
);

const BackFace: React.FC<{ back: FlipBack }> = ({ back }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "#FFFFFF",
      borderRadius: 14,
      boxShadow: "0 18px 44px rgba(23,19,16,0.16)",
      border: "1px solid rgba(23,19,16,0.07)",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 8,
      fontFamily: "'Plus Jakarta Sans'",
    }}
  >
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(23,19,16,0.34)",
      }}
    >
      {back.kind}
    </span>
    <span style={{ fontSize: 20, fontWeight: 700, color: "#171310", lineHeight: 1.2 }}>
      {back.title}
    </span>
    <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(23,19,16,0.5)", lineHeight: 1.3 }}>
      {back.meta}
    </span>
  </div>
);

export const FlipTile: React.FC<{
  cfg: FlipWallConfig;
  index: number;
  front: string;
  backs: FlipBack[];
  appearAt: number;
  flipAts: number[];
  flipSpread: number;
}> = ({ cfg, index, front, backs, appearAt, flipAts, flipSpread }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(appearAt, SPRINGS.card, 18);
  const spread = centerDistance(cfg, index) * flipSpread;
  const turns = flipAts.map((at) =>
    interpolate(frame, [at + spread, at + spread + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const deg = turns.reduce((sum, t) => sum + (1 - Math.pow(1 - t, 3)) * 180, 0);
  const stage = deg < 90 ? 0 : deg < 270 ? 1 : 2;
  return (
    <div
      style={{
        position: "absolute",
        left: flipX(cfg, index),
        top: flipY(cfg, index),
        width: cfg.size,
        height: cfg.size,
        perspective: 1300,
        opacity: pop,
        transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateY(${deg}deg)`,
        }}
      >
        <FlipFace deg={0} visible={stage === 0}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 18px 44px rgba(74,53,29,0.16)",
            }}
          >
            <TileImg file={front} />
          </div>
        </FlipFace>
        <FlipFace deg={180} visible={stage === 1}>
          <BackFace back={backs[0]} />
        </FlipFace>
        <FlipFace deg={360} visible={stage === 2}>
          <BackFace back={backs[1] ?? backs[0]} />
        </FlipFace>
      </div>
    </div>
  );
};

export const FlipWall: React.FC<{
  cfg?: FlipWallConfig;
  fronts: string[];
  backs: FlipBack[][];
  appearFrom?: number;
  appearStep?: number;
  flipAts: number[];
  flipSpread?: number;
}> = ({ cfg = flipConfig(), fronts, backs, appearFrom = 2, appearStep = 1.6, flipAts, flipSpread = 5 }) => (
  <>
    {Array.from({ length: cfg.cols * cfg.rows }, (_, i) => (
      <FlipTile
        key={i}
        cfg={cfg}
        index={i}
        front={fronts[(i * 5) % fronts.length]}
        backs={backs.map((set) => set[i % set.length])}
        appearAt={appearFrom + i * appearStep}
        flipAts={flipAts}
        flipSpread={flipSpread}
      />
    ))}
  </>
);

export const GlowPlate: React.FC<{ opacity: number; top?: number }> = ({ opacity, top = 400 }) => (
  <div
    style={{
      position: "absolute",
      left: 960 - 800,
      top: top - 150,
      width: 1600,
      height: 600,
      background:
        "radial-gradient(closest-side, var(--background) 0%, var(--background) 40%, rgba(253,250,243,0.85) 62%, rgba(253,250,243,0) 100%)",
      opacity,
    }}
  />
);

export const GlowText: React.FC<{
  opacity: number;
  top?: number;
  size?: number;
  children: React.ReactNode;
}> = ({ opacity, top = 400, size = 74, children }) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 960 - 800,
        top: top - 150,
        width: 1600,
        height: 600,
        background:
          "radial-gradient(closest-side, var(--background) 0%, var(--background) 40%, rgba(253,250,243,0.85) 62%, rgba(253,250,243,0) 100%)",
        opacity,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top,
        textAlign: "center",
        fontFamily: "'Plus Jakarta Sans'",
        fontSize: size,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.16,
        color: "#171310",
        opacity,
      }}
    >
      {children}
    </div>
  </>
);
