import React from "react";
import { FONT, P } from "../../../kit/product-ui";

export const Chip: React.FC<{ text: string; on: number }> = ({ text, on }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 2,
      background: P.emeraldSoft,
      color: "#047857",
      fontFamily: FONT,
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap",
      opacity: on,
      transform: `scale(${0.85 + 0.15 * on})`,
    }}
  >
    {text}
  </span>
);
