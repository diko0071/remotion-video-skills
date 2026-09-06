import React from "react";

export const StatStrip: React.FC<{
  className: string;
  itemClassName: string;
  items: { label: string; value: string }[];
  style?: React.CSSProperties;
}> = ({ className, itemClassName, items, style }) => (
  <div className={className} style={style}>
    {items.map((k) => (
      <div key={k.label} className={itemClassName}>
        <div className="k-label">{k.label}</div>
        <div className="k-val">{k.value}</div>
      </div>
    ))}
  </div>
);
