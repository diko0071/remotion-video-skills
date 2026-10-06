import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { AD_GREEN, AD_RED, CARD_SHADOW_SOFT, ProductTile } from "../../kit/ad-objects";
import { C, SANS } from "../../kit/launch";
import { GRID, PRODUCTS, STORE_CENTER, TILE, tileBox } from "./stage";
import { STORE } from "./timings";

const LOGO = staticFile("integrations/shopify-color.svg");
const POP = { damping: 13, stiffness: 170, mass: 0.7 };
const FLIP = { damping: 12, stiffness: 210, mass: 0.6 };

const MoreTile: React.FC<{ live: boolean; pop: number }> = ({ live, pop }) => (
  <div style={{ width: TILE.w, borderRadius: 20, background: C.white, boxShadow: CARD_SHADOW_SOFT, overflow: "hidden", fontFamily: SANS }}>
    <div style={{ height: 184, background: live ? "#E9F7EE" : "#EEF0F3", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 60, fontWeight: 800, letterSpacing: "-0.04em", color: live ? AD_GREEN : C.mutedFg }}>+31</span>
    </div>
    <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.02em", color: C.ink }}>More products</span>
      <span
        style={{
          alignSelf: "flex-start",
          padding: "3px 12px 5px",
          borderRadius: 8,
          background: live ? AD_GREEN : AD_RED,
          color: C.white,
          fontSize: 17,
          fontWeight: 700,
          transform: `scale(${live ? 0.8 + 0.2 * Math.min(1.15, pop) : 1})`,
          transformOrigin: "0 50%",
        }}
      >
        {live ? "Live" : "404"}
      </span>
    </div>
  </div>
);

export const StoreScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = springAt(f, fps, STORE.enter, POP);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: STORE_CENTER.x,
          top: GRID.y + GRID.th + 26,
          transform: `translate(-50%, 0) translateY(${(1 - head) * 40}px)`,
          opacity: clamp01(head * 2),
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: SANS,
          color: C.ink,
          whiteSpace: "nowrap",
        }}
      >
        <Img src={LOGO} style={{ width: 52, height: 52, objectFit: "contain" }} />
        <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.025em" }}>Product pages</span>
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const box = tileBox(i);
        const at = STORE.enter + 2 + i * 2;
        const p = springAt(f, fps, at, POP);
        const flipAt = STORE.badges[i];
        const live = f >= flipAt;
        const pop = springAt(f, fps, flipAt, FLIP);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: box.x,
              top: box.y,
              transform: `translateY(${(1 - p) * 50}px) scale(${TILE.scale})`,
              transformOrigin: "0 0",
              opacity: clamp01(p * 2),
            }}
          >
            {i < PRODUCTS.length ? (
              <ProductTile name={PRODUCTS[i].name} src={staticFile(PRODUCTS[i].img)} live={live} pop={pop} shadow={CARD_SHADOW_SOFT} />
            ) : (
              <MoreTile live={live} pop={pop} />
            )}
          </div>
        );
      })}
    </>
  );
};
