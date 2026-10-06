import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CardScene } from "./scene-card";
import { DotsScene } from "./scene-dots";
import { EndScene } from "./scene-end";
import { PhoneDarkScene } from "./scene-phone-dark";
import { PhoneLightScene } from "./scene-phone-light";
import { TitleScene } from "./scene-title";
import { CARD, DOTS, END, LIGHT, PHONE_DARK, PHONE_LIGHT, TITLE, TOTAL } from "./timings";

export const NUMBERS_REPLICA_TOTAL = TOTAL;

const Span: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => (
  <Sequence from={from} durationInFrames={to - from}>
    <Sequence from={-from} layout="none">
      {children}
    </Sequence>
  </Sequence>
);

export const NumbersReplica: React.FC = () => (
  <AbsoluteFill style={{ background: LIGHT }}>
    <Span from={0} to={TITLE.end}>
      <TitleScene />
    </Span>
    <Span from={DOTS.from} to={CARD.from + 6}>
      <DotsScene />
    </Span>
    <Span from={CARD.from + 6} to={CARD.end}>
      <CardScene />
    </Span>
    <Span from={PHONE_LIGHT.from} to={PHONE_LIGHT.end}>
      <PhoneLightScene />
    </Span>
    <Span from={PHONE_DARK.from} to={PHONE_DARK.end}>
      <PhoneDarkScene />
    </Span>
    <Span from={END.from} to={TOTAL}>
      <EndScene />
    </Span>
  </AbsoluteFill>
);
