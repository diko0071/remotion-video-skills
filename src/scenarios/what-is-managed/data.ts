import { LOGO } from "./theme";

export const COPY = {
  campaignName: "Meta & Google | Purchase",
  metaLine: "$50 / day · Meta, Google · Purchase",
  settingUp: "Agent is setting up this campaign — it will launch on its own.",
  budgetLabel: "How much per day?",
  daily: "daily",
  goalLabel: "What do you want more of?",
  submit: "Create campaign",
  account: "Fishwife Ads",
  feeNote: "Charged monthly on actual ad spend, on the last day of the month. The more you spend, the lower the rate.",
} as const;

export const breakdownLine = (spend: string, rate: string, fee: string) => `≈ ${spend}/mo ad spend · Ryze fee ${rate}% ≈ ${fee}/mo`;

export const PLATFORMS = [
  { label: "Meta", logo: LOGO.meta, picked: true },
  { label: "Google", logo: LOGO.google, picked: true },
  { label: "TikTok", logo: LOGO.tiktok, picked: false },
  { label: "LinkedIn", logo: LOGO.linkedin, picked: false },
  { label: "Microsoft", logo: LOGO.microsoft, picked: false },
  { label: "Snapchat", logo: LOGO.snapchat, picked: false },
  { label: "Reddit", logo: LOGO.reddit, picked: false },
  { label: "OpenAI", logo: LOGO.openai, picked: false },
] as const;

export const GOALS = [
  { friendly: "More sales", event: "Purchase" },
  { friendly: "More leads", event: "Lead" },
  { friendly: "More sign-ups", event: "Sign up" },
  { friendly: "More trials", event: "Start trial" },
] as const;

export const FEE_STEPS = [
  { daily: "$50", spend: "$1.5k", rate: "5", fee: "$76" },
  { daily: "$1,000", spend: "$30.3k", rate: "4.9", fee: "$1.5k" },
  { daily: "$10,000", spend: "$303.3k", rate: "4.57", fee: "$13.8k" },
  { daily: "$100,000", spend: "$3.03M", rate: "3.7", fee: "$112.1k" },
] as const;

export const ROLES = [
  { role: "Media buyer", task: "Sets up campaigns" },
  { role: "Designer", task: "Makes creatives" },
  { role: "Analyst", task: "Checks results every day" },
] as const;

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const BUILD_ROWS = [
  "Read 90 days of your ad account history",
  "Built the campaign and 3 ad sets",
  "Made 18 ads for your brand",
] as const;

export const AD_SETS = [
  { name: "Broad", budget: 20, cpa: "$12.40", ad: 0 },
  { name: "Lookalike 1%", budget: 20, cpa: "$14.80", ad: 2 },
  { name: "Retargeting", budget: 10, cpa: "$61.20", ad: 5 },
] as const;
