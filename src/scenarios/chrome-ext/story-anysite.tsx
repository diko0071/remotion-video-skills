import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Lockup } from "../../kit/lockup";
import { ramp } from "../../core/motion";
import { ChromeFrame } from "../../kit/chrome-ui";
import { DirectionalBlur } from "../../kit/directional-blur";
import { ExtPanel, Gauge, type ExtView } from "../../kit/ext-ui";
import { HEADLINE_FONT, textWidth } from "../../kit/headline";
import { RiseLetters } from "../../kit/rise-letters";
import { AS, AS_FINAL, AS_LOCKUP, AS_SITES_END, CORAL, DOCKED, GAUGE_DOCKED, INK, PANEL } from "./timings";

export type SiteShot = { view: ExtView; shot: string; title: string };

const starts = AS.holds.reduce<number[]>((acc, h, i) => [...acc, (acc[i - 1] ?? 0) + (i === 0 ? 0 : AS.holds[i - 1])], []);
const STATIC = { head: -100, tabs: -100, rating: -100, gauge: -100, metrics: -100, rows: [-100, -100, -100] as [number, number, number], analyze: -100, chatgpt: -100, scroll1: 9999, aio: -100, scroll2: 9999, brand: -100, explore: -100 };

const Page: React.FC<{ site: SiteShot; at: number; base: SiteShot }> = ({ site, at, base }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, at, at + AS.slide, Easing.out(Easing.cubic));
  const prev = ramp(frame - 1, at, at + AS.slide, Easing.out(Easing.cubic));
  const shown = p >= 0.5 ? site : base;
  return (
    <AbsoluteFill>
      <ChromeFrame host={shown.view.domain} tab={{ title: shown.title, favicon: shown.view.favicon }} badge={{ text: String(shown.view.cites), color: shown.view.cites >= 1000 ? "#12a150" : "#b54708", at: 0 }}>
        <Img src={staticFile(base.shot)} />
        <DirectionalBlur id={`as-page-${at}`} y={Math.abs(p - prev) * 983 * 0.4} style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - p) * 983}px)`, background: "#fff" }}>
          <Img src={staticFile(site.shot)} />
        </DirectionalBlur>
      </ChromeFrame>
    </AbsoluteFill>
  );
};

const INLINE = 150;
const LINE = { size: 118, weight: 500, y1: 400, y2: 600, gap: 26 } as const;
const line2Text = "AI visibility.";
const slot = () => {
  const w2 = INLINE + LINE.gap + textWidth(line2Text, LINE.size, LINE.weight);
  const left2 = 960 - w2 / 2;
  return { x: left2 + INLINE / 2, y: LINE.y2, left2 };
};

const Final: React.FC<{ view: ExtView }> = ({ view }) => {
  const { left2 } = slot();
  const T = AS_FINAL - 6;
  return (
    <AbsoluteFill style={{ fontFamily: HEADLINE_FONT, color: INK }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: LINE.y1, transform: "translateY(-50%)", textAlign: "center", fontSize: LINE.size, fontWeight: LINE.weight, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
        <RiseLetters text={["One", " click", " to", " check", " anyone’s"]} from={[T, T + 2, T + 4, T + 6, T + 8]} len={7} rise={0.35} blur={12} letterStyle={(_, i) => (i <= 1 ? { color: CORAL } : {})} />
      </div>
      <div style={{ position: "absolute", left: left2 + INLINE + LINE.gap, top: LINE.y2, transform: "translateY(-50%)", fontSize: LINE.size, fontWeight: LINE.weight, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
        <RiseLetters text={["AI", " visibility."]} from={[T + 8, T + 11]} len={7} rise={0.35} blur={12} />
      </div>
      <span style={{ display: "none" }}>{view.domain}</span>
    </AbsoluteFill>
  );
};

export const AnySiteStory: React.FC<{ sites: SiteShot[]; first: SiteShot }> = ({ sites, first }) => {
  const frame = useCurrentFrame();
  const current = starts.reduce((acc, at, i) => (frame >= at + 3 ? i : acc), -1);
  const view = current < 0 ? first.view : sites[current].view;
  const numbersAt = current < 0 ? -100 : starts[current] + 3;
  const last = sites[sites.length - 1].view;
  const slide = ramp(frame, AS_SITES_END, AS_SITES_END + AS.slideLen, Easing.inOut(Easing.cubic));
  const slidePrev = ramp(frame - 1, AS_SITES_END, AS_SITES_END + AS.slideLen, Easing.inOut(Easing.cubic));
  const blur = Math.abs(slide - slidePrev) * 1920 * 0.3;
  const to = slot();
  const gx = GAUGE_DOCKED.x + (to.x - GAUGE_DOCKED.x) * slide;
  const gy = GAUGE_DOCKED.y + (to.y - GAUGE_DOCKED.y) * slide;
  const gs = 96 + (INLINE - 96) * slide;
  const num = ramp(frame, AS_FINAL - 4, AS_FINAL + 6);
  return (
    <AbsoluteFill style={{ background: "#FDFDFD" }}>
      {frame < AS_FINAL ? (
        <DirectionalBlur id="as-out" x={blur} style={{ position: "absolute", inset: 0, transform: `translateX(${-slide * 1920}px)` }}>
          {sites.map((site, i) => {
            const at = starts[i];
            const end = at + AS.holds[i] + AS.slide;
            if (frame < at || frame >= end) return null;
            return <Page key={site.view.domain} site={site} at={at} base={i === 0 ? first : sites[i - 1]} />;
          })}
          <div style={{ position: "absolute", left: DOCKED.x, top: DOCKED.y, width: PANEL.w, height: PANEL.h, borderRadius: 22, overflow: "hidden", background: "#1a0e06", boxShadow: "0 30px 80px rgba(15,23,42,.28), 0 0 0 1px rgba(15,23,42,.08)" }}>
            <ExtPanel view={view} t={STATIC} scroll={[]} parts={2} gaugeInstant numbersAt={numbersAt} />
          </div>
        </DirectionalBlur>
      ) : null}
      {frame >= AS_SITES_END && frame < AS_LOCKUP ? (
        <DirectionalBlur id="as-in" x={blur} style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - slide) * 1920}px)` }}>
          <Final view={last} />
        </DirectionalBlur>
      ) : null}
      {frame >= AS_SITES_END && frame < AS_LOCKUP ? (
        <DirectionalBlur id="as-gauge" x={blur * 0.6} style={{ position: "absolute", left: gx - gs / 2, top: gy - gs / 2, width: gs, height: gs }}>
          <Gauge value={last.rating} at={-100} size={gs} instant />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: num, fontFamily: HEADLINE_FONT, color: INK }}>
            <span style={{ fontSize: gs * 0.34, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{last.rating}</span>
          </div>
        </DirectionalBlur>
      ) : null}
      {frame >= AS_LOCKUP ? (
        <Sequence from={AS_LOCKUP} layout="none">
          <Lockup mark="ryze-sun.png" word="Ryze AI" background="#FDFDFD" ink={INK} tagline="One-click AI visibility, free on the Chrome Web Store" />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
