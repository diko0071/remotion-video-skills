import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { RESULT_GRIDS, type DotGrid } from "./dots-data";
import { COMPOSE } from "./timings";

const hash = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const EdgeDots: React.FC = () => {
  const frame = useCurrentFrame();
  const G = COMPOSE.generate;
  const reach = ramp(frame, G.dotsFrom, G.dotsFull) * 1.15;
  const cell = 46;
  const cols = Math.ceil(1920 / cell);
  const rows = Math.ceil(1080 / cell);
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cell + cell / 2;
      const y = r * cell + cell / 2;
      const fromRight = (1920 - x) / 1920;
      const fromBL = Math.hypot(x / 1920, (1080 - y) / 1080) * 0.7;
      const d = Math.min(fromRight * 1.4, fromBL) + hash(r * cols + c, 3) * 0.12;
      if (d > reach) continue;
      const i = r * cols + c;
      const pal = hash(i, 5);
      const color = pal < 0.42 ? "#2E4BFF" : pal < 0.6 ? "#7A5CFF" : pal < 0.78 ? "#FF2D8C" : pal < 0.9 ? "#FFFFFF" : "#8FC8FF";
      dots.push(<circle key={i} cx={x} cy={y} r={cell * 0.42} fill={color} />);
    }
  }
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      {dots}
    </svg>
  );
};

const PALETTES = {
  pink: [[46, 75, 255], [122, 92, 255], [255, 45, 140], [255, 120, 200], [140, 200, 255], [255, 255, 255], [20, 20, 20]],
  green: [[166, 255, 0], [46, 75, 255], [120, 220, 80], [200, 255, 120], [255, 255, 255], [20, 20, 20], [80, 120, 255]],
} as const;

const palFor = (rgb: number[], pal: readonly (readonly number[])[]) => {
  const [r, g, b] = rgb;
  const lum = (r * 299 + g * 587 + b * 114) / 1000;
  if (lum > 200) return pal[4];
  if (lum < 45) return pal[5];
  if (r > g && r > b) return lum < 130 ? pal[2] : pal[3];
  if (b > r && b > g) return lum < 120 ? pal[0] : pal[6];
  return pal[1];
};

export const DotDissolve: React.FC<{
  grids: Record<number, DotGrid>;
  cols: readonly [number, number, number];
  from: number;
  to: number;
  card: { x: number; y: number; w: number; h: number; radius: number };
  startCell: number;
  palette: keyof typeof PALETTES;
  file: string;
  bg?: string;
}> = ({ grids, cols: colSteps, from, to, card, startCell, palette, file, bg = "#fff" }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, from, to);
  if (p >= 1) {
    return (
      <AbsoluteFill style={{ background: bg }}>
        <div style={{ position: "absolute", left: card.x, top: card.y, width: card.w, height: card.h, borderRadius: card.radius, overflow: "hidden" }}>
          <Img src={staticFile(file)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </AbsoluteFill>
    );
  }
  const cols = p < 0.45 ? colSteps[0] : p < 0.78 ? colSteps[1] : colSteps[2];
  const grid = grids[cols];
  const rows = grid.rows;
  const e = 1 - Math.pow(1 - p, 2.2);
  const cell0 = startCell * (colSteps[0] / cols);
  const cell1 = card.w / cols;
  const cell = cell0 + (cell1 - cell0) * e;
  const x0 = 960 - (cols * cell) / 2 + (card.x + card.w / 2 - 960) * e;
  const y0 = 540 - (rows * cell) / 2 + (card.y + card.h / 2 - 540) * e;
  const mix = ramp(p, 0.35, 0.85);
  const roundness = 1 - ramp(p, 0.6, 0.97);
  const pal = PALETTES[palette];
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const cy = y0 + r * cell + cell / 2;
    if (cy < -cell || cy > 1080 + cell) continue;
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const cx = x0 + c * cell + cell / 2;
      if (cx < -cell || cx > 1920 + cell) continue;
      const rgb = grid.rgb[i];
      const pc = palFor(rgb, pal);
      const R = Math.round(pc[0] + (rgb[0] - pc[0]) * mix);
      const Gc = Math.round(pc[1] + (rgb[1] - pc[1]) * mix);
      const B = Math.round(pc[2] + (rgb[2] - pc[2]) * mix);
      const lum = (R * 299 + Gc * 587 + B * 114) / 1000;
      if (mix < 1 && lum > 245 && bg === "#fff") continue;
      const rad = (cell / 2) * (0.86 + 0.16 * (1 - roundness));
      dots.push(<rect key={i} x={cx - rad} y={cy - rad} width={rad * 2} height={rad * 2} rx={rad * roundness} fill={`rgb(${R},${Gc},${B})`} />);
    }
  }
  return (
    <AbsoluteFill style={{ background: bg }}>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {dots}
      </svg>
    </AbsoluteFill>
  );
};

export const Dissolve: React.FC = () => {
  const D = COMPOSE.dissolve;
  return <DotDissolve grids={RESULT_GRIDS} cols={[22, 44, 66]} from={D.from} to={D.to} card={D.card} startCell={Math.max(1920 / 22, 1080 / 39)} palette="pink" file="veed-launch/result.jpg" />;
};
