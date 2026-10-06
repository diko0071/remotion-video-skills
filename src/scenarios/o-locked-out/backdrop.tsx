import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { cameraAt, shakeAt } from "./camera";
import { G, Mode, PALETTE } from "./theme";

const HILL = { period: 1100, high: 210, low: 120, parallax: 0.42 } as const;

const hillsPath = (groundY: number, zoom: number, camX: number, shakeX: number) => {
  const period = HILL.period * zoom;
  const offset = -(((camX * zoom * HILL.parallax) % period) + period) % period + shakeX;
  let d = `M ${offset - period} ${groundY + 4}`;
  for (let x = offset - period; x < 1920 + period; x += period) {
    const a = x + period * 0.56;
    d += ` Q ${x + period * 0.28} ${groundY - HILL.high * zoom * 2} ${a} ${groundY + 4}`;
    d += ` Q ${a + period * 0.22} ${groundY - HILL.low * zoom * 2} ${x + period} ${groundY + 4}`;
  }
  return `${d} L ${1920 + period} 1300 L ${offset - period} 1300 Z`;
};

export const Sky: React.FC<{ mode: Mode }> = ({ mode }) => <AbsoluteFill style={{ background: PALETTE.sky[mode] }} />;

export const Land: React.FC<{ mode: Mode }> = ({ mode }) => {
  const f = useCurrentFrame();
  const cam = cameraAt(f);
  const s = shakeAt(f);
  const groundY = 540 + (G - cam.y) * cam.zoom + s.y;
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path d={hillsPath(groundY, cam.zoom, cam.x, s.x)} fill={PALETTE.hills[mode]} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: groundY, bottom: 0, background: PALETTE.ground[mode] }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: groundY, height: 16 * cam.zoom, background: PALETTE.edge[mode] }} />
    </AbsoluteFill>
  );
};
