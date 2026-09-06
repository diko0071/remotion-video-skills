import React from "react";
import { Img, staticFile } from "remotion";
import "./paid-ads-dashboard.css";
import { StatusPill } from "./status-pill";
import { Creative } from "./types";

export const CreativeCard: React.FC<{
  item: Creative;
  topHook?: boolean;
  style?: React.CSSProperties;
}> = ({ item, topHook, style }) => (
  <div className="pa-cr" style={style}>
    <div className="pa-cr-img">
      <Img src={staticFile(item.image)} alt="" />
      <span className="pa-cr-status">
        <StatusPill active={item.active} labels={["Live", "Paused"]} />
      </span>
      {topHook ? <span className="pa-cr-hook">Top hook</span> : null}
    </div>
    <div className="pa-cr-body">
      <Img src={staticFile(item.platform)} alt="" />
      <span>
        <b>{item.title}</b>
        <i>{item.body}</i>
      </span>
    </div>
    <div className="pa-cr-stats">
      {[
        { v: item.spend, l: "SPEND" },
        { v: item.ctr, l: "CTR" },
        { v: item.cpc, l: "CPC" },
        { v: item.results, l: "RESULTS" },
      ].map((s) => (
        <div key={s.l}>
          <b>{s.v}</b>
          <span>{s.l}</span>
        </div>
      ))}
    </div>
  </div>
);
