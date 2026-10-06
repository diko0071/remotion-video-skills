import React from "react";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { Pop } from "../../kit/pop";
import { breakdownLine, COPY, FEE_STEPS } from "./data";
import { Roll, type RollFont } from "./fee/roll";
import { LOGO } from "./theme";
import { K_FEE as K } from "./timings";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { FONT, P } from "../../kit/product-ui";

const S = 2.1;
const W = 720;
const HALF = W / 2;
const PAD = 24;
const H = 268;
const TOP = zoneTop(H * S);
const MARKS = [K.steps[0], K.steps[1], K.steps[2]] as const;
const BIG: RollFont = { fontFamily: FONT, fontSize: 52, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 62 };
const LINE: RollFont = { fontFamily: FONT, fontSize: 14, fontWeight: 500, letterSpacing: "0em", lineHeight: 20 };
const SWAP = K.steps[0] - 4;

const Half: React.FC<{ left: number; glow: number; children: React.ReactNode }> = ({ left, glow, children }) => (
  <div
    style={{
      position: "absolute",
      left: left + 8,
      top: 8,
      width: HALF - 16,
      height: 148,
      borderRadius: P.radiusXl,
      background: `color-mix(in srgb, ${P.brand} ${10 * glow}%, transparent)`,
    }}
  >
    <div style={{ position: "absolute", left: PAD - 8, top: PAD - 8, right: PAD - 8 }}>{children}</div>
  </div>
);

export const FeeScene: React.FC = () => {
  const f = useCurrentFrame();
  const spendGlow = Math.max(bump(f, K.pay), bump(f, K.platforms));
  const feeGlow = Math.max(bump(f, K.fee), bump(f, K.five), bump(f, K.only), bump(f, K.steps[3]));
  const onlyChip = useSpringAt(K.only - 2, SPRINGS.pop, 16);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={5} text="5% only on what the agent manages" at={-8} out={SWAP} keepEyebrow />
        {f >= SWAP ? <StepTitle step={5} text="The more you spend, the lower the rate" at={SWAP + 2} eyebrowAt={-100} /> : null}
        <Zoom w={W} s={S} top={TOP}>
          <Pop at={-6} from={0.92} rise={10}>
            <div className="pg-card" style={{ position: "relative", width: W, height: H, boxSizing: "border-box", fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
              <div style={{ position: "absolute", left: HALF, top: 18, width: 1, height: 130, background: P.border }} />
              <Half left={0} glow={spendGlow}>
                <div style={{ fontSize: 12, color: P.mutedFg }}>Daily budget</div>
                <div style={{ marginTop: 6, display: "flex", alignItems: "flex-end", gap: 6, whiteSpace: "nowrap" }}>
                  <Roll values={FEE_STEPS.map((s) => s.daily)} marks={MARKS} font={BIG} color={P.fg} fitWidth />
                  <span style={{ fontSize: 18, fontWeight: 600, color: P.mutedFg, lineHeight: "40px" }}>/ day</span>
                </div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: P.mutedFg }}>
                  Ad spend, paid to
                  <Pop at={K.platforms - 2} from={0.5} rise={4}>
                    <Img src={LOGO.meta} style={{ width: 18, height: 18, objectFit: "contain" }} />
                  </Pop>
                  <Pop at={K.platforms + 2} from={0.5} rise={4}>
                    <Img src={LOGO.google} style={{ width: 18, height: 18, objectFit: "contain" }} />
                  </Pop>
                </div>
              </Half>
              <Half left={HALF} glow={feeGlow}>
                <div style={{ fontSize: 12, color: P.mutedFg }}>Ryze fee</div>
                <div style={{ marginTop: 6 }}>
                  <Roll values={FEE_STEPS.map((s) => `${s.rate}%`)} marks={MARKS} font={BIG} color={P.fg} fitWidth />
                </div>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: P.mutedFg }}>
                  <Img src={LOGO.sun} style={{ width: 18, height: 18 }} />
                  only on managed campaigns
                </div>
              </Half>
              <div style={{ position: "absolute", right: 0, top: -40, transform: `scale(${0.85 + 0.15 * onlyChip})`, transformOrigin: "100% 100%", opacity: onlyChip }}>
                <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 2, background: P.emeraldSoft, color: "#047857", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                  Only on managed campaigns · nothing else
                </span>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, top: 164, borderTop: `1px solid ${P.border}`, padding: `16px ${PAD}px 0` }}>
                <div style={{ height: LINE.lineHeight }}>
                  <Roll values={FEE_STEPS.map((s) => breakdownLine(s.spend, s.rate, s.fee))} marks={MARKS} font={LINE} color="rgba(15,23,42,0.8)" />
                </div>
                <div style={{ marginTop: 6, fontSize: 12, lineHeight: "17px", color: P.mutedFg }}>{COPY.feeNote}</div>
              </div>
            </div>
          </Pop>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
