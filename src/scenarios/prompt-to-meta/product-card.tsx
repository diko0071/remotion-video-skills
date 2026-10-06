import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { Plus, Sparkle } from "lucide-react";
import { AdCard, OutlineChip } from "./ad-card";
import { CARD } from "./story";
import { C, R } from "./theme";
import { lerp, pop, ramp, T } from "./timeline";
import { MERGE_AT } from "./winners";

const SIZE = 360;
const REST = { x: 1330, y: 560 };

export const ProductCard: React.FC = () => {
  const f = useCurrentFrame();
  const enter = pop(f, T.fan + 6, 15, 150);
  const plus = pop(f, T.fan + 14, 12, 200);
  const details = pop(f, T.fan + 14, 14, 160);
  const merge = ramp(f, T.merge + 6, T.flash - T.merge - 8, Easing.back(1.7));
  if (f < T.fan + 6 || f >= T.flash) return null;
  const x = lerp(lerp(2300, REST.x, enter), MERGE_AT.x, merge);
  const y = lerp(REST.y, MERGE_AT.y, merge);
  const scale = lerp(1, 0.2, merge);
  const rot = lerp(lerp(8, 0, enter), -40, merge);
  const plusScale = plus * (1 - ramp(f, T.merge, 10));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: MERGE_AT.x - 36,
          top: MERGE_AT.y - 36,
          width: 72,
          height: 72,
          borderRadius: R.lg * 2,
          border: `1.5px solid ${C.border}`,
          background: C.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${plusScale})`,
          boxShadow: "0 18px 40px rgba(10,40,90,0.28)",
        }}
      >
        <Plus size={36} color={C.ink} strokeWidth={2} />
      </div>
      <div
        style={{
          position: "absolute",
          left: x - SIZE / 2,
          top: y - SIZE / 2,
          transform: `rotate(${rot}deg) scale(${scale})`,
          transformOrigin: `${SIZE / 2}px ${SIZE / 2}px`,
        }}
      >
        <AdCard
          src="brand/fishwife-product.jpg"
          width={SIZE}
          mediaH={SIZE}
          brand="Fishwife"
          domain="eatfishwife.com"
          host="eatfishwife.com"
          headline="Sardines with Preserved Lemon (3-Pack)"
          body="Hand-packed in 100% olive oil"
          topLeft={
            <OutlineChip size={CARD.body}>
              <Sparkle size={CARD.body} color={C.brand} strokeWidth={2.2} />
              Your product
            </OutlineChip>
          }
          details={details}
        />
      </div>
    </AbsoluteFill>
  );
};
