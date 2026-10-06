import React from "react";
import { INK } from "./theme";

export const Padlock: React.FC<{ size: number; color?: string; hole?: string }> = ({ size, color = INK, hole = "#FFFFFF" }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 100 115" style={{ display: "block", overflow: "visible" }}>
    <path d="M29 54 V35 a21 21 0 0 1 42 0 V54" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" />
    <rect x={13} y={50} width={74} height={60} rx={14} fill={color} />
    <circle cx={50} cy={75} r={8.5} fill={hole} />
    <rect x={46} y={77} width={8} height={17} rx={4} fill={hole} />
  </svg>
);

export const Check: React.FC<{ size: number; color: string; bg?: string }> = ({ size, color, bg }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
    {bg ? <circle cx={50} cy={50} r={50} fill={bg} /> : null}
    <path d="M27 52 L44 68 L74 35" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
