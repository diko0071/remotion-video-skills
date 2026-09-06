import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Fraunces";
import { blink, press, SPRINGS, typing, useReveal, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { Composer } from "../../kit/ryze-ui/composer";
import { PlusMenu } from "../../kit/ryze-ui/plus-menu";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";
import {
  CARD_AT,
  HEAD_AT,
  MENU_CLOSE,
  MENU_OPEN,
  OPEN_TOTAL,
  PAN_RIGHT,
  PLUS_CLICK,
  PROMPT,
  PUSH_LEFT,
  SEND,
  TOGGLE,
  TYPE_FROM,
  TYPE_TO,
} from "./timings";

const { fontFamily: serif } = loadFont();

export const ASK_OPEN_TOTAL = OPEN_TOTAL;

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1 },
  { at: PUSH_LEFT, target: "composer.plus", zoom: 1.62, align: { x: 0.3, y: 0.36 } },
  { at: MENU_CLOSE, target: "composer", zoom: 1.45, align: { x: 0.55, y: 0.52 } },
  { at: PAN_RIGHT - 6, target: "composer.send", zoom: 1.8, align: { x: 0.78 }, axis: "x" },
  { at: SEND + 6, target: "composer", zoom: 1.18 },
];

export const AskOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const head = useReveal(HEAD_AT, 16, 26);
  const menuTurnIn = useSpringAt(PLUS_CLICK, SPRINGS.smooth, 14);
  const menuTurnOut = useSpringAt(MENU_CLOSE, SPRINGS.smooth, 14);
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <div className="chat-bare">
          <div style={{ width: 1200, maxWidth: "100%" }}>
            <div
              style={{
                fontFamily: serif,
                fontSize: 56,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "var(--foreground)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 34,
                paddingLeft: 46,
                ...head,
              }}
            >
              <Img src={staticFile("ryze-sun.png")} style={{ width: 44, height: 44 }} />
              Welcome back, Dmitry
            </div>
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={press(frame, SEND)}
              revealAt={CARD_AT}
              plusTurn={45 * menuTurnIn * (1 - menuTurnOut)}
              plusScale={press(frame, PLUS_CLICK)}
              flatRing
              menu={
                <PlusMenu
                  openAt={MENU_OPEN}
                  closeAt={MENU_CLOSE}
                  rows={[
                    {
                      label: "Google Ads",
                      logo: "integrations/google-ads.webp",
                      onAt: TOGGLE + 2,
                    },
                    { label: "Meta Ads", logo: "integrations/meta-ads.svg" },
                    { label: "TikTok Ads", logo: "integrations/tiktok-ads.svg" },
                  ]}
                />
              }
            />
          </div>
        </div>
        <SceneCursor
          from={{ x: 1560, y: 1140 }}
          moves={[
            { target: "composer.plus", at: PLUS_CLICK, travel: 88 },
            { target: "connector.Google Ads", at: TOGGLE, travel: 38 },
            { target: "composer.send", at: SEND, travel: 24 },
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
