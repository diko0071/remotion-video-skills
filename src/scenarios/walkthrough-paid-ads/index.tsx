import React from "react";
import {
  buildSteps,
  WalkthroughPlayer,
  walkthroughDuration,
  type WalkthroughBeat,
} from "../../kit/walkthrough";
import {
  ApprovalsPage,
  ChatEmptyPage,
  CompetitorAdsPage,
  CreativesPage,
  OrgHomePage,
  PaidAdsCampaignsPage,
  PaidAdsCreativesTabPage,
  PaidAdsDashboardPage,
  PaidAdsPortfolioPage,
  SchedulesPage,
} from "../../kit/ryze-ui/pages";
import {
  PAID_ADS_TURN_FRAMES,
  PaidAdsChatTurn1,
  PaidAdsChatTurn2,
  PaidAdsChatTurn3,
} from "./chat-flow";
import VO from "./vo-durations.json";

const beats: WalkthroughBeat[] = [
  { vo: "01-intro.mp3", seconds: VO["01-intro"], nav: "Home", Component: OrgHomePage },
  { vo: "02-chat.mp3", seconds: VO["02-chat"], nav: "New chat", Component: ChatEmptyPage },
  {
    vo: "03-creatives.mp3",
    seconds: VO["03-creatives"],
    nav: "New chat",
    Component: PaidAdsChatTurn1,
    minFrames: PAID_ADS_TURN_FRAMES[0] + 20,
    click: null,
  },
  {
    vo: "04-chart.mp3",
    seconds: VO["04-chart"],
    nav: "New chat",
    Component: PaidAdsChatTurn2,
    minFrames: PAID_ADS_TURN_FRAMES[1] + 20,
    click: null,
  },
  {
    vo: "05-approve.mp3",
    seconds: VO["05-approve"],
    nav: "New chat",
    Component: PaidAdsChatTurn3,
    minFrames: PAID_ADS_TURN_FRAMES[2] + 20,
    click: null,
  },
  {
    vo: "05b-approvals.mp3",
    seconds: VO["05b-approvals"],
    nav: "Approvals",
    Component: ApprovalsPage,
    tail: 0,
  },
  {
    vo: "06-dashboard.mp3",
    seconds: VO["06-dashboard"],
    nav: "Dashboard",
    Component: PaidAdsDashboardPage,
  },
  {
    vo: "07-campaigns.mp3",
    seconds: VO["07-campaigns"],
    nav: "Dashboard",
    Component: PaidAdsCampaignsPage,
    click: "tab.paid-ads.Campaigns",
  },
  {
    vo: "08-creatives-tab.mp3",
    seconds: VO["08-creatives-tab"],
    nav: "Dashboard",
    Component: PaidAdsCreativesTabPage,
    click: "tab.paid-ads.Creatives",
  },
  {
    vo: "09-portfolio.mp3",
    seconds: VO["09-portfolio"],
    nav: "Dashboard",
    Component: PaidAdsPortfolioPage,
    click: "tab.paid-ads.Portfolio View",
  },
  {
    vo: "10-library.mp3",
    seconds: VO["10-library"],
    nav: "Ad Creatives",
    Component: CreativesPage,
  },
  {
    vo: "11-competitors.mp3",
    seconds: VO["11-competitors"],
    nav: "Competitor Ads",
    Component: CompetitorAdsPage,
  },
  { vo: "12-schedule.mp3", seconds: VO["12-schedule"], nav: "Schedules", Component: SchedulesPage },
  {
    vo: "13-close.mp3",
    seconds: VO["13-close"],
    nav: "Dashboard",
    Component: PaidAdsDashboardPage,
  },
];

const STEPS = buildSteps(beats);

export const WALKTHROUGH_PAID_ADS_TOTAL = walkthroughDuration(STEPS);

export const WalkthroughPaidAds: React.FC = () => (
  <WalkthroughPlayer steps={STEPS} voDir="vo/walkthrough-paid-ads" />
);
