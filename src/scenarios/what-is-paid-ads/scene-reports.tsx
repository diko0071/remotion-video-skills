import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { press, ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { FONT, P, Skeleton } from "../../kit/product-ui";
import { UserMessage } from "../../kit/ryze-ui/message";
import { AcquisitionSlide, CHANNELS, CoverSlide, KPIS, MONTHS, RevenueSlide } from "../../kit/ryze-ui/pages/report-detail";
import { REPORT } from "./data";
import { K_REPORTS as K } from "./timings";

const S = 1.75;
const W = 900;
const SLIDE_W = 1180;
const THUMB = 280;
const SCALE = THUMB / SLIDE_W;
const THUMB_H = 760 * SCALE;
const H = 50 + 16 + THUMB_H + 20 + 40 + 16 + 60;
const TOP = zoneTop(H * S);
const SEND_BTN = { x: 1072, y: 766 };
const SLIDES = [<CoverSlide key="c" />, <RevenueSlide key="r" kpis={KPIS} months={MONTHS} />, <AcquisitionSlide key="a" channels={CHANNELS} />];

const Button: React.FC<{ label: string; glow: number; scale?: number }> = ({ label, glow, scale = 1 }) => (
  <span className="btn-outline" style={{ fontSize: 13, height: 32, padding: "0 12px", transform: `scale(${scale})`, boxShadow: glow > 0.01 ? `0 0 0 ${3 * glow}px color-mix(in srgb, ${P.brand} ${45 * glow}%, transparent)` : undefined }}>
    {label}
  </span>
);

export const ReportsScene: React.FC = () => {
  const f = useCurrentFrame();
  const dialog = useSpringAt(K.send + 6, SPRINGS.card, 14);
  const sent = f >= K.send + 12 + Math.ceil(REPORT.recipients.length / 1.6) + 4;
  const typedEmail = REPORT.recipients.slice(0, Math.max(0, Math.floor((f - K.send - 12) * 1.6)));
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <StepTitle step={4} text="Reports from your live data" at={-8} />
      <Zoom w={W} s={S} top={TOP}>
        <div style={{ width: W, fontFamily: FONT }}>
          <Pop at={2} from={0.94} rise={8}>
            <div style={{ width: W }}>
              <UserMessage>Make a report on September ad performance</UserMessage>
            </div>
          </Pop>
          <div style={{ marginTop: 16, display: "flex", gap: 20, justifyContent: "center" }}>
            {SLIDES.map((s, i) => (
              <Pop key={i} at={10 + i * 3} from={0.9} rise={12}>
                <div style={{ position: "relative", width: THUMB, height: THUMB_H, overflow: "hidden", borderRadius: P.radius, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 10px 24px rgba(15,23,42,0.08)", background: P.card }}>
                  <div style={{ width: SLIDE_W, transform: `scale(${SCALE})`, transformOrigin: "0 0", opacity: ramp(f, K.report + 8 + i * 14, K.report + 16 + i * 14) }}>{s}</div>
                  <Skeleton w={THUMB} h={THUMB_H} rows={4} on={ramp(f, K.report + 8 + i * 14, K.report + 16 + i * 14)} />
                </div>
              </Pop>
            ))}
          </div>
          <div style={{ marginTop: 20, height: 40, display: "flex", justifyContent: "center", gap: 10, opacity: ramp(f, K.download - 8, K.download - 2) }}>
            <Button label="Download PDF" glow={bump(f, K.pdf)} />
            <Button label="Send via Email" glow={bump(f, K.send)} scale={press(f, K.send + 4, 0.95)} />
          </div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", opacity: dialog, transform: `translateY(${(1 - dialog) * 16}px)` }}>
            <div className="pg-card" style={{ width: 520, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.08)" }}>
              <span style={{ fontSize: 12, color: P.mutedFg, whiteSpace: "nowrap" }}>To</span>
              <span style={{ flex: 1, fontSize: 14, color: P.fg }}>{typedEmail}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: sent ? "#047857" : P.fg }}>{sent ? "Sent ✓" : "Send"}</span>
            </div>
          </div>
        </div>
      </Zoom>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - ramp(f, K.send + 22, K.send + 30) }}>
        <Cursor
          appearAt={K.send - 20}
          scale={1.7}
          stops={[
            { x: 1520, y: 1010, at: K.send - 20 },
            { x: SEND_BTN.x, y: SEND_BTN.y, at: K.send + 4, click: true },
            { x: SEND_BTN.x + 170, y: SEND_BTN.y + 100, at: K.send + 30 },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};
