import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { GroupedBars } from "./grouped-bars";
import { Legend } from "./legend";
import { LegendItem } from "./types";

export const ContentPipelineCard: React.FC<{
  title?: string;
  labels: string[];
  generated: number[];
  published: number[];
  generatedColor: string;
  publishedColor: string;
  generatedTicks: string[];
  publishedTicks: string[];
  legend: LegendItem[];
  style?: React.CSSProperties;
}> = ({
  title = "Content Pipeline",
  labels,
  generated,
  published,
  generatedColor,
  publishedColor,
  generatedTicks,
  publishedTicks,
  legend,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} right={<Legend items={legend} />} />
    <div className="sd-card-body">
      <GroupedBars
        labels={labels}
        left={generated}
        right={published}
        leftColor={generatedColor}
        rightColor={publishedColor}
        leftTicks={generatedTicks}
        rightTicks={publishedTicks}
        height={260}
      />
    </div>
  </div>
);
