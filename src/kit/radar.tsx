import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export type RadarNode = {
  id: string;
  label: string;
  favicon?: string;
  ring: number;
  angle: number;
  badge?: string;
};

export type RadarConfig = {
  cx: number;
  cy: number;
  ringRx: number[];
  aspect: number;
  revolution: number;
  color: string;
};

export const radarConfig = (partial: Partial<RadarConfig> = {}): RadarConfig => ({
  cx: 960,
  cy: 480,
  ringRx: [400, 640, 880, 1120],
  aspect: 0.52,
  revolution: 116,
  color: "#C19767",
  ...partial,
});

const polar = (cfg: RadarConfig, ring: number, angleDeg: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return {
    x: cfg.cx + Math.cos(a) * cfg.ringRx[ring],
    y: cfg.cy + Math.sin(a) * cfg.ringRx[ring] * cfg.aspect,
  };
};

const sweepDeg = (cfg: RadarConfig) => 360 / cfg.revolution;

const firstHitFrame = (cfg: RadarConfig, angle: number) =>
  ((((angle + 90) % 360) + 360) % 360) / sweepDeg(cfg);

const lastHitFrame = (cfg: RadarConfig, frame: number, angle: number) => {
  const first = firstHitFrame(cfg, angle);
  if (frame < first) return -1;
  return first + Math.floor((frame - first) / cfg.revolution) * cfg.revolution;
};

const Beam: React.FC<{ cfg: RadarConfig }> = ({ cfg }) => {
  const frame = useCurrentFrame();
  const r = cfg.ringRx[cfg.ringRx.length - 1] + 180;
  const head = -90 + frame * sweepDeg(cfg) + 90 - 58;
  return (
    <div
      style={{
        position: "absolute",
        left: cfg.cx - r,
        top: cfg.cy - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        transform: `scaleY(${cfg.aspect})`,
        background: `conic-gradient(from ${head}deg, transparent 0deg, rgba(193,151,103,0.04) 20deg, rgba(193,151,103,0.28) 56deg, transparent 58deg)`,
      }}
    />
  );
};

const Ping: React.FC<{ cfg: RadarConfig; x: number; y: number; hit: number }> = ({
  cfg,
  x,
  y,
  hit,
}) => {
  const frame = useCurrentFrame();
  const t = frame - hit;
  if (hit < 0 || t < 0 || t > 34) return null;
  const r = interpolate(t, [0, 34], [22, 120]);
  const o = interpolate(t, [0, 6, 34], [0, 0.7, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r * cfg.aspect,
        width: r * 2,
        height: r * 2 * cfg.aspect,
        borderRadius: "50%",
        border: `3px solid ${cfg.color}`,
        opacity: o,
      }}
    />
  );
};

const Blip: React.FC<{
  cfg: RadarConfig;
  node: RadarNode;
  appearAt: number;
  highlight?: boolean;
}> = ({ cfg, node, appearAt, highlight }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(appearAt, SPRINGS.pop, 18);
  const badge = useSpringAt(firstHitFrame(cfg, node.angle) + 4, SPRINGS.pop, 16);
  const { x, y } = polar(cfg, node.ring, node.angle);
  const hit = lastHitFrame(cfg, frame, node.angle);
  const glow =
    hit >= 0
      ? interpolate(frame - hit, [0, 5, 26], [0, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  if (frame < appearAt) return null;
  return (
    <>
      <Ping cfg={cfg} x={x} y={y} hit={hit} />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${interpolate(pop, [0, 1], [0.72, 1])})`,
          opacity: pop,
          display: "flex",
          alignItems: "center",
          gap: 11,
          whiteSpace: "nowrap",
          fontFamily: "'Plus Jakarta Sans'",
        }}
      >
        {node.favicon ? (
          <Img
            src={staticFile(node.favicon)}
            style={{ width: 26, height: 26, borderRadius: 6, opacity: 0.5 + glow * 0.5 }}
          />
        ) : null}
        <span
          style={{
            fontSize: 20,
            fontWeight: highlight ? 800 : 600,
            letterSpacing: "-0.01em",
            color: highlight ? "#171310" : `rgba(23,19,16,${0.5 + glow * 0.45})`,
          }}
        >
          {node.label}
        </span>
        {node.badge && badge > 0.02 ? (
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: `rgba(23,19,16,${0.3 + glow * 0.25})`,
              opacity: badge,
            }}
          >
            {node.badge}
          </span>
        ) : null}
      </div>
    </>
  );
};

const Ring: React.FC<{ cfg: RadarConfig; rx: number; index: number; at: number }> = ({
  cfg,
  rx,
  index,
  at,
}) => {
  const draw = useSpringAt(at + index * 4, SPRINGS.panel, 30);
  return (
    <ellipse
      cx={cfg.cx}
      cy={cfg.cy}
      rx={rx}
      ry={rx * cfg.aspect}
      stroke={cfg.color}
      strokeWidth={2}
      fill="none"
      opacity={(0.4 - index * 0.05) * draw}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
    />
  );
};

export const Radar: React.FC<{
  nodes: RadarNode[];
  center: React.ReactNode;
  cfg?: RadarConfig;
  dim?: number;
  highlight?: string;
  appearAt?: number;
  stagger?: number;
}> = ({ nodes, center, cfg = radarConfig(), dim = 0, highlight, appearAt = 6, stagger = 2.5 }) => (
  <div style={{ position: "absolute", inset: 0, opacity: 1 - dim }}>
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      {cfg.ringRx.map((rx, i) => (
        <Ring key={rx} cfg={cfg} rx={rx} index={i} at={appearAt} />
      ))}
    </svg>
    <Beam cfg={cfg} />
    {nodes.map((node, i) => (
      <Blip
        key={node.id}
        cfg={cfg}
        node={node}
        appearAt={appearAt + i * stagger}
        highlight={highlight === node.id}
      />
    ))}
    {center}
  </div>
);
