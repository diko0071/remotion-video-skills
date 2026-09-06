import React from "react";
import "./slack.css";
import { SlackIcon } from "./icons";

const PdfIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} style={{ display: "block", flexShrink: 0 }}>
    <path
      d="M6 4a2 2 0 0 1 2-2h11l7 7v19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"
      fill="#E5252A"
    />
    <path d="M19 2l7 7h-6a1 1 0 0 1-1-1z" fill="#FF8A8E" />
    <text
      x="16"
      y="23.5"
      textAnchor="middle"
      fontFamily="Lato, sans-serif"
      fontSize="8.5"
      fontWeight="900"
      fill="#fff"
    >
      PDF
    </text>
  </svg>
);

export const SlackFileCard: React.FC<{
  name: string;
  meta?: string;
  style?: React.CSSProperties;
}> = ({ name, meta = "PDF", style }) => (
  <div style={style}>
    <div className="sk-file-meta">
      {meta}
      <SlackIcon name="caret-down" size={13} />
    </div>
    <div className="sk-file-card">
      <PdfIcon />
      <div>
        <div className="fname">{name}</div>
        <div className="fmeta">{meta}</div>
      </div>
    </div>
  </div>
);
