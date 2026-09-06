import React from "react";
import { useCurrentFrame } from "remotion";
import { ChatTurnBlock, turnMarks, type ChatTurn } from "../../../kit/chat";
import "../../../kit/chat/chat.css";
import { QuestionSection, SubmitButton, WidgetCard } from "../../../kit/ryze-ui/widgets";

const SETUP_PROMPT =
  "I want to set up a scheduled task. Briefly explain how scheduled tasks work, then ask me a few questions to figure out what I'd like Agent to do and when it should run.";

const ANSWERS_MESSAGE = [
  "Answers:",
  "- What should I do on this schedule? Performance digest",
  "- How often should it run? Every week",
  "- Where should I send the result? Email",
].join("\n");

export type WidgetFrames = { task: number; freq: number; dest: number; submit: number };

let widgetFrames: WidgetFrames = { task: 1e6, freq: 1e6, dest: 1e6, submit: 1e6 };
export const setWidgetFrames = (frames: WidgetFrames) => {
  widgetFrames = frames;
};

const SetupWidget: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <WidgetCard
      title="Scheduled task setup"
      body={false}
      footer={<SubmitButton submitted={frame >= widgetFrames.submit} />}
    >
      <QuestionSection
        title="What should I do on this schedule?"
        options={[
          { label: "Performance digest", id: "q.task", selected: frame >= widgetFrames.task },
          { label: "Budget check" },
          { label: "Competitor sweep" },
        ]}
      />
      <QuestionSection
        title="How often should it run?"
        options={[
          { label: "Every day" },
          { label: "Every week", id: "q.freq", selected: frame >= widgetFrames.freq },
          { label: "Every month" },
        ]}
      />
      <QuestionSection
        title="Where should I send the result?"
        options={[
          { label: "Email", id: "q.dest", selected: frame >= widgetFrames.dest },
          { label: "Slack", logos: ["integrations/slack.svg"] },
        ]}
      />
    </WidgetCard>
  );
};

export const ASK_TURN: ChatTurn = {
  prompt: SETUP_PROMPT,
  instant: true,
  reasoning: { seconds: 2 },
  answer: [
    {
      kind: "p",
      text: "A scheduled task is a job you hand me once. I run it on your schedule, put the result in a new chat, and email you when the run finishes.",
    },
  ],
  result: { kind: "custom", Render: SetupWidget },
};

export const CREATE_TURN: ChatTurn = {
  prompt: ANSWERS_MESSAGE,
  instant: true,
  tools: {
    summary: "Checked schedules, created a scheduled task",
    rows: [{ name: "schedules__list_schedules" }, { name: "schedules__create_schedule" }],
  },
  answer: [
    {
      kind: "p",
      text: "Created **Weekly performance digest** — every Monday at 08:00, straight to your email.",
    },
  ],
};

export const askTurnMarks = (from: number) => turnMarks(ASK_TURN, from);
export const createTurnMarks = (from: number) => turnMarks(CREATE_TURN, from);

export const PanelThread: React.FC<{ askFrom: number; createFrom: number }> = ({
  askFrom,
  createFrom,
}) => {
  const frame = useCurrentFrame();
  const askMarks = turnMarks(ASK_TURN, askFrom);
  const createMarks = turnMarks(CREATE_TURN, createFrom);
  return (
    <div className="guide-thread">
      <ChatTurnBlock turn={ASK_TURN} marks={askMarks} frozen={false} />
      {frame >= createMarks.userAt - 2 ? (
        <ChatTurnBlock turn={CREATE_TURN} marks={createMarks} frozen={false} />
      ) : null}
    </div>
  );
};
