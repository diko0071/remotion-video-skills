import React from "react";
import { packColumns } from "../../masonry-columns";
import "./competitor-ads.css";
import { CompetitorAdCard } from "./ad-card";
import { COMPETITOR_COLUMN_COUNT, competitorAdAspect } from "./data";
import { AdCard } from "./types";

export const CompetitorAdsColumn: React.FC<{
  ads: AdCard[];
  showTrack?: boolean;
  style?: React.CSSProperties;
}> = ({ ads, showTrack, style }) => (
  <div className="cmp-col" style={style}>
    {ads.map((ad) => (
      <CompetitorAdCard ad={ad} showTrack={showTrack} key={ad.id} />
    ))}
  </div>
);

export const CompetitorAdsMasonry: React.FC<{
  ads: AdCard[];
  columnCount?: number;
  showTrack?: boolean;
  style?: React.CSSProperties;
}> = ({ ads, columnCount = COMPETITOR_COLUMN_COUNT, showTrack, style }) => (
  <div
    className="cmp-masonry"
    style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)`, ...style }}
  >
    {packColumns(ads, columnCount, competitorAdAspect).map((column, i) => (
      <CompetitorAdsColumn
        ads={column}
        showTrack={showTrack}
        key={column[0]?.id ?? i}
      />
    ))}
  </div>
);
