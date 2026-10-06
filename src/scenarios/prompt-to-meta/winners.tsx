import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { AdCard, DaysLive } from "./ad-card";
import { CARD, WALL, WINNERS } from "./story";
import { glide, lerp, pop, ramp, T } from "./timeline";
import { localToWorld, PICK_SCALE, tileLocal, WINNER_TILES, wallRotation } from "./wall-layout";

const FAN = [
  { dx: -150, dy: 30, rot: -13 },
  { dx: -50, dy: 0, rot: -4 },
  { dx: 50, dy: 0, rot: 4 },
  { dx: 150, dy: 30, rot: 13 },
];
const FAN_CENTER = { x: 590, y: 560 };
const MERGE_POINT = { x: 960, y: 600 };

const startPose = (k: number) => {
  const tile = WINNER_TILES[k];
  const at = T.fly + k * 2;
  const l = tileLocal(tile.c, tile.r, at);
  const w = localToWorld(l.x, l.y, at);
  return { x: w.x, y: w.y, rot: wallRotation(at), scale: (WALL.w * PICK_SCALE) / CARD.w };
};

const WinnerCard: React.FC<{ k: number; f: number }> = ({ k, f }) => {
  const winner = WINNERS[k];
  const s = startPose(k);
  const fly = glide(f, T.fly + k * 2, 120);
  const fan = glide(f, T.fan + k * 2, 130);
  const merge = ramp(f, T.merge + k * 2, T.flash - T.merge - 4, Easing.back(1.7));
  const row = { x: 960 + (k - 1.5) * CARD.pitch, y: CARD.mediaY };
  const fanPose = { x: FAN_CENTER.x + FAN[k].dx, y: FAN_CENTER.y + FAN[k].dy, rot: FAN[k].rot, scale: 0.94 };

  let x = lerp(s.x, row.x, fly);
  let y = lerp(s.y, row.y, fly);
  let rot = lerp(s.rot, 0, fly);
  let scale = lerp(s.scale, 1, fly);
  x = lerp(x, fanPose.x, fan);
  y = lerp(y, fanPose.y, fan);
  rot = lerp(rot, fanPose.rot, fan);
  scale = lerp(scale, fanPose.scale, fan);
  const bob = fly * (1 - fan);
  y += Math.sin((f - T.fly) / 11 + k * 1.4) * 6 * bob;
  rot += Math.sin((f - T.fly) / 14 + k) * 0.8 * bob;
  x = lerp(x, MERGE_POINT.x, merge);
  y = lerp(y, MERGE_POINT.y, merge);
  rot = lerp(rot, rot + 50, merge);
  scale = lerp(scale, 0.18, merge);

  const details = pop(f, T.fly + 14 + k * 3, 14, 160);
  const ring = 1 - ramp(f, T.fly + 10, 16);
  if (f < T.fly + k * 2 || f >= T.flash) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - CARD.w / 2,
        top: y - CARD.mediaH / 2,
        transform: `rotate(${rot}deg) scale(${scale})`,
        transformOrigin: `${CARD.w / 2}px ${CARD.mediaH / 2}px`,
        zIndex: 10 + k,
      }}
    >
      <AdCard
        src={winner.src}
        width={CARD.w}
        mediaH={CARD.mediaH}
        brand={winner.brand}
        domain={winner.domain}
        host={winner.host}
        headline={winner.headline}
        body={winner.body}
        footerRight={<DaysLive days={winner.days} />}
        details={details}
        ring={ring}
      />
    </div>
  );
};

export const Winners: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.fly || f >= T.flash) return null;
  return (
    <AbsoluteFill>
      {WINNERS.map((_, k) => (
        <WinnerCard key={k} k={k} f={f} />
      ))}
    </AbsoluteFill>
  );
};

export const MERGE_AT = MERGE_POINT;
