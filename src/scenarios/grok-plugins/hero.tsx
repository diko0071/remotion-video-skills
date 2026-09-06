import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, press, useSpringAt } from "../../core/motion";
import { grokFont } from "../../kit/grok-ui/font";
import { measureObjects } from "../../core/stage";
import { ADDED_AT, APP_OFF_X, APP_OFF_Y, APP_SCALE, GREEN, HERO_ADD, HERO_POP, HERO_SCALE, HERO_SLIDE, INK, MODAL, MODAL_SCALE, MORPH, MUTED, SLOT, STAGE_FULL, STAGE_IN } from "./timings";

const slotLocal = () => {
  const r = measureObjects(["slot"]).slot;
  return r ? { x: MODAL.x + (r.x - MODAL.x) * MODAL_SCALE, y: MODAL.y + (r.y - MODAL.y) * MODAL_SCALE } : { x: MODAL.x + SLOT.x * MODAL_SCALE, y: MODAL.y + SLOT.y * MODAL_SCALE };
};
export const slotWindow = slotLocal;
export const slotFrame = () => {
  const w = slotLocal();
  return { x: APP_OFF_X + w.x * APP_SCALE, y: APP_OFF_Y + w.y * APP_SCALE, s: MODAL_SCALE * APP_SCALE };
};
export const addWindow = () => {
  const w = slotLocal();
  return { x: w.x + (SLOT.w - 44) * MODAL_SCALE, y: w.y + (SLOT.h / 2) * MODAL_SCALE };
};
const ease = Easing.inOut(Easing.cubic);

const morphAt = (frame: number) => interpolate(frame, [MORPH.at, MORPH.at + MORPH.len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

export const HERO_ICON = { size: 80, radius: 20, img: 46 };
export const HERO_POS = { x: 960 - (SLOT.w * HERO_SCALE) / 2, y: 540 - (SLOT.h * HERO_SCALE) / 2 };

export const PluginHero: React.FC<{ added: boolean; pressed: number; ring: number; carried?: boolean; style?: React.CSSProperties }> = ({ added, pressed, ring, carried = false, style }) => {
  const frame = useCurrentFrame();
  const popSpring = useSpringAt(HERO_POP, SPRINGS.pop, 22);
  const pop = carried ? 1 : popSpring;
  const spin = carried ? 0 : interpolate(frame, [HERO_POP, HERO_POP + 40], [-300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const unfurl = carried ? 1 : interpolate(frame, [HERO_SLIDE, HERO_SLIDE + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const addIn = useSpringAt(carried ? 6 : HERO_ADD, SPRINGS.pop, 14);
  const textW = SLOT.w - 80 - 22 - 150;
  const recentre = carried ? 0 : ((SLOT.w - 80) / 2) * (1 - unfurl);
  return (
    <div style={{ width: SLOT.w, height: SLOT.h, display: "flex", alignItems: "center", gap: 22, fontFamily: grokFont, transform: `translateX(${recentre}px)`, ...style }}>
      <div style={{ width: 80, height: 80, borderRadius: 20, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transform: `scale(${interpolate(pop, [0, 1], [0.4, 1])}) rotate(${spin}deg)`, opacity: Math.min(1, pop * 1.6) }}>
        <Img src={staticFile("ryze-sun.png")} style={{ width: 46, height: 46, display: "block" }} />
      </div>
      <div style={{ width: textW * unfurl, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ width: textW }}>
          <div style={{ fontSize: 23, fontWeight: 500, color: INK, marginBottom: 4, whiteSpace: "nowrap" }}>Ryze AI</div>
          <div style={{ fontSize: 21, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Google Ads, Meta Ads, GA4, Search Console, Shopify and more</div>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      {added ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 21, color: MUTED, paddingRight: 8, flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9.5l4 4 8-9" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Added
        </div>
      ) : (
        <div style={{ position: "relative", padding: "12px 26px", borderRadius: 999, background: "#242429", color: INK, fontSize: 20, fontWeight: 500, flexShrink: 0, transform: `scale(${interpolate(addIn, [0, 1], [0.5, 1]) * pressed})`, opacity: Math.min(1, addIn * 2) }}>
          Add
          {ring > 0 && ring < 1 ? <div style={{ position: "absolute", inset: -4 - ring * 22, borderRadius: 999, border: `${2.5 - ring * 2}px solid rgba(60,194,106,${0.9 * (1 - ring)})` }} /> : null}
        </div>
      )}
    </div>
  );
};

export const HeroLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const m = morphAt(frame);
  const mPrev = morphAt(frame - 1);
  const pressed = press(frame, ADDED_AT, 0.86);
  const ring = interpolate(frame, [ADDED_AT, ADDED_AT + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = interpolate(frame, [STAGE_IN, STAGE_FULL], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sf = slotFrame();
  const x = interpolate(m, [0, 1], [HERO_POS.x, sf.x]);
  const y = interpolate(m, [0, 1], [HERO_POS.y, sf.y]);
  const s = interpolate(m, [0, 1], [HERO_SCALE, sf.s]);
  const v = Math.abs(m - mPrev) * 900;
  const breathe = frame < MORPH.at ? Math.sin(frame / 16) * 3 : 0;
  if (out > 0.98) return null;
  return (
    <div
      className="grok-ui dark"
      style={{
        position: "absolute",
        left: x,
        top: y + breathe,
        width: SLOT.w,
        height: SLOT.h,
        transformOrigin: "top left",
        transform: `scale(${s})`,
        filter: v > 0.6 ? `blur(${Math.min(12, v).toFixed(1)}px)` : out > 0.02 ? `blur(${out * 12}px)` : undefined,
        opacity: (1 - out) * interpolate(frame, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        background: "transparent",
        zIndex: 20,
      }}
    >
      <PluginHero added={frame >= ADDED_AT + 2} pressed={pressed} ring={ring} />
    </div>
  );
};
