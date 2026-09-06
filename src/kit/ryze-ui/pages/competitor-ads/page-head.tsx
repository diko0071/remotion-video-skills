import React from "react";
import { useClickPress } from "../../../../core/press-context";
import { PlusIcon } from "../../icons";
import "./competitor-ads.css";
import { COMPETITOR_ADS_SUB, COMPETITOR_ADS_TITLE } from "./data";
import { RefreshGlyph } from "./icons";

export const CompetitorAdsHead: React.FC<{
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}> = ({ title = COMPETITOR_ADS_TITLE, sub = COMPETITOR_ADS_SUB, style }) => {
  const trackScale = useClickPress("comp.track");
  const resyncScale = useClickPress("comp.resync");
  return (
    <div className="pg-head" style={style}>
      <div>
        <h1 className="pg-h1">{title}</h1>
        <p className="pg-sub">{sub}</p>
      </div>
      <div className="pg-actions">
        <span
          className="btn-outline"
          data-click="comp.resync"
          style={{ scale: String(resyncScale) }}
        >
          <RefreshGlyph />
          Re-sync
        </span>
        <span
          className="btn-primary"
          data-click="comp.track"
          style={{ scale: String(trackScale) }}
        >
          <PlusIcon />
          Add competitor
        </span>
      </div>
    </div>
  );
};
