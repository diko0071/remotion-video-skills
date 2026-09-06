import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { AttachmentSlots, FlyToSlot } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";
import {
  CARD_STAGGER,
  CARDS_AT,
  COMPOSER_AT,
  CREATIVES,
  FLY_AT,
  FLY_STAGGER,
  INPUT_TOTAL,
  PAN_RIGHT,
  PROMPT,
  SEND,
  TYPE_FROM,
  TYPE_TO,
} from "./timings";

export const CREATIVES_INPUT_TOTAL = INPUT_TOTAL;

const TILE = 340;
const TILE_GAP = 26;
const ROW_X = (1920 - (TILE * 4 + TILE_GAP * 3)) / 2;
const ROW_Y = 175;
const TILT = [-2.5, 1.8, -1.2, 2.6];

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.04 },
  { at: FLY_AT - 4, target: "composer", zoom: 1.28, align: { y: 0.55 } },
  { at: PAN_RIGHT, target: "composer.send", zoom: 1.6, align: { x: 0.75 }, axis: "x" },
  { at: SEND + 6, target: "composer", zoom: 1.12 },
];

export const CreativesInput: React.FC = () => {
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
              attachment={<AttachmentSlots count={CREATIVES.length} />}
            />
          </div>
        </div>
        {CREATIVES.map((file, i) => (
          <FlyToSlot
            key={file}
            image={file}
            slotId={`chip.${i}`}
            from={{ x: ROW_X + i * (TILE + TILE_GAP), y: ROW_Y, size: TILE, tilt: TILT[i] }}
            appearAt={CARDS_AT + i * CARD_STAGGER}
            flyAt={FLY_AT + i * FLY_STAGGER}
          />
        ))}
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[{ target: "composer.send", at: SEND, travel: 34 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND }]} />
    </AbsoluteFill>
  );
};
