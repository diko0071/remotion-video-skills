import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export type OrbitConfig = {
  center: { x: number; y: number };
  radius: number;
  tile: number;
  from: number;
  collapseFrom: number;
  collapseTo: number;
  squash?: number;
  phaseTo?: number;
};

export const orbitPhase = (frame: number, cfg: OrbitConfig) =>
  interpolate(frame, [cfg.from, cfg.collapseFrom, cfg.collapseTo], [0, 1.5, cfg.phaseTo ?? 4.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.35, 0, 0.7, 1),
  });

export const orbitRadius = (frame: number, cfg: OrbitConfig) =>
  interpolate(frame, [cfg.collapseFrom, cfg.collapseTo], [cfg.radius, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.6, 0, 0.9, 0.4),
  });

export const OrbitTile: React.FC<{ file: string; index: number; count: number; at: number; cfg: OrbitConfig; iconSize?: number }> = ({
  file,
  index,
  count,
  at,
  cfg,
  iconSize,
}) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(at, SPRINGS.pop, 22);
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2 + orbitPhase(frame, cfg);
  const r = orbitRadius(frame, cfg);
  const collapse = interpolate(frame, [cfg.collapseFrom + 10, cfg.collapseTo], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(pop, [0, 1], [0.3, 1]) * (1 - collapse * 0.45);
  const opacity = pop * interpolate(r, [40, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < at || frame > cfg.collapseTo) return null;
  const tile = cfg.tile;
  return (
    <div
      style={{
        position: "absolute",
        left: cfg.center.x + Math.cos(angle) * r - tile / 2,
        top: cfg.center.y + Math.sin(angle) * r * (cfg.squash ?? 0.82) - tile / 2,
        width: tile,
        height: tile,
        borderRadius: tile * 0.27,
        background: "#fff",
        border: "1px solid rgba(17,17,19,0.08)",
        boxShadow: "0 10px 30px rgba(17,17,19,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <Img src={staticFile(file)} style={{ width: iconSize ?? tile * 0.57, height: iconSize ?? tile * 0.57, objectFit: "contain", display: "block" }} />
    </div>
  );
};

export const OrbitRing: React.FC<{ files: string[]; marks: number[]; cfg: OrbitConfig; iconSize?: number }> = ({ files, marks, cfg, iconSize }) => (
  <>
    {files.map((file, i) => (
      <OrbitTile key={file} file={file} index={i} count={files.length} at={marks[i]} cfg={cfg} iconSize={iconSize} />
    ))}
  </>
);
