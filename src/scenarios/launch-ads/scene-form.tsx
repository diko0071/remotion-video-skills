import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneCursor } from "../../core/stage";
import { ChatScene, chatSceneMarks } from "../../kit/chat/chat-scene";
import { QuestionSection, SubmitButton } from "../../kit/ryze-ui/question";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { SfxTrack } from "../../kit/sfx";
import { PROMPT } from "./timings";

const ANSWER = "Two quick questions so I set this up right —";
const MARKS = chatSceneMarks(ANSWER, { resultHold: 400 });

const CLICK1 = MARKS.resultAt + 40;
const CLICK2 = MARKS.resultAt + 76;
const SUBMIT = MARKS.resultAt + 112;

export const LAUNCH_FORM_TOTAL = SUBMIT + 18;

const SetupForm: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div data-click="form.card" style={{ width: 760 }}>
      <WidgetCard
        title="Quick setup"
        body={false}
        footer={
          <span data-click="form.submit">
            <SubmitButton submitted={frame >= SUBMIT + 2} />
          </span>
        }
      >
        <QuestionSection
          title="Where should the ads run?"
          options={[
            { label: "Google Ads", id: "form.google", logos: ["integrations/google-ads.webp"] },
            { label: "Meta Ads", id: "form.meta", logos: ["integrations/meta-ads.svg"] },
            {
              label: "Both",
              id: "form.both",
              logos: ["integrations/google-ads.webp", "integrations/meta-ads.svg"],
              selected: frame >= CLICK1 + 2,
            },
          ]}
        />
        <QuestionSection
          title="What's the primary goal?"
          options={[
            { label: "Lower CPA", id: "form.cpa" },
            { label: "More conversions", id: "form.conv", selected: frame >= CLICK2 + 2 },
            { label: "Scale spend", id: "form.scale" },
          ]}
        />
      </WidgetCard>
    </div>
  );
};

export const LaunchForm: React.FC = () => (
  <ChatScene
    prompt={PROMPT}
    answer={ANSWER}
    marks={MARKS}
    result={<SetupForm />}
    overlay={
      <>
        <SceneCursor
          from={{ x: 1600, y: 1150 }}
          moves={[
            { target: "form.both", at: CLICK1, travel: 44 },
            { target: "form.conv", at: CLICK2, travel: 30 },
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
