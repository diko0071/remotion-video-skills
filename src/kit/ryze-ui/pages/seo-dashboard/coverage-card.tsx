import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { EngineIcon } from "./engine-icon";
import { CoverageRow } from "./types";

export const CoverageCard: React.FC<{
  title?: string;
  hint?: string;
  rows: CoverageRow[];
  style?: React.CSSProperties;
}> = ({
  title = "Coverage by Model",
  hint = "Answers naming you, per assistant.",
  rows,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} hint={hint} />
    <div className="sd-card-body">
      {rows.map((row) => (
        <div className="sd-cov" key={row.engine.key}>
          <EngineIcon icon={row.engine.icon} />
          <span className="nm">{row.engine.label}</span>
          <span className="bar">
            <u style={{ width: `${(row.named / row.total) * 100}%` }} />
          </span>
          <span className="v">
            {row.named}/{row.total}
          </span>
        </div>
      ))}
    </div>
  </div>
);
