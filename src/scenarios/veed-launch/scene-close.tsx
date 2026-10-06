import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { INTER } from "./font";
import { CLOSE, DARK, GREEN, INK } from "./timings";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #2a2a2a 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

type Line = { text: string; color: string; weight?: number; italic?: boolean; accent?: string; accentColor?: string; accentWeight?: number; accentItalic?: boolean; offsetX?: number };

const Wordmark: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <span style={{ fontFamily: INTER, fontWeight: 900, fontSize: size, color, letterSpacing: "0.02em", display: "inline-block", transform: "scaleX(1.25)" }}>VEED</span>
);

const LineText: React.FC<{ line: Line; size: number }> = ({ line, size }) => (
  <span style={{ fontFamily: INTER, fontSize: size, fontWeight: line.weight ?? 400, fontStyle: line.italic ? "italic" : "normal", color: line.color, letterSpacing: "-0.01em", whiteSpace: "pre" }}>
    {line.text === "VEED" ? <Wordmark size={size * 0.62} color={line.color} /> : line.text}
    {line.accent && (
      <span style={{ color: line.accentColor, fontWeight: line.accentWeight ?? 400, fontStyle: line.accentItalic ? "italic" : "normal" }}>{line.accent}</span>
    )}
  </span>
);

const Kinetic: React.FC<{ frame: number }> = ({ frame }) => {
  const beat = [...CLOSE.beats].reverse().find((b) => frame >= b.at);
  if (!beat) return null;
  const top = "top" in beat ? beat.top : undefined;
  const low = "low" in beat ? beat.low : undefined;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {top && (
        <div style={{ lineHeight: 1.05, transform: low ? "translateX(-40px)" : "none" }}>
          <LineText line={top as Line} size={112} />
        </div>
      )}
      {low && (
        <div style={{ lineHeight: 1.05, transform: `translateX(${(low as Line).offsetX ?? (top ? 60 : 0)}px)` }}>
          <LineText line={low as Line} size={112} />
        </div>
      )}
    </div>
  );
};

const Endcard: React.FC<{ frame: number }> = ({ frame }) => {
  const E = CLOSE.endcard;
  const glitch = frame < E.glitchUntil;
  const tag = ramp(frame, E.taglineAt, E.taglineAt + 8);
  const cells = Math.floor(ramp(frame, E.at, E.glitchUntil) * 60);
  return (
    <AbsoluteFill style={{ background: GREEN }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontFamily: INTER, fontWeight: 900, fontSize: 250, color: INK, letterSpacing: "0.02em", transform: "scaleX(1.25)", opacity: glitch ? 0.35 + (cells / 60) * 0.65 : 1, filter: glitch ? `blur(${(1 - cells / 60) * 6}px)` : "none" }}>
        VEED
      </div>
      {glitch && (
        <div style={{ position: "absolute", left: 640, top: 400, width: 640, height: 200, display: "grid", gridTemplateColumns: "repeat(20, 32px)", opacity: 1 - cells / 60 }}>
          {Array.from({ length: 60 }, (_, i) => (
            <div key={i} style={{ width: 22, height: 22, background: (i * 7) % 3 === 0 ? INK : "transparent" }} />
          ))}
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 632, textAlign: "center", fontFamily: INTER, fontSize: 56, color: INK, letterSpacing: "-0.02em", opacity: tag }}>
        Finally, AI video creation for social
      </div>
    </AbsoluteFill>
  );
};

export const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= CLOSE.endcard.at) return <Endcard frame={frame} />;
  const big = frame < CLOSE.veedBig[1];
  return (
    <AbsoluteFill style={{ background: DARK, ...DOT_GRID }}>
      {big ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Wordmark size={frame < CLOSE.veedBig[0] + 6 ? 330 : 240} color="#fff" />
        </div>
      ) : (
        <Kinetic frame={frame} />
      )}
    </AbsoluteFill>
  );
};
