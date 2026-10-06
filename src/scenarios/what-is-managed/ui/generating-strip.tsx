import React from "react";
import { FONT, P, Spinner } from "../../../kit/product-ui";

export const GeneratingStrip: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
      borderRadius: P.radius,
      border: `1px solid ${P.stripBorder}`,
      background: P.stripBg,
      color: P.stripFg,
      fontFamily: FONT,
      fontSize: 14,
    }}
  >
    <Spinner size={16} color={P.slate} />
    {label}
  </div>
);
