import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { ComposeCard } from "./compose-card";
import { EdgeDots } from "./dissolve";
import { ChipFlights, chipsAt, PickGrid, Tabs, TileFace } from "./pick-grid";
import { COMPOSE, DARK } from "./timings";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #2a2a2a 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const CURSOR = [
  { x: 1240, y: 760, at: 512 },
  { x: 1160, y: 590, at: 516 },
  { x: 1160, y: 590, at: 522, click: true },
  { x: 1160, y: 590, at: 540 },
  { x: 500, y: 500, at: 548 },
  { x: 500, y: 500, at: 554, click: true },
  { x: 500, y: 500, at: 572 },
  { x: 1440, y: 520, at: 580 },
  { x: 1440, y: 520, at: 586, click: true },
  { x: 1440, y: 520, at: 596 },
  { x: 1510, y: 632, at: 606 },
  { x: 1510, y: 632, at: 612, click: true },
  { x: 1510, y: 632, at: 626 },
  { x: 1575, y: 726, at: 640 },
  { x: 1575, y: 726, at: 668, click: true },
] as const;

export const ComposeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const G = COMPOSE.generate;
  const zp = ramp(frame, G.zoomFrom, G.zoomTo, Easing.inOut(Easing.cubic));
  const z = 1 + (G.zoom - 1) * zp;
  const px = 1572;
  const py = 721;
  const tx = (928 - px) * zp;
  const ty = (540 - py) * zp;
  const chips = chipsAt(frame);
  return (
    <AbsoluteFill style={{ background: DARK, ...DOT_GRID }}>
      {frame >= G.dotsFrom && <EdgeDots />}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${tx}px, ${ty}px) scale(${z})`, transformOrigin: `${px}px ${py}px` }}>
        <PickGrid />
        <Tabs />
        <ComposeCard chips={chips} renderTile={(t) => <TileFace tile={t} />} />
        <ChipFlights />
        <Cursor stops={[...CURSOR]} appearAt={512} scale={3.2} />
      </div>
    </AbsoluteFill>
  );
};
