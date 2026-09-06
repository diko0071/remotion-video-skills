import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { Composer } from "../../kit/ryze-ui/composer";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { SfxTrack } from "../../kit/sfx";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import "../../kit/chat/chat.css";

export const TRACK_PROMPT = "Track wisprflow.ai";

const COMPOSER_AT = -18;
const TYPE_FROM = 14;
const TYPE_TO = TYPE_FROM + Math.ceil(TRACK_PROMPT.length / 0.7);
const SEND = TYPE_TO + 26;
export const TRACK_INPUT_TOTAL = SEND + 16;

const INPUT_SHOTS: CameraShot[] = [
  { at: 0, target: "composer", zoom: 1.3, align: { y: 0.55 } },
  { at: SEND - 20, target: "composer.send", zoom: 1.62, align: { x: 0.72 }, axis: "x" },
];

export const TrackInput: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, TRACK_PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={INPUT_SHOTS}>
        <div className="chat-bare" style={{ justifyContent: "flex-end", paddingBottom: 210 }}>
          <div style={{ width: 1200, maxWidth: "100%" }}>
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={press(frame, SEND)}
              revealAt={COMPOSER_AT}
              placeholder="Message Agent…"
              flatRing
            />
          </div>
        </div>
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[{ target: "composer.send", at: SEND, travel: 34 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND }]} />
    </AbsoluteFill>
  );
};

const ANSWER =
  "Tracked. I'm pulling their live **Google and Meta ads** now — you'll see every ad they run.";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 44 });
export const TRACK_CHAT_TOTAL = MARKS.total;

const TrackedCard: React.FC = () => (
  <WidgetCard title="Now tracking" subtitle="New ads sync automatically">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "6px 2px 2px",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <Img
        src={staticFile("appicons/wisprflow.ai.png")}
        style={{ width: 44, height: 44, borderRadius: 10 }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 21, fontWeight: 800, color: "#171310" }}>wisprflow.ai</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(23,19,16,0.55)" }}>
          Google · Meta · syncing ads
        </span>
      </div>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 14,
          fontWeight: 800,
          color: "#0F6B4F",
          background: "#DEF3EA",
          borderRadius: 7,
          padding: "5px 12px",
        }}
      >
        Tracking ✓
      </span>
    </div>
  </WidgetCard>
);

export const TrackChat: React.FC = () => (
  <ChatScene prompt={TRACK_PROMPT} answer={ANSWER} marks={MARKS} result={<TrackedCard />} />
);
