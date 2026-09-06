import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { press, SPRINGS, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import {
  SLACK_CAST,
  SlackChannelPane,
  SlackComposer,
  SlackDateDivider,
  SlackFrame,
  SlackMessage,
  SlackPanes,
  SlackSidebar,
  SlackThreadBar,
  SlackThreadPane,
  SlackThreadSeparator,
} from "../../kit/slack-ui";
import { ApprovalCard, ContextMessages, rowsFor } from "./shared";

const { marcus, ryze } = SLACK_CAST;

const RYZE_AT = 14;
const APPROVE_AT = RYZE_AT + 80;
const DONE_AT = APPROVE_AT + 22;
const BAR_AT = DONE_AT + 34;
const BAR_CLICK = BAR_AT + 32;
const THREAD_IN = BAR_CLICK + 4;
const MARCUS_AT = THREAD_IN + 28;
const RESP_AT = MARCUS_AT + 52;
const BADGE_AT = RESP_AT + 26;
export const SIDE_CLICK = BADGE_AT + 34;
export const MARKETING_TOTAL = SIDE_CLICK + 12;

const THREAD_X = 1160;
const THREAD_W = 758;

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.06 },
  { at: RYZE_AT, target: "slack.approval.card", zoom: 1.5, snap: true },
  { at: DONE_AT, target: "slack.done", zoom: 1.5, snap: true },
  { at: THREAD_IN + 6, target: "thread.root", zoom: 1.6, snap: true },
  { at: MARCUS_AT, target: "thread.marcus", zoom: 1.6, snap: true },
  { at: RESP_AT, target: "thread.resp", zoom: 1.6, snap: true },
  { at: BADGE_AT, target: "sidebar.marketing-analytics", zoom: 1.6, snap: true },
];

export const SlackMarketing: React.FC = () => {
  const frame = useCurrentFrame();
  const approvedP = useSpringAt(APPROVE_AT + 2, SPRINGS.pop, 14);
  const slide = useSpringAt(THREAD_IN, SPRINGS.panel, 30);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <SlackFrame>
          <SlackSidebar
            workspace="Just for Me"
            rows={rowsFor(
              "marketing",
              frame >= BADGE_AT ? { name: "marketing-analytics", count: 1 } : undefined,
            )}
          />
          <SlackPanes>
            <SlackChannelPane name="marketing" composer={<SlackComposer placeholder="Message #marketing" />}>
              <SlackDateDivider label="Today" />
              <ContextMessages />
              {frame >= RYZE_AT ? (
                <SlackMessage
                  avatar={ryze.avatar}
                  sender="Ryze AI"
                  badge="AGENT"
                  time="9:18 AM"
                  extra={<ApprovalCard approvedP={approvedP} clickScale={press(frame, APPROVE_AT)} />}
                >
                  Found a leaking ad set on Meta — needs your call:
                </SlackMessage>
              ) : null}
              {frame >= DONE_AT ? (
                <div data-click="slack.done" style={{ width: "fit-content", maxWidth: 980 }}>
                  <SlackMessage
                    avatar={ryze.avatar}
                    sender="Ryze AI"
                    badge="AGENT"
                    time="9:19 AM"
                    extra={
                      frame >= BAR_AT ? (
                        <div data-click="slack.threadbar" style={{ width: "fit-content" }}>
                          <SlackThreadBar count={1} avatars={[marcus.avatar]} lastReply="Just now" />
                        </div>
                      ) : undefined
                    }
                  >
                    Done — &ldquo;Prospecting — Broad&rdquo; is paused. That
                    stops $412/week of wasted spend.
                  </SlackMessage>
                </div>
              ) : null}
            </SlackChannelPane>
          </SlackPanes>
          <div
            style={{
              position: "absolute",
              left: THREAD_X,
              top: 44,
              bottom: 4,
              width: THREAD_W,
              transform: `translateX(${interpolate(slide, [0, 1], [THREAD_W + 40, 0])}px)`,
              boxShadow: "-24px 0 60px rgba(20,15,10,0.22)",
              display: "flex",
            }}
          >
            <SlackThreadPane
              channel="marketing"
              width={THREAD_W}
              style={{ flex: 1 }}
              composer={<SlackComposer placeholder="Reply…" toolbar={false} />}
            >
              <div data-click="thread.root">
                <SlackMessage avatar={ryze.avatar} sender="Ryze AI" badge="AGENT" time="9:19 AM">
                  Done — &ldquo;Prospecting — Broad&rdquo; is paused. That stops
                  $412/week of wasted spend.
                </SlackMessage>
              </div>
              <SlackThreadSeparator count={1} />
              {frame >= MARCUS_AT ? (
                <div data-click="thread.marcus" style={{ width: "fit-content", maxWidth: 680 }}>
                  <SlackMessage avatar={marcus.avatar} sender={marcus.name} time="9:21 AM">
                    Now schedule it — check spend every week so this
                    doesn&rsquo;t happen again
                  </SlackMessage>
                </div>
              ) : null}
              {frame >= RESP_AT ? (
                <div data-click="thread.resp" style={{ width: "fit-content", maxWidth: 680 }}>
                  <SlackMessage avatar={ryze.avatar} sender="Ryze AI" badge="AGENT" time="9:22 AM">
                    Ok — scheduled. I&rsquo;ll audit spend every Monday and
                    post the results to #marketing-analytics.
                  </SlackMessage>
                </div>
              ) : null}
            </SlackThreadPane>
          </div>
        </SlackFrame>
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[
            { target: "slack.approve", at: APPROVE_AT, travel: 60 },
            { target: "slack.threadbar", at: BAR_CLICK, travel: 34 },
            { target: "sidebar.marketing-analytics", at: SIDE_CLICK, travel: 50 },
          ]}
        />
      </CameraRig>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: APPROVE_AT },
          { name: "mouse-click", at: BAR_CLICK },
          { name: "mouse-click", at: SIDE_CLICK },
        ]}
      />
    </AbsoluteFill>
  );
};
