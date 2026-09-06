import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { AttachmentSlots, FlyToSlot } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { CreativeGridResult } from "../../kit/chat/results/creatives";
import "../../kit/chat/chat.css";

export const COPY_PROMPT = "Make this ad for my brand.";
const WINNER = "apps/wispr-flow_top-s1-23d.jpg";

const CARD_AT = -8;
const COMPOSER_AT = -24;
const FLY_AT = 46;
const TYPE_FROM = 62;
const TYPE_TO = TYPE_FROM + Math.ceil(COPY_PROMPT.length / 1.2);
const SEND = TYPE_TO + 26;
export const COPY_INPUT_TOTAL = SEND + 16;

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.06 },
  { at: FLY_AT - 4, target: "composer", zoom: 1.26, align: { y: 0.55 } },
  { at: SEND - 20, target: "composer.send", zoom: 1.58, align: { x: 0.72 }, axis: "x" },
];

export const CopyInput: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, COPY_PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);
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
              attachment={<AttachmentSlots count={1} />}
            />
          </div>
        </div>
        <FlyToSlot
          image={WINNER}
          slotId="chip.0"
          from={{ x: 760, y: 130, size: 400, tilt: -1.5 }}
          appearAt={CARD_AT}
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

const ANSWER =
  "Done — their hook, **your product**. Three versions in your brand style, ready to launch.";
const BASE = chatSceneMarks(ANSWER, { resultHold: 58 });
const MARKS = { ...BASE, scrollOutAt: 1e6, total: BASE.scrollOutAt };
export const COPY_CHAT_TOTAL = MARKS.total;

const ITEMS = [
  { name: "Night score", caption: "Hero · midnight", file: "dusk/dusk-sq-1.png" },
  { name: "Deep sleep", caption: "Data · hypnogram", file: "dusk/dusk-sq-3.png" },
  { name: "First 14 nights", caption: "Offer · CTA", file: "dusk/dusk-sq-4.png" },
];

export const CopyChat: React.FC = () => (
  <ChatScene
    prompt={COPY_PROMPT}
    answer={ANSWER}
    marks={MARKS}
    attachments={[WINNER]}
    result={
      <CreativeGridResult
        title="Your versions — same winning angle"
        subtitle="Generated from a 412-day competitor winner"
        items={ITEMS}
      />
    }
  />
);
