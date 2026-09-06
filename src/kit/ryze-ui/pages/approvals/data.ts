import { ApprovalRow, ApprovalStatus, Column, Tone } from "./types";

export const APPROVALS_TITLE = "Approvals";
export const APPROVALS_SUB =
  "Improvements the agent found and wants your sign-off to apply.";

export const APPROVALS_TABS = ["Pending", "History"] as const;

export const PRODUCT_FILTERS = ["All products", "SEO", "Paid Ads"] as const;

export const REJECT_DIALOG = {
  title: "Reject proposal",
  description: "Why isn't this change right for you?",
  placeholder: "Optional — helps the agent propose better changes next time.",
  cancel: "Cancel",
  confirm: "Reject",
} as const;

export const STATUS_META: Record<ApprovalStatus, { label: string; tone: Tone }> = {
  proposed: { label: "Proposed", tone: "neutral" },
  applying: { label: "Applying", tone: "warn" },
  applied: { label: "Applied", tone: "ok" },
  failed: { label: "Failed", tone: "bad" },
  rejected: { label: "Rejected", tone: "info" },
  acknowledged: { label: "Acknowledged", tone: "info" },
};

export const CHANNEL_LOGO: Record<string, string> = {
  google_ads: "integrations/google-ads.webp",
  meta_ads: "integrations/meta-ads.svg",
  shopify: "integrations/shopify.svg",
  google_search_console: "integrations/google-search-console.svg",
};

export const CHANNEL_BG: Record<string, string> = {
  google_ads: "#ffffff",
  meta_ads: "#ffffff",
  shopify: "#95BF47",
  google_search_console: "#ffffff",
};

export const PENDING_ROWS: ApprovalRow[] = [
  {
    id: "pause-keywords",
    title: "Pause 3 keywords burning spend with zero conversions",
    channel: "google_ads",
    age: "2h ago",
    status: "proposed",
    detail: {
      description:
        "Three broad-match keywords in Search — Candles US spent $214 over the last 30 days without a single conversion. Pausing them frees that budget for the terms that already convert.",
      product: "Paid Ads",
      entity: {
        campaign: "Search — Candles US",
        ad_group: "Candles — Broad",
        keywords: "candle brands, best candles online, candle shop near me",
      },
      changes: [
        { label: "candle brands", from: "Enabled", to: "Paused" },
        { label: "best candles online", from: "Enabled", to: "Paused" },
        { label: "candle shop near me", from: "Enabled", to: "Paused" },
      ],
      evidence: {
        window: "Last 30 days",
        points: [
          "$214.36 spent across the 3 keywords, 0 conversions",
          "candle brands alone spent $96.10 on 1,204 clicks with no purchases",
          "Campaign average CPA is $18.40 — these keywords never converted once",
          "Quality Score 3–4 on all three, against a campaign median of 7",
        ],
      },
      impact: { kind: "modeled", label: "≈ $214/mo saved" },
    },
  },
  {
    id: "redirect-chain",
    title: "Fix redirect chain on /collections/fall-candles",
    channel: "shopify",
    age: "3h ago",
    status: "proposed",
    detail: {
      description:
        "The old fall collection URL reaches its destination through a 3-hop redirect chain. Every hop wastes crawl budget and leaks link equity before visitors and crawlers land on the live page.",
      product: "SEO",
      entity: {
        page: "https://ember-and-oak.com/collections/fall-candles",
        destination: "https://ember-and-oak.com/collections/autumn-collection",
      },
      changes: [
        {
          label: "Redirect target for /collections/fall-candles",
          from: "301 → /collections/fall → 301 → /collections/autumn-collection → 200",
          to: "301 → /collections/autumn-collection → 200",
        },
      ],
      evidence: {
        window: "Site crawl — Aug 16",
        points: [
          "/collections/fall-candles → 301 → /collections/fall → 301 → /collections/autumn-collection → 200",
          "14 internal links and 6 external backlinks still point at the first hop",
          "Googlebot crawled the chain 212 times in the last 30 days",
          "Each extra hop drops part of the link equity passed to the final page",
        ],
      },
      impact: { kind: "modeled", label: "Faster crawl, recovered link equity" },
    },
  },
  {
    id: "meta-title-soy",
    title:
      "Rewrite meta title on /collections/soy-candles — 2,140 impressions, 0.9% CTR",
    channel: "google_search_console",
    age: "5h ago",
    status: "proposed",
  },
  {
    id: "broken-links",
    title: "Fix 6 broken internal links pointing to /products/cedar-ember-18oz",
    channel: "shopify",
    age: "7h ago",
    status: "proposed",
  },
  {
    id: "connect-google-ads",
    title: "Connect Google Ads to fix wasted spend",
    channel: "google_ads",
    age: "8h ago",
    status: "proposed",
    blocked: true,
    detail: {
      description:
        "The agent found paused-worthy spend patterns it cannot act on: the Google Ads account is not connected to this workspace.",
      product: "Paid Ads",
      entity: { account: "Ember & Oak — Google Ads" },
      changes: [
        {
          label: "Google Ads connection",
          from: "Not connected",
          to: "Connected with standard access",
        },
      ],
      evidence: {
        points: [
          "3 fixes are waiting that need write access to Google Ads",
          "Read-only signals suggest budget is leaking on non-converting terms",
        ],
      },
      blocker:
        "Connect Google Ads in Integrations, then come back and press I fixed it.",
    },
  },
  {
    id: "raise-budget-cozy",
    title:
      "Raise budget on Prospecting — Cozy Home from $60 to $95/day at 4.1x ROAS",
    channel: "meta_ads",
    age: "9h ago",
    status: "proposed",
  },
  {
    id: "alt-text-candles",
    title: "Add alt text to 23 product images in the Candles collection",
    channel: "shopify",
    age: "11h ago",
    status: "proposed",
  },
  {
    id: "meta-desc-care",
    title: "Rewrite meta description on /pages/candle-care-guide",
    channel: "google_search_console",
    age: "1d ago",
    status: "proposed",
  },
  {
    id: "exclude-placement",
    title:
      "Exclude Audience Network placement from Retargeting — Cart Abandoners",
    channel: "meta_ads",
    age: "1d ago",
    status: "proposed",
  },
];

export const HISTORY_ROWS: ApprovalRow[] = [
  {
    id: "hist-gift-sets-title",
    title: "Rewrote meta title on /collections/gift-sets to target candle gift sets",
    channel: "google_search_console",
    age: "1d ago",
    status: "applied",
  },
  {
    id: "hist-yankee-pause",
    title: "Paused ad group Yankee Candle Alternative — Exact at $71.20 CPA",
    channel: "google_ads",
    age: "2d ago",
    status: "applied",
  },
  {
    id: "hist-rename-cedar",
    title: "Rename Cedar & Ember 18oz to Cedar Ember Large Candle across the store",
    channel: "shopify",
    age: "2d ago",
    status: "rejected",
  },
  {
    id: "hist-retargeting-budget",
    title: "Raised budget on Retargeting — Cart Abandoners to $80/day at 5.7x ROAS",
    channel: "meta_ads",
    age: "3d ago",
    status: "applied",
  },
  {
    id: "hist-broad-budget",
    title: "Increase budget on Broad — Home Fragrance from $40 to $120/day",
    channel: "meta_ads",
    age: "6d ago",
    status: "rejected",
  },
];

export const COLUMNS: Column[] = [
  {
    status: "Proposed",
    tone: "neutral",
    total: 8,
    more: 3,
    cards: [
      {
        title:
          "Rewrite meta title on /collections/soy-candles — 2,140 impressions, 0.9% CTR",
        channel: "google_search_console",
        age: "2h ago",
        actions: "decide",
      },
      {
        title:
          "Pause ad group Candle Gifts — Broad: $412 spent, 0 purchases in 14 days",
        channel: "google_ads",
        age: "3h ago",
        actions: "decide",
      },
      {
        title: "Fix 6 broken internal links pointing to /products/cedar-ember-18oz",
        channel: "shopify",
        age: "5h ago",
        actions: "decide",
      },
      {
        title:
          "Google Ads access is read-only — grant standard access to apply 3 waiting fixes",
        channel: "google_ads",
        age: "8h ago",
        blocked: true,
        actions: "blocked",
      },
      {
        title:
          "Raise budget on Prospecting — Cozy Home from $60 to $95/day at 4.1x ROAS",
        channel: "meta_ads",
        age: "9h ago",
        actions: "decide",
      },
    ],
  },
  {
    status: "Applying",
    tone: "warn",
    total: 2,
    cards: [
      {
        title: "Add 11 internal links from blog posts to /collections/gift-sets",
        channel: "shopify",
        age: "22m ago",
      },
      {
        title: "Rewrite meta description on /pages/candle-care-guide",
        channel: "google_search_console",
        age: "48m ago",
      },
    ],
  },
  {
    status: "Applied",
    tone: "ok",
    total: 14,
    more: 10,
    cards: [
      {
        title: "Rewrote meta title on /collections/gift-sets to target candle gift sets",
        channel: "google_search_console",
        age: "1d ago",
      },
      {
        title: "Paused ad group Yankee Candle Alternative — Exact at $71.20 CPA",
        channel: "google_ads",
        age: "2d ago",
      },
      {
        title:
          "Raised budget on Retargeting — Cart Abandoners to $80/day at 5.7x ROAS",
        channel: "meta_ads",
        age: "3d ago",
      },
      {
        title: "Added alt text to 23 product images in the Candles collection",
        channel: "shopify",
        age: "4d ago",
      },
    ],
  },
  {
    status: "Failed",
    tone: "bad",
    total: 1,
    cards: [
      {
        title: "Add canonical tags to 8 duplicate scent-filter URLs",
        channel: "shopify",
        age: "1d ago",
      },
    ],
  },
  {
    status: "Rejected",
    tone: "info",
    total: 3,
    more: 1,
    cards: [
      {
        title:
          "Rename Cedar & Ember 18oz to Cedar Ember Large Candle across the store",
        channel: "shopify",
        age: "2d ago",
      },
      {
        title: "Increase budget on Broad — Home Fragrance from $40 to $120/day",
        channel: "meta_ads",
        age: "6d ago",
      },
    ],
  },
];
