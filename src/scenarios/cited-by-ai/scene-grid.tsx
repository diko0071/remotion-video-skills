import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { HighlightWord } from "../../kit/kinetic-text";
import { SfxTrack } from "../../kit/sfx";
import { ChatgptPane, ClaudePane, GeminiPane, PerplexityPane, type PaneProps } from "./ai-panes";
import {
  ANSWERS,
  ASK_TOTAL,
  CLAUDE_AT,
  GEMINI_AT,
  GRID_TOTAL,
  PERPLEXITY_AT,
  QUESTION,
  SOMEONE_AT,
} from "./timings";

const PANES: React.FC<PaneProps>[] = [ChatgptPane, ClaudePane, PerplexityPane, GeminiPane];
const PANE_BG = ["#FFFFFF", "#FAF9F5", "#191A1A", "#FFFFFF"];

export const SEND_AT = ASK_TOTAL - 12;
const TYPE_FROM = 10;
const TYPE_TO = SEND_AT - 6;
const STREAM_STARTS = [SEND_AT + 8, CLAUDE_AT + 4, PERPLEXITY_AT + 4, GEMINI_AT + 4];

const StreamWord: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <span style={{ opacity }}>{children}</span>;
};

const RATE = 3;

const StreamText: React.FC<{ text: string; from: number }> = ({ text, from }) => (
  <>
    {text.split(" ").map((w, i) => (
      <StreamWord key={i} at={from + i * RATE}>
        {w}{" "}
      </StreamWord>
    ))}
  </>
);

const Answer: React.FC<{ pane: number }> = ({ pane }) => {
  const { intro, bullets, outro } = ANSWERS[pane];
  const from = STREAM_STARTS[pane];
  const introLen = intro.split(" ").length;
  let cursor = from + introLen * RATE + 6;
  const bulletMarks = bullets.map((b) => {
    const start = cursor;
    cursor += (b.desc.split(" ").length + 2) * RATE + 4;
    return start;
  });
  const outroFrom = cursor + 4;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <StreamText text={intro} from={from} />
      </div>
      {bullets.map((b, i) => (
        <div key={b.name} style={{ paddingLeft: 34 }}>
          <StreamWord at={bulletMarks[i]}>
            {"\u2022"}{" "}
            <HighlightWord at={SOMEONE_AT + pane * 3 + i * 2} ink="inherit">
              <strong>{b.name}</strong>
            </HighlightWord>
            {" — "}
          </StreamWord>
          <StreamText text={b.desc} from={bulletMarks[i] + 2 * RATE} />
        </div>
      ))}
      <div>
        <StreamText text={outro} from={outroFrom} />
      </div>
    </div>
  );
};

const usePaneRects = () => {
  const sx = useSpringAt(CLAUDE_AT, SPRINGS.panel, 28);
  const sy = useSpringAt(PERPLEXITY_AT, SPRINGS.panel, 28);
  const sb = useSpringAt(GEMINI_AT, SPRINGS.panel, 28);
  const topSplit = interpolate(sx, [0, 1], [1, 0.5]);
  const ySplit = interpolate(sy, [0, 1], [1, 0.5]);
  const bottomSplit = interpolate(sb, [0, 1], [1, 0.5]);
  const W = 1920;
  const H = 1080;
  return [
    { x: 0, y: 0, w: W * topSplit, h: H * ySplit },
    { x: W * topSplit, y: 0, w: W * (1 - topSplit), h: H * ySplit },
    { x: 0, y: H * ySplit, w: W * bottomSplit, h: H * (1 - ySplit) },
    { x: W * bottomSplit, y: H * ySplit, w: W * (1 - bottomSplit), h: H * (1 - ySplit) },
  ];
};

const PaneSlot: React.FC<{ index: number; rect: { x: number; y: number; w: number; h: number } }> = ({
  index,
  rect,
}) => {
  const frame = useCurrentFrame();
  const Pane = PANES[index];
  const first = index === 0;
  const typed = first ? typing(frame, QUESTION, TYPE_FROM, TYPE_TO) : "";
  const caret = first && frame < SEND_AT;
  const asked = first ? frame >= SEND_AT + 6 : true;
  if (rect.w < 2 || rect.h < 2) return null;
  const scale = rect.w / 1920;
  const contentH = 1080 * scale;
  return (
    <div
      data-click={`pane.${index}`}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        overflow: "hidden",
        background: PANE_BG[index],
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          marginTop: (rect.h - contentH) / 2,
        }}
      >
        <Pane
          typed={asked ? "" : typed}
          caret={caret}
          question={asked ? QUESTION : undefined}
          answer={asked ? <Answer pane={index} /> : undefined}
          sendScale={first ? press(frame, SEND_AT) : 1}
        />
      </div>
    </div>
  );
};

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.02 },
  { at: TYPE_FROM - 4, target: "pane.0", zoom: 1.5, nudge: { y: 90 } },
  { at: SEND_AT + 8, zoom: 1.0 },
];

export const GridScene: React.FC = () => {
  const rects = usePaneRects();
  return (
    <AbsoluteFill style={{ background: "#E8E4DC" }}>
      <CameraRig shots={SHOTS} drift={0}>
        {[0, 1, 2, 3].map((i) => (
          <PaneSlot key={i} index={i} rect={rects[i]} />
        ))}
        <SceneCursor
          from={{ x: 1560, y: 1030 }}
          moves={[{ target: "gpt.send", at: SEND_AT, travel: 30 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND_AT }]} />
    </AbsoluteFill>
  );
};

export const GRID_SCENE_TOTAL = GRID_TOTAL;
