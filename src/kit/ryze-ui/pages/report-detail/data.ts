import { ReportChannel, ReportCheck, ReportKpi, ReportMonth, ReportRec } from "./types";

export const KPIS: ReportKpi[] = [
  { label: "Revenue", value: "$198,412", change: 0.14, sub: "Aug 1-31 vs Jul 1-31", peer: "Best month of 2026" },
  { label: "Orders", value: "2,901", change: 0.11, sub: "94 orders per day", peer: "85 per day in July" },
  { label: "Conversion rate", value: "2.41%", change: 0.13, sub: "Sessions to checkout" },
  { label: "Average order value", value: "$68.40", change: 0.03, sub: "Gift sets lift AOV by $11.20" },
];

export const MONTHS: ReportMonth[] = [
  { label: "Mar", value: 141 },
  { label: "Apr", value: 138 },
  { label: "May", value: 152 },
  { label: "Jun", value: 164 },
  { label: "Jul", value: 174 },
  { label: "Aug", value: 198 },
];

export const CHANNELS: ReportChannel[] = [
  { channel: "Organic search", sub: "Google, Bing", sessions: "58,410", revenue: "$79,320", conv: "2.9%" },
  { channel: "Direct", sub: "Typed and app", sessions: "27,140", revenue: "$44,610", conv: "3.4%" },
  { channel: "Paid search", sub: "Google Ads", sessions: "21,905", revenue: "$31,880", conv: "2.2%" },
  { channel: "Paid social", sub: "Meta Ads", sessions: "16,240", revenue: "$19,470", conv: "1.4%" },
  { channel: "Email", sub: "Klaviyo flows", sessions: "11,802", revenue: "$16,940", conv: "4.8%" },
  { channel: "Referral", sub: "Blogs and press", sessions: "7,309", revenue: "$6,192", conv: "1.1%" },
];

export const RECS: ReportRec[] = [
  {
    title: "Collection pages carry 38% of organic sessions with duplicated copy",
    why: [
      "/collections/signature-wicks ranks #14 for \"hand poured soy candles\" (4,400 searches per month).",
      "Six collection pages share the same 240-character description block.",
      "Brooklyn Candle Studio outranks all six with 600+ words and buying guidance.",
    ],
    nextSteps: [
      "Write 400-600 words per collection covering scent family, burn time and room fit.",
      "Add an FAQ block answering the three questions support gets weekly.",
      "Link each collection to its two best-selling products above the fold.",
    ],
  },
  {
    title: "Product schema is missing price and availability on 214 URLs",
    why: [
      "Google Merchant Center flags 214 of 288 products as incomplete offers.",
      "Rich result coverage dropped from 71% to 22% after the June theme update.",
    ],
    nextSteps: [
      "Restore the Offer block in the Shopify product template.",
      "Re-submit the products feed and validate 20 URLs in Search Console.",
    ],
  },
];

export const CHECKS: ReportCheck[] = [
  { slug: "sitemap", title: "XML sitemap submitted and clean", description: "288 URLs, 0 errors in Search Console", status: "delivered" },
  { slug: "core-web-vitals", title: "Core Web Vitals pass on mobile", description: "LCP 2.1s, CLS 0.04 across 28 sampled templates", status: "delivered" },
  { slug: "product-schema", title: "Product schema with price and availability", description: "214 of 288 products missing the Offer block", status: "ongoing" },
  { slug: "internal-links", title: "Internal links from articles to collections", description: "41 articles rewritten, 19 left in the queue", status: "ongoing" },
  { slug: "log-files", title: "Crawl budget review from server logs", description: "Needs log export from the hosting provider", status: "blocked", blockReason: "No log access on the current Shopify plan" },
  { slug: "hreflang", title: "Hreflang for the UK storefront", description: "Scheduled after the UK catalogue launch", status: "planned" },
];
