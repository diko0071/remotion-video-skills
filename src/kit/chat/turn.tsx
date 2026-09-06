import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { AssistantMessage, UserMessage } from "../ryze-ui/message";
import { ChatAnswerBlocks } from "./answer";
import { ArtifactCard } from "./artifacts/artifact-card";
import { ReasoningRow } from "./reasoning";
import { ChatResultBlock } from "./results/result";
import { ToolRunGroup } from "./tool-run";
import type { TurnMarks } from "./timings";
import { answerBlocks, type ChatTurn } from "./types";

const Reveal: React.FC<{ at: number; frozen: boolean; children: React.ReactNode }> = ({
  at,
  frozen,
  children,
}) => {
  const p = useSpringAt(at, SPRINGS.smooth, 16);
  const frame = useCurrentFrame();
  if (frozen) return <div>{children}</div>;
  if (frame < at) return null;
  return (
    <div style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [10, 0])}px)` }}>
      {children}
    </div>
  );
};

export const ChatTurnBlock: React.FC<{
  turn: ChatTurn;
  marks: TurnMarks;
  frozen: boolean;
}> = ({ turn, marks, frozen }) => {
  const blocks = answerBlocks(turn.answer);
  return (
    <>
      <Reveal at={marks.userAt} frozen={frozen}>
        <UserMessage attachments={turn.attachments} attachmentSize={turn.attachmentSize}>
          {turn.prompt}
        </UserMessage>
      </Reveal>
      <div style={{ marginTop: 16 }}>
        <AssistantMessage>
          {turn.reasoning ? (
            <ReasoningRow
              reasoning={turn.reasoning}
              start={marks.reasoningAt}
              doneAt={marks.reasoningDone}
              frozen={frozen}
            />
          ) : null}
          {turn.tools ? (
            <ToolRunGroup run={turn.tools} marks={marks.rows} frozen={frozen} />
          ) : null}
          {blocks.length ? (
            <Reveal at={marks.answerAt} frozen={frozen}>
              <ChatAnswerBlocks blocks={blocks} />
            </Reveal>
          ) : null}
          {turn.result ? (
            <Reveal at={marks.resultAt} frozen={frozen}>
              <div data-click="answer.result">
                <ChatResultBlock result={turn.result} />
              </div>
            </Reveal>
          ) : null}
          {turn.artifact ? (
            <Reveal at={marks.artifactAt} frozen={frozen}>
              <ArtifactCard artifact={turn.artifact} />
            </Reveal>
          ) : null}
        </AssistantMessage>
      </div>
    </>
  );
};
