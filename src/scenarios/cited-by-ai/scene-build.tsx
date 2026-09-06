import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { blink, press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, useObjectRects, type CameraShot } from "../../core/stage";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import "../../kit/chat/chat.css";

const INTRO_BEATS: KineticBeat[] = [
  {
    at: 0,
    size: 104,
    words: [
      { t: "So", at: 4 },
      { t: "we", at: 11 },
      { t: "built", at: 17 },
      { t: "an", at: 26 },
      { t: "AI", at: 32, hl: true },
      { t: "to", at: 47 },
      { t: "make", at: 50 },
      { t: "sure", at: 56 },
      { t: "you", at: 68 },
      { t: "get", at: 78 },
      { t: "cited.", at: 84, hl: true, sparks: true },
    ],
  },
];

const GlobeIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#171310" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.5 3.9 5.5 3.9 9S14.6 18.5 12 21c-2.6-2.5-3.9-5.5-3.9-9S9.4 5.5 12 3z" />
  </svg>
);

const DocIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#171310" strokeWidth="1.8">
    <path d="M6 2.8h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.8a1 1 0 0 1 1-1z" />
    <path d="M14 2.8v4.4h4M8.5 12h7M8.5 15.5h7M8.5 8.6h2.6" />
  </svg>
);

const LinkIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#171310" strokeWidth="1.8">
    <path d="M9.5 14.5 14.5 9.5M8 12l-2.3 2.3a3.8 3.8 0 0 0 5.4 5.4L13.4 17M16 12l2.3-2.3a3.8 3.8 0 0 0-5.4-5.4L10.6 7" />
  </svg>
);

export const PILLS = [
  { label: "your website", detail: "dusk.app", Icon: GlobeIcon },
  { label: "your content", detail: "48 articles, 12 pages", Icon: DocIcon },
  { label: "backlinks", detail: "31 referring domains", Icon: LinkIcon },
];
const PILL_AT = [128, 161, 197];
const INTRO_OUT = 120;
export const COMPOSER_AT = 232;
const FLY_AT = [252, 259, 266];
export const BUILD_SEND = 300;
export const BUILD_TOTAL = 330;

const PILL_W = 420;
const PILL_H = 110;
const ROW_Y = 400;
const PILL_TILT = [-2, 1.4, -1.6];

const pillFrom = (i: number) => ({
  x: 960 + (i - 1) * (PILL_W + 52) - PILL_W / 2,
  y: ROW_Y,
});

const Pill: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const rects = useObjectRects([`chip.${index}`]);
  const pop = useSpringAt(PILL_AT[index], SPRINGS.pop, 22);
  const fly = useSpringAt(FLY_AT[index], SPRINGS.card, 30);
  const from = pillFrom(index);
  const slot = rects[`chip.${index}`];
  const to = slot ?? { x: from.x, y: from.y, width: PILL_W, height: PILL_H };
  const x = interpolate(fly, [0, 1], [from.x, to.x]);
  const y = interpolate(fly, [0, 1], [from.y, to.y]);
  const w = interpolate(fly, [0, 1], [PILL_W, to.width]);
  const h = interpolate(fly, [0, 1], [PILL_H, to.height]);
  const { label, detail, Icon } = PILLS[index];
  const iconBox = interpolate(fly, [0, 1], [64, 46]);
  if (frame < PILL_AT[index]) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        background: "#FFFFFF",
        border: "1px solid rgba(23,19,16,0.07)",
        borderRadius: interpolate(fly, [0, 1], [20, 12]),
        boxShadow: "0 20px 50px rgba(74,53,29,0.20)",
        display: "flex",
        alignItems: "center",
        gap: interpolate(fly, [0, 1], [20, 12]),
        padding: `0 ${interpolate(fly, [0, 1], [26, 12])}px`,
        fontFamily: "'Plus Jakarta Sans'",
        color: "#171310",
        opacity: pop,
        transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])}) rotate(${interpolate(
          fly,
          [0, 1],
          [PILL_TILT[index] * (2 - pop), 0],
        )}deg)`,
        zIndex: 6,
      }}
    >
      <span
        style={{
          width: iconBox,
          height: iconBox,
          borderRadius: interpolate(fly, [0, 1], [16, 10]),
          background: "#F6EEDF",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transform: `scale(${interpolate(fly, [0, 1], [1, 0.7])})`,
        }}
      >
        <Icon />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <span
          style={{
            fontSize: interpolate(fly, [0, 1], [30, 21]),
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: interpolate(fly, [0, 1], [20, 14]),
            fontWeight: 600,
            color: "rgba(23,19,16,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          {detail}
        </span>
      </span>
    </div>
  );
};

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.02 },
  { at: COMPOSER_AT + 6, target: "composer", zoom: 1.18, align: { y: 0.55 } },
];

const PROMPT = "Get my brand cited by AI.";
const TYPE_FROM = COMPOSER_AT + 26;
const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.35);

export const BuildScene: React.FC = () => {
  const frame = useCurrentFrame();
  const introOut = useSpringAt(INTRO_OUT, SPRINGS.smooth, 18);
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame < BUILD_SEND && blink(frame, 22);
  const composerIn = useSpringAt(COMPOSER_AT - 10, SPRINGS.smooth, 16);
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS} drift={0}>
        <div style={{ position: "absolute", inset: 0, opacity: 1 - introOut }}>
          <Sequence durationInFrames={INTRO_OUT + 20}>
            <KineticBeats beats={INTRO_BEATS} total={INTRO_OUT + 20} sfx={false} />
          </Sequence>
        </div>
        <div
          className="chat-bare"
          style={{ justifyContent: "flex-end", paddingBottom: 190, background: "transparent" }}
        >
          <div
            style={{
              width: 1200,
              maxWidth: "100%",
              opacity: composerIn,
              transform: `translateY(${interpolate(composerIn, [0, 1], [70, 0])}px)`,
            }}
          >
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={press(frame, BUILD_SEND)}
              revealAt={COMPOSER_AT}
              placeholder="Message Agent…"
              flatRing
              attachment={
                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  {PILLS.map((_, i) => (
                    <div
                      key={i}
                      data-click={`chip.${i}`}
                      style={{ width: 280, height: 76, borderRadius: 12 }}
                    />
                  ))}
                </div>
              }
            />
          </div>
        </div>
        {PILLS.map((_, i) => (
          <Pill key={i} index={i} />
        ))}
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[{ target: "composer.send", at: BUILD_SEND, travel: 34 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: BUILD_SEND }]} />
    </AbsoluteFill>
  );
};
