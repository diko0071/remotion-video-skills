import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { press, SPRINGS, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import {
  SLACK_CAST,
  SLACK_EMOJI,
  SlackChannelPane,
  SlackComposer,
  SlackDateDivider,
  SlackFileCard,
  SlackFrame,
  SlackIcon,
  SlackMention,
  SlackMessage,
  SlackPanes,
  SlackReactions,
  SlackSidebar,
} from "../../kit/slack-ui";
import { rowsFor } from "./shared";

const { sarah, elena, marcus, priya, james, ryze } = SLACK_CAST;

const SARAH_AT = 12;
const RYZE_AT = SARAH_AT + 44;
const PDF_CLICK = RYZE_AT + 48;
const VIEW_AT = PDF_CLICK + 4;
const SCROLL_FROM = VIEW_AT + 34;
const SCROLL_TO = SCROLL_FROM + 170;
const CLOSE_AT = SCROLL_TO + 36;
const BADGE_AT = CLOSE_AT + 10;
const SIDE_CLICK = BADGE_AT + 32;
export const CLIENTS_TOTAL = SIDE_CLICK + 12;

const PAGES = [
  "slack/deck/page-1.png",
  "slack/deck/page-2.png",
  "slack/deck/page-3.png",
  "slack/deck/page-4.png",
  "slack/deck/page-5.png",
];
const PANEL_W = 758;
const PAGE_INNER_W = PANEL_W - 40;
const PAGE_H = Math.round((PAGE_INNER_W * 720) / 1280);
const PAGE_GAP = 16;
const VIEWPORT_H = 925;
const COLUMN_H = PAGES.length * PAGE_H + (PAGES.length - 1) * PAGE_GAP;
const SCROLL_DIST = COLUMN_H - VIEWPORT_H;

const SHOTS: CameraShot[] = [
  { at: 0, target: "clients.history", zoom: 1.44 },
  { at: SARAH_AT, target: "clients.sarah", zoom: 1.5, snap: true },
  { at: RYZE_AT, target: "clients.pdf", zoom: 1.56, snap: true },
  { at: VIEW_AT + 6, target: "viewer.page", zoom: 1.6, align: { y: 0.78 }, snap: true },
  { at: SCROLL_FROM + 50, target: "viewer.page", zoom: 1.6, align: { y: 0.55 } },
  { at: SCROLL_FROM + 110, target: "viewer.page", zoom: 1.6, align: { y: 0.3 } },
  { at: CLOSE_AT, target: "sidebar.ask-ryze", zoom: 1.6, snap: true },
];

export const SlackClients: React.FC = () => {
  const frame = useCurrentFrame();
  const open = useSpringAt(VIEW_AT, SPRINGS.panel, 26);
  const closeP = useSpringAt(CLOSE_AT, SPRINGS.panel, 20);
  const slide = open * (1 - closeP);
  const scrollY = interpolate(frame, [SCROLL_FROM, SCROLL_TO], [0, SCROLL_DIST], {
    easing: Easing.bezier(0.5, 0, 0.85, 0.6),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS}>
        <SlackFrame>
          <SlackSidebar
            workspace="Just for Me"
            rows={rowsFor("clients", frame >= BADGE_AT ? { name: "ask-ryze", count: 1 } : undefined)}
          />
          <SlackPanes>
            <SlackChannelPane name="clients" composer={<SlackComposer placeholder="Message #clients" />}>
              <SlackDateDivider label="Today" />
              <SlackMessage avatar={marcus.avatar} sender={marcus.name} time="9:52 AM">
                Meridian renewed for another year — great call everyone
              </SlackMessage>
              <SlackMessage avatar={priya.avatar} sender={priya.name} time="10:06 AM">
                They asked for a monthly summary going forward, keep that in
                mind
              </SlackMessage>
              <SlackMessage avatar={james.avatar} sender={james.name} time="10:21 AM">
                Adding their new landing pages to the tracking sheet today
              </SlackMessage>
              <div data-click="clients.history" style={{ width: "fit-content", maxWidth: 980 }}>
                <SlackMessage avatar={elena.avatar} sender={elena.name} time="10:38 AM">
                  Meridian call moved up — we&rsquo;re on at 11 sharp
                </SlackMessage>
              </div>
              {frame >= SARAH_AT ? (
                <div data-click="clients.sarah" style={{ width: "fit-content", maxWidth: 980 }}>
                  <SlackMessage avatar={sarah.avatar} sender={sarah.name} time="10:41 AM">
                    <SlackMention>@Ryze AI</SlackMention> package this
                    week&rsquo;s results as a PDF for the Meridian meeting?
                  </SlackMessage>
                </div>
              ) : null}
              {frame >= RYZE_AT ? (
                <div data-click="clients.pdf" style={{ width: "fit-content", maxWidth: 980 }}>
                  <SlackMessage
                    avatar={ryze.avatar}
                    sender="Ryze AI"
                    badge="AGENT"
                    time="10:41 AM"
                    extra={
                      <>
                        <div style={{ transform: `scale(${press(frame, PDF_CLICK)})`, transformOrigin: "left center" }}>
                          <SlackFileCard
                            name="meridian-weekly-results.pdf"
                            meta="PDF"
                            style={{ marginTop: 8, width: 440 }}
                          />
                        </div>
                        {frame >= CLOSE_AT + 4 ? (
                          <SlackReactions
                            items={[{ emoji: SLACK_EMOJI.raisedHands, count: 2, mine: true }]}
                          />
                        ) : null}
                      </>
                    }
                  >
                    Here you go — numbers, wins, and next steps:
                  </SlackMessage>
                </div>
              ) : null}
            </SlackChannelPane>
          </SlackPanes>
          <div
            style={{
              position: "absolute",
              left: 1160,
              top: 44,
              bottom: 4,
              width: 758,
              transform: `translateX(${interpolate(slide, [0, 1], [800, 0])}px)`,
              boxShadow: "-24px 0 60px rgba(20,15,10,0.22)",
              background: "#FFFFFF",
              borderRadius: "8px 0 0 8px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 20px",
                borderBottom: "1px solid rgba(23,19,16,0.08)",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              meridian-weekly-results.pdf
              <span style={{ marginLeft: "auto", color: "rgba(23,19,16,0.5)" }}>
                <SlackIcon name="close" size={18} />
              </span>
            </div>
            <div
              data-click="viewer.page"
              style={{ flex: 1, margin: "18px 20px 10px", overflow: "hidden" }}
            >
              <div style={{ transform: `translateY(${-scrollY}px)` }}>
                {PAGES.map((page, i) => (
                  <div
                    key={page}
                    style={{
                      borderRadius: 6,
                      overflow: "hidden",
                      border: "1px solid rgba(23,19,16,0.1)",
                      boxShadow: "0 10px 34px rgba(20,15,10,0.16)",
                      marginBottom: i < PAGES.length - 1 ? PAGE_GAP : 0,
                    }}
                  >
                    <Img src={staticFile(page)} style={{ width: "100%", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(23,19,16,0.55)",
                paddingBottom: 10,
              }}
            >
              {Math.min(PAGES.length, 1 + Math.floor((scrollY + PAGE_H / 2) / (PAGE_H + PAGE_GAP)))} / 10
            </div>
          </div>
        </SlackFrame>
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[
            { target: "clients.pdf", at: PDF_CLICK, travel: 40 },
            { target: "sidebar.ask-ryze", at: SIDE_CLICK, travel: 60 },
          ]}
        />
      </CameraRig>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: PDF_CLICK },
          { name: "mouse-click", at: SIDE_CLICK },
        ]}
      />
    </AbsoluteFill>
  );
};
