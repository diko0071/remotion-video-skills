import React from "react";
import {
  buildSteps,
  WalkthroughPlayer,
  walkthroughDuration,
  type WalkthroughBeat,
} from "../../kit/walkthrough";
import {
  ApprovalsPage,
  BacklinksPage,
  BlogStudioPage,
  ContentPlanCalendarPage,
  ContentPlanPage,
  GeoQueriesPage,
  OrgHomePage,
  SeoDashboardGeoPage,
  SeoDashboardPage,
  SeoHomePage,
  TechnicalAuditPage,
} from "../../kit/ryze-ui/pages";
import { SEO_TURN_FRAMES, SeoChatTurn1, SeoChatTurn2, SeoChatTurn3 } from "./chat-flow";
import VO from "./vo-durations.json";

const beats: WalkthroughBeat[] = [
  { vo: "01-intro.mp3", seconds: VO["01-intro"], nav: "Home", Component: OrgHomePage },
  {
    vo: "02-setup.mp3",
    seconds: VO["02-setup"],
    nav: "Home",
    section: "seo",
    Component: SeoHomePage,
    click: "nav.dashboard.SEO",
  },
  {
    vo: "03-chat.mp3",
    seconds: VO["03-chat"],
    nav: "New chat",
    Component: SeoChatTurn1,
    minFrames: SEO_TURN_FRAMES[0] + 20,
    click: null,
  },
  {
    vo: "03b-chat-fix.mp3",
    seconds: VO["03b-chat-fix"],
    nav: "New chat",
    Component: SeoChatTurn2,
    minFrames: SEO_TURN_FRAMES[1] + 20,
    click: null,
  },
  {
    vo: "03c-chat-geo.mp3",
    seconds: VO["03c-chat-geo"],
    nav: "New chat",
    Component: SeoChatTurn3,
    minFrames: SEO_TURN_FRAMES[2] + 20,
    click: null,
  },
  {
    vo: "04-audit.mp3",
    seconds: VO["04-audit"],
    nav: "Technical Audit",
    section: "seo",
    Component: TechnicalAuditPage,
    click: null,
  },
  {
    vo: "05-content.mp3",
    seconds: VO["05-content"],
    nav: "Content Plan",
    section: "seo",
    Component: ContentPlanPage,
  },
  {
    vo: "06-calendar.mp3",
    seconds: VO["06-calendar"],
    nav: "Content Plan",
    section: "seo",
    Component: ContentPlanCalendarPage,
    click: "view.content-plan.calendar",
  },
  {
    vo: "07-dashboard.mp3",
    seconds: VO["07-dashboard"],
    nav: "Dashboard",
    section: "seo",
    Component: SeoDashboardPage,
  },
  {
    vo: "08-geo.mp3",
    seconds: VO["08-geo"],
    nav: "Dashboard",
    section: "seo",
    Component: SeoDashboardGeoPage,
    click: "tab.seo-dashboard.GEO",
  },
  {
    vo: "09-queries.mp3",
    seconds: VO["09-queries"],
    nav: "Queries",
    section: "seo",
    Component: GeoQueriesPage,
  },
  {
    vo: "10-mentions.mp3",
    seconds: VO["10-mentions"],
    nav: "Mentions",
    section: "seo",
    Component: BacklinksPage,
  },
  {
    vo: "11-blog.mp3",
    seconds: VO["11-blog"],
    nav: "Blog Studio",
    section: "seo",
    Component: BlogStudioPage,
  },
  {
    vo: "12-approve.mp3",
    seconds: VO["12-approve"],
    nav: "Approvals",
    Component: ApprovalsPage,
    click: null,
  },
  {
    vo: "13-close.mp3",
    seconds: VO["13-close"],
    nav: "Home",
    section: "seo",
    Component: SeoHomePage,
    click: null,
  },
];

const STEPS = buildSteps(beats);

export const WALKTHROUGH_SEO_TOTAL = walkthroughDuration(STEPS);

export const WalkthroughSeo: React.FC = () => (
  <WalkthroughPlayer steps={STEPS} voDir="vo/walkthrough-seo" />
);
