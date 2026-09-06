import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { Composer } from "../../kit/ryze-ui/composer";
import { PlusMenu } from "../../kit/ryze-ui/plus-menu";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";
import {
  COMPOSER_AT,
  INPUT_TOTAL,
  MENU_CLOSE,
  MENU_OPEN,
  PLUS_CLICK,
  PROMPT,
  SEND,
  TOGGLE_GOOGLE,
  TOGGLE_META,
  TYPE_FROM,
  TYPE_TO,
} from "./timings";

export const DECK_INPUT_TOTAL = INPUT_TOTAL;

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.04 },
  { at: PLUS_CLICK - 14, target: "composer.plus", zoom: 1.56, align: { x: 0.32, y: 0.4 } },
  { at: MENU_CLOSE + 2, target: "composer", zoom: 1.4, align: { x: 0.55, y: 0.52 } },
  { at: SEND - 22, target: "composer.send", zoom: 1.7, align: { x: 0.76 }, axis: "x" },
];

export const DeckInput: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);
  const menuTurnIn = useSpringAt(PLUS_CLICK, SPRINGS.smooth, 14);
  const menuTurnOut = useSpringAt(MENU_CLOSE, SPRINGS.smooth, 14);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <div className="chat-bare" style={{ justifyContent: "flex-end", paddingBottom: 210 }}>
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
              menu={
                <PlusMenu
                  openAt={MENU_OPEN}
                  closeAt={MENU_CLOSE}
                  rows={[
                    { label: "Google Ads", logo: "integrations/google-ads.webp", onAt: TOGGLE_GOOGLE + 2 },
                    { label: "Meta Ads", logo: "integrations/meta-ads.svg", onAt: TOGGLE_META + 2 },
                    { label: "Google Analytics", logo: "integrations/google-analytics.svg" },
                  ]}
                />
              }
            />
          </div>
        </div>
        <SceneCursor
          from={{ x: 1620, y: 1150 }}
          moves={[
            { target: "composer.plus", at: PLUS_CLICK, travel: 60 },
            { target: "connector.Google Ads", at: TOGGLE_GOOGLE, travel: 30 },
            { target: "connector.Meta Ads", at: TOGGLE_META, travel: 22 },
            { target: "composer.send", at: SEND, travel: 30 },
          ]}
        />
      </CameraRig>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: PLUS_CLICK },
          { name: "mouse-click", at: TOGGLE_GOOGLE },
          { name: "mouse-click", at: TOGGLE_META },
          { name: "mouse-click", at: SEND },
        ]}
      />
    </AbsoluteFill>
  );
};
