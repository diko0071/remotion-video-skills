import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { Pop } from "../../kit/pop";
import { Figures, type FigureShot } from "../autopilot-founder/figure";
import { Check, Labels, type LabelSpec } from "../autopilot-founder/labels";
import { WordCaption } from "../autopilot-founder/word-caption";
import { Endcard, RyzeLockup } from "../autopilot-founder/endcard";
import { FONT, GROUND, INK, W } from "../autopilot-founder/theme";

export type Overlay = { from: number; until: number; node: React.ReactNode };

export type StickSpec = {
  vo: string;
  words: { text: string; at: number }[];
  shots: FigureShot[];
  labels: LabelSpec[];
  overlays?: Overlay[];
  endcard: number;
  total: number;
};

export const StickAd: React.FC<{ spec: StickSpec }> = ({ spec }) => (
  <AbsoluteFill style={{ background: GROUND }}>
    <Sequence durationInFrames={spec.endcard} layout="none">
      <Figures shots={spec.shots} total={spec.endcard} />
      <Labels labels={spec.labels} />
      {(spec.overlays ?? []).map((o, i) => (
        <Sequence key={i} from={o.from} durationInFrames={o.until - o.from} layout="none">
          {o.node}
        </Sequence>
      ))}
      <WordCaption words={spec.words} until={spec.endcard} />
    </Sequence>
    <Sequence from={spec.endcard} durationInFrames={spec.total - spec.endcard}>
      <Endcard />
    </Sequence>
    <Sequence layout="none">
      <Audio src={staticFile(spec.vo)} />
    </Sequence>
  </AbsoluteFill>
);

export const Centered: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", left: 0, width: W, top, textAlign: "center" }}>{children}</div>
);

export const Lockup: React.FC<{ top: number; at?: number; size?: number }> = ({ top, at = 2, size = 84 }) => (
  <Centered top={top}>
    <RyzeLockup at={at} size={size} />
  </Centered>
);

export const Badge: React.FC<{ x: number; y: number; lines: [string, string]; at?: number }> = ({ x, y, lines, at = 10 }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <Pop at={at} from={0.4} rise={0}>
      <svg width={190} height={190} viewBox="0 0 190 190">
        <circle cx={95} cy={95} r={86} stroke={INK} strokeWidth={4.5} fill="none" />
        <text x={95} y={82} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK} letterSpacing={1}>
          {lines[0]}
        </text>
        <text x={95} y={118} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK} letterSpacing={1}>
          {lines[1]}
        </text>
      </svg>
    </Pop>
  </div>
);

export const LogoLine: React.FC<{ top: number; logos: string[]; text: string; at?: number; size?: number }> = ({
  top,
  logos,
  text,
  at = 0,
  size = 60,
}) => (
  <Centered top={top}>
    <Pop at={at} from={0.8} rise={10}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.3 }}>
        {logos.map((l) => (
          <Img key={l} src={staticFile(l)} style={{ width: size, height: size, display: "block", objectFit: "contain" }} />
        ))}
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: size * 0.9, color: INK, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {text}
        </span>
      </span>
    </Pop>
  </Centered>
);

export const Checks: React.FC<{ base: number; items: { at: number; y: number }[]; x?: number }> = ({ base, items, x = 690 }) => (
  <>
    {items.map((c) => (
      <Check key={c.y} at={c.at - base} x={x} y={c.y} />
    ))}
  </>
);

export const CheckRow: React.FC<{ at: number; x: number; y: number; text: string }> = ({ at, x, y, text }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <Pop at={at} from={0.85} rise={10}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 22 }}>
        <svg width={58} height={58} viewBox="0 0 92 92">
          <circle cx={46} cy={46} r={40} stroke={INK} strokeWidth={5} fill="none" />
          <path d="M28 47 L41 60 L66 33" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 46, color: INK, lineHeight: 1 }}>{text}</span>
      </span>
    </Pop>
  </div>
);
