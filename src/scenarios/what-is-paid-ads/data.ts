import { CREATIVES } from "../../kit/ryze-ui/pages/creatives/data";
import { PENDING_ROWS } from "../../kit/ryze-ui/pages/approvals";
import type { ApprovalRow } from "../../kit/ryze-ui/pages/approvals";
import { AD_TEMPLATES } from "../../kit/ryze-ui/pages/ad-templates/data";
import { COMPETITOR_ROWS, TRACKED_BRANDS } from "../../kit/ryze-ui/pages/competitor-ads/data";
import { SCHEDULE_RUNS, SCHEDULE_TASK_TEXT, SCHEDULE_DETAIL_NAME } from "../../kit/ryze-ui/pages/schedules/data";

export const ACCOUNTS = [
  { name: "Google Ads", sub: "Search — Candles US", icon: "integrations/google-ads.webp" },
  { name: "Meta Ads", sub: "Ember & Oak — Prospecting", icon: "integrations/meta-ads.svg" },
  { name: "TikTok Ads", sub: "Ember & Oak — Spark Ads", icon: "integrations/tiktok-ads.svg" },
] as const;

export const APPROVAL: ApprovalRow = { ...PENDING_ROWS[0], age: "just now", status: "proposed" };

const byId = (id: string) => CREATIVES.find((c) => c.id === id) ?? CREATIVES[0];
export const NEW_CREATIVE = byId("c1");
export const YOUR_VERSION = byId("c6");
export const CREATIVE_PROMPT = "Make a fall ad for the Cedar & Ember candle";
export const CREATIVE_META = [
  { label: "Hook", value: "Cabin season is lit" },
  { label: "Type", value: "Static image" },
  { label: "Size", value: "1080 × 1350" },
] as const;
export const WINNING_TEMPLATE = AD_TEMPLATES.find((t) => t.file.startsWith("p-f-candle-co")) ?? AD_TEMPLATES[0];

export const BRANDS = TRACKED_BRANDS.slice(0, 5);
const TRACKED_ADS = COMPETITOR_ROWS.filter((r) => r.format === "image" && r.image && !r.image.includes("salt-stone") && BRANDS.some((b) => b.name === r.brand.name)).map((r) => ({ ...r, mediaAspect: 1 }));
export const ADS_NEWEST = [...TRACKED_ADS].sort((a, b) => a.runningDays - b.runningDays).slice(0, 4);
export const ADS_LONGEST = [...TRACKED_ADS].sort((a, b) => b.runningDays - a.runningDays).slice(0, 4);
export const ALERT_BRAND = BRANDS[0];

export const SCHEDULE = {
  name: SCHEDULE_DETAIL_NAME,
  instructions: SCHEDULE_TASK_TEXT,
  repeats: ["Daily at 08:00", "Weekly on Monday at 08:00", "Monthly on day 1 at 08:00"],
  runs: SCHEDULE_RUNS.filter((r) => r.status === "Done").slice(0, 3),
} as const;

export const REPORT = {
  title: "Ember & Oak — September ad performance",
  recipients: "team@ember-and-oak.com",
} as const;

export const DASH_PROMPT = "Build me a dashboard: spend and ROAS by platform, this month";
