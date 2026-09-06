import { Card, Platform, QuickAction } from "./types";

export const PLATFORM_LABEL: Record<Platform, string> = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
};

export const PLATFORM_LOGO: Record<Platform, string> = {
  google_ads: "integrations/google-ads.webp",
  meta_ads: "integrations/meta-ads.svg",
};

export const HERO_FAN = [
  "integrations/google-search-console.svg",
  "integrations/ahrefs.svg",
  "integrations/semrush.png",
];

export const FAN_LEFT = [10, 52, 94];

export const HERO_VERB = "Rank";

export const HERO_REST = "higher on Google";

export const SHELF_TITLE = "Campaign playbooks to start from";

export const SHELF_ALL_LABEL = "View all";

export const ACTIONS: QuickAction[] = [
  { key: "campaign", label: "Launch a campaign" },
  { key: "creatives", label: "Make creatives" },
  { key: "deck", label: "Build a deck" },
  { key: "dashboard", label: "Design a dashboard" },
  { key: "automate", label: "Automate routine" },
];

export const CARDS: Card[] = [
  {
    title: "Plan a campaign with me",
    description:
      "Not sure where to start? The agent interviews you — goal, budget, audience — then builds the plan.",
    image: "templates/79-card.webp",
    platforms: [],
  },
  {
    title: "Launch my first campaign",
    description:
      "Your first campaign end to end: the right platform, a starter budget, targeting and ads — every choice explained in one line.",
    image: "templates/74-card.webp",
    platforms: [],
  },
  {
    title: "Create Google Search campaign",
    description:
      "A launch-ready Search campaign: ad groups, keywords with match types, RSAs, negatives and budget — built as a draft.",
    image: "templates/65-card.webp",
    platforms: ["google_ads"],
  },
  {
    title: "Create Meta prospecting campaign",
    description:
      "A cold-traffic Meta campaign: audience plan, 3 creatives, copy variants and budget split — created paused for review.",
    image: "templates/66-card.webp",
    platforms: ["meta_ads"],
  },
  {
    title: "Create PMax campaign",
    description:
      "A Performance Max campaign with asset groups per product theme, audience signals and full asset coverage.",
    image: "templates/67-card.webp",
    platforms: ["google_ads"],
  },
  {
    title: "Create retargeting campaign",
    description:
      "A funnel-staged retargeting setup: audiences by intent level, matched message per stage, frequency caps.",
    image: "templates/68-card.webp",
    platforms: ["meta_ads", "google_ads"],
  },
  {
    title: "Create promo campaign",
    description:
      "A complete sale launch: promo creatives, copy, audiences, budget plan and the switch-back plan for after.",
    image: "templates/69-card.webp",
    platforms: ["meta_ads", "google_ads"],
  },
  {
    title: "Scale my winning campaign",
    description:
      "Your best performer found and scaled: bigger budget, wider audiences and the creative variations scaling needs.",
    image: "templates/75-card.webp",
    platforms: [],
  },
  {
    title: "Launch on a new channel",
    description:
      "The next channel picked from your data: why it fits, the test budget, and the first campaign built to try it.",
    image: "templates/78-card.webp",
    platforms: [],
  },
  {
    title: "Get more leads",
    description:
      "A lead campaign on the platform that fits: qualifying form, audience, budget — and the follow-up plan so leads hear back fast.",
    image: "templates/77-card.webp",
    platforms: [],
  },
  {
    title: "Launch a new product",
    description:
      "A full product launch in phases: teaser, launch day and follow-through — audiences, creatives and budget per phase.",
    image: "templates/76-card.webp",
    platforms: [],
  },
  {
    title: "Create keyword plan",
    description:
      "A campaign-ready keyword plan: seed expansion with volumes and CPCs, grouped by intent, negatives included.",
    image: "templates/70-card.webp",
    platforms: ["google_ads"],
  },
];
