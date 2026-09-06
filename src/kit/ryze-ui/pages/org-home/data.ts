import { OrgTemplate } from "./types";

export const MCP_URL = "https://app.get-ryze.ai/api/mcp/ember-and-oak";

export const ORG_TEMPLATES: OrgTemplate[] = [
  {
    title: "Account health audit",
    description:
      "Top 5 issues ranked by $ impact: IS lost to budget, QS underperformers, tracking gaps, ad strength, broad-match waste.",
    imageFile: "01-card.webp",
    platformLogo: "google-ads.webp",
    platformLabel: "Google Ads",
  },
  {
    title: "Find Google Ads waste",
    description:
      "Campaigns >$500/wk with ROAS <2. Top wasted terms, Smart Bidding check, pause/cut recommendation.",
    imageFile: "08-card.webp",
    platformLogo: "google-ads.webp",
    platformLabel: "Google Ads",
  },
  {
    title: "Negative keyword sweep",
    description:
      "20 high-impression, low-converting queries from last 30d. Wasted spend per term + recommended match type.",
    imageFile: "04-card.webp",
    platformLogo: "google-ads.webp",
    platformLabel: "Google Ads",
  },
  {
    title: "Search-term goldmine",
    description:
      "Converting queries last 90d not yet keywords. Promote to exact/phrase, grouped into the right ad groups.",
    imageFile: "05-card.webp",
    platformLogo: "google-ads.webp",
    platformLabel: "Google Ads",
  },
  {
    title: "Quality Score audit",
    description:
      "Low-QS keywords by spend. Component diagnosis (CTR, ad relevance, LP) + the one fix per keyword.",
    imageFile: "06-card.webp",
    platformLogo: "google-ads.webp",
    platformLabel: "Google Ads",
  },
  {
    title: "Geo performance map",
    description:
      "Bottom 10 + top 10 locations by ROAS last 30d. Geo bid adjustments and zero-converting regions to exclude.",
    imageFile: "27-card.webp",
    platformLogo: "google-ads.webp",
    platformLabel: "Google Ads",
  },
];
