import React from "react";
import { Img, Sequence, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { FIGURE_BOX, FIGURE_TOP, W } from "./theme";

export type FigureShot = { pose: string; from: number; scale?: number; dx?: number; dy?: number };

const Pose: React.FC<{ pose: string; scale: number; dx: number; dy: number }> = ({ pose, scale, dx, dy }) => {
  const s = useSpringAt(0, SPRINGS.pop, 18);
  const grow = 0.9 + 0.1 * s;
  return (
    <Img
      src={staticFile(`autopilot-founder/${pose}-a.png`)}
      style={{
        position: "absolute",
        left: (W - FIGURE_BOX) / 2 + dx,
        top: FIGURE_TOP + dy,
        width: FIGURE_BOX,
        height: FIGURE_BOX,
        transform: `scale(${grow * scale})`,
        transformOrigin: "50% 80%",
      }}
    />
  );
};

export const Figures: React.FC<{ shots: FigureShot[]; total: number }> = ({ shots, total }) => (
  <>
    {shots.map((shot, i) => {
      const end = i < shots.length - 1 ? shots[i + 1].from : total;
      return (
        <Sequence key={`${shot.pose}-${shot.from}`} from={shot.from} durationInFrames={end - shot.from} layout="none">
          <Pose pose={shot.pose} scale={shot.scale ?? 1} dx={shot.dx ?? 0} dy={shot.dy ?? 0} />
        </Sequence>
      );
    })}
  </>
);
