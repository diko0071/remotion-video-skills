import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { Donut } from "./donut";
import { EngineIcon } from "./engine-icon";
import { TrafficRow, fmtCompact, fmtNumber, fmtPct } from "./types";

export const AiTrafficCard: React.FC<{
  title?: string;
  donutSub?: string;
  rows: TrafficRow[];
  total: number;
  style?: React.CSSProperties;
}> = ({
  title = "AI Traffic",
  donutSub = "AI Sessions · 28 D",
  rows,
  total,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} />
    <div className="sd-card-body">
      <div className="sd-donut-wrap">
        <Donut
          size={210}
          thickness={18}
          data={rows.map((e) => ({
            label: e.label,
            value: e.sessions,
            color: e.color,
          }))}
          center={fmtCompact(total)}
          sub={donutSub}
        />
      </div>
      <div className="sd-donut-row">
        {rows.map((e) => (
          <div className="sd-donut-item" key={e.label}>
            <EngineIcon icon={e.icon} />
            <span className="nm">{e.label}</span>
            <span className="v">{fmtNumber(e.sessions)}</span>
            <span className="p">{fmtPct((e.sessions / total) * 100)}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
