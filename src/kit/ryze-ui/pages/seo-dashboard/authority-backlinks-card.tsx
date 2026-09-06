import React from "react";
import "./seo-dashboard.css";
import { AreaTrend } from "./area-trend";
import { CardHead } from "./card-head";
import { Legend } from "./legend";
import { LegendItem, NamedSeries } from "./types";

export const AuthorityBacklinksCard: React.FC<{
  title?: string;
  labels: string[];
  left: NamedSeries;
  right: NamedSeries;
  leftTicks: string[];
  rightTicks: string[];
  legend: LegendItem[];
  style?: React.CSSProperties;
}> = ({
  title = "Authority & Backlinks",
  labels,
  left,
  right,
  leftTicks,
  rightTicks,
  legend,
  style,
}) => (
  <div className="sd-card sd-stack" style={style}>
    <CardHead title={title} right={<Legend items={legend} />} />
    <div className="sd-card-body">
      <AreaTrend
        labels={labels}
        left={left}
        right={right}
        leftTicks={leftTicks}
        rightTicks={rightTicks}
        height={240}
      />
    </div>
  </div>
);
