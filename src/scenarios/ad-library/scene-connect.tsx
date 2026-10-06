import React from "react";
import { AbsoluteFill, Easing, Img, random, useCurrentFrame } from "remotion";
import { shellAt } from "./claude-shell";
import { tileCenters } from "./geometry";
import { useLayout } from "./layout";
import { SPAWNS, STREAM } from "./stream";
import { C, SANS } from "../../kit/launch";
import { asset, iconShadow, liftShadow, META_ICON_FILL } from "./theme";
import { lerp, pop, ramp, T } from "./timeline";

const LABEL_GAP = 28;
const LABEL_LINE = 1.2;

const bezier = (p0: number, p1: number, p2: number, t: number) => (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

export const SceneConnect: React.FC = () => {
  const f = useCurrentFrame();
  const l = useLayout();
  const tiles = tileCenters(l);
  const shell = shellAt(l, f);
  const away = ramp(f, T.morph - 10, 14, Easing.in(Easing.cubic));
  const intro = pop(f, -14, 14, 170);
  const size = l.tile.size;
  const float = Math.sin(f / 16) * 7;
  const cardW = STREAM.card.w * l.tile.card;
  const cardH = STREAM.card.h * l.tile.card;
  if (f > T.morph + 16) return null;

  return (
    <AbsoluteFill>
      {SPAWNS.map((s, k) => {
        const t = ramp(f, s, STREAM.flight, Easing.inOut(Easing.quad));
        if (f < s || f > s + STREAM.flight) return null;
        const from = { x: tiles.meta.x, y: tiles.meta.y - float };
        const to = { x: shell.cx, y: shell.cy };
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.hypot(dx, dy) || 1;
        const side = l.tile.sides > 1 && random(`ss${k}`) > 0.5 ? -1 : 1;
        const bow = (l.tile.arc + random(`sp${k}`) * 70) * side;
        const along = (random(`sy${k}`) - 0.5) * 80;
        const ctrl = {
          x: (from.x + to.x) / 2 - (dy / len) * bow + (dx / len) * along,
          y: (from.y + to.y) / 2 + (dx / len) * bow + (dy / len) * along,
        };
        const x = bezier(from.x, ctrl.x, to.x, t);
        const y = bezier(from.y, ctrl.y, to.y, t);
        const grow = t < 0.22 ? lerp(0.25, 1, t / 0.22) : t > 0.72 ? lerp(1, 0.1, (t - 0.72) / 0.28) : 1;
        const rot = lerp(-18, 16, t) + (random(`sr${k}`) - 0.5) * 12;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: x - cardW / 2,
              top: y - cardH / 2,
              width: cardW,
              height: cardH,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: liftShadow(0.8),
              transform: `rotate(${rot}deg) scale(${grow})`,
              opacity: t > 0.9 ? 1 - (t - 0.9) / 0.1 : 1,
              background: C.border,
              zIndex: 5,
            }}
          >
            <Img src={asset(`stream/${String(k % 28).padStart(2, "0")}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: tiles.meta.x - size / 2,
          top: tiles.meta.y - size / 2 - float,
          width: size,
          height: size,
          borderRadius: size * 0.24,
          background: META_ICON_FILL,
          boxShadow: `${iconShadow(1)}, 0 0 0 1px rgba(15,23,42,0.06), inset 0 2px 0 rgba(255,255,255,0.9)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1 - away,
          transform: `translateX(${away * 240}px) scale(${lerp(0.9, 1, intro) * (1 - 0.3 * away)})`,
          zIndex: 6,
        }}
      >
        <Img src={asset("brand/meta-ads.svg")} style={{ width: size * 0.58 }} />
      </div>

      {[
        { at: tiles.claude, other: tiles.meta, text: "Claude", float },
        { at: tiles.meta, other: tiles.claude, text: "Meta Ad Library", float: -float },
      ].map((lab) => (
        <div
          key={lab.text}
          style={{
            position: "absolute",
            left: lab.at.x - 300,
            width: 600,
            top:
              (lab.other.y > lab.at.y + 1 ? lab.at.y - size / 2 - LABEL_GAP - l.tile.label * LABEL_LINE : lab.at.y + size / 2 + LABEL_GAP) +
              lab.float,
            lineHeight: LABEL_LINE,
            textAlign: "center",
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: l.tile.label,
            letterSpacing: "-0.02em",
            color: C.ink,
            opacity: 1 - away,
          }}
        >
          {lab.text}
        </div>
      ))}
    </AbsoluteFill>
  );
};
