import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../core/motion";
import { SceneCursor } from "../../core/stage";
import { MuseBubble, MuseComposer, MuseDay, MuseFloat, MuseFrame, MuseThread, MuseTopbar, MuseTyping } from "../../kit/muse-ui";
import { BUBBLE_AT, ID, PROMPT, SEND, STAGE_FULL, STAGE_IN, THINK_AT, TYPE_FROM, TYPE_TO } from "./timings";

const Bob: React.FC<{ from: number; children: React.ReactNode }> = ({ from, children }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - from);
  const on = interpolate(t, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ transform: `rotate(${Math.sin(t / 9) * 4 * on}deg) translateY(${Math.sin(t / 6) * 2 * on}px)`, transformOrigin: "50% 80%" }}>
      {children}
    </div>
  );
};

export const AskLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const bubble = useSpringAt(BUBBLE_AT, SPRINGS.card, 22);
  const dots = useSpringAt(THINK_AT, SPRINGS.pop, 20);
  const dissolve = interpolate(frame, [STAGE_IN, STAGE_FULL], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typed = frame < SEND ? typing(frame, PROMPT, TYPE_FROM, TYPE_TO) : "";
  if (frame >= STAGE_FULL) return null;
  return (
    <AbsoluteFill style={{ opacity: 1 - dissolve, filter: dissolve > 0.02 ? `blur(${dissolve * 12}px)` : undefined }}>
      <MuseFrame>
        <MuseTopbar />
        <div style={{ opacity: frame >= STAGE_IN ? 0 : 1 }}>
          <Bob from={THINK_AT}>
            <MuseFloat id={ID.float} status={frame >= THINK_AT ? "is thinking" : undefined} statusIcon={<span style={{ fontSize: 13 }}>{"\u{1F4AD}"}</span>} />
          </Bob>
        </div>
        <MuseThread anchored>
          <MuseDay text="Today" />
          <MuseBubble>Good morning. What can I take off your plate?</MuseBubble>
          <div style={{ alignSelf: "flex-end", opacity: bubble, transform: `translateY(${(1 - bubble) * 30}px)`, visibility: frame >= BUBBLE_AT ? "visible" : "hidden" }}>
            <MuseBubble user>{PROMPT}</MuseBubble>
          </div>
          <div style={{ opacity: dots, transform: `scale(${0.6 + 0.4 * dots})`, transformOrigin: "left center", visibility: frame >= THINK_AT ? "visible" : "hidden" }}>
            <MuseTyping frame={frame} />
          </div>
        </MuseThread>
        <MuseComposer typed={typed} caret={frame >= TYPE_FROM && frame < SEND} />
      </MuseFrame>
      <Sequence from={TYPE_TO - 10} durationInFrames={STAGE_IN - (TYPE_TO - 10)} layout="none">
        <SceneCursor from={{ x: 1500, y: 900 }} wander={0} moves={[{ target: ID.send, at: SEND - (TYPE_TO - 10), travel: 18 }]} />
      </Sequence>
    </AbsoluteFill>
  );
};
