import React from "react";
import "./brand.css";

export const BrandSwatch: React.FC<{
  hex: string;
  role: string;
  style?: React.CSSProperties;
}> = ({ hex, role, style }) => (
  <div className="br-swatch" style={style}>
    <div className="chip" style={{ background: hex }} />
    <div className="meta">
      <div className="hex">{hex}</div>
      <div className="role">{role}</div>
    </div>
  </div>
);
