import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { EngineIcon } from "./engine-icon";
import { StackedBars } from "./stacked-bars";
import { ChartSeries, TrafficEngine, fmtNumber } from "./types";

export const AiChatsTrafficCard: React.FC<{
  title?: string;
  labels: string[];
  series: ChartSeries[];
  ticks: string[];
  vw: number;
  engines: TrafficEngine[];
  style?: React.CSSProperties;
}> = ({
  title = "AI Chats Traffic",
  labels,
  series,
  ticks,
  vw,
  engines,
  style,
}) => (
  <div className="sd-card sd-stack" style={style}>
    <CardHead title={title} />
    <div className="sd-card-body">
      <StackedBars
        labels={labels}
        series={series}
        ticks={ticks}
        height={300}
        vw={vw}
      />
      <div className="sd-eng-legend">
        {engines.map((e) => {
          const serie = series.find((s) => s.label === e.label);
          const total = serie ? serie.values.reduce((sum, v) => sum + v, 0) : 0;
          return (
            <span key={e.label}>
              <EngineIcon icon={e.icon} />
              {e.label}
              <b>{fmtNumber(total)}</b>
            </span>
          );
        })}
      </div>
    </div>
  </div>
);
