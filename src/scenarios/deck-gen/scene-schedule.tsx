import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneCursor } from "../../core/stage";
import { ChatScene, chatSceneMarks, continuationMarks } from "../../kit/chat/chat-scene";
import { QuestionSection, SubmitButton } from "../../kit/ryze-ui/question";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { SfxTrack } from "../../kit/sfx";
import { UserMessage, AssistantMessage } from "../../kit/ryze-ui/message";
import { WordStream } from "../../kit/chat/word-stream";
import { streamWords } from "../../kit/chat/word-stream";
import { PROMPT2 } from "./scene-template";

const ANSWER = "Two quick questions so I set this up right —";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 380 });

const CLICK1 = MARKS.resultAt + 38;
const CLICK2 = MARKS.resultAt + 72;
const SUBMIT = MARKS.resultAt + 106;

export const DECK_FORM_TOTAL = SUBMIT + 20;

const DeliveryForm: React.FC<{ settled?: boolean }> = ({ settled }) => {
  const frame = useCurrentFrame();
  const picked1 = settled || frame >= CLICK1 + 2;
  const picked2 = settled || frame >= CLICK2 + 2;
  const submitted = settled || frame >= SUBMIT + 2;
  return (
    <div data-click="form.card" style={{ width: 760 }}>
      <WidgetCard
        title="Weekly delivery"
        body={false}
        footer={
          <span data-click="form.submit">
            <SubmitButton submitted={submitted} />
          </span>
        }
      >
        <QuestionSection
          title="Where should I send it?"
          options={[
            { label: "Slack", id: "form.slack", logos: ["integrations/slack.svg"] },
            { label: "Email", id: "form.email", logos: ["integrations/gmail.png"] },
            {
              label: "Both",
              id: "form.both",
              logos: ["integrations/slack.svg", "integrations/gmail.png"],
              selected: picked1,
            },
          ]}
        />
        <QuestionSection
          title="When?"
          options={[
            { label: "Monday, 9:00 AM", id: "form.mon", selected: picked2 },
            { label: "Friday, 5:00 PM", id: "form.fri" },
            { label: "Daily digest", id: "form.daily" },
          ]}
        />
      </WidgetCard>
    </div>
  );
};

export const DeckScheduleForm: React.FC = () => (
  <ChatScene
    prompt={PROMPT2}
    answer={ANSWER}
    marks={MARKS}
    attachments={[
      "deck-gen/slides/quarterly-review-00.png",
      "deck-gen/slides/media-plan-00.png",
      "deck-gen/slides/seo-audit-00.png",
    ]}
    attachmentSize={110}
    result={<DeliveryForm />}
    overlay={
      <>
        <SceneCursor
          from={{ x: 1600, y: 1150 }}
          moves={[
            { target: "form.both", at: CLICK1, travel: 44 },
            { target: "form.mon", at: CLICK2, travel: 30 },
            { target: "form.submit", at: SUBMIT, travel: 30 },
          ]}
        />
        <SfxTrack
          hits={[
            { name: "mouse-click", at: CLICK1 },
            { name: "mouse-click", at: CLICK2 },
            { name: "mouse-click", at: SUBMIT },
          ]}
        />
      </>
    }
    shots={[
      { at: 0, target: "msg.user", zoom: 1.3, align: { y: 0.24 } },
      { at: MARKS.resultAt + 2, target: "form.card", zoom: 1.52, snap: true },
    ]}
  />
);

const DONE = "Done — saved as a template. First deck lands Monday, 9:00 AM, in Slack and your inbox.";
const DONE_MARKS = continuationMarks(DONE, { resultHold: 6 });

export const DECK_DONE_TOTAL = DONE_MARKS.total;

const HistoryForm: React.FC = () => (
  <>
    <UserMessage
      attachments={[
        "deck-gen/slides/quarterly-review-00.png",
        "deck-gen/slides/media-plan-00.png",
        "deck-gen/slides/seo-audit-00.png",
      ]}
      attachmentSize={110}
    >
      {PROMPT2}
    </UserMessage>
    <div style={{ marginTop: 30 }}>
      <AssistantMessage>
        <WordStream words={streamWords(ANSWER)} from={-100} rate={3.6} />
        <div style={{ marginTop: 18 }}>
          <DeliveryForm settled />
        </div>
      </AssistantMessage>
    </div>
  </>
);

export const DeckScheduleDone: React.FC = () => (
  <ChatScene
    history={<HistoryForm />}
    answer={DONE}
    marks={DONE_MARKS}
    result={<span data-click="answer.done" />}
    shots={[{ at: 0, target: "answer.result", zoom: 1.32, align: { y: 0.5 }, snap: true }]}
  />
);
