import React from "react";
import { AbsoluteFill, Img, interpolate, interpolateColors, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export const InlineTile: React.FC<{
  src: string;
  at: number;
  tilt?: number;
  size?: number;
  imgHeight?: number;
  cover?: boolean;
  margin?: number;
}> = ({ src, at, tilt = -4, size = 108, imgHeight = 64, cover = false, margin = 26 }) => {
  const p = useSpringAt(at, SPRINGS.pop, 22);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        background: "#FFFFFF",
        borderRadius: Math.round(size * 0.22),
        boxShadow: "0 10px 30px rgba(74,53,29,0.16)",
        border: "1px solid rgba(23,19,16,0.06)",
        verticalAlign: "middle",
        margin: `0 ${margin}px`,
        overflow: "hidden",
        transform: `scale(${interpolate(p, [0, 1], [0.3, 1])}) rotate(${interpolate(p, [0, 1], [tilt * 3, tilt])}deg)`,
        opacity: p,
      }}
    >
      <Img
        src={staticFile(src)}
        style={
          cover
            ? { width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }
            : { height: imgHeight, width: "auto", display: "block" }
        }
      />
    </span>
  );
};

export type KineticPart =
  | { word: string; accent?: boolean; highlight?: boolean; sparks?: boolean }
  | { group: { word: string; at: number }[]; sparks?: boolean }
  | { br: true }
  | { emoji: string; size?: number }
  | { image: string; size?: number; tilt?: number; cover?: boolean; imgHeight?: number };

const SPARK_ANGLES = [-150, -110, -70, -30, 10];

export const SparkBurst: React.FC<{ at: number; color?: string }> = ({
  at,
  color = "#C19767",
}) => {
  const p = useSpringAt(at, SPRINGS.pop, 26);
  return (
    <span style={{ position: "absolute", left: "100%", top: "6%", width: 0, height: 0 }}>
      {SPARK_ANGLES.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const dist = interpolate(p, [0, 1], [10, 86 + i * 9]);
        return (
          <svg
            key={deg}
            width={26}
            height={26}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: Math.cos(rad) * dist - 13,
              top: Math.sin(rad) * dist - 13,
              opacity: interpolate(p, [0, 0.25, 0.8, 1], [0, 1, 1, 0]),
              transform: `scale(${interpolate(p, [0, 1], [0.4, 1])}) rotate(${deg + p * 90}deg)`,
            }}
          >
            <path
              d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
              fill={color}
            />
          </svg>
        );
      })}
    </span>
  );
};

export const HighlightWord: React.FC<{
  at: number;
  color?: string;
  ink?: string;
  baseInk?: string;
  children: React.ReactNode;
}> = ({ at, color = "#EFD3A4", ink = "#171310", baseInk, children }) => {
  const draw = useSpringAt(at, SPRINGS.card, 22);
  const textColor = interpolateColors(draw, [0.5, 0.85], [baseInk ?? ink, ink]);
  return (
    <span
      style={{ position: "relative", display: "inline-block", whiteSpace: "pre", color: textColor }}
    >
      <span
        style={{
          position: "absolute",
          left: "-0.12em",
          right: "-0.12em",
          top: "0.06em",
          bottom: "-0.02em",
          background: color,
          borderRadius: 10,
          transform: `scaleX(${draw}) rotate(-0.8deg)`,
          transformOrigin: "left center",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
};

const PopWord: React.FC<{ at: number; color: string; children: React.ReactNode }> = ({
  at,
  color,
  children,
}) => {
  const p = useSpringAt(at, SPRINGS.card, 20);
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        color,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px) scale(${interpolate(p, [0, 1], [0.86, 1])})`,
      }}
    >
      {children}
    </span>
  );
};

export const kineticMarks = (count: number, at: number, span: number): number[] =>
  Array.from({ length: count }, (_, i) => at + Math.round((span * i) / Math.max(count - 1, 1)));

export const KineticLine: React.FC<{
  parts: KineticPart[];
  at: number;
  span: number;
  marks?: number[];
  size?: number;
  ink?: string;
  accent?: string;
  hlInk?: string;
  maxWidth?: number;
}> = ({ parts, at, span, marks: marksProp, size = 80, ink = "#171310", accent = "#C19767", hlInk, maxWidth = 1560 }) => {
  const plateInk = hlInk ?? ink;
  const marks = marksProp ?? kineticMarks(parts.length, at, span);
  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans'" }}
    >
      <div
        style={{
          maxWidth,
          textAlign: "center",
          fontSize: size,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.4,
          color: ink,
        }}
      >
        {parts.map((part, i) =>
          "br" in part ? (
            <br key={i} />
          ) : "group" in part ? (
            <PopWord key={i} at={marks[i]} color={ink}>
              <HighlightWord at={marks[i] + 4} ink={plateInk} baseInk={ink}>
                {part.group.map((w, j) => (
                  <PopWord key={j} at={w.at} color="inherit">
                    {w.word}
                    {j < part.group.length - 1 ? " " : ""}
                  </PopWord>
                ))}
                {part.sparks ? (
                  <SparkBurst at={part.group[part.group.length - 1].at + 8} />
                ) : null}
              </HighlightWord>
              {i < parts.length - 1 ? " " : ""}
            </PopWord>
          ) : "word" in part ? (
            part.highlight ? (
              <PopWord key={i} at={marks[i]} color={ink}>
                <HighlightWord at={marks[i] + 4} ink={plateInk} baseInk={ink}>
                  {part.word}
                  {part.sparks ? <SparkBurst at={marks[i] + 8} /> : null}
                </HighlightWord>
                {i < parts.length - 1 ? " " : ""}
              </PopWord>
            ) : (
              <PopWord key={i} at={marks[i]} color={part.accent ? accent : ink}>
                {part.word}
                {i < parts.length - 1 ? " " : ""}
              </PopWord>
            )
          ) : "emoji" in part ? (
            <PopWord key={i} at={marks[i]} color={ink}>
              <span style={{ fontSize: part.size ?? "1.05em", verticalAlign: "-0.06em" }}>
                {part.emoji}
              </span>
              {i < parts.length - 1 ? " " : ""}
            </PopWord>
          ) : (
            <InlineTile
              key={i}
              src={part.image}
              at={marks[i]}
              tilt={part.tilt}
              size={part.size}
              cover={part.cover}
              imgHeight={part.imgHeight}
            />
          ),
        )}
      </div>
    </AbsoluteFill>
  );
};
