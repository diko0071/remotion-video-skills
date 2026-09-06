import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";
import { CELL, GRID_GAP, GRID_X, GRID_Y, W } from "../timings";

export const cellRect = (i: number) => ({
  x: GRID_X + (i % 3) * (CELL + GRID_GAP),
  y: GRID_Y + Math.floor(i / 3) * (CELL + GRID_GAP),
});

export const HeroCell: React.FC<{ x: number; y: number; size: number; radius: number }> = ({
  x,
  y,
  size,
  radius,
}) => {
  const appear = useSpringAt(W.gridIn, SPRINGS.card);
  return (
    <Img
      src={staticFile("showcase/ad-1.jpg")}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: radius,
        objectFit: "cover",
        boxShadow: "0 18px 50px rgba(20,15,10,0.18)",
        zIndex: 4,
        opacity: Math.min(1, appear * 1.3),
        transform: `translateY(${interpolate(appear, [0, 1], [36, 0])}px)`,
      }}
    />
  );
};

export const GridCell: React.FC<{ image: string; index: number }> = ({ image, index }) => {
  const frame = useCurrentFrame();
  const cell = cellRect(index);
  const appear = useSpringAt(W.gridIn + index * 4, SPRINGS.card);
  const gone = interpolate(frame, [W.fly1, W.fly1 + 26], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Img
      src={staticFile(image)}
      style={{
        position: "absolute",
        left: cell.x,
        top: cell.y,
        width: CELL,
        height: CELL,
        borderRadius: 12,
        objectFit: "cover",
        boxShadow: "0 14px 40px rgba(20,15,10,0.12)",
        opacity: Math.min(1, appear * 1.3) * gone,
        transform: `translateY(${interpolate(appear, [0, 1], [36, 0])}px) scale(${interpolate(appear, [0, 1], [0.92, 1]) * interpolate(gone, [0, 1], [0.94, 1])})`,
      }}
    />
  );
};
