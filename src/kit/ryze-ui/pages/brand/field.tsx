import React from "react";
import "./brand.css";

export const BrandField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="br-field">
    <div className="br-field-label">{label}</div>
    <div className="br-field-val">{value}</div>
  </div>
);
