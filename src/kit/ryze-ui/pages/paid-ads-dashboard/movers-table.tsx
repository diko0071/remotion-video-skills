import React from "react";
import { Img, staticFile } from "remotion";
import "./paid-ads-dashboard.css";
import { DeltaCell } from "./delta";
import { Mover } from "./types";

export const MoversTable: React.FC<{
  rows: Mover[];
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  rows,
  title = "Top movers",
  sub = "Biggest changes · 30d vs prior 30d",
  style,
}) => (
  <div className="pa-card" style={style}>
    <div className="pa-card-head">
      <div>
        <div className="pa-card-title">{title}</div>
        <div className="pa-card-sub">{sub}</div>
      </div>
    </div>
    <table className="pa-table">
      <thead>
        <tr>
          <th>Campaign</th>
          <th>Spend</th>
          <th>Δ Spend</th>
          <th>Conv</th>
          <th>Δ CPA</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((m) => (
          <tr key={m.campaign}>
            <td>
              <span className="pa-chan">
                <Img src={staticFile(m.logo)} />
                <b className="pa-trunc">{m.campaign}</b>
              </span>
            </td>
            <td>{m.spend}</td>
            <td>
              {m.isNew ? (
                <span className="pa-dtext">New</span>
              ) : (
                <DeltaCell value={m.dSpend} />
              )}
            </td>
            <td>{m.conversions}</td>
            <td>
              <DeltaCell value={m.dCpa} goodWhenDown />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
