import { GrowthPhase, SetupStep } from "./types";

export const CMS_LOGOS = [
  "integrations/shopify.svg",
  "integrations/wordpress.svg",
  "integrations/framer.svg",
  "integrations/github.svg",
  "integrations/wix.svg",
  "integrations/ghost.png",
  "integrations/hubspot.svg",
  "integrations/lightspeed.png",
  "integrations/webflow.svg",
  "integrations/magento.svg",
  "integrations/gohighlevel.png",
  "integrations/directus.png",
];

export const SETUP_STEPS: SetupStep[] = [
  {
    n: 1,
    title: "Analytics Connected",
    state: "done",
    logos: ["integrations/google-search-console.svg", "integrations/google-analytics.svg"],
    subs: [
      {
        label: "Google Search Console connected",
        state: "done",
        logo: "integrations/google-search-console.svg",
      },
      {
        label: "Google Analytics connected",
        state: "done",
        logo: "integrations/google-analytics.svg",
      },
    ],
  },
  {
    n: 2,
    title: "Your Business Analyzed",
    state: "done",
    subs: [
      { label: "Analyzed your industry and target audience", state: "done" },
      { label: "Identified your unique value proposition", state: "done" },
      { label: "Created your brand voice profile", state: "done" },
      { label: "Mapped your products/services to search intent", state: "done" },
    ],
  },
  {
    n: 3,
    title: "Preparing Growth Strategy",
    state: "active",
    subs: [
      {
        label: "Researched keywords your customers search for",
        state: "done",
      },
      {
        label: "Preparing article topics for publication",
        state: "active",
      },
      { label: "Prepare guest posts", state: "pending" },
      { label: "Prepare PR article", state: "pending" },
    ],
  },
  {
    n: 4,
    title: "Website Connected",
    state: "done",
    logos: CMS_LOGOS,
    subs: [
      {
        label: "Shopify connected",
        state: "done",
        logo: "integrations/shopify.svg",
      },
    ],
  },
  {
    n: 5,
    title: "Publish your first article",
    state: "pending",
    subs: [],
  },
];

export const GROWTH_PHASES: GrowthPhase[] = [
  {
    key: "learning",
    months: "Months 1-3",
    title: "Learning",
    outcome: "First rankings, first clicks, authority starts building",
    volume: "41k",
    icon: "home/phases/learning.webp",
    open: true,
    description:
      "Our AI agent scans your competitors and your historical data to find the best opportunities to rank you.",
    milestones: [
      "Researching 8,000+ keywords in your niche",
      "Stealing the best pages of your 16 competitors",
      "Publishing 5 new articles every single day",
      "Landing 120+ backlinks every month",
      "Fixing 25 technical issues every month",
    ],
    results: [
      "450 articles live and indexed",
      "360+ backlinks pointing at your site",
      "12 guest posts & PR placements",
      "75 technical issues fixed",
      "Visible across Google and 4 AI platforms",
    ],
  },
  {
    key: "moving",
    months: "Months 3-6",
    title: "Moving to Page One",
    outcome: "Top-10 rankings and steady traffic growth",
    volume: "97k",
    icon: "home/phases/moving.webp",
    description:
      "Pages that prove themselves get pushed hard — links, rewrites and fixes concentrate on what's already moving.",
    milestones: [
      "Publishing 150 new articles every month",
      "Pushing 50+ keywords toward the top 10",
      "Stacking 120+ backlinks a month into movers",
      "Rewriting 20+ underperforming titles a month",
      "Fixing 25 technical issues every month",
    ],
    results: [
      "900 articles live and ranking",
      "720+ backlinks stacked on your domain",
      "24 guest posts & PR placements",
      "150 technical issues fixed",
      "50+ keywords moving into the top 10",
    ],
  },
  {
    key: "owning",
    months: "Months 6-12",
    title: "Owning Page One",
    outcome: "Page-one dominance and compounding traffic",
    volume: "215k",
    icon: "home/phases/owning.webp",
    description:
      "Authority compounds: every new article launches from a stronger domain and ranks faster than the last.",
    milestones: [
      "Scaling past 1,000 live articles",
      "Targeting the 80+ money keywords of your niche",
      "Landing 120+ backlinks a month on autopilot",
      "Refreshing 100+ articles a month to defend positions",
      "Fixing 25 technical issues every month",
    ],
    results: [
      "1,800+ articles compounding as one moat",
      "1,440+ backlinks pointing at your domain",
      "48 guest posts & PR placements",
      "300 technical issues fixed",
      "60+ target keywords owned across your niche",
    ],
  },
];
