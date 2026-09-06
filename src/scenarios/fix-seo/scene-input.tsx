import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { AttachmentSlots, FlyToSlot } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";
import { COMPOSER_AT, FLY_AT, INPUT_TOTAL, PROMPT, SEND, SITE_CARD_AT, TYPE_FROM, TYPE_TO } from "./timings";

export const FIX_SEO_INPUT_TOTAL = INPUT_TOTAL;

const SITE_SIZE = 520;
const SITE_X = (1920 - SITE_SIZE) / 2;
const SITE_Y = 96;

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.04 },
  { at: FLY_AT - 4, target: "composer", zoom: 1.28, align: { y: 0.55 } },
  { at: SEND - 26, target: "composer.send", zoom: 1.6, align: { x: 0.75 }, axis: "x" },
];

export const FixSeoInput: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <div
          className="chat-bare"
          style={{ justifyContent: "flex-end", paddingBottom: 210 }}
        >
          <div style={{ width: 1200, maxWidth: "100%" }}>
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={press(frame, SEND)}
              revealAt={COMPOSER_AT}
              placeholder="Message Agent…"
              flatRing
              attachment={<AttachmentSlots count={1} />}
            />
          </div>
        </div>
        <FlyToSlot
          image="dusk/site/before.png"
          slotId="chip.0"
          from={{ x: SITE_X, y: SITE_Y, size: SITE_SIZE, tilt: -1.6 }}
          aspect={1.6}
          appearAt={SITE_CARD_AT}
          flyAt={FLY_AT}
        />
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[{ target: "composer.send", at: SEND, travel: 34 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND }]} />
    </AbsoluteFill>
  );
};
