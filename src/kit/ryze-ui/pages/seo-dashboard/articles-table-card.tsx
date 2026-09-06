import React from "react";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { ArticleRow, fmtNumber } from "./types";

export const ArticlesTableCard: React.FC<{
  title?: string;
  columns?: [string, string, string, string, string, string, string];
  rows: ArticleRow[];
  style?: React.CSSProperties;
}> = ({
  title = "Articles",
  columns = ["Article", "Published", "Clicks", "Imp", "CTR", "Pos", "Δ Clicks"],
  rows,
  style,
}) => (
  <div className="sd-card sd-stack" style={style}>
    <CardHead title={title} />
    <div className="sd-card-body tight">
      <table className="sd-table articles">
        <thead>
          <tr>
            <th>{columns[0]}</th>
            <th className="r">{columns[1]}</th>
            <th className="r">{columns[2]}</th>
            <th className="r">{columns[3]}</th>
            <th className="r">{columns[4]}</th>
            <th className="r">{columns[5]}</th>
            <th className="r">{columns[6]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.title}>
              <td>
                <span className="trunc">{row.title}</span>
              </td>
              <td className="num mut">{row.published}</td>
              <td className="num">
                {row.pending ? (
                  <span className="sd-pending">{row.clicks}</span>
                ) : (
                  row.clicks
                )}
              </td>
              <td className="num">{row.impressions}</td>
              <td className="num">{row.ctr}</td>
              <td className="num">{row.position}</td>
              <td
                className={`num ${row.delta > 0 ? "sd-good" : row.delta < 0 ? "sd-bad" : "mut"}`}
              >
                {row.delta > 0 ? "+" : ""}
                {fmtNumber(row.delta)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
