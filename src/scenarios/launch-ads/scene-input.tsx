import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";
import { COMPOSER_AT, INPUT_TOTAL, PROMPT, SEND, TYPE_FROM, TYPE_TO } from "./timings";

export const LAUNCH_INPUT_TOTAL = INPUT_TOTAL;

const SHOTS: CameraShot[] = [
  { at: 0, target: "composer", zoom: 1.3, align: { y: 0.5 } },
  { at: SEND - 22, target: "composer.send", zoom: 1.6, align: { x: 0.74 }, axis: "x" },
];

export const LaunchInput: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <div className="chat-bare">
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
          from={{ x: 1620, y: 1130 }}
          moves={[{ target: "composer.send", at: SEND, travel: 30 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND }]} />
    </AbsoluteFill>
  );
};
