import React from "react";
import "./seo-dashboard.css";
import { BrandFavicon } from "./brand-favicon";
import { CardHead } from "./card-head";
import { EngineIcon } from "./engine-icon";
import { EngineSpec, MatrixRow } from "./types";

export const VisibilityMatrixCard: React.FC<{
  title?: string;
  hint?: string;
  brandColumn?: string;
  engines: EngineSpec[];
  rows: MatrixRow[];
  style?: React.CSSProperties;
}> = ({
  title = "Visibility by Assistant",
  hint = "How often each brand is named, per assistant.",
  brandColumn = "Brand",
  engines,
  rows,
  style,
}) => (
  <div className="sd-card sd-stack" style={style}>
    <CardHead title={title} hint={hint} />
    <div className="sd-card-body">
      <table className="sd-table">
        <thead>
          <tr>
            <th>{brandColumn}</th>
            {engines.map((e) => (
              <th key={e.key} className="c">
                <span className="sd-th-eng">
                  <EngineIcon icon={e.icon} />
                  {e.label}
                </span>
              </th>
            ))}
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
              {row.values.map((pct, i) => (
                <td key={engines[i].key} className="c">
                  {pct === null ? (
                    <div className="sd-heat mut">—</div>
                  ) : (
                    <div
                      className="sd-heat"
                      style={{
                        backgroundColor: `color-mix(in srgb, #334155 ${Math.round(pct * 0.45)}%, transparent)`,
                      }}
                    >
                      {pct}%
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
