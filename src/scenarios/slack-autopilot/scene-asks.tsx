import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { cascade } from "../../core/schedule";
import { CameraRig, type CameraShot } from "../../core/stage";
import {
  SLACK_CAST,
  SlackChannelPane,
  SlackComposer,
  SlackDateDivider,
  SlackMention,
  SlackFrame,
  SlackMessage,
  SlackPanes,
  SlackSidebar,
  SlackThreadBar,
} from "../../kit/slack-ui";
import { rowsFor } from "./shared";

const { sarah, priya, tom, elena, marcus, ryze } = SLACK_CAST;

const ASKS_AT = cascade(12, [48, 42, 36]);
const BAR_DELAY = [38, 34, 30, 26];
export const ASKS_TOTAL = ASKS_AT[3] + BAR_DELAY[3] + 58;

const ASKS = [
  { who: sarah, time: "11:12 AM", text: "What did we spend on Meta last month?" },
  { who: priya, time: "11:26 AM", text: "Kill the fatigued creative on the top ad set?" },
  { who: tom, time: "11:41 AM", text: "Move that freed budget to the winning campaign" },
  { who: elena, time: "11:58 AM", text: "Translate our ads for the German launch?" },
];

const SHOTS: CameraShot[] = [
  { at: 0, target: "asks.history", zoom: 1.44 },
  { at: ASKS_AT[0], target: "ask.0", zoom: 1.48, snap: true },
  { at: ASKS_AT[1], target: "ask.1", zoom: 1.5, snap: true },
  { at: ASKS_AT[2], target: "ask.2", zoom: 1.52, snap: true },
  { at: ASKS_AT[3], target: "ask.3", zoom: 1.54, snap: true },
];

export const SlackAsks: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <SlackFrame>
          <SlackSidebar workspace="Just for Me" rows={rowsFor("ask-ryze")} />
          <SlackPanes>
            <SlackChannelPane name="ask-ryze" composer={<SlackComposer placeholder="Message #ask-ryze" />}>
              <SlackDateDivider label="Today" />
              <div data-click="asks.history" style={{ width: "fit-content", maxWidth: 980 }}>
                <SlackMessage
                  avatar={marcus.avatar}
                  sender={marcus.name}
                  time="11:04 AM"
                  extra={
                    <div style={{ width: "fit-content" }}>
                      <SlackThreadBar count={1} avatars={[ryze.avatar]} lastReply="Today at 11:05 AM" />
                    </div>
                  }
                >
                  <SlackMention>@Ryze AI</SlackMention> which landing page won
                  the test last week?
                </SlackMessage>
              </div>
              {ASKS.map((ask, i) =>
                frame >= ASKS_AT[i] ? (
                  <div key={ask.time} data-click={`ask.${i}`} style={{ width: "fit-content", maxWidth: 980 }}>
                    <SlackMessage
                      avatar={ask.who.avatar}
                      sender={ask.who.name}
                      time={ask.time}
                      extra={
                        frame >= ASKS_AT[i] + BAR_DELAY[i] ? (
                          <div style={{ width: "fit-content" }}>
                            <SlackThreadBar count={1} avatars={[ryze.avatar]} lastReply="Just now" />
                          </div>
                        ) : undefined
                      }
                    >
                      {ask.text}
                    </SlackMessage>
                  </div>
                ) : null,
              )}
            </SlackChannelPane>
          </SlackPanes>
        </SlackFrame>
      </CameraRig>
    </AbsoluteFill>
  );
};
