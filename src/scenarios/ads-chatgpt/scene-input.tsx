import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { AttachmentSlots, FlyToSlot } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { PlusMenu } from "../../kit/ryze-ui/plus-menu";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";
import {
  AWAY_PHOTOS,
  CARD_STAGGER,
  CARDS_AT,
  COMPOSER_AT,
  FLY_AT,
  FLY_STAGGER,
  INPUT_TOTAL,
  MENU_CLOSE,
  MENU_OPEN,
  PLUS_CLICK,
  PROMPT,
  SEND,
  TOGGLE,
  TYPE_FROM,
  TYPE_TO,
} from "./timings";

export const ADS_INPUT_TOTAL = INPUT_TOTAL;

const TILE = 360;
const ARC: { x: number; y: number; tilt: number }[] = [
  { x: 388, y: 176, tilt: -7 },
  { x: 780, y: 116, tilt: 0 },
  { x: 1172, y: 176, tilt: 7 },
];

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.04 },
  { at: FLY_AT - 4, target: "composer", zoom: 1.24, align: { y: 0.55 } },
  { at: PLUS_CLICK - 14, target: "composer.plus", zoom: 1.56, align: { x: 0.32, y: 0.4 } },
  { at: MENU_CLOSE + 2, target: "composer", zoom: 1.4, align: { x: 0.55, y: 0.52 } },
  { at: SEND - 22, target: "composer.send", zoom: 1.7, align: { x: 0.76 }, axis: "x" },
];

export const AdsInput: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);
  const menuTurnIn = useSpringAt(PLUS_CLICK, SPRINGS.smooth, 14);
  const menuTurnOut = useSpringAt(MENU_CLOSE, SPRINGS.smooth, 14);

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
              plusTurn={45 * menuTurnIn * (1 - menuTurnOut)}
              plusScale={press(frame, PLUS_CLICK)}
              attachment={<AttachmentSlots count={AWAY_PHOTOS.length} />}
              menu={
                <PlusMenu
                  openAt={MENU_OPEN}
                  closeAt={MENU_CLOSE}
                  rows={[
                    { label: "ChatGPT Ads", logo: "ai/chatgpt.png", onAt: TOGGLE + 2 },
                    { label: "Google Ads", logo: "integrations/google-ads.webp" },
                    { label: "Meta Ads", logo: "integrations/meta-ads.svg" },
                  ]}
                />
              }
            />
          </div>
        </div>
        {AWAY_PHOTOS.map((file, i) => (
          <FlyToSlot
            key={file}
            image={file}
            slotId={`chip.${i}`}
            from={{ x: ARC[i].x, y: ARC[i].y, size: TILE, tilt: ARC[i].tilt }}
            appearAt={CARDS_AT + i * CARD_STAGGER}
            flyAt={FLY_AT + i * FLY_STAGGER}
          />
        ))}
        <SceneCursor
          from={{ x: 1620, y: 1150 }}
          moves={[
            { target: "composer.plus", at: PLUS_CLICK, travel: 80 },
            { target: "connector.ChatGPT Ads", at: TOGGLE, travel: 36 },
            { target: "composer.send", at: SEND, travel: 30 },
          ]}
        />
      </CameraRig>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: PLUS_CLICK },
          { name: "mouse-click", at: TOGGLE },
          { name: "mouse-click", at: SEND },
        ]}
      />
    </AbsoluteFill>
  );
};
