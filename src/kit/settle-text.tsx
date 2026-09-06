import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { HighlightWord, SparkBurst } from "./kinetic-text";

export type SettlePart =
  | { word: string; at: number; dim?: boolean; hl?: boolean; sparks?: boolean }
  | { group: { word: string; at: number }[]; sparks?: boolean }
  | { image: string; at: number; size?: number; radius?: number; background?: string; id?: string }
  | { br: true };

const PLATE_DELAY = 14;

const SETTLE_SPAN = 15;

const settle = (frame: number, at: number) => {
  const p = interpolate(frame, [at, at + SETTLE_SPAN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return 1 - Math.pow(1 - p, 3);
};

const SettleWord: React.FC<{ at: number; dim?: boolean; children: React.ReactNode }> = ({
  at,
  dim,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = settle(frame, at);
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        opacity: p * (dim ? 0.42 : 1),
        transform: `translateY(${(1 - p) * 0.38}em) scale(${0.93 + 0.07 * p})`,
        transformOrigin: "center bottom",
        filter: p < 0.98 ? `blur(${(1 - p) * 5}px)` : undefined,
      }}
    >
      {children}
    </span>
  );
};

const SettleIcon: React.FC<{
  image: string;
  at: number;
  size: number;
  radius: number;
  background?: string;
  id?: string;
}> = ({ image, at, size, radius, background, id }) => {
  const frame = useCurrentFrame();
  const gap = settle(frame, at);
  const pop = useSpringAt(at + 4, SPRINGS.pop, 18);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: gap * (size + 30),
        height: size,
        verticalAlign: "-0.12em",
        overflow: "visible",
      }}
    >
      <span
        data-click={id}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          flex: "none",
          background: background ?? "#FFFFFF",
          borderRadius: radius,
          overflow: "hidden",
          transform: `scale(${pop})`,
          opacity: Math.min(1, pop * 1.6),
        }}
      >
        <Img
          src={staticFile(image)}
          style={{ width: "78%", height: "78%", objectFit: "contain", display: "block" }}
        />
      </span>
    </span>
  );
};

export const SettleLine: React.FC<{
  parts: SettlePart[];
  size?: number;
  ink?: string;
  hlInk?: string;
  fontFamily?: string;
  weight?: number;
  maxWidth?: number;
  lineHeight?: number;
}> = ({
  parts,
  size = 92,
  ink = "#171310",
  hlInk,
  fontFamily = "'Plus Jakarta Sans'",
  weight = 800,
  maxWidth = 1620,
  lineHeight = 1.4,
}) => {
  const plateInk = hlInk ?? ink;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          maxWidth,
          textAlign: "center",
          fontSize: size,
          fontFamily,
          fontWeight: weight,
          letterSpacing: "-0.03em",
          lineHeight,
          color: ink,
        }}
      >
        {parts.map((part, i) => {
          const space = i < parts.length - 1 && !("br" in (parts[i + 1] ?? {})) ? " " : "";
          if ("br" in part) return <br key={i} />;
          if ("image" in part)
            return (
              <SettleIcon
                key={i}
                id={part.id}
                image={part.image}
                at={part.at}
                size={part.size ?? Math.round(size * 0.92)}
                radius={part.radius ?? Math.round(size * 0.2)}
                background={part.background}
              />
            );
          if ("group" in part) {
            const last = part.group[part.group.length - 1];
            return (
              <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
                <HighlightWord at={last.at + PLATE_DELAY} ink={plateInk} baseInk={ink}>
                  {part.group.map((w, j) => (
                    <SettleWord key={j} at={w.at}>
                      {w.word}
                      {j < part.group.length - 1 ? " " : ""}
                    </SettleWord>
                  ))}
                  {part.sparks ? <SparkBurst at={last.at + PLATE_DELAY + 6} /> : null}
                </HighlightWord>
                {space}
              </span>
            );
          }
          if (part.hl)
            return (
              <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
                <HighlightWord at={part.at + PLATE_DELAY} ink={plateInk} baseInk={ink}>
                  <SettleWord at={part.at}>{part.word}</SettleWord>
                  {part.sparks ? <SparkBurst at={part.at + PLATE_DELAY + 6} /> : null}
                </HighlightWord>
                {space}
              </span>
            );
          return (
            <SettleWord key={i} at={part.at} dim={part.dim}>
              {part.word}
              {space}
            </SettleWord>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export type SettleBeat = {
  at: number;
  parts: SettlePart[];
  size?: number;
};

export const SettleBeats: React.FC<{
  beats: SettleBeat[];
  total: number;
  ink?: string;
  hlInk?: string;
  background?: string;
  fontFamily?: string;
  weight?: number;
}> = ({ beats, total, ink, hlInk, background, fontFamily, weight }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: background ?? "var(--background)" }}>
      {beats.map((beat, i) => {
        const end = i < beats.length - 1 ? beats[i + 1].at : total;
        const fadeOut = interpolate(frame, [end - 8, end - 1], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <Sequence key={i} from={beat.at} durationInFrames={end - beat.at}>
            <div style={{ position: "absolute", inset: 0, opacity: i < beats.length - 1 ? fadeOut : 1 }}>
              <SettleLine
                parts={beat.parts.map((p) => {
                  if ("group" in p)
                    return { ...p, group: p.group.map((w) => ({ ...w, at: w.at - beat.at })) };
                  return "at" in p ? { ...p, at: p.at - beat.at } : p;
                })}
                size={beat.size}
                ink={ink}
                hlInk={hlInk}
                fontFamily={fontFamily}
                weight={weight}
              />
            </div>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
