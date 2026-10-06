import React from "react";
import { FONT, P } from "./tokens";

export const PrimaryButton: React.FC<{ label: string; press: number }> = ({ label, press }) => (
  <div
    style={{
      height: 36,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 2.4,
      background: P.primary,
      color: "#fafafa",
      fontFamily: FONT,
      fontSize: 14,
      fontWeight: 500,
      transform: `scale(${press})`,
    }}
  >
    {label}
  </div>
);
