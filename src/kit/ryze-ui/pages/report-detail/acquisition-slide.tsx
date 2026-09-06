import React from "react";
import "./report-detail.css";
import { LinkGlyph } from "./icons";
import { Bullet, Slide } from "./slide";
import { ReportChannel } from "./types";

export const AcquisitionSlide: React.FC<{
  channels: ReportChannel[];
  order?: number;
  label?: string;
  tableTitle?: string;
  linkLabel?: string;
  linkUrl?: string;
  linkBullets?: string[];
  style?: React.CSSProperties;
}> = ({
  channels,
  order = 3,
  label = "Acquisition & traffic",
  tableTitle = "Channel mix, last 30 days",
  linkLabel = "Gift sets collection",
  linkUrl = "(https://ember-and-oak.com/collections/gift-sets)",
  linkBullets = [
    "31% of revenue on 18% of sessions — the highest-margin collection in the store.",
    "Entrances up 42% month over month, all from non-branded queries.",
  ],
  style,
}) => (
  <Slide order={order} label={label} style={style}>
    <div>
      <div className="rd-chart-title">{tableTitle}</div>
      <table className="rd-table">
        <thead>
          <tr>
            <th>Channel</th>
            <th className="right">Sessions</th>
            <th className="right">Revenue</th>
            <th className="right">Conv. rate</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((c) => (
            <tr key={c.channel}>
              <td>
                <span className="strong">{c.channel}</span>
                <span className="cell-sub">{c.sub}</span>
              </td>
              <td className="right num">{c.sessions}</td>
              <td className="right num">{c.revenue}</td>
              <td className="right num">{c.conv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="rd-linkcard">
      <span className="rd-link">
        <LinkGlyph />
        <span className="label">{linkLabel}</span>
        <span className="url">{linkUrl}</span>
      </span>
      <ul className="rd-bullets">
        {linkBullets.map((line) => (
          <Bullet key={line}>{line}</Bullet>
        ))}
      </ul>
    </div>
  </Slide>
);
