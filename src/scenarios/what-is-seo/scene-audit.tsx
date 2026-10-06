import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { press, ramp } from "../../core/motion";
import { StepTitle, Zoom, zoneTop, zoomPoint } from "../../kit/explainer";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { FONT, P, PrimaryButton } from "../../kit/product-ui";
import { AuditIssuePill, AuditScoreRing, CheckBox } from "../../kit/ryze-ui/pages/technical-audit";
import { HEALTH, ISSUES } from "./data";
import { K_AUDIT as K } from "./timings";

const S = 2.05;
const W = 600;
const PAD = 24;
const GAP = 20;
const HEAD_H = 20;
const BODY_H = 207;
const BTN_H = 36;
const H = PAD * 2 + HEAD_H + BODY_H + BTN_H + GAP * 2;
const TOP = zoneTop(H * S);
const PASS = (i: number) => K.approve + 6 + i * 5;
const RING_CSS = ".wis-ring .ta-score{padding:0}.wis-ring .ta-score-label{align-self:center}";

const IssueRow: React.FC<{ i: number }> = ({ i }) => {
  const f = useCurrentFrame();
  const it = ISSUES[i];
  const passed = f >= PASS(i);
  return (
    <Pop at={K.issues[i] - 2} from={0.92} rise={8}>
      <div style={{ display: "grid", gridTemplateColumns: "16px minmax(0, 1fr) 88px", alignItems: "center", columnGap: 12, width: 344 }}>
        <CheckBox on={passed} />
        <span className={`ta-issue-name${passed ? " passed" : ""}`} style={{ fontSize: 13 }}>
          {it.name}
        </span>
        <span style={{ justifySelf: "start" }}>
          <AuditIssuePill severity={it.severity} />
        </span>
      </div>
    </Pop>
  );
};

export const AuditScene: React.FC = () => {
  const f = useCurrentFrame();
  const scan = ramp(f, 4, K.week, Easing.out(Easing.cubic));
  const fix = ramp(f, PASS(0), PASS(ISSUES.length - 1) + 8, Easing.inOut(Easing.cubic));
  const score = Math.round(HEALTH.before * scan + (HEALTH.after - HEALTH.before) * fix);
  const good = score >= 80;
  const btn = zoomPoint(W, S, TOP, W / 2 + 40, H - PAD - BTN_H / 2);
  const meta = ramp(f, K.hundred - 4, K.hundred + 4);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <style>{RING_CSS}</style>
      <AbsoluteFill>
        <StepTitle step={2} text="Ryze audits your site every week" at={-8} out={K.fixes - 4} keepEyebrow />
        {f >= K.fixes - 4 ? <StepTitle step={2} text="It fixes what's broken" at={K.fixes - 2} eyebrowAt={-100} /> : null}
        <Zoom w={W} s={S} top={TOP}>
          <Pop at={-6} from={0.92} rise={10}>
            <div
              className="pg-card"
              style={{ width: W, height: H, boxSizing: "border-box", padding: PAD, display: "flex", flexDirection: "column", gap: GAP, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}
            >
              <div style={{ height: HEAD_H, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: P.fg }}>Technical Audit</span>
                <span style={{ fontSize: 12, color: P.mutedFg, opacity: meta }}>Top 300 pages · checked every week</span>
              </div>
              <div style={{ height: BODY_H, display: "flex", alignItems: "center", gap: 36 }}>
                <div className="wis-ring" style={{ width: 172, flex: "none" }}>
                  <AuditScoreRing
                    value={HEALTH.after}
                    tone={good ? "#059669" : "#d97706"}
                    stroke={good ? "#10b981" : "#f59e0b"}
                    label="Site health"
                    sub={good ? "No critical issues" : "5 issues found"}
                    progress={score / HEALTH.after}
                    displayValue={score}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {ISSUES.map((it, i) => (
                    <IssueRow key={it.name} i={i} />
                  ))}
                </div>
              </div>
              <div style={{ height: BTN_H }}>
                <PrimaryButton label="Approve" press={press(f, K.approve, 0.96)} />
              </div>
            </div>
          </Pop>
        </Zoom>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - ramp(f, K.approve + 14, K.approve + 22) }}>
          <Cursor
            appearAt={K.approve - 22}
            scale={1.7}
            stops={[
              { x: 1520, y: 1010, at: K.approve - 22 },
              { x: btn.x, y: btn.y, at: K.approve, click: true },
              { x: btn.x + 160, y: btn.y + 90, at: K.approve + 22 },
            ]}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
