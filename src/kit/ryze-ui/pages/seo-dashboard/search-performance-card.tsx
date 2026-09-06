import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { GroupedBars } from "./grouped-bars";
import { Legend } from "./legend";
import { LegendItem } from "./types";

export const SearchPerformanceCard: React.FC<{
  title?: string;
  labels: string[];
  clicks: number[];
  impressions: number[];
  clicksColor: string;
  impressionsColor: string;
  clicksTicks: string[];
  impressionsTicks: string[];
  legend: LegendItem[];
  style?: React.CSSProperties;
}> = ({
  title = "Search Performance",
  labels,
  clicks,
  impressions,
  clicksColor,
  impressionsColor,
  clicksTicks,
  impressionsTicks,
  legend,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} right={<Legend items={legend} />} />
    <div className="sd-card-body">
      <GroupedBars
        labels={labels}
        left={clicks}
        right={impressions}
        leftColor={clicksColor}
        rightColor={impressionsColor}
        leftTicks={clicksTicks}
        rightTicks={impressionsTicks}
        height={340}
      />
    </div>
  </div>
);
