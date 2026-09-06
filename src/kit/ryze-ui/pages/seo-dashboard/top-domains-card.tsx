import React from "react";
import "./seo-dashboard.css";
import { BrandFavicon } from "./brand-favicon";
import { CardHead } from "./card-head";
import { TopDomainRow, fmtPct } from "./types";

export const TopDomainsCard: React.FC<{
  title?: string;
  hint?: string;
  columns?: [string, string, string];
  rows: TopDomainRow[];
  style?: React.CSSProperties;
}> = ({
  title = "Top Domains",
  hint = "Domains the assistants linked to while answering.",
  columns = ["Domain", "Used", "Avg. citations"],
  rows,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} hint={hint} />
    <div className="sd-card-body">
      <table className="sd-table sm">
        <thead>
          <tr>
            <th>{columns[0]}</th>
            <th className="r">{columns[1]}</th>
            <th className="r">{columns[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.domain} className={row.own ? "own" : undefined}>
              <td>
                <span className="brand">
                  <BrandFavicon domain={row.domain} initials={row.initials} />
                  {row.domain}
                </span>
              </td>
              <td className="num">{fmtPct(row.usedPct)}</td>
              <td className="num mut">{row.avg.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
