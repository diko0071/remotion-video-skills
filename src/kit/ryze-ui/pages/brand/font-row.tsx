import React from "react";
import "./brand.css";

export const BrandFontRow: React.FC<{ family: string; role: string }> = ({
  family,
  role,
}) => (
  <div className="br-font-row">
    <span className="br-font-name">{family}</span>
    <span className="br-font-role">{role}</span>
  </div>
);
