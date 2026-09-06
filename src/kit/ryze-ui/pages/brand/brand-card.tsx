import React from "react";
import { useClickPress } from "../../../../core/press-context";
import "./brand.css";
import { PencilGlyph } from "./icons";

export const BrandCard: React.FC<{
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  editId?: string;
}> = ({ title, children, style, editId }) => {
  const scale = useClickPress(editId);
  return (
  <div className="pg-card br-card" style={style}>
    <div className="br-card-head">
      <h3>{title}</h3>
      <span
        className="br-pencil"
        {...(editId ? { "data-click": editId } : {})}
        style={{ scale: String(scale) }}
      >
        <PencilGlyph />
      </span>
    </div>
    <div className="br-card-body">{children}</div>
  </div>
  );
};
