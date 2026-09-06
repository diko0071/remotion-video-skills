import React from "react";
import { Img, staticFile } from "remotion";
import "./seo-dashboard.css";
import { CardHead } from "./card-head";
import { HeadMetric } from "./head-metric";
import { CountryRow, fmtNumber, fmtPct } from "./types";

export const ClicksByCountryCard: React.FC<{
  title?: string;
  metricLabel?: string;
  map: string;
  countries: CountryRow[];
  total: number;
  style?: React.CSSProperties;
}> = ({
  title = "Clicks by Country",
  metricLabel = "Total clicks",
  map,
  countries,
  total,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead
      title={title}
      right={<HeadMetric label={metricLabel} value={fmtNumber(total)} />}
    />
    <div className="sd-card-body">
      <Img className="sd-map" src={staticFile(map)} />
      <div>
        {countries.map((row) => (
          <div className="sd-country" key={row.name}>
            <div className="sd-country-top">
              <span className="n">{row.name}</span>
              <span className="v">
                <b>{fmtNumber(row.clicks)}</b> ·{" "}
                {fmtPct((row.clicks / total) * 100)}
              </span>
            </div>
            <span className="sd-track">
              <u
                style={{
                  width: `${(row.clicks / countries[0].clicks) * 100}%`,
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
