import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { Mosaic, MOSAIC_GRID } from "./mosaic-data";
import { asset } from "./theme";
import { clamp01 } from "./timeline";

const { cols, rows, unitH, k } = MOSAIC_GRID;
const LEVEL_FADE: Array<[number, number]> = [
  [0, 0],
  [2.3, 2.7],
  [8.6, 9.6],
];

export const anchorScreen = (m: Mosaic) => ({
  x: 960 + (m.anchor[0] - cols / 2) * k,
  y: 540 + (m.anchor[1] - rows / 2) * unitH * k,
});

export const cellScreen = (m: Mosaic, col: number, row: number, z: number) => {
  const s = anchorScreen(m);
  return { x: s.x + (col - m.anchor[0]) * k * z, y: s.y + (row - m.anchor[1]) * unitH * k * z };
};

export const MosaicView: React.FC<{ mosaic: Mosaic; z: number; opacity?: number }> = ({ mosaic, z, opacity = 1 }) => {
  const s = anchorScreen(mosaic);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#0b1d4a", opacity }}>
      {mosaic.levels.map((lv, i) => {
        const [a, b] = LEVEL_FADE[i] ?? [0, 0];
        const o = i === 0 ? 1 : clamp01((z - a) / (b - a));
        if (o <= 0) return null;
        const [c0, r0, c1, r1] = lv.region;
        return (
          <Img
            key={lv.src}
            src={asset(lv.src)}
            style={{
              position: "absolute",
              left: s.x + (c0 - mosaic.anchor[0]) * k * z,
              top: s.y + (r0 - mosaic.anchor[1]) * unitH * k * z,
              width: (c1 - c0) * k * z,
              height: (r1 - r0) * unitH * k * z,
              opacity: o,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
