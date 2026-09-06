import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export type LogoItem = { name: string; image: string };

export const LogoCycler: React.FC<{
  items: LogoItem[];
  hold?: number;
  finaleAt?: number;
  finale?: React.ReactNode;
  ink?: string;
}> = ({ items, hold = 17, finaleAt = Infinity, finale = null, ink = "#171310" }) => {
  const frame = useCurrentFrame();
  const cycling = frame < finaleAt;
  const step = Math.floor(frame / hold);
  const idx = Math.min(step, items.length - 1);
  const fade =
    step > items.length - 1
      ? 1
      : interpolate(frame % hold, [0, 3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const finaleP = useSpringAt(
    Number.isFinite(finaleAt) ? finaleAt + 4 : Number.MAX_SAFE_INTEGER,
    SPRINGS.smooth,
    30,
  );
  const item = items[idx];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        minHeight: 280,
      }}
    >
      {cycling ? (
        <>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 34,
              background: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(20,15,10,0.05), 0 22px 60px rgba(20,15,10,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img src={staticFile(item.image)} style={{ width: 76, height: 76, opacity: fade }} />
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: ink,
              opacity: fade,
            }}
          >
            {item.name}
          </div>
        </>
      ) : (
        <div
          style={{
            opacity: finaleP,
            transform: `translateY(${interpolate(finaleP, [0, 1], [24, 0])}px)`,
          }}
        >
          {finale}
        </div>
      )}
    </div>
  );
};
