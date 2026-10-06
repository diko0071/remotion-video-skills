import React from "react";
import { Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { clamp01 } from "../../core/motion";
import { GlyphBall, PathBall, pathAt } from "../../kit/glyph-ball";
import {
  absorbed,
  DOT_BLINKS,
  DOT_EYES,
  DOT_PATH,
  dotGrowth,
  dotLook,
  dotSquash,
  SKY_SUN_EYES,
  skySunY,
  SUN_BLINKS,
  SUN_EYES,
  SUN_PATH,
  SUN_SKY_POS,
  sunLook,
} from "./cast";
import { GroundShadow } from "./fx";
import { SKY } from "./level";
import { DOT, G, LOGOS, SKINS, SUN_SKY } from "./theme";
import { FALL, FEED, FEED_FLY, LIFT, RISE } from "./timings";

const FEED_LOGOS = [
  LOGOS.ga4,
  LOGOS.shopify,
  LOGOS.google,
  LOGOS.meta,
  staticFile("integrations/tiktok-ads.svg"),
  staticFile("integrations/klaviyo.svg"),
  staticFile("integrations/google-search-console.svg"),
  staticFile("integrations/linkedin-ads.svg"),
  staticFile("integrations/hubspot.svg"),
  staticFile("integrations/pinterest-ads.svg"),
  staticFile("integrations/slack.svg"),
  staticFile("integrations/wordpress.svg"),
] as const;
const TILE = 112;

const Shadow: React.FC<{ x: number; y: number; size: number }> = ({ x, y, size }) => {
  const h = Math.max(0, G - (y + size / 2));
  const k = Math.max(0, 1 - h / 520);
  if (k <= 0) return null;
  return <GroundShadow x={x} width={size * (0.5 + 0.35 * k)} opacity={0.24 * k} />;
};

export const SkySun: React.FC = () => {
  const f = useCurrentFrame();
  if (f < RISE.from || f >= RISE.jump) return null;
  const y = skySunY(f);
  const glow = SUN_SKY * 1.9;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: SUN_SKY_POS.x - glow / 2,
          top: y - glow / 2,
          width: glow,
          height: glow,
          borderRadius: "50%",
          background: "#FFE08A",
          opacity: 0.55,
          filter: `blur(${glow * 0.12}px)`,
        }}
      />
      <div style={{ position: "absolute", left: SUN_SKY_POS.x - SUN_SKY / 2, top: y - SUN_SKY / 2, width: SUN_SKY, height: SUN_SKY }}>
        <GlyphBall f={f} size={SUN_SKY} src={SKINS.sun.src} eyeAt={SKINS.sun.eyeAt} track={SKY_SUN_EYES} gaze={f >= RISE.eyes + 4 ? { x: -0.8, y: 0.6 } : { x: 0, y: 0 }} blinks={SUN_BLINKS} shadow={0} />
      </div>
    </>
  );
};

const LAND_SIZE = DOT * 2.4;
const backOut = Easing.out(Easing.back(1.8));

const boostSize = (f: number) => {
  if (f < FALL.land) return DOT * dotGrowth(Math.min(f, FALL.from));
  const max = DOT * dotGrowth(FALL.from);
  return max + (LAND_SIZE - max) * backOut(clamp01((f - FALL.land) / 22));
};

const arcHop = (d: number, from: number, len: number, h: number) => {
  const s = (d - from) / len;
  return s > 0 && s < 1 ? 4 * h * s * (1 - s) : 0;
};

const boostCenter = (f: number, size: number) => {
  if (f < FALL.from) return { x: SKY.x, y: SKY.y };
  if (f < FALL.land) {
    const s = (f - FALL.from) / (FALL.land - FALL.from);
    return { x: SKY.x, y: SKY.y + (G - size / 2 - SKY.y) * s * s };
  }
  const d = f - FALL.land;
  return { x: SKY.x, y: G - size / 2 - arcHop(d, 6, 16, 150) - arcHop(d, 30, 10, 50) };
};

const landSquash = (f: number) => {
  const hit = (at: number, amp: number) => {
    const d = f - at;
    return d >= 0 && d < 14 ? amp * Math.exp(-d / 3) * Math.cos(d * 0.95) : 0;
  };
  return hit(FALL.land, 0.42) + hit(FALL.land + 22, 0.2) + hit(FALL.land + 40, 0.12);
};

const BoostDot: React.FC<{ f: number }> = ({ f }) => {
  const size = boostSize(f);
  const c = boostCenter(f, size);
  const falling = f >= FALL.from && f < FALL.land;
  const squash = falling ? -Math.min(0.14, (f - FALL.from) * 0.012) : landSquash(f);
  return (
    <div style={{ position: "absolute", left: c.x - size / 2, top: c.y - size / 2, width: size, height: size }}>
      <GlyphBall f={f} size={size} src={SKINS.dot.src} eyeAt={SKINS.dot.eyeAt} track={DOT_EYES} gaze={falling ? { x: 0, y: 0.7 } : f >= FALL.land ? { x: 0.3, y: -0.3 } : { x: 0.6, y: -0.5 }} blinks={DOT_BLINKS} squash={squash} shadow={0} />
    </div>
  );
};

const Pulse: React.FC<{ f: number }> = ({ f }) => {
  const n = absorbed(f);
  if (n === 0) return null;
  const at = FEED[n - 1] + FEED_FLY;
  const d = f - at;
  if (d > 12 || f >= FALL.from) return null;
  const r = (DOT * dotGrowth(f)) / 2 + 20 + d * 9;
  return (
    <div
      style={{
        position: "absolute",
        left: SKY.x - r,
        top: SKY.y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: `${Math.max(2, 10 - d * 0.7)}px solid #FFFFFF`,
        opacity: 1 - d / 12,
        boxSizing: "border-box",
      }}
    />
  );
};

const Tiles: React.FC<{ f: number }> = ({ f }) => (
  <>
    {FEED.map((t, k) => {
      const s = (f - t) / FEED_FLY;
      if (s < 0 || s >= 1) return null;
      const from = pathAt(SUN_PATH, t) ?? { x: SKY.x, y: SKY.y };
      const e = s * s * (3 - 2 * s);
      const x = from.x + (SKY.x - from.x) * e;
      const y = from.y + (SKY.y - from.y) * e - 220 * s * (1 - s);
      const scale = (0.55 + 0.45 * clamp01(s * 4)) * (1 - 0.75 * s * s);
      return (
        <div
          key={t}
          style={{
            position: "absolute",
            left: x - TILE / 2,
            top: y - TILE / 2,
            width: TILE,
            height: TILE,
            borderRadius: 28,
            background: "#FFFFFF",
            boxShadow: "0 14px 30px rgba(10,40,80,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${scale}) rotate(${(k % 2 ? 1 : -1) * 40 * s}deg)`,
          }}
        >
          <Img src={FEED_LOGOS[k % FEED_LOGOS.length]} style={{ width: 66, height: 66, objectFit: "contain" }} />
        </div>
      );
    })}
  </>
);

export const Cast: React.FC = () => {
  const f = useCurrentFrame();
  const d = f < LIFT.sky ? pathAt(DOT_PATH, f) : null;
  const s = f >= RISE.jump ? pathAt(SUN_PATH, f) : null;
  return (
    <>
      {s ? <Shadow x={s.x} y={s.y} size={s.size} /> : null}
      {d ? <Shadow x={d.x} y={d.y} size={d.size} /> : null}
      {f >= RISE.jump ? <PathBall id="lo-sun" skin={SKINS.sun} path={SUN_PATH} track={SUN_EYES} blinks={SUN_BLINKS} look={sunLook} /> : null}
      {f >= FALL.land ? <Shadow x={SKY.x} y={G - boostSize(f) / 2} size={boostSize(f)} /> : null}
      {f < LIFT.sky ? (
        <PathBall id="lo-dot" skin={SKINS.dot} path={DOT_PATH} track={DOT_EYES} blinks={DOT_BLINKS} look={dotLook} squash={dotSquash} />
      ) : (
        <>
          <Pulse f={f} />
          <BoostDot f={f} />
          <Tiles f={f} />
        </>
      )}
    </>
  );
};
