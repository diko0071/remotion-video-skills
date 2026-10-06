import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { press, ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { FONT, P, Skeleton } from "../../kit/product-ui";
import { UserMessage } from "../../kit/ryze-ui/message";
import { ComboChart, KpiRow } from "../../kit/ryze-ui/pages/paid-ads-dashboard";
import { DAILY_SPEND, DATE_LABELS, OVERVIEW_KPIS, ROAS_SERIES, SPEND_AXIS } from "../../kit/ryze-ui/pages/paid-ads-dashboard/data";
import { DASH_PROMPT } from "./data";
import { K_DASH as K } from "./timings";

const S = 1.1;
const W = 820;
const H = 50 + 16 + 500;
const TOP = zoneTop(H * S);
const REFRESH_BTN = { x: 1335, y: 412 };
const INNER = W - 36;
const CELL = (INNER - 48) / 4;
const PLOT_X0 = 66;
const PLOT_X1 = INNER - 8;

export const DashboardsScene: React.FC = () => {
  const f = useCurrentFrame();
  const build = useSpringAt(8, SPRINGS.card, 18);
  const refreshed = f >= K.refresh + 6;
  const glow = bump(f, K.refresh);
  const draw = ramp(f, K.builds + 6, K.dashboard + 14);
  const pulse = bump(f, K.refresh + 8);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <StepTitle step={5} text="Custom dashboards, live" at={-8} />
      <Zoom w={W} s={S} top={TOP}>
        <div style={{ width: W, fontFamily: FONT }}>
          <Pop at={2} from={0.94} rise={8}>
            <div style={{ width: W }}>
              <UserMessage>{DASH_PROMPT}</UserMessage>
            </div>
          </Pop>
          <div className="pg-card" style={{ marginTop: 16, padding: 18, opacity: build, transform: `translateY(${(1 - build) * 24}px)`, boxShadow: `0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)${pulse > 0.01 ? `, 0 0 0 ${4 * pulse}px color-mix(in srgb, ${P.brand} ${40 * pulse}%, transparent)` : ""}` }}>
            <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: P.fg }}>Ad performance · last 30 days</span>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: refreshed ? "#047857" : P.mutedFg }}>{refreshed ? "Updated just now" : "Updated 2 hours ago"}</span>
                <span className="btn-outline" style={{ fontSize: 13, height: 30, transform: `scale(${press(f, K.refresh + 2, 0.94)})`, boxShadow: glow > 0.01 ? `0 0 0 ${3 * glow}px color-mix(in srgb, ${P.brand} ${45 * glow}%, transparent)` : undefined }}>
                  Refresh data
                </span>
              </span>
            </div>
            <div style={{ position: "relative", marginTop: 14, marginBottom: 24 }}>
              <KpiRow items={OVERVIEW_KPIS} style={{ marginBottom: 0 }} />
              {OVERVIEW_KPIS.map((k, i) => (
                <div key={k.label} style={{ position: "absolute", left: i * (CELL + 16), top: 0, width: CELL, bottom: 0 }}>
                  <Skeleton w="100%" h="100%" rows={3} on={ramp(f, K.builds - 2 + i * 3, K.builds + 4 + i * 3)} />
                </div>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <ComboChart title="Spend & ROAS" barLabel="Cost" lineLabel="ROAS" bars={DAILY_SPEND} line={ROAS_SERIES} axis={SPEND_AXIS} labels={DATE_LABELS} />
              <div style={{ position: "absolute", top: 50, bottom: 13, left: PLOT_X0 + draw * (PLOT_X1 - PLOT_X0), width: (1 - draw) * (PLOT_X1 - PLOT_X0) + 2, background: P.card, opacity: draw >= 1 ? 0 : 1 }} />
            </div>
          </div>
        </div>
      </Zoom>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - ramp(f, K.refresh + 20, K.refresh + 28) }}>
        <Cursor
          appearAt={K.refresh - 22}
          scale={1.7}
          stops={[
            { x: 1640, y: 760, at: K.refresh - 22 },
            { x: REFRESH_BTN.x, y: REFRESH_BTN.y, at: K.refresh + 2, click: true },
            { x: REFRESH_BTN.x + 160, y: REFRESH_BTN.y + 110, at: K.refresh + 28 },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};
