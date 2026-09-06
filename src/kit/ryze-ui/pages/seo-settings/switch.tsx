import React from "react";
import "../../pages.css";

export const SettingsSwitch: React.FC<{
  on?: boolean;
  style?: React.CSSProperties;
}> = ({ on, style }) => (
  <span className={`switch${on ? " on" : ""}`} style={style}>
    <i />
  </span>
);
