import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Sparkle } from "lucide-react";
import { CARD_RADIUS, OutlineChip } from "./ad-card";
import { AdCreative } from "./creative";
import { CREATIVES, GRID, MOSAIC_LEVELS, THUMB } from "./story";
import { C } from "./theme";
import { clamp01, glide, lerp, pop, ramp, T } from "./timeline";
import { MERGE_AT } from "./winners";

export const genStart = (k: number) => T.gen + k * 5;
export const gridPos = (k: number) => ({ x: GRID.colX[k % 3], y: GRID.rowY[Math.floor(k / 3)] });
export const thumbPos = (k: number) => ({ x: THUMB.colX[k % 3], y: THUMB.rowY[Math.floor(k / 3)] });

const GenTile: React.FC<{ k: number; f: number }> = ({ k, f }) => {
  const c = CREATIVES[k];
  const s = genStart(k);
  const fly = glide(f, s, 150);
  const grow = pop(f, s, 13, 170);
  const level = Math.min(MOSAIC_LEVELS, Math.max(0, Math.floor((f - s - 5) / 3)));
  const copyIn = ramp(f, s + 26, 8);
  const toPanel = glide(f, T.panel + k * 2, 120);
  const copyOut = ramp(f, T.panel, 8);
  const chip = clamp01(pop(f, s + 28, 12, 200)) * (1 - copyOut);
  const g = gridPos(k);
  const t = thumbPos(k);
  const x = lerp(lerp(MERGE_AT.x, g.x, fly), t.x, toPanel);
  const y = lerp(lerp(MERGE_AT.y, g.y, fly), t.y, toPanel);
  const scale = lerp(lerp(0.2, 1, grow), THUMB.w / GRID.w, toPanel);
  const leave = ramp(f, T.phone - 2, 14, (v) => v * v * v);
  if (f < s || f >= T.phone + 14) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - GRID.w / 2,
        top: y - GRID.h / 2,
        width: GRID.w,
        height: GRID.h,
        transform: `translateY(${-leave * 1150}px) scale(${scale})`,
        borderRadius: CARD_RADIUS + 1,
        border: `1.5px solid ${C.border}`,
        boxShadow: "0 1px 2px rgba(74,53,29,0.03), 0 22px 50px rgba(10,30,70,0.32)",
        overflow: "hidden",
        background: C.paper,
      }}
    >
      <AdCreative id={c.id} copy={c.copy} width={GRID.w} level={level} copyOpacity={copyIn * (1 - copyOut)} radius={0} />
      <span
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          opacity: chip,
          transform: `scale(${lerp(0.6, 1, chip)})`,
          transformOrigin: "0 0",
        }}
      >
        <OutlineChip size={17}>
          <Sparkle size={17} color={C.brand} strokeWidth={2.2} />
          New
        </OutlineChip>
      </span>
    </div>
  );
};

export const GeneratedAds: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.gen || f >= T.phone + 14) return null;
  return (
    <AbsoluteFill>
      {CREATIVES.map((_, k) => (
        <GenTile key={k} k={k} f={f} />
      ))}
    </AbsoluteFill>
  );
};
