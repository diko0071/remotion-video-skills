import React from "react";
import { Img, staticFile } from "remotion";
import "./paid-ads-dashboard.css";
import { MiniBar } from "./mini-bar";
import { StatusPill } from "./status-pill";
import { CampaignRow } from "./types";

export const CampaignsTable: React.FC<{
  rows: CampaignRow[];
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  rows,
  title = "Top campaigns",
  sub = "All platforms · 30 days · by spend",
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
          <th className="l">Account</th>
          <th className="l">Status</th>
          <th>Spend</th>
          <th>Impr.</th>
          <th>Clicks</th>
          <th>CTR</th>
          <th>CPC</th>
          <th>Conv.</th>
          <th>CPA</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.campaign}>
            <td>
              <span className="pa-chan">
                <Img src={staticFile(r.logo)} />
                <b className="pa-trunc">{r.campaign}</b>
              </span>
            </td>
            <td className="l">{r.account}</td>
            <td className="l">
              <StatusPill active={r.active} labels={["Active", "Paused"]} />
            </td>
            <td>
              <MiniBar share={r.spendShare} value={r.spend} wide />
            </td>
            <td>{r.impressions}</td>
            <td>{r.clicks}</td>
            <td>{r.ctr}</td>
            <td>{r.cpc}</td>
            <td>{r.conversions}</td>
            <td>{r.cpa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
