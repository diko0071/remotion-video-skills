import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT, P } from "../product-ui/tokens";
import { SettleLine } from "../settle-text";

const EARLY = 16;
const early = (f: number) => Math.max(-2, f - EARLY);

export type TitleWord = { word: string; at: number };

export const QuestionTitle: React.FC<{ lead: readonly TitleWord[]; accent: readonly TitleWord[] }> = ({ lead, accent }) => (
  <AbsoluteFill style={{ background: P.bg }}>
    <SettleLine
      size={140}
      weight={800}
      ink={P.fg}
      fontFamily={FONT}
      lineHeight={1.25}
      parts={[...lead.map((w) => ({ word: w.word, at: early(w.at) })), { br: true }, { group: accent.map((w) => ({ word: w.word, at: early(w.at) })) }]}
    />
  </AbsoluteFill>
);
