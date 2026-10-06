import React from "react";
import { Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, ramp, springAt } from "../../core/motion";
import { AD_GREEN, Toggle } from "../../kit/ad-objects";
import { TileImg } from "../../kit/tile-img";
import { C } from "../../kit/launch";
import { POP, StepIcon, useIn } from "./parts";
import { ad } from "./theme";
import { T } from "./timings";

const ROWS = [
  { title: "Checked your tracking", sub: "Purchase events are coming in from your site", start: T.step2.at + 14, done: T.step2.at + 50 },
  { title: "Read 90 days of your ad account history", sub: "What sold, what burned money, who bought", start: T.step2.at + 58, done: T.step2.builds - 8 },
  { title: "Built the campaign and 3 ad sets", sub: "Broad · US, Lookalike 1%, Retargeting", start: T.step2.builds, done: T.step2.makes - 8 },
  { title: "Made 18 ads for your brand", sub: "", start: T.step2.makes, done: T.step2.makes + 36 },
] as const;

const THUMBS = 8;
const ROW_H = 80;

const Row: React.FC<{ i: number }> = ({ i }) => {
  const r = ROWS[i];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, height: ROW_H, ...useIn(r.start) }}>
      <StepIcon start={r.start} done={r.done} size={44} />
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.18 }}>
        <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>{r.title}</span>
        {r.sub ? <span style={{ fontSize: 22, fontWeight: 600, color: C.mutedFg }}>{r.sub}</span> : null}
      </div>
    </div>
  );
};

const Thumbs: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 66 }}>
      {Array.from({ length: THUMBS }, (_, i) => {
        const at = T.step2.makes + 4 + i * 4;
        const p = f < at ? 0 : springAt(f, fps, at, POP);
        const flip = T.step3.launches + 4 + i * 2;
        const on = ramp(f, flip, flip + 6, Easing.inOut(Easing.cubic));
        return (
          <div key={i} style={{ position: "relative", width: 108, height: 108, borderRadius: 14, overflow: "hidden", opacity: clamp01(p * 2), transform: `scale(${0.6 + 0.4 * p})`, boxShadow: "0 6px 16px rgba(15,23,42,0.12)" }}>
            <TileImg file={ad(i)} />
            <div style={{ position: "absolute", right: 6, bottom: 6, padding: "3px 4px", borderRadius: 10, background: "rgba(255,255,255,0.95)", opacity: f >= T.step3.at ? 1 : 0 }}>
              <Toggle p={1 - on} on={AD_GREEN} scale={0.5} />
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: 26, fontWeight: 800, color: C.mutedFg, opacity: f >= T.step2.makes + 4 + THUMBS * 4 ? 1 : 0 }}>+10</div>
    </div>
  );
};

export const SetupBody: React.FC = () => (
  <div style={{ padding: "26px 44px 0" }}>
    {ROWS.map((_, i) => (
      <Row key={i} i={i} />
    ))}
    <div style={{ marginTop: 10 }}>
      <Thumbs />
    </div>
  </div>
);
