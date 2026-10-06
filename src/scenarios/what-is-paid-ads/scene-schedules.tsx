import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P, StatusPill } from "../../kit/product-ui";
import { SCHEDULE } from "./data";
import { K_SCHED as K } from "./timings";

const S = 1.8;
const W = 880;
const LEFT = 470;
const H = 380;
const TOP = zoneTop(H * S);
const MODES = ["Daily", "Weekly", "Monthly"] as const;
const FINAL_MODE = 1;

const Card: React.FC<{ title: string; children: React.ReactNode; w: number }> = ({ title, children, w }) => (
  <div className="pg-card" style={{ width: w, boxSizing: "border-box", padding: 18, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: P.mutedFg }}>{title}</div>
    <div style={{ marginTop: 10 }}>{children}</div>
  </div>
);

export const SchedulesScene: React.FC = () => {
  const f = useCurrentFrame();
  let mode = -1;
  K.repeats.forEach((at, i) => {
    if (f >= at - 2) mode = i;
  });
  if (f >= K.repeats[2] + 14) mode = FINAL_MODE;
  const words = SCHEDULE.instructions.split(" ");
  const typed = Math.max(0, Math.min(words.length, Math.floor((f - 12) / 0.9)));
  const RIGHT = W - LEFT - 20;
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <StepTitle step={3} text="Tasks that run on their own" at={-8} out={K.results - 6} keepEyebrow />
      {f >= K.results - 6 ? <StepTitle step={3} text="Results in a new chat, and an email" at={K.results - 4} eyebrowAt={-100} /> : null}
      <Zoom w={W} s={S} top={TOP}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <Pop at={2} from={0.94} rise={10}>
            <Card title="Instructions" w={LEFT}>
              <div style={{ fontSize: 15, fontWeight: 700, color: P.fg, background: `color-mix(in srgb, ${P.brand} ${16 * ramp(f, K.check - 10, K.check)}%, transparent)`, display: "inline-block", padding: "0 4px", marginLeft: -4, borderRadius: 2 }}>{SCHEDULE.name}</div>
              <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: P.fg, minHeight: 168 }}>
                {words.map((w, i) => (
                  <span key={i} style={{ opacity: i < typed ? 1 : 0 }}>
                    {w}{" "}
                  </span>
                ))}
              </div>
            </Card>
          </Pop>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Pop at={8} from={0.94} rise={10}>
              <Card title="Repeats" w={RIGHT}>
                <div style={{ display: "inline-flex", gap: 2, padding: 3, borderRadius: 3, background: P.muted }}>
                  {MODES.map((m, i) => (
                    <span key={m} style={{ padding: "5px 14px", borderRadius: 2.4, fontSize: 13, fontWeight: 600, background: mode === i ? P.primary : "transparent", color: mode === i ? "#fafafa" : P.mutedFg }}>
                      {m}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: P.mutedFg }}>{mode >= 0 ? SCHEDULE.repeats[mode] : "—"}</div>
              </Card>
            </Pop>
            <Pop at={K.results - 4} from={0.94} rise={10}>
              <Card title="Recent runs" w={RIGHT}>
                {SCHEDULE.runs.map((r, i) => (
                  <Pop key={r.when} at={K.results + i * 4} from={0.96} rise={8}>
                    <div style={{ width: RIGHT - 36, height: 40, display: "flex", alignItems: "center", gap: 10, borderTop: i === 0 ? "none" : `1px solid ${P.border}` }}>
                      <StatusPill label="Done" tone="positive" />
                      <span style={{ flex: 1, fontSize: 13, color: P.fg }}>{r.when}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: f >= K.email - 2 ? "#047857" : P.mutedFg }}>{f >= K.email - 2 ? "Chat · emailed" : "Chat"}</span>
                    </div>
                  </Pop>
                ))}
              </Card>
            </Pop>
          </div>
        </div>
      </Zoom>
    </AbsoluteFill>
  );
};
