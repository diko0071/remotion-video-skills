import React from "react";
import { Img, staticFile } from "remotion";
import "./approvals.css";
import { CHANNEL_BG, CHANNEL_LOGO } from "./data";
import { LayersIcon } from "./icons";

export const Channel: React.FC<{
  channel: string;
  style?: React.CSSProperties;
}> = ({ channel, style }) => {
  const src = CHANNEL_LOGO[channel];
  if (!src) {
    return (
      <span className="appr-chan-generic" style={style}>
        <LayersIcon />
      </span>
    );
  }
  return (
    <span
      className="appr-chan"
      style={{ background: CHANNEL_BG[channel] ?? "#ffffff", ...style }}
    >
      <Img src={staticFile(src)} />
    </span>
  );
};
