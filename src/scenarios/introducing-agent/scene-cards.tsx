import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bot, blinkTrack } from "./bot";
import { PANEL_H, PEEK_UP } from "./curves";
import { SANS } from "./font";
import { Headline } from "./headline";
import { CUT, PANEL, PINK, r, sample } from "./timings";
import { CARD, DarkPanel, PANEL_BOX, Skeleton, StatusPill, WindowCard } from "./window-card";

const PEEK = { x: 1280, size: 204, restTop: 592 } as const;

export const SearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b = CUT.email;
  const panelAt = r(134) - b;
  const h = sample(PANEL_H, frame, panelAt);
  const up = sample(PEEK_UP, frame, r(136) - b);
  const exitAt = CUT.meeting - CUT.email - r(5);
  return (
    <AbsoluteFill>
      <Headline y={150} size={120} lines={[{ at: 0, words: [{ text: "every" }, { text: "search", at: 2 }] }]} />
      <WindowCard at={1} exitAt={exitAt}>
        <div style={{ position: "absolute", left: 46, top: 96, display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 600 }}>
          <Img src={staticFile("integrations/google-search-console.svg")} style={{ width: 34, height: 34 }} />
          best linen sheets
        </div>
        <span style={{ position: "absolute", right: 96, top: 98, fontSize: 22, fontWeight: 500, color: "#6B6B6B", background: "#F1F1F1", borderRadius: 8, padding: "6px 14px" }}>Page 2</span>
        <div style={{ position: "absolute", left: 46, top: 160, fontSize: 24, color: "#8A8A8A" }}>2,480 impressions · position 14 · last 28 days</div>
        <Skeleton rows={4} x={46} y={230} width={1120} />
      </WindowCard>
      <div style={{ position: "absolute", left: PEEK.x - PEEK.size / 2, top: PEEK.restTop + 130 - up, opacity: frame >= r(136) - b ? 1 : 0 }}>
        <Bot kind="hero" size={PEEK.size} gaze={{ x: Math.sin(frame / 20) * 0.5, y: -0.3 }} blink={blinkTrack(frame, [r(150) - b, r(154) - b])} />
      </div>
      <StatusPill at={r(120) - b} label="Reading your search data" x={960} y={960} hide={r(133) - b} />
      <DarkPanel height={h} icon="integrations/google-search-console.svg" label="Auto-drafted article" title="The 7 Best Linen Sheets for Hot Sleepers" meta="Ryze · 11:24 AM" body="Targets “best linen sheets” and four related queries you already rank for on page 2. Internal links to the collection page, meta and schema are set, ready to publish." bodyAt={panelAt + 4} />
    </AbsoluteFill>
  );
};

const PILL_GEO = { x: 720, y: 630, w: 477, h: 96 } as const;
const MID_GEO = { x: 610, y: 759, w: 693, h: 139 } as const;
const PANEL_GEO = { x: PANEL_BOX.x, y: PANEL_BOX.bottom - 310, w: PANEL_BOX.w, h: 310 } as const;

export const AdsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b = CUT.meeting;
  const t = (f: number) => r(f) - b;
  const peekAt = t(170);
  const up = sample(PEEK_UP, frame, peekAt);
  const cardExit = t(192);
  const ex = interpolate(frame, [cardExit, cardExit + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const m1 = interpolate(frame, [t(192), t(196)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const m2 = interpolate(frame, [t(196), t(201)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const lerp = (a: number, bb: number, c: number) => (m2 > 0 ? bb + (c - bb) * m2 : a + (bb - a) * m1);
  const geo = { x: lerp(PANEL_GEO.x, MID_GEO.x, PILL_GEO.x), y: lerp(PANEL_GEO.y, MID_GEO.y, PILL_GEO.y), w: lerp(PANEL_GEO.w, MID_GEO.w, PILL_GEO.w), h: lerp(PANEL_GEO.h, MID_GEO.h, PILL_GEO.h) };
  const radius = lerp(22, 70, 48);
  const contentOut = interpolate(frame, [t(192), t(195)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lockIn = interpolate(frame, [t(197), t(201)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const morphing = frame >= t(192);
  return (
    <AbsoluteFill>
      <Headline y={150} size={120} exitAt={t(194)} lines={[{ at: 0, words: [{ text: "every" }, { text: "ad", at: 2 }, { text: "account", at: 3 }] }]} />
      <Headline y={150} size={120} lines={[{ at: t(196), words: [{ text: "all" }, { text: "the", at: t(197) }, { text: "context.", at: t(198) }] }]} />
      <div style={{ position: "absolute", left: 1470 - 90, top: CARD.y + 20 - up * 1.05, opacity: frame >= peekAt ? 1 - ex : 0 }}>
        <Bot kind="hero" size={180} gaze={{ x: Math.sin(frame / 18) * 0.5, y: 0.2 }} blink={blinkTrack(frame, [peekAt + 14, peekAt + 40])} />
      </div>
      <WindowCard at={1} exitAt={cardExit}>
        <div style={{ position: "absolute", left: 46, top: 96, display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 600 }}>
          <Img src={staticFile("meta-ads.svg")} style={{ width: 34, height: 34 }} />
          Campaigns
        </div>
        {[
          { y: 180, w: 700, label: "Summer Sale · Prospecting", hot: true, k: "ROAS 1.8" },
          { y: 260, w: 470, label: "Retargeting · 7d", k: "ROAS 3.4" },
          { y: 340, w: 330, label: "Catalog · DPA", k: "ROAS 2.6" },
        ].map((row, i) => (
          <div key={i} style={{ position: "absolute", left: 46, top: row.y }}>
            <div style={{ position: "absolute", left: 0, top: 26, width: 1120, height: 1.5, background: "#EEEEEE" }} />
            <div style={{ position: "absolute", left: 150, top: 0, width: row.w, height: 54, borderRadius: 8, background: row.hot ? "rgba(232,45,153,0.10)" : "#F3F3F3", borderLeft: `4px solid ${row.hot ? PINK : "#D6D6D6"}`, fontFamily: SANS, fontSize: 22, color: row.hot ? PINK : "#777", padding: "14px 16px", whiteSpace: "nowrap" }}>{row.label}</div>
            <div style={{ position: "absolute", left: 0, top: 14, fontSize: 20, color: "#9A9A9A" }}>{row.k}</div>
          </div>
        ))}
      </WindowCard>
      {!morphing ? (
        <DarkPanel height={310} icon="meta-ads.svg" label="Budget brief" title="Summer Sale" meta="Ryze · 2:00 PM → 2:30 PM · 30min" body="ROAS dipped to 1.8 after the hero creative fatigued. Two ad sets are still scaling, so $120/day moved from the fatigued set to the top performer and three fresh variations are queued for approval." bodyAt={2} />
      ) : (
        <div style={{ position: "absolute", left: geo.x, top: geo.y, width: geo.w, height: geo.h, borderRadius: radius, background: PANEL, boxShadow: `0 24px 60px rgba(0,0,0,${0.28 * contentOut})`, overflow: "hidden", fontFamily: SANS, color: "#FFF" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: PANEL_BOX.w, padding: "28px 36px 30px", opacity: contentOut }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#9A9A9A", fontSize: 24 }}>
              <Img src={staticFile("meta-ads.svg")} style={{ width: 28, height: 28, objectFit: "contain" }} />
              Budget brief
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
              <span style={{ fontSize: 30, fontWeight: 600 }}>Summer Sale</span>
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: lockIn }}>
            <svg width={22} height={22} viewBox="0 0 16 16"><rect x={3} y={7} width={10} height={7} rx={2} fill="#FFF" /><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#FFF" strokeWidth={1.8} fill="none" /></svg>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
