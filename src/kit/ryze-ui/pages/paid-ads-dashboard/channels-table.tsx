import React from "react";
import { Img, staticFile } from "remotion";
import "./paid-ads-dashboard.css";
import { MiniBar } from "./mini-bar";
import { Channel } from "./types";

export const ChannelsTable: React.FC<{
  rows: Channel[];
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({
  rows,
  title = "Channels",
  sub = "Spend and results by platform · 30 days",
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
          <th>Channel</th>
          <th>Ad spend</th>
          <th>ROAS</th>
          <th>Conv. rate</th>
          <th>Conversions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((ch) => (
          <tr key={ch.name}>
            <td>
              <span className="pa-chan">
                <Img src={staticFile(ch.logo)} />
                <b>{ch.name}</b>
              </span>
            </td>
            <td>
              <MiniBar share={ch.spendShare} value={ch.spend} />
            </td>
            <td>
              <MiniBar share={ch.roasShare} value={ch.roas} />
            </td>
            <td>
              <MiniBar share={ch.convRateShare} value={ch.convRate} />
            </td>
            <td>
              <MiniBar share={ch.conversionsShare} value={ch.conversions} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
