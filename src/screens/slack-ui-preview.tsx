import React from "react";
import { AbsoluteFill } from "remotion";
import {
  SLACK_CAST,
  type SidebarRow,
  SLACK_EMOJI,
  SlackChannelPane,
  SlackComposer,
  SlackDateDivider,
  SlackFileCard,
  SlackFrame,
  SlackMention,
  SlackMessage,
  SlackPanes,
  SlackReactions,
  SlackSidebar,
  SlackThreadBar,
  SlackThreadPane,
  SlackThreadSeparator,
} from "../kit/slack-ui";

const { sarah, marcus, elena, james, priya, tom, ryze } = SLACK_CAST;

const SIDEBAR_ROWS: SidebarRow[] = [
  { kind: "link", icon: "threads", name: "Threads" },
  { kind: "link", icon: "headphones", name: "Huddles" },
  { kind: "link", icon: "send-filled", name: "Drafts & sent" },
  { kind: "heading", name: "Channels" },
  { kind: "channel", name: "general" },
  { kind: "channel", name: "marketing", selected: true },
  { kind: "channel", name: "product", unread: true, badge: 2 },
  { kind: "channel", name: "social" },
  { kind: "heading", name: "Direct Messages" },
  { kind: "dm", name: sarah.name, avatar: sarah.avatar },
  { kind: "dm", name: marcus.name, avatar: marcus.avatar },
  { kind: "heading", name: "Agents & apps" },
  { kind: "dm", name: "Ryze AI", avatar: ryze.avatar },
  { kind: "dm", name: "Slackbot" },
];

const ChannelMessages: React.FC = () => (
  <>
    <SlackDateDivider label="Today" />
    <SlackMessage avatar={marcus.avatar} sender={marcus.name} time="9:12 AM">
      Morning team — Q3 numbers review at 2 PM, don't forget
    </SlackMessage>
    <SlackMessage
      avatar={sarah.avatar}
      sender={sarah.name}
      time="9:14 AM"
      extra={
        <SlackReactions
          items={[{ emoji: SLACK_EMOJI.eyes, count: 3, mine: true }]}
        />
      }
    >
      Meta CPA jumped again this week… anyone looked at it?
    </SlackMessage>
    <SlackMessage avatar={priya.avatar} sender={priya.name} time="9:15 AM">
      Saw it too. Creatives are fatiguing, CTR down 20% on the top ad set
    </SlackMessage>
    <SlackMessage
      avatar={tom.avatar}
      sender={tom.name}
      time="9:17 AM"
      extra={
        <SlackThreadBar
          count={4}
          avatars={[sarah.avatar, ryze.avatar]}
          lastReply="Last reply 5 minutes ago"
        />
      }
    >
      <SlackMention>@Ryze AI</SlackMention> can you pull last week's meta numbers and tell
      us what's going on?
    </SlackMessage>
    <SlackMessage avatar={ryze.avatar} sender={ryze.name} badge="AGENT" time="9:18 AM">
      On it — checking campaigns, ad sets and creative performance for Jul 20–26. I'll
      post the breakdown in the thread.
    </SlackMessage>
    <SlackMessage avatar={elena.avatar} sender={elena.name} time="9:21 AM">
      While we're at it — landing page test finished, variant B won by 14%
    </SlackMessage>
    <SlackMessage
      avatar={james.avatar}
      sender={james.name}
      time="9:22 AM"
      extra={
        <SlackReactions items={[{ emoji: SLACK_EMOJI.wave, count: 2 }]} />
      }
    >
      Nice. Shipping it to 100% today then
    </SlackMessage>
  </>
);

export const SlackChannelPreview: React.FC = () => (
  <AbsoluteFill>
    <SlackFrame>
      <SlackSidebar rows={SIDEBAR_ROWS} />
      <SlackPanes>
        <SlackChannelPane
          name="marketing"
          composer={<SlackComposer placeholder="Message #marketing" />}
        >
          <ChannelMessages />
        </SlackChannelPane>
      </SlackPanes>
    </SlackFrame>
  </AbsoluteFill>
);

export const SlackThreadPreview: React.FC = () => (
  <AbsoluteFill>
    <SlackFrame>
      <SlackSidebar rows={SIDEBAR_ROWS} />
      <SlackPanes>
        <SlackChannelPane
          name="marketing"
          composer={<SlackComposer placeholder="Message #marketing" />}
        >
          <ChannelMessages />
        </SlackChannelPane>
        <SlackThreadPane
          channel="marketing"
          composer={
            <SlackComposer placeholder="Reply…" toolbar={false} alsoSendTo="marketing" />
          }
        >
          <SlackMessage avatar={tom.avatar} sender={tom.name} time="9:17 AM">
            <SlackMention>@Ryze AI</SlackMention> can you pull last week's meta numbers
            and tell us what's going on?
          </SlackMessage>
          <SlackThreadSeparator count={3} />
          <SlackMessage avatar={ryze.avatar} sender={ryze.name} badge="AGENT" time="9:18 AM">
            Pulled Jul 20–26. Spend $4,120, 61 leads at $67.54 CPA — up 31% vs the week
            before. The jump is one ad set: prospecting-broad-v3, its top creative
            dropped from 2.4% to 1.1% CTR.
          </SlackMessage>
          <SlackMessage avatar={sarah.avatar} sender={sarah.name} time="9:24 AM">
            That's the carousel we launched in May, makes sense
          </SlackMessage>
          <SlackMessage avatar={ryze.avatar} sender={ryze.name} badge="AGENT" time="9:25 AM">
            Recommendation: pause the fatigued carousel and shift its budget to the two
            video creatives holding 2.1%+ CTR. Want me to prepare the changes for
            approval?
          </SlackMessage>
        </SlackThreadPane>
      </SlackPanes>
    </SlackFrame>
  </AbsoluteFill>
);

export const SlackPdfThreadPreview: React.FC = () => (
  <AbsoluteFill>
    <SlackFrame>
      <SlackSidebar rows={SIDEBAR_ROWS} />
      <SlackPanes>
        <SlackChannelPane
          name="marketing"
          composer={<SlackComposer placeholder="Message #marketing" />}
        >
          <ChannelMessages />
        </SlackChannelPane>
        <SlackThreadPane
          channel="marketing"
          composer={
            <SlackComposer placeholder="Reply…" toolbar={false} alsoSendTo="marketing" />
          }
        >
          <SlackMessage avatar={marcus.avatar} sender={marcus.name} time="11:02 AM">
            <SlackMention>@Ryze AI</SlackMention> can you prepare last week meta report
            and attach pdf here?
          </SlackMessage>
          <SlackThreadSeparator count={1} />
          <SlackMessage avatar={ryze.avatar} sender={ryze.name} badge="AGENT" time="Just now">
            <SlackFileCard
              name="meta-ads-weekly-report-jul-20-26-2026.pdf"
              style={{ marginBottom: 8 }}
            />
            Report's attached above (PDF).
            <br />
            <b>Verdict:</b> last week (Jul 20–26) had $0 spend — every campaign in the
            account was paused, none ran that week. Account resumed Jul 31 with
            seo-scan-broad: $40.22 spend, 8 clicks, 2 leads at $20.11 CPA on day one.
            <br />
            Want me to set this up as a recurring weekly report, posted here every Monday?
          </SlackMessage>
        </SlackThreadPane>
      </SlackPanes>
    </SlackFrame>
  </AbsoluteFill>
);
