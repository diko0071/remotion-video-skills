import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, typing, useSpringAt } from "../../core/motion";
import {
  SLACK_AVATARS,
  SLACK_CAST,
  SlackChannelHeader,
  SlackChannelPane,
  SlackComposer,
  SlackFrame,
  SlackMention,
  SlackMessage,
  SlackPanes,
  SlackSidebar,
  SlackIcon,
} from "../../kit/slack-ui";
import { ContextMessages, rowsFor } from "../slack-autopilot/shared";
import { COPY, T } from "./timings";

const { sarah, ryze } = SLACK_CAST;
const ME = { avatar: SLACK_AVATARS.dmitry, name: "Dmitry Korzhov" };

const Rise: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useSpringAt(at, SPRINGS.card, 22);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)` }}>{children}</div>
  );
};

export const HuddleLine: React.FC<{ who: "sarah" | "dmitry" | "ryze"; text: string; at: number; to: number }> = ({ who, text, at, to }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.card, 18);
  const person = who === "sarah" ? sarah : who === "ryze" ? ryze : ME;
  const shown = typing(frame, text, at + 4, to);
  return (
    <div style={{ display: "flex", gap: 8, padding: "6px 16px", opacity: p, transform: `translateY(${(1 - p) * 10}px)` }}>
      <Img src={staticFile(person.avatar)} style={{ width: 26, height: 26, borderRadius: 4, marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: "#1d1c1d" }}>{person.name}</div>
        <div style={{ fontSize: 14, lineHeight: 1.45, color: "#1d1c1d" }}>{shown}</div>
      </div>
    </div>
  );
};

export const ChannelApp: React.FC<{
  frame: number;
  huddle?: boolean;
  thread?: boolean;
  dockSlot?: React.ReactNode;
}> = ({ frame, huddle, thread, dockSlot }) => {
  const typed = typing(frame, COPY.typed, T.typeFrom, T.typeTo);
  const sent = frame >= T.send;
  const cursorOn = frame >= T.windowIn + 10 && !sent && Math.floor(frame / 16) % 2 === 0;
  const askTyped = typing(frame, COPY.ask, T.askRyze, T.askRyze + 40);
  const asked = frame >= T.askRyze + 44;
  return (
    <SlackFrame workspace="Ryze">
      <SlackSidebar workspace="Ryze" rows={rowsFor("marketing")} />
      <SlackPanes>
        <SlackChannelPane
          header={
            <SlackChannelHeader
              name="marketing"
              memberAvatars={[SLACK_AVATARS.dmitry, sarah.avatar, ryze.avatar]}
              memberCount={12}
              huddleId="huddle"
              huddleActive={huddle}
            />
          }
          composer={
            <SlackComposer
              placeholder="Message #marketing"
              typed={thread ? (asked ? "" : askTyped) : sent ? "" : typed}
              cursor={thread ? frame >= T.askRyze && !asked && Math.floor(frame / 16) % 2 === 0 : cursorOn}
              sendActive={thread ? askTyped.length > 0 && !asked : !sent && typed.length > 0}
            />
          }
          style={{ position: "relative" }}
        >
          <ContextMessages />
          {sent ? (
            <Rise at={T.send}>
              <SlackMessage avatar={ME.avatar} sender={ME.name} time="10:12 AM">
                {COPY.typed}
              </SlackMessage>
            </Rise>
          ) : null}
          {frame >= T.reply ? (
            <Rise at={T.reply}>
              <SlackMessage avatar={sarah.avatar} sender={sarah.name} time="10:12 AM">
                {COPY.reply}
              </SlackMessage>
            </Rise>
          ) : null}
          {huddle ? (
            <Rise at={T.dock + 10}>
              <SlackMessage avatar={ME.avatar} sender={ME.name} time="10:13 AM">
                <span style={{ color: "#616061" }}>started a huddle in #marketing</span>
                <span style={{ marginLeft: 10, background: "#007a5a", color: "#fff", fontWeight: 900, fontSize: 12, padding: "3px 10px", borderRadius: 6 }}>Join</span>
              </SlackMessage>
            </Rise>
          ) : null}
          {asked ? (
            <Rise at={T.askRyze + 44}>
              <SlackMessage avatar={ME.avatar} sender={ME.name} time="10:15 AM">
                <SlackMention>@Ryze AI</SlackMention> which ad angle won on Meta in Q3?
              </SlackMessage>
            </Rise>
          ) : null}
          {frame >= T.ryzeReply ? (
            <Rise at={T.ryzeReply}>
              <SlackMessage avatar={ryze.avatar} sender={ryze.name} badge="AGENT" time="10:15 AM">
                {typing(frame, COPY.ryze, T.ryzeReply + 4, T.ryzeReply + 34)}
              </SlackMessage>
            </Rise>
          ) : null}
          {dockSlot}
        </SlackChannelPane>
        {thread ? (
          <div className="sk-pane secondary" style={{ width: 520 }}>
            <div className="sk-pane-header" style={{ background: "#f8f8f8" }}>
              <span style={{ width: 28, height: 28, borderRadius: 7, background: "#007a5a", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                <SlackIcon name="headphones" size={16} color="#fff" />
              </span>
              <span className="title" style={{ fontSize: 16 }}>Huddle</span>
              <span className="subtitle" style={{ display: "flex", alignItems: "center", marginLeft: 6 }}>
                <SlackIcon name="channel" size={12} />
                marketing
              </span>
              <span className="spacer" />
              <span style={{ fontSize: 12, fontWeight: 900, color: "#e01e5a", display: "flex", alignItems: "center", gap: 6, marginRight: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: "#e01e5a" }} />
                LIVE
              </span>
              <span className="hbtn"><SlackIcon name="close" size={18} /></span>
            </div>
            <div style={{ padding: "10px 16px 6px", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "#616061", borderBottom: "1px solid #eee" }}>
              <Img src={staticFile(ryze.avatar)} style={{ width: 18, height: 18, borderRadius: 4 }} />
              Ryze AI is listening and taking notes
            </div>
            <div style={{ padding: "8px 0" }}>
              <div style={{ padding: "6px 16px 4px", fontSize: 11, fontWeight: 900, color: "#616061", letterSpacing: "0.06em" }}>TRANSCRIPT</div>
              {COPY.lines.map((l, i) => (
                <HuddleLine key={i} who={l.who} text={l.text} at={T.transcript + 6 + i * 34} to={T.transcript + 6 + i * 34 + 60} />
              ))}
              {frame >= T.pushTranscript + 16 ? (
                <HuddleLine who="dmitry" text="Let me ask Ryze in the channel." at={T.pushTranscript + 16} to={T.pushTranscript + 46} />
              ) : null}
            </div>
          </div>
        ) : null}
      </SlackPanes>
    </SlackFrame>
  );
};
