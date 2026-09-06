import React from "react";
import "./report-detail.css";
import { ColumnChart } from "./column-chart";
import { KpiCard } from "./kpi-card";
import { Slide } from "./slide";
import { ReportKpi, ReportMonth } from "./types";

export const RevenueSlide: React.FC<{
  kpis: ReportKpi[];
  months: ReportMonth[];
  order?: number;
  label?: string;
  calloutEyebrow?: string;
  calloutTitle?: string;
  calloutBody?: React.ReactNode;
  chartTitle?: string;
  style?: React.CSSProperties;
}> = ({
  kpis,
  months,
  order = 2,
  label = "Store & revenue health",
  calloutEyebrow = "What matters this month",
  calloutTitle = "Organic search now pays for the whole paid program",
  calloutBody = "Organic sessions grew 18% to 58,410 and produced $79,320 — more than paid search and paid social combined. The ceiling is on-page: six collection pages hold 38% of organic entrances with duplicated copy, and 214 products ship without price or availability schema.",
  chartTitle = "Revenue by month, $ thousands",
  style,
}) => (
  <Slide order={order} label={label} style={style}>
    <div className="rd-kpis">
      {kpis.map((k) => (
        <KpiCard key={k.label} item={k} />
      ))}
    </div>

    <div className="rd-callout">
      <div className="eyebrow">{calloutEyebrow}</div>
      <div className="title">{calloutTitle}</div>
      <p>{calloutBody}</p>
    </div>

    <div>
      <div className="rd-chart-title">{chartTitle}</div>
      <ColumnChart months={months} />
    </div>
  </Slide>
);
