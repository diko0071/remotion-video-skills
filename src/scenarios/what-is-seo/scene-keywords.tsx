import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P, StatusPill } from "../../kit/product-ui";
import { KeywordRow, KeywordsTableHead } from "../../kit/ryze-ui/pages/geo-queries";
import { GSC_QUERIES, PICKED_KEYWORDS, SITE } from "./data";
import { K_KEYWORDS as K } from "./timings";

const S = 1.65;
const W = 700;
const CHIPS_H = 40;
const ROW_PAD = "14px 12px";
const H_A = 52 + CHIPS_H + 37 + PICKED_KEYWORDS.length * 55 + 8;
const S_B = 2.1;
const W_B = 600;
const ROW_B = 58;
const H_B = 52 + GSC_QUERIES.length * ROW_B + 8;
const SWAP = K.gscLine - 4;
const COL = { keyword: 0, volume: 1, kd: 2 } as const;
const CRITERIA = [
  { label: "Real searches", at: K.search, col: COL.volume },
  { label: "Matches what you sell", at: K.match, col: COL.keyword },
  { label: "Low competition", at: K.competition, col: COL.kd },
] as const;

const ColumnOverlay: React.FC<{ col: number; on: number }> = ({ col, on }) => (
  <div className="gq-krow" style={{ position: "absolute", inset: 0, borderBottom: "none", alignItems: "stretch", paddingTop: 0, paddingBottom: 0, pointerEvents: "none" }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span
        key={i}
        style={
          i === col
            ? {
                margin: "0 -10px",
                borderRadius: P.radius,
                background: `color-mix(in srgb, ${P.brand} ${16 * on}%, transparent)`,
                boxShadow: on > 0.01 ? `inset 0 0 0 1.5px color-mix(in srgb, ${P.brand} ${55 * on}%, transparent)` : undefined,
              }
            : undefined
        }
      />
    ))}
  </div>
);

const Criterion: React.FC<{ label: string; at: number }> = ({ label, at }) => (
  <Pop at={at - 2} from={0.7} rise={6}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px", borderRadius: 2, background: `color-mix(in srgb, ${P.brand} 14%, white)`, color: P.brandDeep, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {label}
    </span>
  </Pop>
);

const GscRow: React.FC<{ i: number }> = ({ i }) => {
  const f = useCurrentFrame();
  const q = GSC_QUERIES[i];
  return (
    <Pop at={SWAP + 6 + i * 4} from={0.96} rise={10}>
      <div style={{ width: W_B - 32, height: ROW_B, display: "flex", alignItems: "center", gap: 14, borderTop: i === 0 ? "none" : `1px solid ${P.border}`, fontFamily: FONT }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: P.fg }}>{q.query}</div>
          <div style={{ marginTop: 2, fontSize: 12, color: P.mutedFg }}>
            {q.impressions} impressions · position {q.position}
          </div>
        </div>
        <span style={{ opacity: f >= K.page - 4 + i * 3 ? 1 : 0 }}>
          <StatusPill label="No page yet" tone="warn" />
        </span>
      </div>
    </Pop>
  );
};

export const KeywordsScene: React.FC = () => {
  const f = useCurrentFrame();
  const out = ramp(f, SWAP - 2, SWAP + 6);
  const bIn = useSpringAt(SWAP + 2, SPRINGS.card, 14);
  const lit = (i: number) => {
    const c = CRITERIA[i];
    const next = i < CRITERIA.length - 1 ? CRITERIA[i + 1].at : 100000;
    return ramp(f, c.at - 2, c.at + 6) * (1 - ramp(f, next - 2, next + 6));
  };
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={3} text="It picks keywords you can win" at={-8} out={SWAP} keepEyebrow />
        {f >= SWAP ? <StepTitle step={3} text="And searches you already show up for" at={SWAP + 2} eyebrowAt={-100} /> : null}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateY(${-40 * out}px)` }}>
          <Zoom w={W} s={S} top={zoneTop(H_A * S)}>
            <Pop at={-6} from={0.92} rise={10}>
              <div className="pg-card" style={{ width: W, boxSizing: "border-box", paddingBottom: 8, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
                <div style={{ height: 52, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: P.fg }}>Keywords</span>
                  <span style={{ fontSize: 12, color: P.mutedFg }}>Picked for {SITE}</span>
                </div>
                <div style={{ height: CHIPS_H, padding: "0 16px", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  {CRITERIA.map((c) => (
                    <Criterion key={c.label} label={c.label} at={c.at} />
                  ))}
                </div>
                <div style={{ position: "relative" }}>
                  {CRITERIA.map((c, i) => (
                    <ColumnOverlay key={c.label} col={c.col} on={lit(i)} />
                  ))}
                  <div style={{ position: "relative" }}>
                    <KeywordsTableHead />
                    {PICKED_KEYWORDS.map((k, i) => (
                      <Pop key={k.text} at={2 + i * 3} from={0.96} rise={10}>
                        <div style={{ width: W }}>
                          <KeywordRow item={k} style={{ padding: ROW_PAD }} />
                        </div>
                      </Pop>
                    ))}
                  </div>
                </div>
              </div>
            </Pop>
          </Zoom>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: bIn, transform: `translateY(${40 * (1 - bIn)}px)` }}>
          <Zoom w={W_B} s={S_B} top={zoneTop(H_B * S_B)}>
            <div className="pg-card" style={{ width: W_B, height: H_B, boxSizing: "border-box", padding: "0 16px", fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
              <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${P.border}` }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: P.fg }}>From Google Search Console</span>
                <span style={{ fontSize: 12, color: P.mutedFg }}>You show up, no page yet</span>
              </div>
              {GSC_QUERIES.map((q, i) => (
                <GscRow key={q.query} i={i} />
              ))}
            </div>
          </Zoom>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
