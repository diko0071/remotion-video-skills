import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import {
  SLACK_CAST,
  SLACK_EMOJI,
  SlackChannelPane,
  SlackComposer,
  SlackDateDivider,
  SlackFrame,
  SlackMessage,
  SlackPanes,
  SlackReactions,
  SlackSidebar,
} from "../../kit/slack-ui";
import { ReportCard, rowsFor } from "./shared";

const { james, ryze } = SLACK_CAST;

const REPORT_AT = 12;
const REACT_AT = REPORT_AT + 60;
const JAMES_AT = REACT_AT + 38;
const BADGE_AT = JAMES_AT + 38;
const SIDE_CLICK = BADGE_AT + 32;
export const ANALYTICS_TOTAL = SIDE_CLICK + 12;

const SHOTS: CameraShot[] = [
  { at: 0, target: "analytics.history", zoom: 1.44 },
  { at: REPORT_AT, target: "analytics.report", zoom: 1.5, snap: true },
  { at: JAMES_AT, target: "analytics.james", zoom: 1.56, snap: true },
  { at: BADGE_AT, target: "sidebar.clients", zoom: 1.56, snap: true },
];

const reactionsAt = (frame: number) => {
  const items = [];
  if (frame >= REACT_AT)
    items.push({ emoji: SLACK_EMOJI.fire, count: frame >= REACT_AT + 20 ? 4 : 2, mine: true });
  if (frame >= REACT_AT + 10)
    items.push({ emoji: SLACK_EMOJI.raisedHands, count: frame >= REACT_AT + 26 ? 3 : 1 });
  if (frame >= REACT_AT + 18) items.push({ emoji: SLACK_EMOJI.hundred, count: 2 });
  if (frame >= REACT_AT + 26) items.push({ emoji: SLACK_EMOJI.chartUp, count: 1 });
  return items;
};

export const SlackAnalytics: React.FC = () => {
  const frame = useCurrentFrame();
  const reactions = reactionsAt(frame);
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <SlackFrame>
          <SlackSidebar
            workspace="Just for Me"
            rows={rowsFor(
              "marketing-analytics",
              frame >= BADGE_AT ? { name: "clients", count: 1 } : undefined,
            )}
          />
          <SlackPanes>
            <SlackChannelPane
              name="marketing-analytics"
              composer={<SlackComposer placeholder="Message #marketing-analytics" />}
            >
              <SlackDateDivider label="Monday, Aug 4" />
              <SlackMessage
                avatar={ryze.avatar}
                sender="Ryze AI"
                badge="AGENT"
                time="9:00 AM"
                extra={<SlackReactions items={[{ emoji: SLACK_EMOJI.eyes, count: 3 }]} />}
              >
                Weekly performance, as scheduled — spend $9,120, ROAS 3.1x, CPA
                $23.60. Full breakdown in the thread.
              </SlackMessage>
              <SlackDateDivider label="Monday, Aug 11" />
              <div data-click="analytics.history" style={{ width: "fit-content", maxWidth: 980 }}>
                <SlackMessage
                  avatar={ryze.avatar}
                  sender="Ryze AI"
                  badge="AGENT"
                  time="9:00 AM"
                  extra={
                    <SlackReactions
                      items={[
                        { emoji: SLACK_EMOJI.eyes, count: 4, mine: true },
                        { emoji: SLACK_EMOJI.wave, count: 2 },
                      ]}
                    />
                  }
                >
                  Weekly performance, as scheduled — spend $8,860, ROAS 3.4x,
                  CPA $21.30. Full breakdown in the thread.
                </SlackMessage>
              </div>
              <SlackDateDivider label="Monday, Aug 18" />
              {frame >= REPORT_AT ? (
                <div data-click="analytics.report" style={{ width: "fit-content" }}>
                  <SlackMessage
                    avatar={ryze.avatar}
                    sender="Ryze AI"
                    badge="AGENT"
                    time="9:00 AM"
                    extra={
                      <>
                        <ReportCard at={REPORT_AT + 8} />
                        {reactions.length > 0 ? <SlackReactions items={reactions} /> : null}
                      </>
                    }
                  >
                    Weekly performance, as scheduled — the Prospecting fix is
                    paying off:
                  </SlackMessage>
                </div>
              ) : null}
              {frame >= JAMES_AT ? (
                <div data-click="analytics.james" style={{ width: "fit-content", maxWidth: 900 }}>
                  <SlackMessage avatar={james.avatar} sender={james.name} time="9:04 AM">
                    Best report we&rsquo;ve ever received. Monday mornings are
                    solved
                  </SlackMessage>
                </div>
              ) : null}
            </SlackChannelPane>
          </SlackPanes>
        </SlackFrame>
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[{ target: "sidebar.clients", at: SIDE_CLICK, travel: 50 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: SIDE_CLICK }]} />
    </AbsoluteFill>
  );
};
