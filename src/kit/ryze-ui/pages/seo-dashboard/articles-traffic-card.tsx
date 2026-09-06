import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { ComboChart } from "./combo-chart";
import { Legend } from "./legend";
import { LegendItem } from "./types";

export const ArticlesTrafficCard: React.FC<{
  title?: string;
  labels: string[];
  bars: number[];
  line: number[];
  barTicks: string[];
  lineTicks: string[];
  legend: LegendItem[];
  style?: React.CSSProperties;
}> = ({
  title = "Traffic From Articles",
  labels,
  bars,
  line,
  barTicks,
  lineTicks,
  legend,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} right={<Legend items={legend} />} />
    <div className="sd-card-body">
      <ComboChart
        labels={labels}
        bars={bars}
        line={line}
        barTicks={barTicks}
        lineTicks={lineTicks}
        height={260}
      />
    </div>
  </div>
);
