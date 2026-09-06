import React from "react";
import "./paid-ads-dashboard.css";

export const MiniBar: React.FC<{
  share: number;
  value: string;
  wide?: boolean;
  style?: React.CSSProperties;
}> = ({ share, value, wide, style }) => (
  <span className="pa-bar" style={style}>
    <span className="pa-bar-track" style={{ width: wide ? 52 : 64 }}>
      <u style={{ width: `${Math.min(share, 1) * 100}%` }} />
    </span>
    {value}
  </span>
);
