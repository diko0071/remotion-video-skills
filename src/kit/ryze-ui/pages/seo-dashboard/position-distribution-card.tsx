import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { HeadMetric } from "./head-metric";
import { BucketRow, fmtNumber } from "./types";

export const PositionDistributionCard: React.FC<{
  title?: string;
  metricLabel?: string;
  buckets: BucketRow[];
  total: number;
  style?: React.CSSProperties;
}> = ({
  title = "Position Distribution",
  metricLabel = "Queries",
  buckets,
  total,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead
      title={title}
      right={<HeadMetric label={metricLabel} value={fmtNumber(total)} />}
    />
    <div className="sd-card-body">
      <div className="sd-stacked">
        {buckets.map((b) => (
          <span
            key={b.label}
            style={{
              background: b.color,
              width: `${(b.count / total) * 100}%`,
            }}
          />
        ))}
      </div>
      {buckets.map((b) => (
        <div className="sd-bucket" key={b.label}>
          <span className="dot" style={{ background: b.color }} />
          <span className="lbl">{b.label}</span>
          <span className="cnt">{fmtNumber(b.count)}</span>
          <span className="pct">{Math.round((b.count / total) * 100)}%</span>
        </div>
      ))}
    </div>
  </div>
);
