import React from "react";
import { Img, staticFile } from "remotion";
import "./paid-ads-dashboard.css";
import { AccountRow } from "./types";

export const AccountsTable: React.FC<{
  rows: AccountRow[];
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  rows,
  title = "All accounts",
  sub = "Latest snapshot per ad account · 30 days",
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
          <th>Account</th>
          <th>Spend 30d</th>
          <th>Impr.</th>
          <th>Clicks</th>
          <th>Conv</th>
          <th>CPA</th>
          <th>ROAS</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => (
          <tr key={a.account}>
            <td>
              <span className="pa-chan">
                <Img src={staticFile(a.logo)} />
                <b>{a.account}</b>
              </span>
            </td>
            <td>{a.spend}</td>
            <td>{a.impressionsLabel}</td>
            <td>{a.clicksLabel}</td>
            <td>{a.conversions}</td>
            <td>{a.cpa}</td>
            <td>{a.roas}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
