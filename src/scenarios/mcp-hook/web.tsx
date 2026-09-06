import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../../kit/cursor";
import { GradientBlob, GradientField } from "../../kit/gradient-field";
import { DirectionalBlur } from "../../kit/directional-blur";
import { PlatformIcon } from "../../kit/platform-icon";
import { CLUSTER_SPREAD, sample } from "./curves";
import { ramp } from "../../core/motion";
import { SANS } from "./font";
import { APP_ICON, CLUSTER, CORAL, CURSOR2, GROUND_IN, HUB, INK, STRANDS, STRAND_COLORS, TILE, TILES, WORDMARK } from "./timings";

const GROUND: GradientBlob[] = [
  { color: "#7C9AFF", x: 0.82, y: 0.06, r: 0.5, dx: 0.03, dy: 0.02, speed: 0.4 },
  { color: "#F0604A", x: 0.58, y: 1.02, r: 0.42, dx: 0.04, dy: 0.02, speed: 0.5 },
  { color: "#FFE6A6", x: 1.0, y: 0.82, r: 0.32, dx: 0.03, dy: 0.03, speed: 0.6 },
];

const strandPath = (i: number) => {
  const t = TILES[i];
  const x0 = t.x + TILE.size / 2;
  const y0 = t.y;
  return { x0, y0, c1x: x0 + 250, c1y: y0, c2x: HUB.x - 150, c2y: HUB.y };
};

const bez = (p: ReturnType<typeof strandPath>, u: number) => {
  const m = 1 - u;
  return {
    x: m * m * m * p.x0 + 3 * m * m * u * p.c1x + 3 * m * u * u * p.c2x + u * u * u * HUB.x,
    y: m * m * m * p.y0 + 3 * m * m * u * p.c1y + 3 * m * u * u * p.c2y + u * u * u * HUB.y,
  };
};

const PulseDot: React.FC<{ p: ReturnType<typeof strandPath>; u: number; color: string }> = ({ p, u, color }) => {
  const pt = bez(p, u);
  const ahead = bez(p, Math.min(1, u + 0.03));
  const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: pt.x - 22, top: pt.y - 5, width: 44, height: 10, borderRadius: 5, background: color, transform: `rotate(${angle}deg)`, boxShadow: `0 0 12px ${color}`, filter: "blur(1.5px)", opacity: 0.95 }} />
  );
};

const Strand: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const at = STRANDS.at[index];
  const draw = ramp(frame, at, at + STRANDS.len);
  const p = strandPath(index);
  const d = `M ${p.x0} ${p.y0} C ${p.c1x} ${p.c1y} ${p.c2x} ${p.c2y} ${HUB.x} ${HUB.y}`;
  const loopU = ((frame - STRANDS.pulseFrom + index * 6 + STRANDS.period * 4) % STRANDS.period) / STRANDS.period;
  const color = STRAND_COLORS[index];
  if (frame < at) return null;
  return (
    <>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={d} stroke="#B4B1AB" strokeWidth={2} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      </svg>
      {draw < 1 ? <PulseDot p={p} u={draw} color={color} /> : loopU <= 0.96 ? <PulseDot p={p} u={loopU} color={color} /> : null}
    </>
  );
};

const CLUSTER_OFFSET = [
  { x: -60, y: -170 },
  { x: 120, y: -70 },
  { x: -120, y: 20 },
  { x: 110, y: 110 },
  { x: -40, y: 190 },
];

const Tile: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const t = TILES[index];
  const s = sample(CLUSTER_SPREAD, frame, TILE.spreadAt);
  const sPrev = sample(CLUSTER_SPREAD, frame - 1, TILE.spreadAt);
  const from = { x: CLUSTER.cx + CLUSTER_OFFSET[index].x, y: CLUSTER.cy + CLUSTER_OFFSET[index].y };
  const x = from.x + (t.x - from.x) * s;
  const y = from.y + (t.y - from.y) * s;
  const v = Math.abs(s - sPrev) * Math.hypot(t.x - from.x, t.y - from.y);
  const size = TILE.size;
  return (
    <DirectionalBlur id={`mh-tile-${index}`} x={v * 0.3} y={v * 0.3} style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size }}>
      <div data-click={`tile.${t.key}`} style={{ width: size, height: size, borderRadius: TILE.radius, boxShadow: "0 18px 40px rgba(0,0,0,0.22)", transform: `rotate(${(1 - Math.min(1, s)) * 18 * (index % 2 ? 1 : -1)}deg)` }}>
        <div style={{ width: size, height: size, borderRadius: TILE.radius, background: "#141414", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PlatformIcon id={t.key} size={t.key === "google" ? size * 0.62 : size * 0.5} />
        </div>
      </div>
    </DirectionalBlur>
  );
};

const WORD = "Ryze";

export const WebScene: React.FC = () => {
  const frame = useCurrentFrame();
  const ground = ramp(frame, GROUND_IN[0], GROUND_IN[1]);
  const grow = 1 - Math.pow(1 - ramp(frame, APP_ICON.grow[0], APP_ICON.grow[1]), 2.4);
  const growPrev = 1 - Math.pow(1 - ramp(frame - 1, APP_ICON.grow[0], APP_ICON.grow[1]), 2.4);
  const over = 1 + 0.08 * Math.sin(Math.min(1, ramp(frame, APP_ICON.grow[0] + 3, APP_ICON.grow[1] + 6)) * Math.PI);
  const dark = ramp(frame, APP_ICON.darken[0], APP_ICON.darken[1]);
  const ix = APP_ICON.from.x + (APP_ICON.x - APP_ICON.from.x) * grow;
  const iy = APP_ICON.from.y + (APP_ICON.y - APP_ICON.from.y) * grow;
  const isize = (APP_ICON.from.size + (APP_ICON.size - APP_ICON.from.size) * grow) * over;
  const iv = (grow - growPrev) * 300;
  const shown = Math.min(WORD.length, Math.max(0, Math.floor((frame - WORDMARK.from) * WORDMARK.charsPerFrame) + (frame >= WORDMARK.from ? 1 : 0)));
  const mcp = ramp(frame, WORDMARK.mcpAt, WORDMARK.mcpAt + 8);
  const claude = TILES[1];
  const r = Math.round(232 + (20 - 232) * dark);
  const g = Math.round(115 + (20 - 115) * dark);
  const b = Math.round(90 + (20 - 90) * dark);
  return (
    <>
      <GradientField blobs={GROUND} base="#FFFFFF" blur={120} opacity={ground * 0.8} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 32%, rgba(255,255,255,0) 68%)", opacity: ground }} />
      {TILES.map((_, i) => (
        <Strand key={i} index={i} />
      ))}
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <path d={`M ${HUB.x} ${HUB.y} L ${APP_ICON.x - APP_ICON.size / 2} ${HUB.y}`} stroke="#B4B1AB" strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ramp(frame, STRANDS.at[0] + STRANDS.len - 2, STRANDS.at[0] + STRANDS.len + 2)} />
      </svg>
      {TILES.map((_, i) => (
        <Tile key={i} index={i} />
      ))}
      <DirectionalBlur id="mh-appicon" x={iv * 0.3} y={iv * 0.3} style={{ position: "absolute", left: ix - isize / 2, top: iy - isize / 2, width: isize, height: isize }}>
        <div style={{ position: "relative", width: isize, height: isize, borderRadius: APP_ICON.radius * (isize / APP_ICON.size), background: `rgb(${r},${g},${b})`, boxShadow: "0 22px 50px rgba(0,0,0,0.25)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "#141414", opacity: dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("ryze-sun-light.png")} style={{ width: isize * 0.62, height: isize * 0.62, display: "block" }} />
          </div>
        </div>
      </DirectionalBlur>
      <div style={{ position: "absolute", left: WORDMARK.x, top: WORDMARK.y, transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 22, fontFamily: SANS, fontSize: WORDMARK.size, fontWeight: 700, letterSpacing: "-0.03em", color: INK, whiteSpace: "pre", lineHeight: 1 }}>
        <span>
          {WORD.split("").map((ch, i) => {
            const at = WORDMARK.from + i / WORDMARK.charsPerFrame;
            const t = ramp(frame, at, at + 4);
            return (
              <span key={i} style={{ color: i < shown ? (t < 1 ? CORAL : INK) : "transparent", opacity: i < shown ? 0.55 + 0.45 * t : 0 }}>
                {ch}
              </span>
            );
          })}
        </span>
        <span style={{ color: CORAL, opacity: mcp, transform: `scale(${0.7 + 0.3 * mcp})`, textShadow: `0 0 ${14 * mcp}px rgba(255,235,220,0.9), 0 0 ${34 * mcp}px rgba(232,115,90,0.7)`, filter: mcp < 0.95 ? `blur(${(1 - mcp) * 8}px)` : undefined }}>
          MCP
        </span>
      </div>
      <Cursor
        appearAt={CURSOR2.appear}
        scale={2.2}
        stops={[
          { x: CURSOR2.from.x, y: CURSOR2.from.y, at: CURSOR2.appear },
          { x: claude.x + 10, y: claude.y + 14, at: CURSOR2.arrive },
          { x: claude.x + 10, y: claude.y + 14, at: CURSOR2.click, click: true },
        ]}
      />
    </>
  );
};
