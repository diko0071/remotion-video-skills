import React from "react";
import "./seo-dashboard.css";
import { BrandFavicon } from "./brand-favicon";
import { Brand, fmtPct } from "./types";

export const GeoHero: React.FC<{
  label?: string;
  value: string;
  rank: string;
  rankSub: string;
  brandsLabel?: string;
  brands: Brand[];
  max: number;
  style?: React.CSSProperties;
}> = ({
  label = "AI Share of Voice",
  value,
  rank,
  rankSub,
  brandsLabel = "Brands named in answers",
  brands,
  max,
  style,
}) => (
  <div className="sd-hero" style={style}>
    <div className="sd-hero-left">
      <span className="sd-hero-label">{label}</span>
      <div className="sd-hero-row">
        <span className="sd-hero-big">{value}</span>
        <div className="sd-hero-rank">
          <b>{rank}</b>
          <span>{rankSub}</span>
        </div>
      </div>
    </div>
    <div className="sd-hero-right">
      <span className="sd-hero-label">{brandsLabel}</span>
      {brands.map((brand, i) => (
        <div
          className={`sd-hero-brand${brand.own ? " own" : ""}`}
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
          <span className="pct">{fmtPct(brand.pct)}</span>
        </div>
      ))}
    </div>
  </div>
);
