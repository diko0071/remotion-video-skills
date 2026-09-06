import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { cascade } from "../../core/schedule";
import { SfxTrack } from "../../kit/sfx";
import { TileImg } from "../../kit/tile-img";
import { SLIDE_H, SLIDE_W, STAGE_SLIDE } from "./timings";

const DECKS = [
  "quarterly-review",
  "client-proposal",
  "media-plan",
  "competitor-landscape",
  "marketing-audit",
  "landing-teardown",
  "creative-review",
  "monthly-report",
  "seo-audit",
];
const UNIQUE = DECKS.flatMap((d) =>
  Array.from({ length: 10 }, (_, i) => `${d}-${String(i).padStart(2, "0")}`),
);

const CHAIN = [
  ...Array.from({ length: 10 }, (_, i) => `quarterly-review-${String(i).padStart(2, "0")}`),
  ...Array.from({ length: 10 }, (_, i) => `seo-audit-${String(i).padStart(2, "0")}`),
  ...Array.from({ length: 7 }, (_, i) => `media-plan-${String(i).padStart(2, "0")}`),
];
const GAPS = [18, 16, 14, 12, 11, 10, 9, 8, 8, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3];

export const runMarks = (from: number) => {
  const steps = cascade(from, GAPS);
  const last = steps[steps.length - 1];
  const minAt = last + 10;
  const zoomLen = 80;
  return { steps, last, minAt, zoomLen, total: minAt + zoomLen + 12 };
};

const F_N = 80;
const T_W = 320;
const T_H = 180;
const T_GAP = 12;
const CELL_W = T_W + T_GAP;
const CELL_H = T_H + T_GAP;
const LAND = F_N / 2;
const LAND_CX = LAND * CELL_W + T_W / 2;
const LAND_CY = LAND * CELL_H + T_H / 2;

const S0 = STAGE_SLIDE.w / T_W;
const S1 = 0.155;

const FIELD: { name: string; col: number; row: number }[] = [];
for (let r = 0; r < F_N; r += 1) {
  for (let c = 0; c < F_N; c += 1) {
    if (c === LAND && r === LAND) continue;
    const h = ((((r * F_N + c + 1) * 2654435761) >>> 0) ^ ((c * 40503 + r * 9973) >>> 0)) >>> 0;
    FIELD.push({ name: UNIQUE[h % UNIQUE.length], col: c, row: r });
  }
}
const NEAR = FIELD.filter((t) => Math.abs(t.col - LAND) < 32 && Math.abs(t.row - LAND) < 22);

const slideIndex = (steps: number[], frame: number): number => {
  let idx = 0;
  for (let i = 0; i < steps.length; i += 1) if (frame >= steps[i]) idx = i + 1;
  return Math.min(idx, CHAIN.length - 1);
};

export const DeckRunLayer: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const m = runMarks(from);
  const idx = slideIndex(m.steps, frame);
  if (frame >= m.minAt) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: STAGE_SLIDE.x,
        top: STAGE_SLIDE.y,
        width: STAGE_SLIDE.w,
        height: (STAGE_SLIDE.w / SLIDE_W) * SLIDE_H,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 18px 60px rgba(23,19,16,0.18)",
      }}
    >
      <Img
        src={staticFile(`deck-gen/slides/${CHAIN[idx]}.png`)}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
};

export const DeckWallLayer: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const m = runMarks(from);
  if (frame < m.minAt) return null;
  const p = interpolate(frame, [m.minAt, m.minAt + m.zoomLen], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.3, 1),
  });
  const drift = interpolate(frame, [m.minAt + m.zoomLen, m.minAt + m.zoomLen + 400], [1, 0.94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s = S0 * Math.pow(S1 / S0, p) * drift;
  const rot = -4 * p;
  return (
    <div
      style={{
        position: "absolute",
        left: 960 - LAND_CX,
        top: 501 - LAND_CY,
        transform: `scale(${s}) rotate(${rot}deg)`,
        transformOrigin: `${LAND_CX}px ${LAND_CY}px`,
      }}
    >
      {NEAR.map((t) => (
        <div
          key={`${t.col}-${t.row}`}
          style={{
            position: "absolute",
            left: t.col * CELL_W,
            top: t.row * CELL_H,
            width: T_W,
            height: T_H,
            borderRadius: 4,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <TileImg file={`deck-gen/thumbs/${t.name}.jpg`} />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: LAND * CELL_W,
          top: LAND * CELL_H,
          width: T_W,
          height: T_H,
          borderRadius: 4,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Img
          src={staticFile(`deck-gen/slides/${CHAIN[CHAIN.length - 1]}.png`)}
          style={{ width: "100%", display: "block" }}
        />
      </div>
    </div>
  );
};

export const DeckRunSfx: React.FC<{ from: number }> = ({ from }) => {
  const m = runMarks(from);
  return (
    <SfxTrack
      hits={m.steps.map((at) => ({ name: "mouse-click" as const, at, volume: 0.55 }))}
    />
  );
};
