import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { AttachmentSlots, FlyToSlot } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";

export const PROMPT2 = "Use these as a template — prepare and send me this deck weekly.";

const PULL_AT = 10;
const PULL_STAGGER = 8;
const FLY_AT = 46;
const FLY_STAGGER = 6;
const TYPE_FROM = 92;
const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT2.length / 1.35);
const SEND = TYPE_TO + 18;
export const DECK_TEMPLATE_TOTAL = SEND + 26;

const PULLED = [
  { image: "deck-gen/slides/quarterly-review-00.png", x: 330, y: 210, tilt: -6 },
  { image: "deck-gen/slides/media-plan-00.png", x: 770, y: 160, tilt: 0 },
  { image: "deck-gen/slides/seo-audit-00.png", x: 1210, y: 216, tilt: 6 },
];

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.0 },
  { at: FLY_AT + 4, target: "composer", zoom: 1.3, align: { y: 0.55 } },
  { at: SEND - 22, target: "composer.send", zoom: 1.6, align: { x: 0.75 }, axis: "x" },
];

export const DeckTemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT2, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <div className="chat-bare" style={{ justifyContent: "flex-end", paddingBottom: 150 }}>
          <div style={{ width: 1200, maxWidth: "100%" }}>
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={press(frame, SEND)}
              revealAt={-26}
              placeholder="Message Agent…"
              flatRing
              attachment={<AttachmentSlots count={3} size={96} />}
            />
          </div>
        </div>
        {PULLED.map((t, i) => (
          <FlyToSlot
            key={t.image}
            image={t.image}
            slotId={`chip.${i}`}
            from={{ x: t.x, y: t.y, size: 380, tilt: t.tilt }}
            aspect={1280 / 720}
            appearAt={PULL_AT + i * PULL_STAGGER}
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
