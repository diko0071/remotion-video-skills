import React from "react";
import "./seo-dashboard.css";
import { BrandFavicon } from "./brand-favicon";
import { CardHead } from "./card-head";
import { Brand, fmtPct } from "./types";

export const RankingsCard: React.FC<{
  title?: string;
  hint?: string;
  columns?: string[];
  brands: Brand[];
  max: number;
  answers: number;
  style?: React.CSSProperties;
}> = ({
  title = "Rankings",
  hint = "Every brand the assistants named across all tracked prompts.",
  columns = ["Visibility", "SoV", "Answers"],
  brands,
  max,
  answers,
  style,
}) => (
  <div className="sd-card" style={style}>
    <CardHead title={title} hint={hint} />
    <div className="sd-card-body">
      <div className="sd-rankhead">
        <span className="sp" />
        {columns.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </div>
      {brands.map((brand, i) => (
        <div
          className={`sd-rankrow${brand.own ? " own" : ""}`}
          key={brand.domain}
        >
          <span className="idx">{i + 1}</span>
          <span className="nm">
            <BrandFavicon domain={brand.domain} initials={brand.initials} />
            <span>{brand.domain}</span>
          </span>
          <span className="bar">
            <u style={{ width: `${(brand.pct / max) * 100}%` }} />
          </span>
          <span className="num">{fmtPct(brand.pct)}</span>
          <span className="num mut">{fmtPct(brand.sovPct)}</span>
          <span className="num mut">
            {brand.answers}/{answers}
          </span>
        </div>
      ))}
    </div>
  </div>
);
