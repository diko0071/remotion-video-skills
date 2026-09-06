import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { measureText } from "@remotion/layout-utils";
import { SPRINGS, useSpringAt } from "../core/motion";
import { BRAND_FONT_FAMILY } from "./brand-font";

export type LockupProps = {
  mark: string;
  word: string;
  tagline?: string;
  partner?: { word: string; mark?: string; showWord?: boolean };
  partnerNode?: React.ReactNode;
  background?: string;
  ink?: string;
  fallbackFont?: string;
  markSize?: number;
  wordSize?: number;
};

export const Lockup: React.FC<LockupProps> = ({
  mark,
  word,
  tagline,
  partner,
  partnerNode,
  background = "#ffffff",
  ink = "#171310",
  fallbackFont = "inherit",
  markSize = 62,
  wordSize = 108,
}) => {
  const frame = useCurrentFrame();
  const markIn = useSpringAt(0, SPRINGS.smooth, 20);
  const spin = interpolate(frame, [0, 46], [-360, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const wordIn = interpolate(frame, [16, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const partnerIn = useSpringAt(46, SPRINGS.smooth, 24);
  const taglineIn = useSpringAt(58, SPRINGS.smooth, 26);
  const fontFamily = `"${BRAND_FONT_FAMILY}", ${fallbackFont}`;
  const wordWidth = measureText({
    text: word,
    fontFamily,
    fontSize: wordSize,
    fontWeight: "700",
    letterSpacing: "-0.02em",
  }).width;
  const recentre = ((wordWidth + 14) / 2) * (1 - wordIn);

  return (
    <AbsoluteFill
      style={{
        background,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 26,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 34,
          transform: `translateX(${recentre}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Img
            src={staticFile(mark)}
            style={{
              width: markSize,
              height: markSize,
              display: "block",
              opacity: Math.min(1, markIn * 1.5),
              transform: `rotate(${spin}deg) scale(${interpolate(markIn, [0, 1], [0.6, 1])})`,
            }}
          />
          <div
            style={{ overflow: "hidden", marginLeft: 14, width: `${wordIn * 100}%`, maxWidth: 1400 }}
          >
            <div
              style={{
                fontFamily,
                fontSize: wordSize,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: ink,
                whiteSpace: "nowrap",
                opacity: wordIn > 0.01 ? 1 : 0,
              }}
            >
              {word}
            </div>
          </div>
        </div>
        {partnerNode ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              opacity: partnerIn,
              transform: `translateX(${interpolate(partnerIn, [0, 1], [16, 0])}px)`,
            }}
          >
            <span style={{ fontSize: 44, color: `color-mix(in oklab, ${ink} 45%, transparent)` }}>
              ×
            </span>
            {partnerNode}
          </div>
        ) : null}
        {partner ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              opacity: partnerIn,
              transform: `translateX(${interpolate(partnerIn, [0, 1], [16, 0])}px)`,
            }}
          >
            <span style={{ fontSize: 44, color: `color-mix(in oklab, ${ink} 45%, transparent)` }}>
              ×
            </span>
            {partner.mark ? (
              <Img
                src={staticFile(partner.mark)}
                style={{ height: markSize * 0.7, width: "auto", display: "block" }}
              />
            ) : null}
            {!partner.mark || partner.showWord ? (
              <span style={{ fontSize: 68, fontWeight: 600, letterSpacing: "-0.03em", color: ink }}>
                {partner.word}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      {tagline ? (
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: `color-mix(in oklab, ${ink} 70%, transparent)`,
            opacity: taglineIn,
            transform: `translateY(${interpolate(taglineIn, [0, 1], [10, 0])}px)`,
          }}
        >
          {tagline}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
