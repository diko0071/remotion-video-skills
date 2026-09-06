import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, press, typing } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { Composer } from "../../kit/ryze-ui/composer";
import { RyzeApp, ShellOverrideProvider } from "../../kit/ryze-ui/app-shell";
import { ChatEmptyStage } from "../../kit/ryze-ui/pages/chat-empty";
import { ChatsPage, ChatThreadPage } from "../../kit/ryze-ui/pages";
import { SfxTrack } from "../../kit/sfx";

const RAIL_PUSH = 52;
const NEWCHAT = 108;
const EMPTY_AT = 112;
const EMPTY_PUSH = 116;
const TYPE_FROM = 150;
const PROMPT =
  "Where is ember-and-oak.com losing organic clicks? Look at the collection pages over the last 28 days and tell me what to fix first.";
const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 2.2);
const SEND = TYPE_TO + 16;
const THREAD_AT = SEND + 4;
const WIDE_AT = THREAD_AT + 118;

export const GUIDE_CAM_TOTAL = WIDE_AT + 70;

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.03 },
  { at: RAIL_PUSH, target: "nav.dashboard.New chat", zoom: 1.7, align: { x: 0.28, y: 0.45 } },
  { at: EMPTY_PUSH, target: "composer", zoom: 1.38, align: { x: 0.47, y: 0.52 } },
  { at: THREAD_AT + 2, target: "msg.user", zoom: 1.45, align: { y: 0.42 } },
  { at: THREAD_AT + 58, target: "msg.assistant", zoom: 1.32, align: { y: 0.38 } },
  { at: WIDE_AT, zoom: 1.06 },
];

const Layer: React.FC<{
  from: number;
  until?: number;
  children: React.ReactNode;
}> = ({ from, until, children }) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [from - 4, from + 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outP =
    until === undefined
      ? 1
      : interpolate(frame, [until + 2, until + 7], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(inP, outP),
        transform: `translateY(${interpolate(inP, [0, 1], [12, 0])}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const GuideCam: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < SEND && blink(frame, 22);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <ShellOverrideProvider value={{ expanded: true, nav: "Chat History" }}>
          <Layer from={0} until={EMPTY_AT}>
            <ChatsPage />
          </Layer>
        </ShellOverrideProvider>
        <ShellOverrideProvider value={{ expanded: true, nav: "New chat" }}>
          <Layer from={EMPTY_AT} until={THREAD_AT}>
            <RyzeApp workspace="ember-and-oak" page="Chat" nav="New chat" stretch>
              <ChatEmptyStage
                composer={
                  <Composer
                    typed={typed}
                    cursor={caret}
                    sendScale={press(frame, SEND)}
                    approval="Skip"
                    flatRing
                  />
                }
              />
            </RyzeApp>
          </Layer>
          <Layer from={THREAD_AT}>
            <ChatThreadPage />
          </Layer>
        </ShellOverrideProvider>
        <SceneCursor
          from={{ x: 1650, y: 1150 }}
          moves={[
            { target: "nav.dashboard.New chat", at: NEWCHAT, travel: 70 },
            { target: "composer.send", at: SEND, travel: 56 },
          ]}
        />
      </CameraRig>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: NEWCHAT },
          { name: "mouse-click", at: SEND },
        ]}
      />
    </AbsoluteFill>
  );
};
