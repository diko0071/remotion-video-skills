import React from "react";
import { useReveal } from "../core/motion";
import { ScoreRing } from "./score-ring";

export const ScoreCard: React.FC<{
  label: string;
  value: number;
  color: string;
  at: number;
  ring?: number;
  fontSize?: number;
  ink?: string;
}> = ({ label, value, color, at, ring = 128, fontSize = 30, ink = "#171310" }) => {
  const style = useReveal(at, 14, 26);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        gap: 26,
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "22px 34px 22px 24px",
        boxShadow: "0 10px 34px rgba(74,53,29,0.12)",
        border: "1px solid rgba(23,19,16,0.06)",
      }}
    >
      <ScoreRing score={value} size={ring} appearAt={at + 4} color={color} />
      <div style={{ fontSize, fontWeight: 700, color: ink }}>{label}</div>
    </div>
  );
};
