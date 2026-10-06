import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P, StatusPill } from "../../kit/product-ui";
import { ApprovalCard } from "../../kit/ryze-ui/pages/approvals";
import { ACCOUNTS, APPROVAL } from "./data";
import { K_AGENT as K } from "./timings";

const S = 1.8;
const W = 660;
const PAD = 20;
const ROW_H = 60;
const CELLS = 24;
const CARD_H = PAD * 2 + 28 + 10 + ACCOUNTS.length * ROW_H + 20;
const APPR_GAP = 22;
const APPR_H = 72;
const H = CARD_H + APPR_GAP + APPR_H;
const TOP = zoneTop(H * S);
const SWAP = K.sends - 4;

const Strip: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: CELLS }, (_, i) => {
        const at = from + ((to - from) * i) / (CELLS - 1);
        const on = ramp(f, at, at + 4);
        return <span key={i} style={{ width: 9, height: 22, borderRadius: 1.8, background: `color-mix(in srgb, ${P.emerald} ${Math.round(on * 100)}%, ${P.muted})` }} />;
      })}
    </div>
  );
};

export const AgentScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <StepTitle text="An AI media buyer on your accounts" at={-8} out={SWAP} />
      {f >= SWAP ? <StepTitle text="Every fix comes to you as an approval" at={SWAP + 2} /> : null}
      <Zoom w={W} s={S} top={TOP}>
        <Pop at={-6} from={0.92} rise={10}>
          <div className="pg-card" style={{ width: W, height: CARD_H, boxSizing: "border-box", padding: PAD, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
            <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, color: P.fg }}>
                <Img src={staticFile("ryze-sun.png")} style={{ width: 22, height: 22 }} />
                Ryze agent on your ad accounts
              </span>
              <span style={{ opacity: f >= K.watches ? 1 : 0 }}>
                <StatusPill label="Watching 24/7" tone="positive" />
              </span>
            </div>
            <div style={{ marginTop: 10 }}>
              {ACCOUNTS.map((a, i) => (
                <Pop key={a.name} at={2 + i * 4} from={0.94} rise={10}>
                  <div style={{ width: W - PAD * 2, height: ROW_H, display: "flex", alignItems: "center", gap: 12, borderTop: i === 0 ? "none" : `1px solid ${P.border}`, background: `color-mix(in srgb, ${P.brand} ${Math.round(10 * bump(f, K.platforms[i]))}%, transparent)`, boxShadow: `-8px 0 0 color-mix(in srgb, ${P.brand} ${Math.round(10 * bump(f, K.platforms[i]))}%, transparent), 8px 0 0 color-mix(in srgb, ${P.brand} ${Math.round(10 * bump(f, K.platforms[i]))}%, transparent)` }}>
                    <span className="intg-tile" style={{ width: 36, height: 36 }}>
                      <Img src={staticFile(a.icon)} style={{ width: 20, height: 20 }} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: P.fg }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: P.mutedFg }}>{a.sub}</div>
                    </div>
                    <Strip from={K.watches + i * 3} to={K.clock + 10 + i * 3} />
                  </div>
                </Pop>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: CELLS * 12 - 3, display: "flex", justifyContent: "space-between", fontSize: 11, color: P.mutedFg }}>
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
              </div>
            </div>
          </div>
        </Pop>
        <div style={{ marginTop: APPR_GAP }}>
          <Pop at={K.approval - 6} from={0.92} rise={14}>
            <div style={{ width: W }}>
              <ApprovalCard row={APPROVAL} selectable={false} style={{ padding: "16px 20px", height: APPR_H, boxSizing: "border-box", boxShadow: "0 12px 32px rgba(15,23,42,0.06)" }} />
            </div>
          </Pop>
        </div>
      </Zoom>
    </AbsoluteFill>
  );
};
