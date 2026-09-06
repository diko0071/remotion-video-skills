import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { TileImg } from "./tile-img";

export type StackItem = { file?: string; node?: React.ReactNode; w?: number; h?: number; badge?: React.ReactNode };

export type StackSlot = { x: number; y: number; size: number; tilt: number };

export type StackLayout = (i: number) => StackSlot;

export const stackLayout = (center: { x: number; y: number }, base = 620, spread = 160): StackLayout =>
  (i) => ({
    x: center.x + (((i * 53) % 220) - 110),
    y: center.y + (((i * 29) % 140) - 70),
    size: base + ((i * 37) % spread),
    tilt: (i % 2 === 0 ? -1 : 1) * (3 + ((i * 13) % 5)),
  });

export const StackCard: React.FC<{
  item: StackItem;
  slot: StackSlot;
  at: number;
  z: number;
  radius?: number;
  shadow?: string;
}> = ({ item, slot, at, z, radius = 20, shadow = "0 30px 80px rgba(0,0,0,0.5)" }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(at, SPRINGS.pop, 26);
  const w = item.w ?? 1;
  const h = item.h ?? 1;
  const width = slot.size * (w / Math.max(w, h));
  const height = slot.size * (h / Math.max(w, h));
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: slot.x - width / 2,
        top: slot.y - height / 2,
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: shadow,
        transform: `rotate(${interpolate(pop, [0, 1], [slot.tilt * 2.4, slot.tilt])}deg) scale(${interpolate(pop, [0, 1], [1.25, 1])})`,
        zIndex: z,
      }}
    >
      {item.file ? <TileImg file={item.file} /> : null}
      {item.node ? <div style={{ position: "absolute", inset: 0 }}>{item.node}</div> : null}
      {item.badge}
    </div>
  );
};

export const StackAvalanche: React.FC<{
  items: StackItem[];
  marks: number[];
  layout?: StackLayout;
  exitAt?: number;
  radius?: number;
  shadow?: string;
}> = ({ items, marks, layout = stackLayout({ x: 960, y: 540 }), exitAt, radius, shadow }) => {
  const exit = useSpringAt(exitAt ?? 1e9, SPRINGS.panel, 14);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: String(1 - exit * 0.94),
          opacity: 1 - exit,
          filter: exit > 0.08 ? `blur(${exit * 6}px)` : undefined,
        }}
      >
        {items.map((item, i) => (
          <StackCard
            key={`${item.file ?? "node"}-${i}`}
            item={item}
            slot={layout(i)}
            at={marks[i]}
            z={i + 1}
            radius={radius}
            shadow={shadow}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
