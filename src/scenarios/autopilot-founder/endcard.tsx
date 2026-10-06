import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Pop } from "../../kit/pop";
import { BRAND_FONT_FAMILY } from "../../kit/brand-font";
import { FONT, GROUND, INK } from "./theme";

export const RyzeLockup: React.FC<{ at: number; size?: number }> = ({ at, size = 96 }) => (
  <Pop at={at} from={0.8} rise={10}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.28 }}>
      <Img src={staticFile("ryze-sun.png")} style={{ width: size * 0.78, height: size * 0.78, display: "block" }} />
      <span style={{ fontFamily: `"${BRAND_FONT_FAMILY}", ${FONT}`, fontWeight: 700, fontSize: size, letterSpacing: "-0.02em", color: INK, lineHeight: 1 }}>
        Ryze AI
      </span>
    </span>
  </Pop>
);

const Big: React.FC<{ at: number; children: string }> = ({ at, children }) => (
  <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 170, letterSpacing: "-0.03em", color: INK, lineHeight: 1 }}>
    <Pop at={at} from={0.7} rise={16}>
      {children}
    </Pop>
  </div>
);

export const Endcard: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 44 }}>
    <Big at={0}>TRY</Big>
    <RyzeLockup at={8} size={104} />
    <Big at={16}>FREE</Big>
  </AbsoluteFill>
);
