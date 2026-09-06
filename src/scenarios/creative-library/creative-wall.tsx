import React from "react";
import { TileImg } from "../../kit/tile-img";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import MANIFEST from "../../../public/creative-wall/manifest.json";
import { PLANET_AT, PLANET_SPIN_FROM, WALL_ZOOM } from "./timings";

const TILE = 230;
const GAP = 16;
const COLS = 40;
const ROWS = 22;
const STEP = TILE + GAP;
const GRID_W = COLS * STEP - GAP;
const GRID_H = ROWS * STEP - GAP;
const CX = GRID_W / 2;
const CY = GRID_H / 2;
const COUNT = COLS * ROWS;
const PLANET_TILE = 140;
const PLANET_C = 78;
const GOLDEN = 2.39996;

const ZOOM_FROM = WALL_ZOOM[0][1];
const ZOOM_TO = WALL_ZOOM[WALL_ZOOM.length - 1][1];

const lerp = (p: number, a: number, b: number) => a + (b - a) * p;

export const CreativeWall: React.FC = () => {
  const frame = useCurrentFrame();
  const morph = useSpringAt(PLANET_AT, SPRINGS.panel);
  const spin =
    interpolate(frame, [PLANET_SPIN_FROM, PLANET_SPIN_FROM + 400], [0, 1.6], {
      extrapolateLeft: "clamp",
    }) +
    morph * 0.35;
  const zoom = ZOOM_FROM * Math.pow(ZOOM_TO / ZOOM_FROM, Math.min(frame / 68, 1));
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: "960px 540px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: (1920 - GRID_W) / 2,
            top: (1080 - GRID_H) / 2,
            width: GRID_W,
            height: GRID_H,
          }}
        >
          {Array.from({ length: COUNT }, (_, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            const dir = row % 2 === 0 ? 1 : -1;
            const speed = 0.5 + (row % 3) * 0.25;
            const gx = col * STEP + dir * speed * frame - ((row * 7) % 4) * (STEP / 4) - STEP;
            const gy = row * STEP;
            const r = PLANET_C * Math.sqrt(i + 0.5);
            const th = i * GOLDEN + spin;
            const size = lerp(morph, TILE, PLANET_TILE);
            const px = CX + r * Math.cos(th) - size / 2;
            const py = CY + r * Math.sin(th) - size / 2;
            const file = MANIFEST[(i * 31) % MANIFEST.length];
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: lerp(morph, gx, px),
                  top: lerp(morph, gy, py),
                  width: size,
                  height: size,
                  borderRadius: lerp(morph, 12, 22),
                  overflow: "hidden",
                  background: "#FFFFFF",
                  boxShadow: "0 8px 26px rgba(74,53,29,0.14)",
                  transform: `rotate(${(spin * morph * 180) / Math.PI}deg)`,
                }}
              >
                <TileImg file={`creative-wall/${file}`} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
