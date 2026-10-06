import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bot, blinkTrack } from "./bot";
import { BRIEF_PEEK, MORPH_H, MORPH_TONE, MORPH_W, MORPH_X, MORPH_Y } from "./curves";
import { SANS } from "./font";
import { Headline } from "./headline";
import { CUT, GREEN, INK, r, sample } from "./timings";

const Name: React.FC<{ icon: string; color: string; children: string }> = ({ icon, color, children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color, fontWeight: 600 }}>
    <Img src={staticFile(icon)} style={{ width: 20, height: 20, objectFit: "contain" }} />
    {children}
  </span>
);

const Line: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * 8}px)`, ...style }}>{children}</div>;
};

const PILL_AT = -12;
const MORPH_AT = r(214) - CUT.brief;
const DOC_AT = r(222) - CUT.brief;
const PEEK_AT = r(221) - CUT.brief;
const LABEL = "Summarizing your week";

export const BriefScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = interpolate(frame, [PILL_AT, PILL_AT + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = sample(MORPH_X, frame, MORPH_AT);
  const y = sample(MORPH_Y, frame, MORPH_AT);
  const w = sample(MORPH_W, frame, MORPH_AT);
  const h = sample(MORPH_H, frame, MORPH_AT);
  const tone = Math.round(sample(MORPH_TONE, frame, MORPH_AT));
  const isDoc = frame >= MORPH_AT + r(5);
  const radius = interpolate(frame, [MORPH_AT + r(4), MORPH_AT + r(8)], [48, 14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typed = Math.min(LABEL.length, Math.floor(Math.max(0, frame - (r(202) - CUT.brief)) / 0.6));
  const labelOut = interpolate(frame, [MORPH_AT, MORPH_AT + 3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const peekY = sample(BRIEF_PEEK, frame, PEEK_AT);
  const docIn = interpolate(frame, [DOC_AT, DOC_AT + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shadow = interpolate(frame, [MORPH_AT + r(4), MORPH_AT + r(8)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Headline y={150} size={120} lines={[{ at: -40, words: [{ text: "all" }, { text: "the" }, { text: "context." }] }]} />
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: radius, background: `rgb(${tone},${tone},${tone})`, opacity: pop, transform: `scale(${0.7 + 0.3 * pop})`, boxShadow: `0 12px 40px rgba(23,19,16,${0.1 * shadow}), 0 0 0 1px rgba(23,19,16,${0.06 * shadow})`, overflow: "hidden", fontFamily: SANS }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 477, height: 96, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, color: "#FFF", fontSize: 24, fontWeight: 500, whiteSpace: "pre", opacity: labelOut }}>
          <svg width={18} height={18} viewBox="0 0 16 16"><rect x={3} y={7} width={10} height={7} rx={2} fill="#FFF" /><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#FFF" strokeWidth={1.8} fill="none" /></svg>
          {LABEL.slice(0, typed)}
        </div>
        {isDoc ? (
          <div style={{ position: "absolute", inset: 0, opacity: docIn }}>
            <div style={{ display: "flex", gap: 8, padding: "18px 20px 0" }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <span key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 60, top: 76, width: 1000, color: INK }}>
              <Line at={DOC_AT + 4} style={{ fontSize: 34, fontWeight: 600 }}>The Daily Ryze</Line>
              <Line at={DOC_AT + 8} style={{ fontSize: 17, color: "#9A9A9A", marginTop: 4 }}>Delivered weekdays at 8:00 AM</Line>
              <Line at={DOC_AT + 18} style={{ fontSize: 16, color: "#9A9A9A", marginTop: 38 }}>What moved overnight</Line>
              <Line at={DOC_AT + 22} style={{ fontSize: 21, lineHeight: 1.55, marginTop: 8 }}>
                Six articles went live and 12 keywords moved to page 1 in <Name icon="integrations/google-search-console.svg" color="#4285F4">Search Console</Name>, replies are drafted for the pricing thread in <Name icon="integrations/slack.svg" color="#4A154B">Slack</Name>, and <Name icon="meta-ads.svg" color="#0866FF">Meta Ads</Name> spend was rebalanced after the hero creative fatigued. <Name icon="integrations/shopify-color.svg" color="#5E8E3E">Shopify</Name> booked 38 orders from organic.
              </Line>
              <Line at={DOC_AT + 36} style={{ fontSize: 16, color: "#9A9A9A", marginTop: 34 }}>Needs your attention</Line>
              {[
                { at: DOC_AT + 42, text: "Approve 3 new ad variations for Summer Sale", done: true },
                { at: DOC_AT + 50, text: "Review the paused ad set before standup", done: false },
              ].map((row, i) => (
                <Line key={i} at={row.at} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, marginTop: 12 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 11, background: row.done ? GREEN : "#FFF", border: row.done ? "none" : "1.5px solid #D4D4D4", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    {row.done ? <svg width={12} height={12} viewBox="0 0 12 12"><path d="M2 6.5 L5 9 L10 3" stroke="#FFF" strokeWidth={2} fill="none" strokeLinecap="round" /></svg> : null}
                  </span>
                  {row.text}
                </Line>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div style={{ position: "absolute", left: 1392 - 125, top: peekY, opacity: frame >= PEEK_AT ? 1 : 0 }}>
        <Bot kind="hero" size={250} gaze={{ x: Math.sin(frame / 22) * 0.5, y: -0.3 }} blink={blinkTrack(frame, [r(236) - CUT.brief, r(250) - CUT.brief])} />
      </div>
    </AbsoluteFill>
  );
};
