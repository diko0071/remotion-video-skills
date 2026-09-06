import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PromoPlayer } from "../../engine/promo/player";
import { promoDuration, PromoScenario } from "../../engine/promo/scenario";
import { KineticLine } from "../../kit/kinetic-text";
import { SlackConnect, CONNECT_TOTAL } from "./scene-connect";
import { SlackMarketing, MARKETING_TOTAL } from "./scene-marketing";
import { SlackAnalytics, ANALYTICS_TOTAL } from "./scene-analytics";
import { SlackClients, CLIENTS_TOTAL } from "./scene-clients";
import { SlackAsks, ASKS_TOTAL } from "./scene-asks";

const INK = "#171310";
const CREAM = "#FDFAF3";

const HookOpen: React.FC = () => (
  <KineticLine
    at={2}
    span={26}
    size={96}
    parts={[
      { word: "Your" },
      { word: "marketing" },
      { word: "runs" },
      { word: "itself." },
      { br: true },
      { word: "Now" },
      { word: "in" },
      { image: "integrations/slack.svg", tilt: -4, size: 96, imgHeight: 50 },
      { word: "Slack.", accent: true },
    ]}
  />
);

const HookDashboard: React.FC = () => (
  <KineticLine
    at={2}
    span={20}
    size={100}
    parts={[
      { word: "You" },
      { word: "never" },
      { word: "opened" },
      { word: "a" },
      { word: "dashboard.", accent: true },
    ]}
  />
);

const HookClose: React.FC = () => (
  <KineticLine
    at={2}
    span={22}
    size={100}
    parts={[
      { word: "Approvals." },
      { word: "Reports." },
      { word: "Decks." },
      { word: "Answers." },
      { image: "integrations/slack.svg", tilt: 4, size: 96, imgHeight: 50 },
      { word: "In", accent: true },
      { word: "Slack.", accent: true },
    ]}
  />
);

const promoScene = (id: string, render: React.ComponentType, duration: number): PromoScenario => ({
  id,
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [{ kind: "custom", render, duration }],
});

const HookReports: React.FC = () => (
  <KineticLine
    at={2}
    span={16}
    size={100}
    parts={[
      { word: "Weekly" },
      { word: "reports." },
      { word: "On", accent: true },
      { word: "schedule.", accent: true },
    ]}
  />
);

const HookClients: React.FC = () => (
  <KineticLine
    at={2}
    span={16}
    size={100}
    parts={[
      { word: "Client" },
      { word: "decks." },
      { word: "Before", accent: true },
      { word: "the", accent: true },
      { word: "meeting.", accent: true },
    ]}
  />
);

const HookAsk: React.FC = () => (
  <KineticLine
    at={2}
    span={14}
    size={100}
    parts={[{ word: "Ask" }, { word: "it" }, { word: "anything.", accent: true }]}
  />
);

const HOOK = promoScene("slack-autopilot-hook", HookOpen, 58);
const HOOK_REPORTS = promoScene("slack-autopilot-hook-reports", HookReports, 42);
const HOOK_CLIENTS = promoScene("slack-autopilot-hook-clients", HookClients, 42);
const HOOK_ASK = promoScene("slack-autopilot-hook-ask", HookAsk, 40);
const HOOK_DASH = promoScene("slack-autopilot-hook-dash", HookDashboard, 46);

const TAIL: PromoScenario = {
  id: "slack-autopilot-tail",
  format: "wide",
  background: CREAM,
  ink: INK,
  transition: "cut",
  scenes: [
    { kind: "custom", render: HookClose, duration: 52 },
    {
      kind: "lockup",
      background: CREAM,
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at ryze.ai",
    },
  ],
};

const HOOK_AT = 0;
const CONNECT_AT = HOOK_AT + promoDuration(HOOK);
const MARKETING_AT = CONNECT_AT + CONNECT_TOTAL;
const H_REPORTS_AT = MARKETING_AT + MARKETING_TOTAL;
const ANALYTICS_AT = H_REPORTS_AT + promoDuration(HOOK_REPORTS);
const H_CLIENTS_AT = ANALYTICS_AT + ANALYTICS_TOTAL;
const CLIENTS_AT = H_CLIENTS_AT + promoDuration(HOOK_CLIENTS);
const H_ASK_AT = CLIENTS_AT + CLIENTS_TOTAL;
const ASKS_START = H_ASK_AT + promoDuration(HOOK_ASK);
const DASH_AT = ASKS_START + ASKS_TOTAL;
const TAIL_AT = DASH_AT + promoDuration(HOOK_DASH);

export const SLACK_AUTOPILOT_TOTAL = TAIL_AT + promoDuration(TAIL);

export const SlackAutopilot: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <Sequence durationInFrames={promoDuration(HOOK)}>
      <PromoPlayer scenario={HOOK} />
    </Sequence>
    <Sequence from={CONNECT_AT} durationInFrames={CONNECT_TOTAL}>
      <SlackConnect />
    </Sequence>
    <Sequence from={MARKETING_AT} durationInFrames={MARKETING_TOTAL}>
      <SlackMarketing />
    </Sequence>
    <Sequence from={H_REPORTS_AT} durationInFrames={promoDuration(HOOK_REPORTS)}>
      <PromoPlayer scenario={HOOK_REPORTS} />
    </Sequence>
    <Sequence from={ANALYTICS_AT} durationInFrames={ANALYTICS_TOTAL}>
      <SlackAnalytics />
    </Sequence>
    <Sequence from={H_CLIENTS_AT} durationInFrames={promoDuration(HOOK_CLIENTS)}>
      <PromoPlayer scenario={HOOK_CLIENTS} />
    </Sequence>
    <Sequence from={CLIENTS_AT} durationInFrames={CLIENTS_TOTAL}>
      <SlackClients />
    </Sequence>
    <Sequence from={H_ASK_AT} durationInFrames={promoDuration(HOOK_ASK)}>
      <PromoPlayer scenario={HOOK_ASK} />
    </Sequence>
    <Sequence from={ASKS_START} durationInFrames={ASKS_TOTAL}>
      <SlackAsks />
    </Sequence>
    <Sequence from={DASH_AT} durationInFrames={promoDuration(HOOK_DASH)}>
      <PromoPlayer scenario={HOOK_DASH} />
    </Sequence>
    <Sequence from={TAIL_AT}>
      <PromoPlayer scenario={TAIL} />
    </Sequence>
  </AbsoluteFill>
);
