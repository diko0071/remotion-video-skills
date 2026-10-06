import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../core/motion";
import { SceneCursor, STAGE_ATTR } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import { streamWords, WordStream } from "../../kit/chat/word-stream";
import { MuseBubble, MuseComposer, MuseDay, MuseFloat, MuseFrame, MuseThread, MuseTopbar, MuseTyping } from "../../kit/muse-ui";
import { BEATS, BUBBLE_AT, GROUND, ID, IDLE_AT, PROMPT, RUN_AT, SEND, TOTAL, TYPE_FROM, TYPE_TO, type Status } from "./timings";

export const MUSE_TIMELAPSE_TOTAL = TOTAL;

const STREAM_RATE = 1.7;

const statusAt = (frame: number): Status | undefined => {
  if (frame >= IDLE_AT) return undefined;
  let s: Status | undefined;
  for (const b of BEATS) if (b.kind === "status" && frame >= b.at) s = b.status;
  return s;
};

const messageEnd = (at: number, text: string, rate: number) => at + 8 + Math.ceil(streamWords(text).length * rate) + 4;

const dotsAt = (frame: number) => {
  if (frame < RUN_AT || frame >= IDLE_AT) return false;
  for (const b of BEATS) {
    if (b.kind !== "message") continue;
    if (frame >= b.at && frame < messageEnd(b.at, b.text, b.rate ?? STREAM_RATE)) return false;
  }
  const lastMsg = [...BEATS].reverse().find((b) => b.kind === "message" && frame >= b.at);
  if (lastMsg && lastMsg.kind === "message" && frame >= messageEnd(lastMsg.at, lastMsg.text, lastMsg.rate ?? STREAM_RATE)) {
    const nextStatus = BEATS.find((b) => b.kind === "status" && b.at > lastMsg.at);
    if (!nextStatus || frame < nextStatus.at) return false;
  }
  return true;
};

const Stream: React.FC<{ at: number; text: string; rate?: number }> = ({ at, text, rate = STREAM_RATE }) => {
  const frame = useCurrentFrame();
  const grow = useSpringAt(at, SPRINGS.card, 14);
  const words = React.useMemo(() => streamWords(text), [text]);
  const shown = Math.max(0, Math.min(words.length, Math.ceil((frame - (at + 8)) / rate) + 1));
  if (frame < at) return null;
  return (
    <div style={{ alignSelf: "flex-start", opacity: grow, transform: `scale(${0.85 + 0.15 * grow})`, transformOrigin: "left bottom", maxWidth: "100%" }}>
      <MuseBubble style={{ minWidth: 52, minHeight: 52 }}>
        <WordStream words={words.slice(0, shown)} from={at + 8} rate={rate} />
      </MuseBubble>
    </div>
  );
};

export const MuseTimelapse: React.FC = () => {
  const frame = useCurrentFrame();
  const bubble = useSpringAt(BUBBLE_AT, SPRINGS.card, 22);
  const typed = frame < SEND ? typing(frame, PROMPT, TYPE_FROM, TYPE_TO) : "";
  const st = statusAt(frame);
  const working = frame >= RUN_AT && frame < IDLE_AT;
  const dots = dotsAt(frame);
  return (
    <AbsoluteFill style={{ background: GROUND }} {...{ [STAGE_ATTR]: "" }}>
      <MuseFrame>
        <MuseTopbar />
        <MuseFloat mood={working ? "working" : "idle"} status={st?.text} statusIcon={st ? <span style={{ fontSize: 13 }}>{st.icon}</span> : undefined} />
        <MuseThread anchored>
          <MuseBubble>Good morning. What can I take off your plate?</MuseBubble>
          <div style={{ opacity: bubble, visibility: frame >= BUBBLE_AT ? "visible" : "hidden" }}>
            <MuseDay text="6:34 PM" />
          </div>
          <div style={{ alignSelf: "flex-end", opacity: bubble, transform: `translateY(${(1 - bubble) * 30}px)`, visibility: frame >= BUBBLE_AT ? "visible" : "hidden" }}>
            <MuseBubble user>{PROMPT}</MuseBubble>
          </div>
          {BEATS.filter((b) => b.kind === "message").map((b) =>
            b.kind === "message" ? <Stream key={b.at} at={b.at} text={b.text} rate={b.rate} /> : null,
          )}
          {dots ? <MuseTyping frame={frame} /> : null}
        </MuseThread>
        <MuseComposer typed={typed} caret={frame >= TYPE_FROM && frame < SEND} sending={working} />
      </MuseFrame>
      <Sequence from={TYPE_TO - 10} durationInFrames={SEND + 20 - (TYPE_TO - 10)} layout="none">
        <SceneCursor from={{ x: 1300, y: 900 }} wander={0} moves={[{ target: ID.send, at: SEND - (TYPE_TO - 10), travel: 16 }]} />
      </Sequence>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND }]} />
    </AbsoluteFill>
  );
};
