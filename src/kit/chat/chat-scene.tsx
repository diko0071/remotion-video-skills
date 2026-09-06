import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { CameraRig, type CameraShot } from "../../core/stage";
import { AssistantMessage, UserMessage } from "../ryze-ui/message";
import { Spark } from "../spark";
import { streamWords, WordStream } from "./word-stream";
import "./chat.css";

export type ChatSceneMarks = {
  bubbleAt: number;
  sparkAt: number;
  streamFrom: number;
  streamTo: number;
  resultAt: number;
  scrollOutAt: number;
  total: number;
};

export const chatSceneMarks = (
  answer: string,
  opts: { wordRate?: number; resultHold?: number } = {},
): ChatSceneMarks => {
  const wordRate = opts.wordRate ?? 3.6;
  const streamFrom = 48;
  const streamTo = streamFrom + Math.round(streamWords(answer).length * wordRate);
  const resultAt = streamTo + 14;
  const scrollOutAt = resultAt + (opts.resultHold ?? 105);
  return {
    bubbleAt: 4,
    sparkAt: 16,
    streamFrom,
    streamTo,
    resultAt,
    scrollOutAt,
    total: scrollOutAt + 14,
  };
};

export const continuationMarks = (
  answer: string,
  opts: { wordRate?: number; resultHold?: number } = {},
): ChatSceneMarks => {
  const wordRate = opts.wordRate ?? 3.6;
  const streamFrom = 4;
  const streamTo = streamFrom + Math.round(streamWords(answer).length * wordRate);
  const resultAt = streamFrom + 10;
  const scrollOutAt = Math.max(streamTo, resultAt) + (opts.resultHold ?? 400);
  return { bubbleAt: 0, sparkAt: 2, streamFrom, streamTo, resultAt, scrollOutAt, total: scrollOutAt + 14 };
};

export const ChatScene: React.FC<{
  prompt?: string;
  history?: React.ReactNode;
  answer: string;
  marks: ChatSceneMarks;
  result: React.ReactNode;
  attachments?: string[];
  attachmentSize?: number;
  attachmentsNode?: React.ReactNode;
  wordRate?: number;
  resultZoom?: number;
  drift?: number;
  shots?: CameraShot[];
  overlay?: React.ReactNode;
  bounds?: boolean;
}> = ({
  prompt,
  history,
  answer,
  marks,
  result,
  attachments,
  attachmentSize,
  attachmentsNode,
  wordRate = 3.6,
  resultZoom = 1.18,
  drift,
  shots,
  overlay,
  bounds = true,
}) => {
  const frame = useCurrentFrame();
  const bubbleIn = useReveal(marks.bubbleAt, 12, 12);
  const resultIn = useReveal(marks.resultAt, 18, 22);
  const out = useSpringAt(marks.scrollOutAt, SPRINGS.smooth, 22);
  const words = React.useMemo(() => streamWords(answer), [answer]);

  const cameraShots = shots ?? [
    { at: 0, zoom: 1.12 },
    { at: marks.resultAt + 4, target: "answer.result", zoom: resultZoom },
    { at: marks.scrollOutAt, zoom: 1.04 },
  ];

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={cameraShots} bounds={bounds} drift={drift}>
        <div
          className="chat-bare"
          style={{ justifyContent: "flex-start", paddingTop: 130 }}
        >
          <div
            style={{
              width: 1000,
              maxWidth: "100%",
              transform: `translateY(${-out * 620}px)`,
            }}
          >
            {history}
            {prompt ? (
              <div style={bubbleIn}>
                <UserMessage attachments={attachments} attachmentSize={attachmentSize} attachmentsNode={attachmentsNode}>
                  {prompt}
                </UserMessage>
              </div>
            ) : null}
            <div style={{ marginTop: 30 }}>
              <AssistantMessage>
                <WordStream words={words} from={marks.streamFrom} rate={wordRate} />
                {frame >= marks.resultAt - 4 ? (
                  <div data-click="answer.result" style={resultIn}>
                    {result}
                  </div>
                ) : null}
                <Spark at={marks.sparkAt} hideAt={marks.resultAt + 26} />
              </AssistantMessage>
            </div>
          </div>
        </div>
        {overlay}
      </CameraRig>
    </AbsoluteFill>
  );
};
