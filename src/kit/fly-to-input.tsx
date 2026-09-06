import React from "react";
import { TileImg } from "./tile-img";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { useObjectRects } from "../core/stage";

export const AttachmentSlots: React.FC<{
  count: number;
  size?: number;
  gap?: number;
  idPrefix?: string;
}> = ({ count, size = 72, gap = 10, idPrefix = "chip" }) => (
  <div style={{ display: "flex", gap, marginBottom: 14 }}>
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        data-click={`${idPrefix}.${i}`}
        style={{ width: size, height: size, borderRadius: 10 }}
      />
    ))}
  </div>
);

export const FlyToSlot: React.FC<{
  image: string;
  slotId: string;
  from?: { x: number; y: number; size: number; tilt?: number };
  fromSlotId?: string;
  appearAt: number;
  flyAt: number;
  fadeAt?: number;
  aspect?: number;
}> = ({ image, slotId, from: fromProp, fromSlotId, appearAt, flyAt, fadeAt, aspect = 1 }) => {
  const frame = useCurrentFrame();
  const ids = React.useMemo(
    () => (fromSlotId ? [slotId, fromSlotId] : [slotId]),
    [slotId, fromSlotId],
  );
  const rects = useObjectRects(ids);
  const enter = useSpringAt(appearAt, SPRINGS.pop, 24);
  const fly = useSpringAt(flyAt, SPRINGS.card, 34);
  const slot = rects[slotId];
  const source = fromSlotId ? rects[fromSlotId] : undefined;
  const from = source
    ? { x: source.x, y: source.y, size: source.width, tilt: 0 }
    : (fromProp ?? { x: 0, y: 0, size: 100, tilt: 0 });
  const to = slot ? { x: slot.x, y: slot.y, size: slot.width } : from;
  const fade =
    fadeAt === undefined
      ? 1
      : interpolate(frame, [fadeAt, fadeAt + 10], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const x = interpolate(fly, [0, 1], [from.x, to.x]);
  const y = interpolate(fly, [0, 1], [from.y, to.y]);
  const size = interpolate(fly, [0, 1], [from.size, to.size]);
  const rot = interpolate(fly, [0, 1], [from.tilt ?? 0, 0]);
  if (frame < appearAt || fade <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size / aspect,
        borderRadius: interpolate(fly, [0, 1], [20, 10]),
        overflow: "hidden",
        boxShadow: `0 ${interpolate(fly, [0, 1], [22, 4])}px ${interpolate(fly, [0, 1], [54, 12])}px rgba(74,53,29,${interpolate(fly, [0, 1], [0.28, 0.16])})`,
        border: "1px solid rgba(255,255,255,0.65)",
        opacity: enter * fade,
        transform: `rotate(${rot}deg) scale(${interpolate(enter, [0, 1], [0.82, 1])}) translateY(${interpolate(enter, [0, 1], [26, 0])}px)`,
        transformOrigin: "center",
        zIndex: 10,
      }}
    >
      <TileImg file={image} />
    </div>
  );
};
