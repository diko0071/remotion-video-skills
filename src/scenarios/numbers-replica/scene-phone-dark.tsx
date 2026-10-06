import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { CamKey } from "../../core/stage";
import { ramp } from "../../core/motion";
import { KeyedRig } from "../../kit/keyed-rig";
import { Phone, PHONE_H, PHONE_SCALE, PHONE_TOP } from "./phone";
import { Composer, Conversation, DarkHeader, Keypad, KEYPAD_SHEET, Notice, ProfileBlock } from "./ui-dark";
import { PHONE_DARK as D, TYPED } from "./timings";

const phoneBottom = PHONE_TOP + PHONE_H * PHONE_SCALE;
const camY = (zoom: number, screenY: number, worldY: number) => worldY + (540 - screenY) / zoom;

export const DARK_KEYS: readonly CamKey[] = [
  { at: D.from, zoom: 1, x: 960, y: camY(1, 283, PHONE_TOP) },
  { at: D.from + 6, zoom: 1, x: 960, y: camY(1, 283, PHONE_TOP) },
  { at: D.enterPress - 4, zoom: 1, x: 960, y: camY(1, 965, phoneBottom) },
  { at: D.sheetUp[1] + 4, zoom: 0.72, x: 960, y: camY(0.72, 1000, phoneBottom) },
  { at: D.presses[7] + 4, zoom: 0.74, x: 960, y: camY(0.74, 1000, phoneBottom) },
  { at: D.scrollUp[0], zoom: 0.74, x: 960, y: camY(0.74, 1000, phoneBottom) },
  { at: D.scrollUp[1], zoom: 1.05, x: 960, y: camY(1.05, 52, PHONE_TOP) },
  { at: D.reply + 8, zoom: 1.05, x: 960, y: camY(1.05, 52, PHONE_TOP) },
  { at: D.whiteDot.at, zoom: 0.8, x: 960, y: camY(0.8, 65, PHONE_TOP) },
];

const DIGITS = TYPED.replace("-", "");

export const PhoneDarkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const press = ramp(frame, D.enterPress - 3, D.enterPress) * (1 - ramp(frame, D.enterPress + 1, D.enterPress + 5));
  const sheetIn = ramp(frame, D.sheetUp[0], D.sheetUp[1], Easing.out(Easing.cubic)) * (1 - ramp(frame, D.sheetDown[0], D.sheetDown[1], Easing.in(Easing.cubic)));
  const typed = D.presses.filter((p) => frame >= p).length;
  const last = typed > 0 ? D.presses[typed - 1] : -100;
  const flash = typed > 0 ? 1 - ramp(frame, last + 2, last + 9) : 0;
  const flashKey = typed > 0 ? DIGITS[typed - 1] : "";
  const enterReady = ramp(frame, D.presses[7] + 2, D.presses[7] + 4);
  const done = frame >= D.success;
  const system = ramp(frame, D.success, D.success + 8);
  const sent = ramp(frame, D.sent, D.sent + 6, Easing.out(Easing.cubic));
  const reply = ramp(frame, D.reply, D.reply + 6, Easing.out(Easing.cubic));
  const dotR = ramp(frame, D.whiteDot.at, D.whiteDot.at + 3) * 12 + ramp(frame, D.whiteDot.grow[0], D.whiteDot.grow[1], Easing.in(Easing.cubic)) * 1200;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <KeyedRig id="nr-dark" keys={DARK_KEYS} bg="#000">
        <Phone dark top={PHONE_TOP}>
          <DarkHeader />
          <ProfileBlock />
          {done ? <Conversation system={system} sent={sent} reply={reply} /> : null}
          <Notice press={press} opacity={done ? 0 : 1} />
          <Composer placeholder={done ? "Message Leo" : "Protected"} />
          {sheetIn > 0 ? (
            <>
              <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${0.5 * sheetIn})` }} />
              <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - sheetIn) * (KEYPAD_SHEET.h + 60)}px)` }}>
                <Keypad typed={typed} flash={flash} flashKey={flashKey} enterReady={enterReady} />
              </div>
            </>
          ) : null}
        </Phone>
      </KeyedRig>
      {frame >= D.whiteDot.at ? (
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <circle cx={960} cy={540} r={dotR} fill="#fff" />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};
