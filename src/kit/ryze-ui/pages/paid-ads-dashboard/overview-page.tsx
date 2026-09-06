import React from "react";
import "../../pages.css";
import "./paid-ads-dashboard.css";
import { ChannelsTable } from "./channels-table";
import { ComboChart } from "./combo-chart";
import { CpaTrend } from "./cpa-trend";
import {
  CHANNELS,
  CLICKS_AXIS,
  CONV_AXIS,
  CONV_RATE_SERIES,
  CTR_SERIES,
  DAILY_CLICKS,
  DAILY_CONV,
  DAILY_SPEND,
  MOVERS,
  OVERVIEW_COMBO_CHARTS,
  OVERVIEW_HEATMAPS,
  OVERVIEW_KPIS,
  ROAS_SERIES,
  SPEND_AXIS,
} from "./data";
import { Heatmap } from "./heatmap";
import { KpiRow } from "./kpi-row";
import { MoversTable } from "./movers-table";
import { PaidAdsShell } from "./shell";

const COMBO_DATA = {
  spend: { bars: DAILY_SPEND, line: ROAS_SERIES, axis: SPEND_AXIS },
  conversions: { bars: DAILY_CONV, line: CONV_RATE_SERIES, axis: CONV_AXIS },
  clicks: { bars: DAILY_CLICKS, line: CTR_SERIES, axis: CLICKS_AXIS },
};

export const PaidAdsDashboardPage: React.FC<{ panel?: React.ReactNode }> = ({ panel }) => (
  <PaidAdsShell tab="Overview" panel={panel}>
    <>
      <KpiRow items={OVERVIEW_KPIS} />

      <div className="pa-grid-3">
        {OVERVIEW_COMBO_CHARTS.map((c) => {
          const d = COMBO_DATA[c.key as keyof typeof COMBO_DATA];
          return (
            <ComboChart
              key={c.key}
              title={c.title}
              barLabel={c.barLabel}
              lineLabel={c.lineLabel}
              bars={d.bars}
              line={d.line}
              axis={d.axis}
            />
          );
        })}
      </div>

      <div className="pa-grid-2">
        {OVERVIEW_HEATMAPS.map((h) => (
          <Heatmap key={h.title} title={h.title} note={h.note} tone={h.tone} />
        ))}
      </div>

      <ChannelsTable rows={CHANNELS} />

      <div className="pa-grid-2">
        <MoversTable rows={MOVERS} />
        <CpaTrend />
      </div>
    </>
  </PaidAdsShell>
);
