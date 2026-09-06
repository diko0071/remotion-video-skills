import React from "react";
import "./article-preview.css";
import { PREVIEW_META_FIELDS } from "./data";
import type { MetaField } from "./types";

export const ArticleMetaCard: React.FC<{
  fields?: MetaField[];
  status?: string;
  style?: React.CSSProperties;
}> = ({ fields = PREVIEW_META_FIELDS, status, style }) => (
  <aside className="ap-meta" style={style}>
    {fields
      .map((f) =>
        status && f.label === "Status" ? { ...f, value: status } : f,
      )
      .map((f) => (
      <div key={f.label}>
        <span className="ap-meta-label">{f.label}</span>
        <div className={`ap-meta-value${f.multiline ? " relaxed" : ""}`}>{f.value}</div>
      </div>
      ))}
  </aside>
);
