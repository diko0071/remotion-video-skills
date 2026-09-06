import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { BRAND_FONT_FAMILY } from "../kit/brand-font";
import { UnderlineAccent } from "../kit/underline-accent";

const { fontFamily } = loadFont();

const CREAM = "#F2F0EB";
const INK = "#171310";

export type GuideThumbProps = {
  title: string;
  accent?: string;
};

export const GuideThumb: React.FC<GuideThumbProps> = ({ title, accent }) => {
  const [before, after] = accent ? title.split(accent) : [title, ""];
  return (
    <AbsoluteFill
      style={{
        background: CREAM,
        fontFamily,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "0 160px",
          fontSize: 96,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: INK,
        }}
      >
        {before}
        {accent ? (
          <UnderlineAccent color="var(--brand)" drawAt={-40}>
            {accent}
          </UnderlineAccent>
        ) : null}
        {after}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 96,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <Img src={staticFile("ryze-sun.png")} style={{ width: 36, height: 36 }} />
        <span
          style={{
            fontFamily: `"${BRAND_FONT_FAMILY}", ${fontFamily}`,
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          Ryze AI
        </span>
      </div>
    </AbsoluteFill>
  );
};
